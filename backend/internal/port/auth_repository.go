package port

import (
	"context"

	"github.com/PulidoLuciano/LucianoPulido.git/internal/domain"
)

type AuthRepository interface {
	GetAdminByEmail(ctx context.Context, email string) (*domain.Admin, error)
	CreateSession(ctx context.Context, adminID int64) (*domain.Session, error)
	GetSession(ctx context.Context, token string) (*domain.Session, error)
	DeleteSession(ctx context.Context, token string) error
}
