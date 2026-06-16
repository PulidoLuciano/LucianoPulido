package port

import (
	"context"

	"github.com/PulidoLuciano/LucianoPulido.git/internal/domain"
)

type AuthRepository interface {
	GetAdminByEmail(ctx context.Context, email string) (*domain.Admin, error)
	CreateSession(ctx context.Context, adminID int64, durationHours int) (*domain.Session, error)
	GetSession(ctx context.Context, token string) (*domain.Session, error)
	DeleteSession(ctx context.Context, token string) error
	DeleteSessionsByAdmin(ctx context.Context, adminID int64) error
	RecordLoginAttempt(ctx context.Context, email string) error
	IsAccountLocked(ctx context.Context, email string, maxAttempts int, lockoutMin int) (bool, error)
	DeleteExpiredSessions(ctx context.Context) (int64, error)
}
