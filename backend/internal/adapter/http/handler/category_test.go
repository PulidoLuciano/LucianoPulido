package handler_test

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"

	"github.com/PulidoLuciano/LucianoPulido.git/internal/adapter/http/handler"
	"github.com/PulidoLuciano/LucianoPulido.git/internal/domain"
	"github.com/PulidoLuciano/LucianoPulido.git/internal/usecase"
	"github.com/PulidoLuciano/LucianoPulido.git/internal/usecase/testutil"
)

func TestCategoryHandler_ListCategories(t *testing.T) {
	mockRepo := new(testutil.MockCategoryRepository)
	uc := usecase.NewCategoryAdminUseCase(mockRepo)
	h := handler.NewCategoryHandler(uc)

	mockRepo.On("List", mock.Anything).Return(
		[]domain.Category{
			{ID: 1, Slug: "go-backend", CreatedAt: time.Now()},
		},
		[]domain.CategoryTranslation{
			{ID: 1, CategoryID: 1, LanguageCode: "en", Name: "Go Backend"},
			{ID: 2, CategoryID: 1, LanguageCode: "es", Name: "Backend en Go"},
		},
		nil,
	)

	req := httptest.NewRequest("GET", "/api/admin/categories", nil)
	w := httptest.NewRecorder()

	h.ListCategories(w, req)

	require.Equal(t, http.StatusOK, w.Code)

	var output []usecase.CategoryOutput
	json.NewDecoder(w.Body).Decode(&output)
	require.Len(t, output, 1)
	assert.Equal(t, "go-backend", output[0].Slug)
	assert.Len(t, output[0].Translations, 2)
	mockRepo.AssertExpectations(t)
}

func TestCategoryHandler_GetCategory(t *testing.T) {
	mockRepo := new(testutil.MockCategoryRepository)
	uc := usecase.NewCategoryAdminUseCase(mockRepo)
	h := handler.NewCategoryHandler(uc)

	t.Run("returns 200 for existing category", func(t *testing.T) {
		mockRepo.On("GetByID", mock.Anything, int64(1)).Return(
			&domain.Category{ID: 1, Slug: "go-backend", CreatedAt: time.Now()},
			[]domain.CategoryTranslation{
				{ID: 1, CategoryID: 1, LanguageCode: "en", Name: "Go Backend"},
			},
			nil,
		)

		req := httptest.NewRequest("GET", "/api/admin/categories/1", nil)
		req.SetPathValue("id", "1")
		w := httptest.NewRecorder()

		h.GetCategory(w, req)

		require.Equal(t, http.StatusOK, w.Code)
		var output usecase.CategoryOutput
		json.NewDecoder(w.Body).Decode(&output)
		assert.Equal(t, int64(1), output.ID)
		mockRepo.AssertExpectations(t)
	})

	t.Run("returns 404 for missing category", func(t *testing.T) {
		mockRepo := new(testutil.MockCategoryRepository)
		uc := usecase.NewCategoryAdminUseCase(mockRepo)
		h := handler.NewCategoryHandler(uc)

		mockRepo.On("GetByID", mock.Anything, int64(999)).Return(
			(*domain.Category)(nil),
			[]domain.CategoryTranslation(nil),
			domain.ErrNotFound,
		)

		req := httptest.NewRequest("GET", "/api/admin/categories/999", nil)
		req.SetPathValue("id", "999")
		w := httptest.NewRecorder()

		h.GetCategory(w, req)

		assert.Equal(t, http.StatusNotFound, w.Code)
		mockRepo.AssertExpectations(t)
	})

	t.Run("returns 400 for invalid id", func(t *testing.T) {
		h := handler.NewCategoryHandler(usecase.NewCategoryAdminUseCase(new(testutil.MockCategoryRepository)))

		req := httptest.NewRequest("GET", "/api/admin/categories/abc", nil)
		req.SetPathValue("id", "abc")
		w := httptest.NewRecorder()

		h.GetCategory(w, req)

		assert.Equal(t, http.StatusBadRequest, w.Code)
	})
}

