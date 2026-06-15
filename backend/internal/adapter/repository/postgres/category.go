package postgres

import (
	"context"
	"database/sql"

	"github.com/PulidoLuciano/LucianoPulido.git/internal/domain"
	"github.com/PulidoLuciano/LucianoPulido.git/internal/port"
)

type CategoryRepo struct {
	db *sql.DB
}

var _ port.CategoryRepository = (*CategoryRepo)(nil)

func NewCategoryRepo(db *sql.DB) *CategoryRepo {
	return &CategoryRepo{db: db}
}

func (r *CategoryRepo) ListByPostID(ctx context.Context, postID int64, lang string) ([]domain.CategoryWithName, error) {
	query := `
		SELECT c.id, c.slug, ct.name
		FROM categories c
		JOIN category_translations ct ON ct.category_id = c.id
		JOIN post_categories pc ON pc.category_id = c.id
		WHERE pc.post_id = $1 AND ct.language_code = $2
	`

	rows, err := r.db.QueryContext(ctx, query, postID, lang)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var categories []domain.CategoryWithName
	for rows.Next() {
		var cat domain.CategoryWithName
		if err := rows.Scan(&cat.ID, &cat.Slug, &cat.Name); err != nil {
			return nil, err
		}
		categories = append(categories, cat)
	}

	return categories, rows.Err()
}
