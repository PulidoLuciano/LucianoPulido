package handler

import (
	"encoding/json"
	"net"
	"net/http"
	"strconv"

	"github.com/PulidoLuciano/LucianoPulido.git/internal/adapter/geolocation"
	"github.com/PulidoLuciano/LucianoPulido.git/internal/usecase"
)

type MetricsHandler struct {
	uc          *usecase.MetricsUseCase
	geoResolver *geolocation.Resolver
}

func NewMetricsHandler(uc *usecase.MetricsUseCase, geoResolver *geolocation.Resolver) *MetricsHandler {
	return &MetricsHandler{uc: uc, geoResolver: geoResolver}
}

func (h *MetricsHandler) InitializePostView(w http.ResponseWriter, r *http.Request) {
	var body struct {
		PostID int64 `json:"post_id"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, `{"error":"invalid request body"}`, http.StatusBadRequest)
		return
	}

	ipStr, _, _ := net.SplitHostPort(r.RemoteAddr)
	countryCode, city := h.geoResolver.Resolve(ipStr)
	visitorHash := hashIP(ipStr)

	input := usecase.InitializeViewInput{
		PostID:      body.PostID,
		CountryCode: countryCode,
		City:        city,
		VisitorHash: visitorHash,
	}

	output, err := h.uc.InitializeView(r.Context(), input)
	if err != nil {
		writeError(w, mapErrorStatus(err))
		return
	}

	writeJSON(w, http.StatusCreated, output)
}

func (h *MetricsHandler) UpdatePostMetrics(w http.ResponseWriter, r *http.Request) {
	var body struct {
		ViewID           int64   `json:"view_id"`
		DurationSeconds  int     `json:"duration_seconds"`
		MaxScrollPercent float64 `json:"max_scroll_percentage"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, `{"error":"invalid request body"}`, http.StatusBadRequest)
		return
	}

	input := usecase.UpdateMetricsInput{
		ViewID:           body.ViewID,
		DurationSeconds:  body.DurationSeconds,
		MaxScrollPercent: body.MaxScrollPercent,
	}

	if err := h.uc.UpdateMetrics(r.Context(), input); err != nil {
		writeError(w, mapErrorStatus(err))
		return
	}

	w.WriteHeader(http.StatusOK)
}

func parseIDParam(r *http.Request, name string) (int64, error) {
	return strconv.ParseInt(r.PathValue(name), 10, 64)
}