func TestCategoryHandler_CreateCategory(t *testing.T) {
	mockRepo := new(testutil.MockCategoryRepository)
	uc := usecase.NewCategoryAdminUseCase(mockRepo)
	h := handler.NewCategoryHandler(uc)

	t.Run("returns 201 on success", func(t *testing.T) {
		mockRepo.On("Create", mock.Anything, mock.Anything, mock.Anything).
			Return(&domain.Category{ID: 1, Slug: "new-cat", CreatedAt: time.Now()}, nil)

		body := bytes.NewBufferString(`{"slug":"new-cat","translations":{"en":{"name":"New Category"},"es":{"name":"Nueva Categoría"}}}`)
		req := httptest.NewRequest("POST", "/api/admin/categories", body)
		w := httptest.NewRecorder()

		h.CreateCategory(w, req)

		require.Equal(t, http.StatusCreated, w.Code)
		var output usecase.CategoryOutput
		json.NewDecoder(w.Body).Decode(&output)
		assert.Equal(t, "new-cat", output.Slug)
		mockRepo.AssertExpectations(t)
	})

	t.Run("returns 400 for empty slug", func(t *testing.T) {
		mockRepo := new(testutil.MockCategoryRepository)
		uc := usecase.NewCategoryAdminUseCase(mockRepo)
		h := handler.NewCategoryHandler(uc)

		body := bytes.NewBufferString(`{"slug":"","translations":{"en":{"name":"Test"}}}`)
		req := httptest.NewRequest("POST", "/api/admin/categories", body)
		w := httptest.NewRecorder()

		h.CreateCategory(w, req)

		assert.Equal(t, http.StatusBadRequest, w.Code)
	})

	t.Run("returns 400 for invalid JSON", func(t *testing.T) {
		h := handler.NewCategoryHandler(usecase.NewCategoryAdminUseCase(new(testutil.MockCategoryRepository)))

		body := bytes.NewBufferString(`not json`)
		req := httptest.NewRequest("POST", "/api/admin/categories", body)
		w := httptest.NewRecorder()

		h.CreateCategory(w, req)

		assert.Equal(t, http.StatusBadRequest, w.Code)
	})

	t.Run("returns 409 for duplicate slug", func(t *testing.T) {
		mockRepo := new(testutil.MockCategoryRepository)
		uc := usecase.NewCategoryAdminUseCase(mockRepo)
		h := handler.NewCategoryHandler(uc)

		mockRepo.On("Create", mock.Anything, mock.Anything, mock.Anything).
			Return((*domain.Category)(nil), domain.ErrConflict)

		body := bytes.NewBufferString(`{"slug":"existing-slug","translations":{"en":{"name":"Duplicate"}}}`)
		req := httptest.NewRequest("POST", "/api/admin/categories", body)
		w := httptest.NewRecorder()

		h.CreateCategory(w, req)

		assert.Equal(t, http.StatusConflict, w.Code)
		mockRepo.AssertExpectations(t)
	})
}

