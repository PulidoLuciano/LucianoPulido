package postgres

import (
	"context"
	"database/sql"
	"errors"
	"time"

	"github.com/PulidoLuciano/LucianoPulido.git/internal/domain"
	"github.com/PulidoLuciano/LucianoPulido.git/internal/port"
	"github.com/PulidoLuciano/LucianoPulido.git/internal/usecase"
)

type AuthRepo struct {
	db *sql.DB
}

var _ port.AuthRepository = (*AuthRepo)(nil)

func NewAuthRepo(db *sql.DB) *AuthRepo {
	return &AuthRepo{db: db}
}

func (r *AuthRepo) GetAdminByEmail(ctx context.Context, email string) (*domain.Admin, error) {
	var admin domain.Admin
	err := r.db.QueryRowContext(ctx,
		`SELECT id, email, password_hash FROM admins WHERE email = $1`,
		email,
	).Scan(&admin.ID, &admin.Email, &admin.PasswordHash)
	if errors.Is(err, sql.ErrNoRows) {
		return nil, domain.ErrNotFound
	}
	if err != nil {
		return nil, err
	}
	return &admin, nil
}

func (r *AuthRepo) CreateSession(ctx context.Context, adminID int64) (*domain.Session, error) {
	token, err := usecase.GenerateSecureToken()
	if err != nil {
		return nil, err
	}

	session := &domain.Session{
		Token:     token,
		AdminID:   adminID,
		CreatedAt: time.Now(),
		ExpiresAt: time.Now().Add(24 * time.Hour),
	}

	_, err = r.db.ExecContext(ctx,
		`INSERT INTO admin_sessions (token, admin_id, expires_at) VALUES ($1, $2, $3)`,
		session.Token, session.AdminID, session.ExpiresAt,
	)
	if err != nil {
		return nil, err
	}

	return session, nil
}

func (r *AuthRepo) GetSession(ctx context.Context, token string) (*domain.Session, error) {
	var session domain.Session
	err := r.db.QueryRowContext(ctx,
		`SELECT token, admin_id, created_at, expires_at FROM admin_sessions
		 WHERE token = $1 AND expires_at > NOW()`,
		token,
	).Scan(&session.Token, &session.AdminID, &session.CreatedAt, &session.ExpiresAt)
	if errors.Is(err, sql.ErrNoRows) {
		return nil, domain.ErrNotFound
	}
	if err != nil {
		return nil, err
	}
	return &session, nil
}

func (r *AuthRepo) DeleteSession(ctx context.Context, token string) error {
	_, err := r.db.ExecContext(ctx,
		`DELETE FROM admin_sessions WHERE token = $1`,
		token,
	)
	return err
}
