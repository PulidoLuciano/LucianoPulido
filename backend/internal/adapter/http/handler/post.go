package handler

import (
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"net"
	"net/http"
	"strconv"

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

	page := 1
	if p := r.URL.Query().Get("page"); p != "" {
		if parsed, err := strconv.Atoi(p); err == nil && parsed > 0 {
			page = parsed
		}
	}

	perPage := 10
	if pp := r.URL.Query().Get("per_page"); pp != "" {
		if parsed, err := strconv.Atoi(pp); err == nil && parsed > 0 {
			perPage = parsed
		}
	}

	input := usecase.GetPostsInput{
		Lang:         lang,
		CategorySlug: categorySlug,
		Page:         page,
		PerPage:      perPage,
	}

	output, err := h.publicUC.GetPosts(r.Context(), input)
	if err != nil {
		writeError(w, mapErrorStatus(err))
		return
	}

	writeJSON(w, http.StatusOK, output)
}

func (h *PostHandler) GetAdminPosts(w http.ResponseWriter, r *http.Request) {
	lang := r.URL.Query().Get("lang")
	if lang == "" {
		http.Error(w, `{"error":"lang query parameter is required"}`, http.StatusBadRequest)
		return
	}

	page := 1
	if p := r.URL.Query().Get("page"); p != "" {
		if parsed, err := strconv.Atoi(p); err == nil && parsed > 0 {
			page = parsed
		}
	}

	perPage := 10
	if pp := r.URL.Query().Get("per_page"); pp != "" {
		if parsed, err := strconv.Atoi(pp); err == nil && parsed > 0 {
			perPage = parsed
		}
	}

	input := usecase.AdminGetPostsInput{
		Lang:    lang,
		Page:    page,
		PerPage: perPage,
	}

	output, err := h.adminUC.GetPosts(r.Context(), input)
	if err != nil {
		writeError(w, mapErrorStatus(err))
		return
	}

	writeJSON(w, http.StatusOK, output)
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

func (h *PostHandler) GetAdminPost(w http.ResponseWriter, r *http.Request) {
	id, err := parseIDParam(r, "id")
	if err != nil {
		http.Error(w, `{"error":"invalid post id"}`, http.StatusBadRequest)
		return
	}

	post, err := h.adminUC.GetPost(r.Context(), id)
	if err != nil {
		writeError(w, mapErrorStatus(err))
		return
	}

	writeJSON(w, http.StatusOK, post)
}

func (h *PostHandler) CreatePost(w http.ResponseWriter, r *http.Request) {
	r.Body = http.MaxBytesReader(nil, r.Body, 1<<20)
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

	r.Body = http.MaxBytesReader(nil, r.Body, 1<<20)
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
	case err == domain.ErrAccountLocked:
		return http.StatusTooManyRequests
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
	sum := sha256.Sum256([]byte(ip))
	return base64.RawURLEncoding.EncodeToString(sum[:16])
}
