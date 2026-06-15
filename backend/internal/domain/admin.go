package domain

import "time"

type Admin struct {
	ID           int64
	Email        string
	PasswordHash string
}

type Session struct {
	Token     string
	AdminID   int64
	CreatedAt time.Time
	ExpiresAt time.Time
}
