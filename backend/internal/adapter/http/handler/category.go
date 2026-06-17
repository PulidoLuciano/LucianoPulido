package handler

import (
	"encoding/json"
	"net/http"

	"github.com/PulidoLuciano/LucianoPulido.git/internal/usecase"
)

type CategoryHandler struct {
	adminUC  *usecase.CategoryAdminUseCase
	publicUC *usecase.CategoryPublicUseCase
}

func NewCategoryHandler(adminUC *usecase.CategoryAdminUseCase, publicUC *usecase.CategoryPublicUseCase) *CategoryHandler {
	return &CategoryHandler{adminUC: adminUC, publicUC: publicUC}
}

func (h *CategoryHandler) ListCategoriesPublic(w http.ResponseWriter, r *http.Request) {
	lang := r.URL.Query().Get("lang")
	if lang == "" {
		http.Error(w, `{"error":"lang query parameter is required"}`, http.StatusBadRequest)
		return
	}

	categories, err := h.publicUC.ListCategories(r.Context(), lang)
	if err != nil {
		writeError(w, mapErrorStatus(err))
		return
	}

	writeJSON(w, http.StatusOK, categories)
}

func (h *CategoryHandler) ListCategories(w http.ResponseWriter, r *http.Request) {
	categories, err := h.adminUC.ListCategories(r.Context())
	if err != nil {
		writeError(w, mapErrorStatus(err))
		return
	}

	writeJSON(w, http.StatusOK, categories)
}

func (h *CategoryHandler) GetCategory(w http.ResponseWriter, r *http.Request) {
	id, err := parseIDParam(r, "id")
	if err != nil {
		http.Error(w, `{"error":"invalid category id"}`, http.StatusBadRequest)
		return
	}

	category, err := h.adminUC.GetCategory(r.Context(), id)
	if err != nil {
		writeError(w, mapErrorStatus(err))
		return
	}

	writeJSON(w, http.StatusOK, category)
}

func (h *CategoryHandler) CreateCategory(w http.ResponseWriter, r *http.Request) {
	r.Body = http.MaxBytesReader(nil, r.Body, 1<<20)
	var input usecase.CreateCategoryInput
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, `{"error":"invalid request body"}`, http.StatusBadRequest)
		return
	}

	output, err := h.adminUC.CreateCategory(r.Context(), input)
	if err != nil {
		writeError(w, mapErrorStatus(err))
		return
	}

	writeJSON(w, http.StatusCreated, output)
}

func (h *CategoryHandler) UpdateCategory(w http.ResponseWriter, r *http.Request) {
	id, err := parseIDParam(r, "id")
	if err != nil {
		http.Error(w, `{"error":"invalid category id"}`, http.StatusBadRequest)
		return
	}

	r.Body = http.MaxBytesReader(nil, r.Body, 1<<20)
	var input usecase.CreateCategoryInput
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, `{"error":"invalid request body"}`, http.StatusBadRequest)
		return
	}

	if err := h.adminUC.UpdateCategory(r.Context(), id, input); err != nil {
		writeError(w, mapErrorStatus(err))
		return
	}

	w.WriteHeader(http.StatusOK)
}

func (h *CategoryHandler) DeleteCategory(w http.ResponseWriter, r *http.Request) {
	id, err := parseIDParam(r, "id")
	if err != nil {
		http.Error(w, `{"error":"invalid category id"}`, http.StatusBadRequest)
		return
	}

	if err := h.adminUC.DeleteCategory(r.Context(), id); err != nil {
		writeError(w, mapErrorStatus(err))
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
