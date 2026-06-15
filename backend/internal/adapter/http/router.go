package httpadapter

import (
	"net/http"

	"github.com/PulidoLuciano/LucianoPulido.git/internal/adapter/http/handler"
	"github.com/PulidoLuciano/LucianoPulido.git/internal/adapter/http/middleware"
	"github.com/PulidoLuciano/LucianoPulido.git/internal/usecase"
)

func NewRouter(
	postHandler *handler.PostHandler,
	metricsHandler *handler.MetricsHandler,
	authHandler *handler.AuthHandler,
	authUC *usecase.AuthUseCase,
) http.Handler {
	mux := http.NewServeMux()

	// Public endpoints
	mux.HandleFunc("GET /api/posts", postHandler.GetPosts)
	mux.HandleFunc("GET /api/posts/{slug}", postHandler.GetPostBySlug)
	mux.HandleFunc("POST /api/posts/metrics/view", metricsHandler.InitializePostView)
	mux.HandleFunc("POST /api/posts/metrics/update", metricsHandler.UpdatePostMetrics)

	// Auth endpoints
	mux.HandleFunc("POST /api/admin/login", authHandler.Login)
	mux.HandleFunc("POST /api/admin/logout", authHandler.Logout)

	// Protected admin post endpoints
	protected := http.NewServeMux()
	protected.HandleFunc("POST /api/admin/posts", postHandler.CreatePost)
	protected.HandleFunc("PUT /api/admin/posts/{id}", postHandler.UpdatePost)
	protected.HandleFunc("DELETE /api/admin/posts/{id}", postHandler.DeletePost)

	mux.Handle("/api/admin/posts", middleware.AuthRequired(authUC)(protected))
	mux.Handle("/api/admin/posts/", middleware.AuthRequired(authUC)(protected))

	// Apply global middleware
	var h http.Handler = mux
	h = middleware.Logger(h)
	h = middleware.CORS(h)

	return h
}
