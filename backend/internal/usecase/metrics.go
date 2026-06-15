package usecase

import (
	"context"

	"github.com/PulidoLuciano/LucianoPulido.git/internal/domain"
	"github.com/PulidoLuciano/LucianoPulido.git/internal/port"
)

type MetricsUseCase struct {
	metricsRepo port.MetricsRepository
}

func NewMetricsUseCase(mr port.MetricsRepository) *MetricsUseCase {
	return &MetricsUseCase{metricsRepo: mr}
}

type InitializeViewInput struct {
	PostID      int64
	CountryCode string
	City        string
	VisitorHash string
}

type InitializeViewOutput struct {
	ViewID int64 `json:"view_id"`
}

func (uc *MetricsUseCase) InitializeView(ctx context.Context, input InitializeViewInput) (*InitializeViewOutput, error) {
	if input.PostID <= 0 {
		return nil, domain.ErrInvalidInput
	}

	viewID, err := uc.metricsRepo.CreateView(ctx, input.PostID, input.CountryCode, input.City, input.VisitorHash)
	if err != nil {
		return nil, err
	}

	return &InitializeViewOutput{ViewID: viewID}, nil
}

type UpdateMetricsInput struct {
	ViewID           int64
	DurationSeconds  int
	MaxScrollPercent float64
}

func (uc *MetricsUseCase) UpdateMetrics(ctx context.Context, input UpdateMetricsInput) error {
	if input.ViewID <= 0 {
		return domain.ErrInvalidInput
	}
	if input.MaxScrollPercent < 0 || input.MaxScrollPercent > 100 {
		return domain.ErrInvalidInput
	}

	return uc.metricsRepo.UpdateMetrics(ctx, input.ViewID, input.DurationSeconds, input.MaxScrollPercent)
}
