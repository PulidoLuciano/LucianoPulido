package handler

import (
	"encoding/json"
	"log/slog"
	"net/http"
	"time"

	"github.com/PulidoLuciano/LucianoPulido.git/internal/usecase"
)

type AuthHandler struct {
	uc           *usecase.AuthUseCase
	sessionHours int
	cookieSecure bool
	logger       *slog.Logger
}

func NewAuthHandler(uc *usecase.AuthUseCase, sessionHours int, cookieSecure bool, logger *slog.Logger) *AuthHandler {
	return &AuthHandler{uc: uc, sessionHours: sessionHours, cookieSecure: cookieSecure, logger: logger}
}

func (h *AuthHandler) Login(w http.ResponseWriter, r *http.Request) {
	r.Body = http.MaxBytesReader(w, r.Body, 1<<10)

	var input usecase.LoginInput
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		h.logger.Warn("login: invalid request body", "error", err)
		http.Error(w, `{"error":"invalid request body"}`, http.StatusBadRequest)
		return
	}

	output, err := h.uc.Login(r.Context(), input)
	if err != nil {
		h.logger.Warn("login failed", "email", input.Email, "error", err)
		writeError(w, mapErrorStatus(err))
		return
	}

	h.logger.Info("login successful", "email", input.Email)

	http.SetCookie(w, &http.Cookie{
		Name:     "session_token",
		Value:    output.SessionToken,
		Path:     "/",
		HttpOnly: true,
		Secure:   h.cookieSecure,
		SameSite: http.SameSiteStrictMode,
		Expires:  time.Now().Add(time.Duration(h.sessionHours) * time.Hour),
	})

	writeJSON(w, http.StatusOK, map[string]string{"status": "authenticated"})
}

func (h *AuthHandler) Logout(w http.ResponseWriter, r *http.Request) {
	cookie, err := r.Cookie("session_token")
	if err == nil {
		if err := h.uc.Logout(r.Context(), cookie.Value); err != nil {
			h.logger.Warn("logout: failed to delete session", "error", err)
		}
	}

	http.SetCookie(w, &http.Cookie{
		Name:     "session_token",
		Value:    "",
		Path:     "/",
		HttpOnly: true,
		Secure:   h.cookieSecure,
		SameSite: http.SameSiteStrictMode,
		MaxAge:   -1,
	})

	writeJSON(w, http.StatusOK, map[string]string{"status": "logged_out"})
}
