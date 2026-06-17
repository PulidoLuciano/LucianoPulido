package testutil

import (
	"log/slog"
	"net/http"
	"os"

	httpadapter "github.com/PulidoLuciano/LucianoPulido.git/internal/adapter/http"
	"github.com/PulidoLuciano/LucianoPulido.git/internal/adapter/http/handler"
	"github.com/PulidoLuciano/LucianoPulido.git/internal/config"
	"github.com/PulidoLuciano/LucianoPulido.git/internal/usecase"
)

func SetupTestRouter(
	postHandler *handler.PostHandler,
	categoryHandler *handler.CategoryHandler,
	authUC *usecase.AuthUseCase,
) http.Handler {
	cfg := &config.Config{
		Port:              "8080",
		CORSOrigins:       []string{"*"},
		RateLimitRequests: 100,
		RateLimitWindowS:  60,
	}
	logger := slog.New(slog.NewTextHandler(os.Stderr, &slog.HandlerOptions{Level: slog.LevelError}))

	dummyMetricsHandler := &handler.MetricsHandler{}
	dummyAuthHandler := &handler.AuthHandler{}

	return httpadapter.NewRouter(postHandler, dummyMetricsHandler, dummyAuthHandler, categoryHandler, authUC, cfg, logger)
}
