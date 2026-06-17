package httpadapter

import (
	"log/slog"
	"net/http"

	"github.com/PulidoLuciano/LucianoPulido.git/internal/adapter/http/handler"
	"github.com/PulidoLuciano/LucianoPulido.git/internal/adapter/http/middleware"
	"github.com/PulidoLuciano/LucianoPulido.git/internal/config"
	"github.com/PulidoLuciano/LucianoPulido.git/internal/usecase"
)

func NewRouter(
	postHandler *handler.PostHandler,
	metricsHandler *handler.MetricsHandler,
	authHandler *handler.AuthHandler,
	categoryHandler *handler.CategoryHandler,
	authUC *usecase.AuthUseCase,
	cfg *config.Config,
	logger *slog.Logger,
) http.Handler {
	mux := http.NewServeMux()

	// Public endpoints
	mux.HandleFunc("GET /api/posts", postHandler.GetPosts)
	mux.HandleFunc("GET /api/posts/{slug}", postHandler.GetPostBySlug)
	mux.HandleFunc("POST /api/posts/metrics/view", metricsHandler.InitializePostView)
	mux.HandleFunc("POST /api/posts/metrics/update", metricsHandler.UpdatePostMetrics)

	// Auth endpoints — login is rate-limited
	mux.Handle("POST /api/admin/login",
		middleware.RateLimit(cfg.RateLimitRequests, cfg.RateLimitWindowS, logger)(
			http.HandlerFunc(authHandler.Login),
		),
	)
	mux.HandleFunc("POST /api/admin/logout", authHandler.Logout)

	// Protected admin post endpoints
	protected := http.NewServeMux()
	protected.HandleFunc("POST /api/admin/posts", postHandler.CreatePost)
	protected.HandleFunc("PUT /api/admin/posts/{id}", postHandler.UpdatePost)
	protected.HandleFunc("DELETE /api/admin/posts/{id}", postHandler.DeletePost)

	mux.Handle("/api/admin/posts", middleware.AuthRequired(authUC, logger)(protected))
	mux.Handle("/api/admin/posts/", middleware.AuthRequired(authUC, logger)(protected))

	// Protected admin category endpoints
	adminCategories := http.NewServeMux()
	adminCategories.HandleFunc("GET /api/admin/categories", categoryHandler.ListCategories)
	adminCategories.HandleFunc("GET /api/admin/categories/{id}", categoryHandler.GetCategory)
	adminCategories.HandleFunc("POST /api/admin/categories", categoryHandler.CreateCategory)
	adminCategories.HandleFunc("PUT /api/admin/categories/{id}", categoryHandler.UpdateCategory)
	adminCategories.HandleFunc("DELETE /api/admin/categories/{id}", categoryHandler.DeleteCategory)

	mux.Handle("/api/admin/categories", middleware.AuthRequired(authUC, logger)(adminCategories))
	mux.Handle("/api/admin/categories/", middleware.AuthRequired(authUC, logger)(adminCategories))

	// Apply global middleware
	var h http.Handler = mux
	h = middleware.SecurityHeaders(h)
	h = middleware.Logger(logger)(h)
	h = middleware.CORS(cfg.CORSOrigins)(h)

	return h
}
