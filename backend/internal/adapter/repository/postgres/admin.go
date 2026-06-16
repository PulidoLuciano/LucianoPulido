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

func (r *AuthRepo) CreateSession(ctx context.Context, adminID int64, durationHours int) (*domain.Session, error) {
	token, err := usecase.GenerateSecureToken()
	if err != nil {
		return nil, err
	}

	session := &domain.Session{
		Token:     token,
		AdminID:   adminID,
		CreatedAt: time.Now(),
		ExpiresAt: time.Now().Add(time.Duration(durationHours) * time.Hour),
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

func (r *AuthRepo) DeleteSessionsByAdmin(ctx context.Context, adminID int64) error {
	_, err := r.db.ExecContext(ctx,
		`DELETE FROM admin_sessions WHERE admin_id = $1`,
		adminID,
	)
	return err
}

func (r *AuthRepo) RecordLoginAttempt(ctx context.Context, email string) error {
	_, err := r.db.ExecContext(ctx,
		`INSERT INTO login_attempts (email) VALUES ($1)`,
		email,
	)
	return err
}

func (r *AuthRepo) IsAccountLocked(ctx context.Context, email string, maxAttempts int, lockoutMin int) (bool, error) {
	var count int
	cutoff := time.Now().Add(-time.Duration(lockoutMin) * time.Minute)
	err := r.db.QueryRowContext(ctx,
		`SELECT COUNT(*) FROM login_attempts
		 WHERE email = $1 AND attempted_at > $2`,
		email, cutoff,
	).Scan(&count)
	if err != nil {
		return false, err
	}
	return count >= maxAttempts, nil
}

func (r *AuthRepo) DeleteExpiredSessions(ctx context.Context) (int64, error) {
	result, err := r.db.ExecContext(ctx,
		`DELETE FROM admin_sessions WHERE expires_at < NOW()`,
	)
	if err != nil {
		return 0, err
	}
	return result.RowsAffected()
}
