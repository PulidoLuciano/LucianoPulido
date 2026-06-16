package middleware

import (
	"log/slog"
	"net"
	"net/http"
	"sync"
	"time"
)

type rateLimitEntry struct {
	count       int
	windowStart time.Time
}

func RateLimit(maxRequests int, windowSeconds int, logger *slog.Logger) func(http.Handler) http.Handler {
	var mu sync.Mutex
	entries := make(map[string]*rateLimitEntry)

	go func() {
		for {
			time.Sleep(time.Duration(windowSeconds) * time.Second)
			mu.Lock()
			now := time.Now()
			for ip, entry := range entries {
				if now.Sub(entry.windowStart) >= time.Duration(windowSeconds)*time.Second {
					delete(entries, ip)
				}
			}
			mu.Unlock()
		}
	}()

	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			ip, _, _ := net.SplitHostPort(r.RemoteAddr)

			mu.Lock()
			entry, exists := entries[ip]
			now := time.Now()

			if !exists || now.Sub(entry.windowStart) >= time.Duration(windowSeconds)*time.Second {
				entry = &rateLimitEntry{count: 1, windowStart: now}
				entries[ip] = entry
				mu.Unlock()
				next.ServeHTTP(w, r)
				return
			}

			entry.count++
			if entry.count > maxRequests {
				mu.Unlock()
				logger.Warn("rate limit exceeded", "ip", ip, "path", r.URL.Path)
				http.Error(w, `{"error":"too many requests"}`, http.StatusTooManyRequests)
				return
			}
			mu.Unlock()

			next.ServeHTTP(w, r)
		})
	}
}
