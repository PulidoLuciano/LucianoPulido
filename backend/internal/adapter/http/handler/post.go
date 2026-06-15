package handler

import (
	"encoding/json"
	"net"
	"net/http"
	"strings"

	"github.com/PulidoLuciano/LucianoPulido.git/internal/domain"
	"github.com/PulidoLuciano/LucianoPulido.git/internal/usecase"
)

type PostHandler struct {
	publicUC *usecase.PostPublicUseCase
	adminUC  *usecase.PostAdminUseCase
}

func NewPostHandler(publicUC *usecase.PostPublicUseCase, adminUC *usecase.PostAdminUseCase) *PostHandler {
	return &PostHandler{publicUC: publicUC, adminUC: adminUC}
}

func (h *PostHandler) GetPosts(w http.ResponseWriter, r *http.Request) {
	lang := r.URL.Query().Get("lang")
	if lang == "" {
		http.Error(w, `{"error":"lang query parameter is required"}`, http.StatusBadRequest)
		return
	}

	var categorySlug *string
	if cat := r.URL.Query().Get("category"); cat != "" {
		categorySlug = &cat
	}

	input := usecase.GetPostsInput{
		Lang:         lang,
		CategorySlug: categorySlug,
	}

	posts, err := h.publicUC.GetPosts(r.Context(), input)
	if err != nil {
		writeError(w, mapErrorStatus(err))
		return
	}

	writeJSON(w, http.StatusOK, posts)
}

func (h *PostHandler) GetPostBySlug(w http.ResponseWriter, r *http.Request) {
	slug := r.PathValue("slug")
	lang := r.URL.Query().Get("lang")
	if lang == "" {
		http.Error(w, `{"error":"lang query parameter is required"}`, http.StatusBadRequest)
		return
	}

	countryCode, city, visitorHash := extractVisitorInfo(r)
	input := usecase.GetPostBySlugInput{
		Slug:        slug,
		Lang:        lang,
		CountryCode: countryCode,
		City:        city,
		VisitorHash: visitorHash,
	}

	post, err := h.publicUC.GetPostBySlug(r.Context(), input)
	if err != nil {
		writeError(w, mapErrorStatus(err))
		return
	}

	writeJSON(w, http.StatusOK, post)
}

func (h *PostHandler) CreatePost(w http.ResponseWriter, r *http.Request) {
	var input usecase.CreatePostInput
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, `{"error":"invalid request body"}`, http.StatusBadRequest)
		return
	}

	output, err := h.adminUC.CreatePost(r.Context(), input)
	if err != nil {
		writeError(w, mapErrorStatus(err))
		return
	}

	writeJSON(w, http.StatusCreated, output)
}

func (h *PostHandler) UpdatePost(w http.ResponseWriter, r *http.Request) {
	id, err := parseIDParam(r, "id")
	if err != nil {
		http.Error(w, `{"error":"invalid post id"}`, http.StatusBadRequest)
		return
	}

	var input usecase.CreatePostInput
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, `{"error":"invalid request body"}`, http.StatusBadRequest)
		return
	}

	if err := h.adminUC.UpdatePost(r.Context(), id, input); err != nil {
		writeError(w, mapErrorStatus(err))
		return
	}

	w.WriteHeader(http.StatusOK)
}

func (h *PostHandler) DeletePost(w http.ResponseWriter, r *http.Request) {
	id, err := parseIDParam(r, "id")
	if err != nil {
		http.Error(w, `{"error":"invalid post id"}`, http.StatusBadRequest)
		return
	}

	if err := h.adminUC.DeletePost(r.Context(), id); err != nil {
		writeError(w, mapErrorStatus(err))
		return
	}

	w.WriteHeader(http.StatusNoContent)
}

func mapErrorStatus(err error) int {
	switch {
	case err == domain.ErrNotFound:
		return http.StatusNotFound
	case err == domain.ErrUnauthorized:
		return http.StatusUnauthorized
	case err == domain.ErrInvalidInput:
		return http.StatusBadRequest
	case err == domain.ErrConflict:
		return http.StatusConflict
	default:
		return http.StatusInternalServerError
	}
}

func extractVisitorInfo(r *http.Request) (countryCode, city, visitorHash string) {
	ipStr, _, _ := net.SplitHostPort(r.RemoteAddr)
	visitorHash = hashIP(ipStr)
	return "", "", visitorHash
}

func hashIP(ip string) string {
	// Simple deterministic hash for anonymous visitor tracking
	h := 0
	for _, c := range ip {
		h = 31*h + int(c)
	}
	if h < 0 {
		h = -h
	}
	return strings.Repeat("0", 8-len(intToStr(h))) + intToStr(h)
}

func intToStr(n int) string {
	if n == 0 {
		return "0"
	}
	s := ""
	for n > 0 {
		s = string(rune('0'+n%10)) + s
		n /= 10
	}
	return s
}
