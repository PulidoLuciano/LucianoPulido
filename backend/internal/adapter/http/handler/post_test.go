package handler_test

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"

	"github.com/PulidoLuciano/LucianoPulido.git/internal/adapter/http/handler"
	"github.com/PulidoLuciano/LucianoPulido.git/internal/domain"
	"github.com/PulidoLuciano/LucianoPulido.git/internal/usecase"
	"github.com/PulidoLuciano/LucianoPulido.git/internal/usecase/testutil"
)

func TestPostHandler_CreatePost(t *testing.T) {
	t.Run("returns 201 on success", func(t *testing.T) {
		mockRepo := new(testutil.MockPostRepository)
		uc := usecase.NewPostAdminUseCase(mockRepo)
		h := handler.NewPostHandler(nil, uc, nil)

		mockRepo.On("Create", mock.Anything, mock.Anything, mock.Anything, mock.Anything).
			Return(&domain.Post{ID: 1, Slug: "new-post"}, nil)

		body := bytes.NewBufferString(`{"slug":"new-post","translations":{"en":{"title":"New","content":"Content"}}}`)
		req := httptest.NewRequest("POST", "/api/admin/posts", body)
		w := httptest.NewRecorder()

		h.CreatePost(w, req)

		require.Equal(t, http.StatusCreated, w.Code)
		var output usecase.CreatePostOutput
		json.NewDecoder(w.Body).Decode(&output)
		assert.Equal(t, "new-post", output.Slug)
		mockRepo.AssertExpectations(t)
	})

	t.Run("returns 400 for empty slug", func(t *testing.T) {
		h := handler.NewPostHandler(nil, usecase.NewPostAdminUseCase(new(testutil.MockPostRepository)), nil)

		body := bytes.NewBufferString(`{"slug":"","translations":{"en":{"title":"Test","content":"Test"}}}`)
		req := httptest.NewRequest("POST", "/api/admin/posts", body)
		w := httptest.NewRecorder()

		h.CreatePost(w, req)

		assert.Equal(t, http.StatusBadRequest, w.Code)
	})

	t.Run("returns 400 for empty translations", func(t *testing.T) {
		h := handler.NewPostHandler(nil, usecase.NewPostAdminUseCase(new(testutil.MockPostRepository)), nil)

		body := bytes.NewBufferString(`{"slug":"test","translations":{}}`)
		req := httptest.NewRequest("POST", "/api/admin/posts", body)
		w := httptest.NewRecorder()

		h.CreatePost(w, req)

		assert.Equal(t, http.StatusBadRequest, w.Code)
	})

	t.Run("returns 400 for invalid JSON", func(t *testing.T) {
		h := handler.NewPostHandler(nil, usecase.NewPostAdminUseCase(new(testutil.MockPostRepository)), nil)

		body := bytes.NewBufferString(`not json`)
		req := httptest.NewRequest("POST", "/api/admin/posts", body)
		w := httptest.NewRecorder()

		h.CreatePost(w, req)

		assert.Equal(t, http.StatusBadRequest, w.Code)
	})

	t.Run("returns 409 for duplicate slug", func(t *testing.T) {
		mockRepo := new(testutil.MockPostRepository)
		uc := usecase.NewPostAdminUseCase(mockRepo)
		h := handler.NewPostHandler(nil, uc, nil)

		mockRepo.On("Create", mock.Anything, mock.Anything, mock.Anything, mock.Anything).
			Return((*domain.Post)(nil), domain.ErrConflict)

		body := bytes.NewBufferString(`{"slug":"existing","translations":{"en":{"title":"Test","content":"Test"}}}`)
		req := httptest.NewRequest("POST", "/api/admin/posts", body)
		w := httptest.NewRecorder()

		h.CreatePost(w, req)

		assert.Equal(t, http.StatusConflict, w.Code)
		mockRepo.AssertExpectations(t)
	})
}

