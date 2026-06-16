package domain

import "errors"

var (
	ErrNotFound      = errors.New("resource not found")
	ErrUnauthorized  = errors.New("unauthorized")
	ErrInvalidInput  = errors.New("invalid input")
	ErrConflict      = errors.New("resource already exists")
	ErrInternal      = errors.New("internal error")
	ErrAccountLocked = errors.New("account temporarily locked")
)
