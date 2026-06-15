package handler

import (
	"encoding/json"
	"net/http"
)

func writeJSON(w http.ResponseWriter, status int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(data)
}

func writeError(w http.ResponseWriter, status int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	var msg string
	switch status {
	case http.StatusNotFound:
		msg = "resource not found"
	case http.StatusUnauthorized:
		msg = "unauthorized"
	case http.StatusBadRequest:
		msg = "invalid request"
	case http.StatusConflict:
		msg = "resource already exists"
	default:
		msg = "internal server error"
	}
	json.NewEncoder(w).Encode(map[string]string{"error": msg})
}
