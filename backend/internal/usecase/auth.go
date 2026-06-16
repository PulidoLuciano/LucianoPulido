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
	authRepo     port.AuthRepository
	bcryptCost   int
	maxAttempts  int
	lockoutMin   int
	sessionHours int
}

func NewAuthUseCase(ar port.AuthRepository, bcryptCost, maxAttempts, lockoutMin, sessionHours int) *AuthUseCase {
	return &AuthUseCase{
		authRepo:     ar,
		bcryptCost:   bcryptCost,
		maxAttempts:  maxAttempts,
		lockoutMin:   lockoutMin,
		sessionHours: sessionHours,
	}
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

	locked, err := uc.authRepo.IsAccountLocked(ctx, input.Email, uc.maxAttempts, uc.lockoutMin)
	if err != nil {
		return nil, err
	}
	if locked {
		return nil, domain.ErrAccountLocked
	}

	admin, err := uc.authRepo.GetAdminByEmail(ctx, input.Email)
	if err != nil {
		_ = uc.authRepo.RecordLoginAttempt(ctx, input.Email)
		return nil, domain.ErrUnauthorized
	}

	if err := bcrypt.CompareHashAndPassword([]byte(admin.PasswordHash), []byte(input.Password)); err != nil {
		_ = uc.authRepo.RecordLoginAttempt(ctx, input.Email)
		return nil, domain.ErrUnauthorized
	}

	_ = uc.authRepo.DeleteSessionsByAdmin(ctx, admin.ID)

	session, err := uc.authRepo.CreateSession(ctx, admin.ID, uc.sessionHours)
	if err != nil {
		return nil, err
	}

	return &LoginOutput{SessionToken: session.Token}, nil
}

func (uc *AuthUseCase) HashPassword(password string) (string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), uc.bcryptCost)
	if err != nil {
		return "", err
	}
	return string(hash), nil
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