func TestPostHandler_UpdatePost(t *testing.T) {
	t.Run("returns 200 on success", func(t *testing.T) {
		mockRepo := new(testutil.MockPostRepository)
		uc := usecase.NewPostAdminUseCase(mockRepo)
		h := handler.NewPostHandler(nil, uc, nil)

		mockRepo.On("Update", mock.Anything, mock.Anything, mock.Anything, mock.Anything).Return(nil)

		body := bytes.NewBufferString(`{"slug":"updated","translations":{"en":{"title":"Updated","content":"Content"}}}`)
		req := httptest.NewRequest("PUT", "/api/admin/posts/1", body)
		req.SetPathValue("id", "1")
		w := httptest.NewRecorder()

		h.UpdatePost(w, req)

		assert.Equal(t, http.StatusOK, w.Code)
		mockRepo.AssertExpectations(t)
	})

	t.Run("returns 400 for invalid id", func(t *testing.T) {
		h := handler.NewPostHandler(nil, usecase.NewPostAdminUseCase(new(testutil.MockPostRepository)), nil)

		body := bytes.NewBufferString(`{"slug":"test","translations":{"en":{"title":"Test","content":"Test"}}}`)
		req := httptest.NewRequest("PUT", "/api/admin/posts/abc", body)
		req.SetPathValue("id", "abc")
		w := httptest.NewRecorder()

		h.UpdatePost(w, req)

		assert.Equal(t, http.StatusBadRequest, w.Code)
	})

	t.Run("returns 409 for duplicate slug", func(t *testing.T) {
		mockRepo := new(testutil.MockPostRepository)
		uc := usecase.NewPostAdminUseCase(mockRepo)
		h := handler.NewPostHandler(nil, uc, nil)

		mockRepo.On("Update", mock.Anything, mock.Anything, mock.Anything, mock.Anything).
			Return(domain.ErrConflict)

		body := bytes.NewBufferString(`{"slug":"existing","translations":{"en":{"title":"Test","content":"Test"}}}`)
		req := httptest.NewRequest("PUT", "/api/admin/posts/1", body)
		req.SetPathValue("id", "1")
		w := httptest.NewRecorder()

		h.UpdatePost(w, req)

		assert.Equal(t, http.StatusConflict, w.Code)
		mockRepo.AssertExpectations(t)
	})
}

func TestPostHandler_DeletePost(t *testing.T) {
	t.Run("returns 204 on success", func(t *testing.T) {
		mockRepo := new(testutil.MockPostRepository)
		uc := usecase.NewPostAdminUseCase(mockRepo)
		h := handler.NewPostHandler(nil, uc, nil)

		mockRepo.On("Delete", mock.Anything, int64(1)).Return(nil)

		req := httptest.NewRequest("DELETE", "/api/admin/posts/1", nil)
		req.SetPathValue("id", "1")
		w := httptest.NewRecorder()

		h.DeletePost(w, req)

		assert.Equal(t, http.StatusNoContent, w.Code)
		mockRepo.AssertExpectations(t)
	})

	t.Run("returns 400 for invalid id", func(t *testing.T) {
		h := handler.NewPostHandler(nil, usecase.NewPostAdminUseCase(new(testutil.MockPostRepository)), nil)

		req := httptest.NewRequest("DELETE", "/api/admin/posts/abc", nil)
		req.SetPathValue("id", "abc")
		w := httptest.NewRecorder()

		h.DeletePost(w, req)

		assert.Equal(t, http.StatusBadRequest, w.Code)
	})

	t.Run("returns 404 when not found", func(t *testing.T) {
		mockRepo := new(testutil.MockPostRepository)
		uc := usecase.NewPostAdminUseCase(mockRepo)
		h := handler.NewPostHandler(nil, uc, nil)

		mockRepo.On("Delete", mock.Anything, int64(999)).Return(domain.ErrNotFound)

		req := httptest.NewRequest("DELETE", "/api/admin/posts/999", nil)
		req.SetPathValue("id", "999")
		w := httptest.NewRecorder()

		h.DeletePost(w, req)

		assert.Equal(t, http.StatusNotFound, w.Code)
		mockRepo.AssertExpectations(t)
	})
}
