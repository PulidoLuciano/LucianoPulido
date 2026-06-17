package usecase_test

import (
	"context"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"golang.org/x/crypto/bcrypt"

	"github.com/PulidoLuciano/LucianoPulido.git/internal/domain"
	"github.com/PulidoLuciano/LucianoPulido.git/internal/usecase"
	"github.com/PulidoLuciano/LucianoPulido.git/internal/usecase/testutil"
)

func TestAuthUseCase_Login(t *testing.T) {
	ctx := context.Background()
	passwordHash, _ := bcrypt.GenerateFromPassword([]byte("correct-password"), 4)

	t.Run("logs in successfully", func(t *testing.T) {
		mockRepo := new(testutil.MockAuthRepository)
		uc := usecase.NewAuthUseCase(mockRepo, 4, 5, 15, 24)

		mockRepo.On("IsAccountLocked", ctx, "admin@test.com", 5, 15).Return(false, nil)
		mockRepo.On("GetAdminByEmail", ctx, "admin@test.com").
			Return(&domain.Admin{ID: 1, Email: "admin@test.com", PasswordHash: string(passwordHash)}, nil)
		mockRepo.On("DeleteSessionsByAdmin", ctx, int64(1)).Return(nil)
		mockRepo.On("CreateSession", ctx, int64(1), 24).
			Return(&domain.Session{Token: "session-token-123"}, nil)

		output, err := uc.Login(ctx, usecase.LoginInput{
			Email:    "admin@test.com",
			Password: "correct-password",
		})

		require.NoError(t, err)
		assert.Equal(t, "session-token-123", output.SessionToken)
		mockRepo.AssertExpectations(t)
	})

	t.Run("fails with empty email", func(t *testing.T) {
		uc := usecase.NewAuthUseCase(new(testutil.MockAuthRepository), 4, 5, 15, 24)

		_, err := uc.Login(ctx, usecase.LoginInput{Email: "", Password: "test"})

		require.Error(t, err)
		assert.Equal(t, domain.ErrInvalidInput, err)
	})

	t.Run("fails with empty password", func(t *testing.T) {
		uc := usecase.NewAuthUseCase(new(testutil.MockAuthRepository), 4, 5, 15, 24)

		_, err := uc.Login(ctx, usecase.LoginInput{Email: "admin@test.com", Password: ""})

		require.Error(t, err)
		assert.Equal(t, domain.ErrInvalidInput, err)
	})

	t.Run("fails with wrong password", func(t *testing.T) {
		mockRepo := new(testutil.MockAuthRepository)
		uc := usecase.NewAuthUseCase(mockRepo, 4, 5, 15, 24)

		mockRepo.On("IsAccountLocked", ctx, "admin@test.com", 5, 15).Return(false, nil)
		mockRepo.On("GetAdminByEmail", ctx, "admin@test.com").
			Return(&domain.Admin{ID: 1, Email: "admin@test.com", PasswordHash: string(passwordHash)}, nil)
		mockRepo.On("RecordLoginAttempt", ctx, "admin@test.com").Return(nil)

		_, err := uc.Login(ctx, usecase.LoginInput{
			Email:    "admin@test.com",
			Password: "wrong-password",
		})

		require.Error(t, err)
		assert.Equal(t, domain.ErrUnauthorized, err)
		mockRepo.AssertExpectations(t)
	})

	t.Run("fails with wrong email", func(t *testing.T) {
		mockRepo := new(testutil.MockAuthRepository)
		uc := usecase.NewAuthUseCase(mockRepo, 4, 5, 15, 24)

		mockRepo.On("IsAccountLocked", ctx, "noone@test.com", 5, 15).Return(false, nil)
		mockRepo.On("GetAdminByEmail", ctx, "noone@test.com").
			Return((*domain.Admin)(nil), domain.ErrNotFound)
		mockRepo.On("RecordLoginAttempt", ctx, "noone@test.com").Return(nil)

		_, err := uc.Login(ctx, usecase.LoginInput{
			Email:    "noone@test.com",
			Password: "test",
		})

		require.Error(t, err)
		assert.Equal(t, domain.ErrUnauthorized, err)
		mockRepo.AssertExpectations(t)
	})

	t.Run("fails when account locked", func(t *testing.T) {
		mockRepo := new(testutil.MockAuthRepository)
		uc := usecase.NewAuthUseCase(mockRepo, 4, 5, 15, 24)

		mockRepo.On("IsAccountLocked", ctx, "admin@test.com", 5, 15).Return(true, nil)

		_, err := uc.Login(ctx, usecase.LoginInput{
			Email:    "admin@test.com",
			Password: "test",
		})

		require.Error(t, err)
		assert.Equal(t, domain.ErrAccountLocked, err)
		mockRepo.AssertExpectations(t)
	})
}

func TestAuthUseCase_Logout(t *testing.T) {
	ctx := context.Background()

	t.Run("deletes session successfully", func(t *testing.T) {
		mockRepo := new(testutil.MockAuthRepository)
		uc := usecase.NewAuthUseCase(mockRepo, 4, 5, 15, 24)

		mockRepo.On("DeleteSession", ctx, "token-123").Return(nil)

		err := uc.Logout(ctx, "token-123")

		require.NoError(t, err)
		mockRepo.AssertExpectations(t)
	})
}

func TestAuthUseCase_ValidateSession(t *testing.T) {
	ctx := context.Background()

	t.Run("returns session for valid token", func(t *testing.T) {
		mockRepo := new(testutil.MockAuthRepository)
		uc := usecase.NewAuthUseCase(mockRepo, 4, 5, 15, 24)

		mockRepo.On("GetSession", ctx, "valid-token").
			Return(&domain.Session{Token: "valid-token", AdminID: 1}, nil)

		session, err := uc.ValidateSession(ctx, "valid-token")

		require.NoError(t, err)
		assert.Equal(t, "valid-token", session.Token)
		mockRepo.AssertExpectations(t)
	})

	t.Run("returns unauthorized for invalid token", func(t *testing.T) {
		mockRepo := new(testutil.MockAuthRepository)
		uc := usecase.NewAuthUseCase(mockRepo, 4, 5, 15, 24)

		mockRepo.On("GetSession", ctx, "bad-token").Return((*domain.Session)(nil), domain.ErrNotFound)

		_, err := uc.ValidateSession(ctx, "bad-token")

		require.Error(t, err)
		assert.Equal(t, domain.ErrUnauthorized, err)
		mockRepo.AssertExpectations(t)
	})
}
