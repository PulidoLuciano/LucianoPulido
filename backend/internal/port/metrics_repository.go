package port

import (
	"context"
)

type MetricsRepository interface {
	CreateView(ctx context.Context, postID int64, countryCode, city, visitorHash string) (int64, error)
	UpdateMetrics(ctx context.Context, viewID int64, readTimeSeconds int, maxScrollPercent float64) error
	GetTotalViews(ctx context.Context, postID int64) (int64, error)
}
