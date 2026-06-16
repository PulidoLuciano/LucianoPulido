package main

import (
	"context"
	"database/sql"
	"fmt"
	"log/slog"
	"net/http"
	"os"
	"time"

	_ "github.com/lib/pq"

	httpadapter "github.com/PulidoLuciano/LucianoPulido.git/internal/adapter/http"
	"github.com/PulidoLuciano/LucianoPulido.git/internal/adapter/http/handler"
	"github.com/PulidoLuciano/LucianoPulido.git/internal/adapter/repository/postgres"
	"github.com/PulidoLuciano/LucianoPulido.git/internal/config"
	"github.com/PulidoLuciano/LucianoPulido.git/internal/usecase"
)

func main() {
	logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))
	cfg := config.Load()

	db, err := sql.Open("postgres", cfg.DatabaseURL)
	if err != nil {
		logger.Error("failed to open database", "error", err)
		os.Exit(1)
	}
	defer db.Close()

	if err := db.Ping(); err != nil {
		logger.Error("failed to ping database", "error", err)
		os.Exit(1)
	}

	// Repositories (adapters)
	postRepo := postgres.NewPostRepo(db)
	categoryRepo := postgres.NewCategoryRepo(db)
	metricsRepo := postgres.NewMetricsRepo(db)
	authRepo := postgres.NewAuthRepo(db)

	// Use cases
	postPublicUC := usecase.NewPostPublicUseCase(postRepo, metricsRepo, categoryRepo)
	postAdminUC := usecase.NewPostAdminUseCase(postRepo)
	metricsUC := usecase.NewMetricsUseCase(metricsRepo)
	authUC := usecase.NewAuthUseCase(authRepo, cfg.BcryptCost, cfg.LoginMaxAttempts, cfg.LoginLockoutMin, cfg.SessionDurationH)

	// Handlers (adapters)
	postHandler := handler.NewPostHandler(postPublicUC, postAdminUC)
	metricsHandler := handler.NewMetricsHandler(metricsUC)
	authHandler := handler.NewAuthHandler(authUC, cfg.SessionDurationH, cfg.CookieSecure, logger)

	// Router
	router := httpadapter.NewRouter(postHandler, metricsHandler, authHandler, authUC, cfg, logger)

	// Periodic session cleanup
	go func() {
		for {
			time.Sleep(1 * time.Hour)
			n, err := authRepo.DeleteExpiredSessions(context.Background())
			if err != nil {
				logger.Error("session cleanup failed", "error", err)
			} else if n > 0 {
				logger.Info("session cleanup completed", "deleted", n)
			}
		}
	}()

	addr := fmt.Sprintf(":%s", cfg.Port)
	logger.Info("server starting", "addr", addr)
	if err := http.ListenAndServe(addr, router); err != nil {
		logger.Error("server failed", "error", err)
		os.Exit(1)
	}
}
