package usecase

import (
	"context"
	"crypto/rand"
	"crypto/subtle"
	"encoding/hex"

	"github.com/PulidoLuciano/LucianoPulido.git/internal/domain"
	"github.com/PulidoLuciano/LucianoPulido.git/internal/port"
	"golang.org/x/crypto/bcrypt"
)

type AuthUseCase struct {
	authRepo port.AuthRepository
}

func NewAuthUseCase(ar port.AuthRepository) *AuthUseCase {
	return &AuthUseCase{authRepo: ar}
}

type LoginInput struct {
	Email    string
	Password string
}

type LoginOutput struct {
	SessionToken string
}

func (uc *AuthUseCase) Login(ctx context.Context, input LoginInput) (*LoginOutput, error) {
	if input.Email == "" || input.Password == "" {
		return nil, domain.ErrInvalidInput
	}

	admin, err := uc.authRepo.GetAdminByEmail(ctx, input.Email)
	if err != nil {
		return nil, domain.ErrUnauthorized
	}

	if err := bcrypt.CompareHashAndPassword([]byte(admin.PasswordHash), []byte(input.Password)); err != nil {
		return nil, domain.ErrUnauthorized
	}

	session, err := uc.authRepo.CreateSession(ctx, admin.ID)
	if err != nil {
		return nil, err
	}

	return &LoginOutput{SessionToken: session.Token}, nil
}

func (uc *AuthUseCase) Logout(ctx context.Context, token string) error {
	return uc.authRepo.DeleteSession(ctx, token)
}

func (uc *AuthUseCase) ValidateSession(ctx context.Context, token string) (*domain.Session, error) {
	session, err := uc.authRepo.GetSession(ctx, token)
	if err != nil {
		return nil, domain.ErrUnauthorized
	}
	return session, nil
}

func GenerateSecureToken() (string, error) {
	b := make([]byte, 32)
	if _, err := rand.Read(b); err != nil {
		return "", err
	}
	return hex.EncodeToString(b), nil
}

func SecureCompare(a, b string) bool {
	return subtle.ConstantTimeCompare([]byte(a), []byte(b)) == 1
}
