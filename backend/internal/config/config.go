package config

import (
	"os"
	"strconv"
	"strings"
)

type Config struct {
	Port              string
	DatabaseURL       string
	CookieSecure      bool
	SessionDurationH  int
	BcryptCost        int
	CORSOrigins       []string
	RateLimitRequests int
	RateLimitWindowS  int
	LoginMaxAttempts  int
	LoginLockoutMin   int
}

func Load() *Config {
	return &Config{
		Port:              getEnv("PORT", "8080"),
		DatabaseURL:       getEnv("DATABASE_URL", "postgres://localhost:5432/lucianopulido"),
		CookieSecure:      getEnvBool("COOKIE_SECURE", false),
		SessionDurationH:  getEnvInt("SESSION_DURATION_HOURS", 24),
		BcryptCost:        getEnvInt("BCRYPT_COST", 12),
		CORSOrigins:       getEnvList("CORS_ORIGINS", "http://localhost:4321"),
		RateLimitRequests: getEnvInt("RATE_LIMIT_REQUESTS", 5),
		RateLimitWindowS:  getEnvInt("RATE_LIMIT_WINDOW_SECONDS", 60),
		LoginMaxAttempts:  getEnvInt("LOGIN_MAX_ATTEMPTS", 5),
		LoginLockoutMin:   getEnvInt("LOGIN_LOCKOUT_MINUTES", 15),
	}
}

func getEnv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}

func getEnvInt(key string, fallback int) int {
	v := os.Getenv(key)
	if v == "" {
		return fallback
	}
	n, err := strconv.Atoi(v)
	if err != nil || n < 0 {
		return fallback
	}
	return n
}

func getEnvBool(key string, fallback bool) bool {
	v := os.Getenv(key)
	if v == "" {
		return fallback
	}
	return v == "true" || v == "1"
}

func getEnvList(key, fallback string) []string {
	v := os.Getenv(key)
	if v == "" {
		v = fallback
	}
	parts := strings.Split(v, ",")
	var result []string
	for _, p := range parts {
		p = strings.TrimSpace(p)
		if p != "" {
			result = append(result, p)
		}
	}
	return result
}
