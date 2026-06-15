package handler

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/PulidoLuciano/LucianoPulido.git/internal/usecase"
)

type AuthHandler struct {
	uc *usecase.AuthUseCase
}

func NewAuthHandler(uc *usecase.AuthUseCase) *AuthHandler {
	return &AuthHandler{uc: uc}
}

func (h *AuthHandler) Login(w http.ResponseWriter, r *http.Request) {
	var input usecase.LoginInput
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, `{"error":"invalid request body"}`, http.StatusBadRequest)
		return
	}

	output, err := h.uc.Login(r.Context(), input)
	if err != nil {
		writeError(w, mapErrorStatus(err))
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:     "session_token",
		Value:    output.SessionToken,
		Path:     "/",
		HttpOnly: true,
		Secure:   false,
		SameSite: http.SameSiteStrictMode,
		Expires:  time.Now().Add(24 * time.Hour),
	})

	writeJSON(w, http.StatusOK, map[string]string{"status": "authenticated"})
}

func (h *AuthHandler) Logout(w http.ResponseWriter, r *http.Request) {
	cookie, err := r.Cookie("session_token")
	if err == nil {
		_ = h.uc.Logout(r.Context(), cookie.Value)
	}

	http.SetCookie(w, &http.Cookie{
		Name:     "session_token",
		Value:    "",
		Path:     "/",
		HttpOnly: true,
		MaxAge:   -1,
	})

	writeJSON(w, http.StatusOK, map[string]string{"status": "logged_out"})
}
