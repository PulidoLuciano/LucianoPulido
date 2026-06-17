package handler_test

import (
	"bytes"
	"encoding/json"
	"log/slog"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"golang.org/x/crypto/bcrypt"

	"github.com/PulidoLuciano/LucianoPulido.git/internal/adapter/http/handler"
	"github.com/PulidoLuciano/LucianoPulido.git/internal/domain"
	"github.com/PulidoLuciano/LucianoPulido.git/internal/usecase"
	"github.com/PulidoLuciano/LucianoPulido.git/internal/usecase/testutil"
)

func testLogger() *slog.Logger {
	return slog.New(slog.NewTextHandler(os.Stderr, &slog.HandlerOptions{Level: slog.LevelError}))
}

func TestAuthHandler_Login(t *testing.T) {
	ctx := mock.Anything
	passwordHash, _ := bcrypt.GenerateFromPassword([]byte("correct-password"), 4)

	t.Run("returns 200 with Set-Cookie on success", func(t *testing.T) {
		mockRepo := new(testutil.MockAuthRepository)
		uc := usecase.NewAuthUseCase(mockRepo, 4, 5, 15, 24)
		h := handler.NewAuthHandler(uc, 24, false, testLogger())

		mockRepo.On("IsAccountLocked", ctx, "admin@test.com", 5, 15).Return(false, nil)
		mockRepo.On("GetAdminByEmail", ctx, "admin@test.com").
			Return(&domain.Admin{ID: 1, Email: "admin@test.com", PasswordHash: string(passwordHash)}, nil)
		mockRepo.On("DeleteSessionsByAdmin", ctx, int64(1)).Return(nil)
		mockRepo.On("CreateSession", ctx, int64(1), 24).
			Return(&domain.Session{Token: "session-token-123"}, nil)

		body := bytes.NewBufferString(`{"email":"admin@test.com","password":"correct-password"}`)
		req := httptest.NewRequest("POST", "/api/admin/login", body)
		w := httptest.NewRecorder()

		h.Login(w, req)

		require.Equal(t, http.StatusOK, w.Code)

		var resp map[string]string
		json.NewDecoder(w.Body).Decode(&resp)
		assert.Equal(t, "authenticated", resp["status"])

		cookies := w.Result().Cookies()
		require.Len(t, cookies, 1)
		assert.Equal(t, "session_token", cookies[0].Name)
		assert.Equal(t, "session-token-123", cookies[0].Value)
		assert.True(t, cookies[0].HttpOnly)
		mockRepo.AssertExpectations(t)
	})

	t.Run("returns 400 for invalid JSON", func(t *testing.T) {
		uc := usecase.NewAuthUseCase(new(testutil.MockAuthRepository), 4, 5, 15, 24)
		h := handler.NewAuthHandler(uc, 24, false, testLogger())

		body := bytes.NewBufferString(`not json`)
		req := httptest.NewRequest("POST", "/api/admin/login", body)
		w := httptest.NewRecorder()

		h.Login(w, req)

		assert.Equal(t, http.StatusBadRequest, w.Code)
	})

	t.Run("returns 400 for empty email", func(t *testing.T) {
		uc := usecase.NewAuthUseCase(new(testutil.MockAuthRepository), 4, 5, 15, 24)
		h := handler.NewAuthHandler(uc, 24, false, testLogger())

		body := bytes.NewBufferString(`{"email":"","password":"test"}`)
		req := httptest.NewRequest("POST", "/api/admin/login", body)
		w := httptest.NewRecorder()

		h.Login(w, req)

		assert.Equal(t, http.StatusBadRequest, w.Code)
	})

	t.Run("returns 401 for wrong credentials", func(t *testing.T) {
		mockRepo := new(testutil.MockAuthRepository)
		uc := usecase.NewAuthUseCase(mockRepo, 4, 5, 15, 24)
		h := handler.NewAuthHandler(uc, 24, false, testLogger())

		mockRepo.On("IsAccountLocked", ctx, "admin@test.com", 5, 15).Return(false, nil)
		mockRepo.On("GetAdminByEmail", ctx, "admin@test.com").
			Return(&domain.Admin{ID: 1, PasswordHash: string(passwordHash)}, nil)
		mockRepo.On("RecordLoginAttempt", ctx, "admin@test.com").Return(nil)

		body := bytes.NewBufferString(`{"email":"admin@test.com","password":"wrong"}`)
		req := httptest.NewRequest("POST", "/api/admin/login", body)
		w := httptest.NewRecorder()

		h.Login(w, req)

		assert.Equal(t, http.StatusUnauthorized, w.Code)
		mockRepo.AssertExpectations(t)
	})

	t.Run("returns 429 when account locked", func(t *testing.T) {
		mockRepo := new(testutil.MockAuthRepository)
		uc := usecase.NewAuthUseCase(mockRepo, 4, 5, 15, 24)
		h := handler.NewAuthHandler(uc, 24, false, testLogger())

		mockRepo.On("IsAccountLocked", ctx, "admin@test.com", 5, 15).Return(true, nil)

		body := bytes.NewBufferString(`{"email":"admin@test.com","password":"test"}`)
		req := httptest.NewRequest("POST", "/api/admin/login", body)
		w := httptest.NewRecorder()

		h.Login(w, req)

		assert.Equal(t, http.StatusTooManyRequests, w.Code)
		mockRepo.AssertExpectations(t)
	})
}

func TestAuthHandler_Logout(t *testing.T) {
	t.Run("returns 200 and clears cookie", func(t *testing.T) {
		mockRepo := new(testutil.MockAuthRepository)
		uc := usecase.NewAuthUseCase(mockRepo, 4, 5, 15, 24)
		h := handler.NewAuthHandler(uc, 24, false, testLogger())

		mockRepo.On("DeleteSession", mock.Anything, "existing-token").Return(nil)

		req := httptest.NewRequest("POST", "/api/admin/logout", nil)
		req.AddCookie(&http.Cookie{Name: "session_token", Value: "existing-token"})
		w := httptest.NewRecorder()

		h.Logout(w, req)

		assert.Equal(t, http.StatusOK, w.Code)

		var resp map[string]string
		json.NewDecoder(w.Body).Decode(&resp)
		assert.Equal(t, "logged_out", resp["status"])

		cookies := w.Result().Cookies()
		require.Len(t, cookies, 1)
		assert.Equal(t, "session_token", cookies[0].Name)
		assert.Equal(t, "", cookies[0].Value)
		assert.Equal(t, -1, cookies[0].MaxAge)
		mockRepo.AssertExpectations(t)
	})

	t.Run("returns 200 even without cookie", func(t *testing.T) {
		uc := usecase.NewAuthUseCase(new(testutil.MockAuthRepository), 4, 5, 15, 24)
		h := handler.NewAuthHandler(uc, 24, false, testLogger())

		req := httptest.NewRequest("POST", "/api/admin/logout", nil)
		w := httptest.NewRecorder()

		h.Logout(w, req)

		assert.Equal(t, http.StatusOK, w.Code)
	})
}
