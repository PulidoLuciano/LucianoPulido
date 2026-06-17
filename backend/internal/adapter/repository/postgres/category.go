package postgres

import (
	"context"
	"database/sql"
	"errors"

	"github.com/lib/pq"

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

func (r *CategoryRepo) ListAll(ctx context.Context, lang string) ([]domain.CategoryWithName, error) {
	query := `
		SELECT c.id, c.slug, ct.name
		FROM categories c
		JOIN category_translations ct ON ct.category_id = c.id
		WHERE ct.language_code = $1
		ORDER BY c.id
	`

	rows, err := r.db.QueryContext(ctx, query, lang)
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

func (r *CategoryRepo) List(ctx context.Context) ([]domain.Category, []domain.CategoryTranslation, error) {
	query := `
		SELECT c.id, c.slug, c.created_at, ct.id, ct.category_id, ct.language_code, ct.name
		FROM categories c
		LEFT JOIN category_translations ct ON ct.category_id = c.id
		ORDER BY c.id, ct.language_code
	`

	rows, err := r.db.QueryContext(ctx, query)
	if err != nil {
		return nil, nil, err
	}
	defer rows.Close()

	categoryMap := make(map[int64]*domain.Category)
	categoryOrder := make([]int64, 0)
	var translations []domain.CategoryTranslation

	for rows.Next() {
		var cat domain.Category
		var tr domain.CategoryTranslation
		var trID sql.NullInt64
		var trCategoryID sql.NullInt64
		var trLang sql.NullString
		var trName sql.NullString

		if err := rows.Scan(
			&cat.ID, &cat.Slug, &cat.CreatedAt,
			&trID, &trCategoryID, &trLang, &trName,
		); err != nil {
			return nil, nil, err
		}

		if _, exists := categoryMap[cat.ID]; !exists {
			categoryMap[cat.ID] = &cat
			categoryOrder = append(categoryOrder, cat.ID)
		}

		if trID.Valid {
			tr.ID = trID.Int64
			tr.CategoryID = trCategoryID.Int64
			tr.LanguageCode = trLang.String
			tr.Name = trName.String
			translations = append(translations, tr)
		}
	}

	if err := rows.Err(); err != nil {
		return nil, nil, err
	}

	categories := make([]domain.Category, 0, len(categoryOrder))
	for _, id := range categoryOrder {
		categories = append(categories, *categoryMap[id])
	}

	return categories, translations, nil
}

func (r *CategoryRepo) GetByID(ctx context.Context, id int64) (*domain.Category, []domain.CategoryTranslation, error) {
	catQuery := `SELECT id, slug, created_at FROM categories WHERE id = $1`
	var cat domain.Category
	err := r.db.QueryRowContext(ctx, catQuery, id).Scan(&cat.ID, &cat.Slug, &cat.CreatedAt)
	if errors.Is(err, sql.ErrNoRows) {
		return nil, nil, domain.ErrNotFound
	}
	if err != nil {
		return nil, nil, err
	}

	trQuery := `
		SELECT id, category_id, language_code, name
		FROM category_translations
		WHERE category_id = $1
		ORDER BY language_code
	`
	rows, err := r.db.QueryContext(ctx, trQuery, id)
	if err != nil {
		return nil, nil, err
	}
	defer rows.Close()

	var translations []domain.CategoryTranslation
	for rows.Next() {
		var tr domain.CategoryTranslation
		if err := rows.Scan(&tr.ID, &tr.CategoryID, &tr.LanguageCode, &tr.Name); err != nil {
			return nil, nil, err
		}
		translations = append(translations, tr)
	}

	if err := rows.Err(); err != nil {
		return nil, nil, err
	}

	return &cat, translations, nil
}

func (r *CategoryRepo) Create(ctx context.Context, category *domain.Category, translations []domain.CategoryTranslation) (*domain.Category, error) {
	tx, err := r.db.BeginTx(ctx, nil)
	if err != nil {
		return nil, err
	}
	defer tx.Rollback()

	err = tx.QueryRowContext(ctx,
		`INSERT INTO categories (slug) VALUES ($1) RETURNING id, created_at`,
		category.Slug,
	).Scan(&category.ID, &category.CreatedAt)
	if err != nil {
		var pqErr *pq.Error
		if errors.As(err, &pqErr) && pqErr.Code == "23505" {
			return nil, domain.ErrConflict
		}
		return nil, err
	}

	for i := range translations {
		translations[i].CategoryID = category.ID
		_, err := tx.ExecContext(ctx,
			`INSERT INTO category_translations (category_id, language_code, name) VALUES ($1, $2, $3)`,
			translations[i].CategoryID, translations[i].LanguageCode, translations[i].Name,
		)
		if err != nil {
			return nil, err
		}
	}

	if err := tx.Commit(); err != nil {
		return nil, err
	}

	return category, nil
}

func (r *CategoryRepo) Update(ctx context.Context, category *domain.Category, translations []domain.CategoryTranslation) error {
	tx, err := r.db.BeginTx(ctx, nil)
	if err != nil {
		return err
	}
	defer tx.Rollback()

	_, err = tx.ExecContext(ctx,
		`UPDATE categories SET slug = $1 WHERE id = $2`,
		category.Slug, category.ID,
	)
	if err != nil {
		var pqErr *pq.Error
		if errors.As(err, &pqErr) && pqErr.Code == "23505" {
			return domain.ErrConflict
		}
		return err
	}

	_, err = tx.ExecContext(ctx, `DELETE FROM category_translations WHERE category_id = $1`, category.ID)
	if err != nil {
		return err
	}

	for _, t := range translations {
		_, err := tx.ExecContext(ctx,
			`INSERT INTO category_translations (category_id, language_code, name) VALUES ($1, $2, $3)`,
			t.CategoryID, t.LanguageCode, t.Name,
		)
		if err != nil {
			return err
		}
	}

	return tx.Commit()
}

func (r *CategoryRepo) Delete(ctx context.Context, id int64) error {
	result, err := r.db.ExecContext(ctx, `DELETE FROM categories WHERE id = $1`, id)
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
