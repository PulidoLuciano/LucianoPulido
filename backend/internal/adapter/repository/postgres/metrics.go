package postgres

import (
	"context"
	"database/sql"
	"errors"

	"github.com/PulidoLuciano/LucianoPulido.git/internal/domain"
	"github.com/PulidoLuciano/LucianoPulido.git/internal/port"
)

type MetricsRepo struct {
	db *sql.DB
}

var _ port.MetricsRepository = (*MetricsRepo)(nil)

func NewMetricsRepo(db *sql.DB) *MetricsRepo {
	return &MetricsRepo{db: db}
}

func (r *MetricsRepo) CreateView(ctx context.Context, postID int64, countryCode, city, visitorHash string) (int64, error) {
	var viewID int64
	err := r.db.QueryRowContext(ctx,
		`INSERT INTO post_views (post_id, country_code, city, visitor_hash)
		 VALUES ($1, NULLIF($2, ''), NULLIF($3, ''), $4)
		 RETURNING id`,
		postID, countryCode, city, visitorHash,
	).Scan(&viewID)
	if err != nil {
		return 0, err
	}
	return viewID, nil
}

func (r *MetricsRepo) UpdateMetrics(ctx context.Context, viewID int64, readTimeSeconds int, maxScrollPercent float64) error {
	result, err := r.db.ExecContext(ctx,
		`UPDATE post_views SET read_time_seconds = $1, max_scroll_percent = $2 WHERE id = $3`,
		readTimeSeconds, maxScrollPercent, viewID,
	)
	if err != nil {
		return err
	}
	rows, err := result.RowsAffected()
	if err != nil {
		return err
	}
	if rows == 0 {
		return domain.ErrNotFound
	}
	return nil
}

func (r *MetricsRepo) GetTotalViews(ctx context.Context, postID int64) (int64, error) {
	var count int64
	err := r.db.QueryRowContext(ctx,
		`SELECT COUNT(*) FROM post_views WHERE post_id = $1`,
		postID,
	).Scan(&count)
	if errors.Is(err, sql.ErrNoRows) {
		return 0, nil
	}
	return count, err
}