func TestCategoryHandler_UpdateCategory(t *testing.T) {
	t.Run("returns 200 on success", func(t *testing.T) {
		mockRepo := new(testutil.MockCategoryRepository)
		uc := usecase.NewCategoryAdminUseCase(mockRepo)
		h := handler.NewCategoryHandler(uc)

		mockRepo.On("Update", mock.Anything, mock.Anything, mock.Anything).Return(nil)

		body := bytes.NewBufferString(`{"slug":"updated","translations":{"en":{"name":"Updated"}}}`)
		req := httptest.NewRequest("PUT", "/api/admin/categories/1", body)
		req.SetPathValue("id", "1")
		w := httptest.NewRecorder()

		h.UpdateCategory(w, req)

		assert.Equal(t, http.StatusOK, w.Code)
		mockRepo.AssertExpectations(t)
	})

	t.Run("returns 400 for invalid id", func(t *testing.T) {
		h := handler.NewCategoryHandler(usecase.NewCategoryAdminUseCase(new(testutil.MockCategoryRepository)))

		body := bytes.NewBufferString(`{"slug":"test","translations":{"en":{"name":"Test"}}}`)
		req := httptest.NewRequest("PUT", "/api/admin/categories/abc", body)
		req.SetPathValue("id", "abc")
		w := httptest.NewRecorder()

		h.UpdateCategory(w, req)

		assert.Equal(t, http.StatusBadRequest, w.Code)
	})

	t.Run("returns 400 for empty slug", func(t *testing.T) {
		h := handler.NewCategoryHandler(usecase.NewCategoryAdminUseCase(new(testutil.MockCategoryRepository)))

		body := bytes.NewBufferString(`{"slug":"","translations":{"en":{"name":"Test"}}}`)
		req := httptest.NewRequest("PUT", "/api/admin/categories/1", body)
		req.SetPathValue("id", "1")
		w := httptest.NewRecorder()

		h.UpdateCategory(w, req)

		assert.Equal(t, http.StatusBadRequest, w.Code)
	})

	t.Run("returns 409 for duplicate slug", func(t *testing.T) {
		mockRepo := new(testutil.MockCategoryRepository)
		uc := usecase.NewCategoryAdminUseCase(mockRepo)
		h := handler.NewCategoryHandler(uc)

		mockRepo.On("Update", mock.Anything, mock.Anything, mock.Anything).
			Return(domain.ErrConflict)

		body := bytes.NewBufferString(`{"slug":"existing-slug","translations":{"en":{"name":"Duplicate"}}}`)
		req := httptest.NewRequest("PUT", "/api/admin/categories/1", body)
		req.SetPathValue("id", "1")
		w := httptest.NewRecorder()

		h.UpdateCategory(w, req)

		assert.Equal(t, http.StatusConflict, w.Code)
		mockRepo.AssertExpectations(t)
	})
}

func TestCategoryHandler_DeleteCategory(t *testing.T) {
	t.Run("returns 204 on success", func(t *testing.T) {
		mockRepo := new(testutil.MockCategoryRepository)
		uc := usecase.NewCategoryAdminUseCase(mockRepo)
		h := handler.NewCategoryHandler(uc)

		mockRepo.On("Delete", mock.Anything, int64(1)).Return(nil)

		req := httptest.NewRequest("DELETE", "/api/admin/categories/1", nil)
		req.SetPathValue("id", "1")
		w := httptest.NewRecorder()

		h.DeleteCategory(w, req)

		assert.Equal(t, http.StatusNoContent, w.Code)
		mockRepo.AssertExpectations(t)
	})

	t.Run("returns 404 when not found", func(t *testing.T) {
		mockRepo := new(testutil.MockCategoryRepository)
		uc := usecase.NewCategoryAdminUseCase(mockRepo)
		h := handler.NewCategoryHandler(uc)

		mockRepo.On("Delete", mock.Anything, int64(999)).Return(domain.ErrNotFound)

		req := httptest.NewRequest("DELETE", "/api/admin/categories/999", nil)
		req.SetPathValue("id", "999")
		w := httptest.NewRecorder()

		h.DeleteCategory(w, req)

		assert.Equal(t, http.StatusNotFound, w.Code)
		mockRepo.AssertExpectations(t)
	})

	t.Run("returns 400 for invalid id", func(t *testing.T) {
		h := handler.NewCategoryHandler(usecase.NewCategoryAdminUseCase(new(testutil.MockCategoryRepository)))

		req := httptest.NewRequest("DELETE", "/api/admin/categories/abc", nil)
		req.SetPathValue("id", "abc")
		w := httptest.NewRecorder()

		h.DeleteCategory(w, req)

		assert.Equal(t, http.StatusBadRequest, w.Code)
	})
}
