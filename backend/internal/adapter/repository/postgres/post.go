package postgres

import (
	"context"
	"database/sql"
	"errors"
	"fmt"

	"github.com/lib/pq"

	"github.com/PulidoLuciano/LucianoPulido.git/internal/domain"
	"github.com/PulidoLuciano/LucianoPulido.git/internal/port"
)

type PostRepo struct {
	db *sql.DB
}

var _ port.PostRepository = (*PostRepo)(nil)

func NewPostRepo(db *sql.DB) *PostRepo {
	return &PostRepo{db: db}
}

func (r *PostRepo) List(ctx context.Context, lang string, categorySlug string, page int, perPage int) ([]domain.PostWithTranslation, int64, error) {
	query := `
		SELECT p.id, p.slug, p.image_url, p.is_public, p.created_at,
		       pt.id, pt.language_code, pt.title, pt.content,
		       COUNT(*) OVER() AS total_count
		FROM posts p
		JOIN post_translations pt ON pt.post_id = p.id
		WHERE pt.language_code = $1 AND p.is_public = true
	`
	args := []interface{}{lang}

	if categorySlug != "" {
		query += ` AND p.id IN (
			SELECT pc.post_id FROM post_categories pc
			JOIN categories c ON c.id = pc.category_id
			WHERE c.slug = $2
		)`
		args = append(args, categorySlug)
	}

	query += ` ORDER BY p.created_at DESC`

	offset := (page - 1) * perPage
	limitIdx := len(args) + 1
	offsetIdx := len(args) + 2
	query += fmt.Sprintf(` LIMIT $%d OFFSET $%d`, limitIdx, offsetIdx)
	args = append(args, perPage, offset)

	rows, err := r.db.QueryContext(ctx, query, args...)
	if err != nil {
		return nil, 0, err
	}
	defer rows.Close()

	var totalCount int64
	var posts []domain.PostWithTranslation
	for rows.Next() {
		var p domain.PostWithTranslation
		if err := rows.Scan(
			&p.Post.ID, &p.Post.Slug, &p.Post.ImageURL, &p.Post.IsPublic, &p.Post.CreatedAt,
			&p.Translation.ID, &p.Translation.LanguageCode, &p.Translation.Title, &p.Translation.Content,
			&totalCount,
		); err != nil {
			return nil, 0, err
		}
		p.Translation.PostID = p.Post.ID
		posts = append(posts, p)
	}

	return posts, totalCount, rows.Err()
}

func (r *PostRepo) GetBySlug(ctx context.Context, slug string, lang string) (*domain.PostWithTranslation, error) {
	query := `
		SELECT p.id, p.slug, p.image_url, p.is_public, p.created_at,
		       pt.id, pt.language_code, pt.title, pt.content
		FROM posts p
		JOIN post_translations pt ON pt.post_id = p.id
		WHERE p.slug = $1 AND pt.language_code = $2 AND p.is_public = true
	`

	var p domain.PostWithTranslation
	err := r.db.QueryRowContext(ctx, query, slug, lang).Scan(
		&p.Post.ID, &p.Post.Slug, &p.Post.ImageURL, &p.Post.IsPublic, &p.Post.CreatedAt,
		&p.Translation.ID, &p.Translation.LanguageCode, &p.Translation.Title, &p.Translation.Content,
	)
	if errors.Is(err, sql.ErrNoRows) {
		return nil, domain.ErrNotFound
	}
	if err != nil {
		return nil, err
	}
	p.Translation.PostID = p.Post.ID

	return &p, nil
}

func (r *PostRepo) Create(ctx context.Context, post *domain.Post, translations []domain.PostTranslation, categoryIDs []int64) (*domain.Post, error) {
	tx, err := r.db.BeginTx(ctx, nil)
	if err != nil {
		return nil, err
	}
	defer tx.Rollback()

	err = tx.QueryRowContext(ctx,
		`INSERT INTO posts (slug, image_url, is_public) VALUES ($1, $2, $3) RETURNING id, created_at`,
		post.Slug, post.ImageURL, post.IsPublic,
	).Scan(&post.ID, &post.CreatedAt)
	if err != nil {
		var pqErr *pq.Error
		if errors.As(err, &pqErr) && pqErr.Code == "23505" {
			return nil, domain.ErrConflict
		}
		return nil, err
	}

	for i := range translations {
		translations[i].PostID = post.ID
		_, err := tx.ExecContext(ctx,
			`INSERT INTO post_translations (post_id, language_code, title, content) VALUES ($1, $2, $3, $4)`,
			translations[i].PostID, translations[i].LanguageCode, translations[i].Title, translations[i].Content,
		)
		if err != nil {
			return nil, err
		}
	}

	for _, catID := range categoryIDs {
		_, err := tx.ExecContext(ctx,
			`INSERT INTO post_categories (post_id, category_id) VALUES ($1, $2)`,
			post.ID, catID,
		)
		if err != nil {
			return nil, err
		}
	}

	if err := tx.Commit(); err != nil {
		return nil, err
	}

	return post, nil
}

func (r *PostRepo) Update(ctx context.Context, post *domain.Post, translations []domain.PostTranslation, categoryIDs []int64) error {
	tx, err := r.db.BeginTx(ctx, nil)
	if err != nil {
		return err
	}
	defer tx.Rollback()

	_, err = tx.ExecContext(ctx,
		`UPDATE posts SET slug = $1, image_url = $2 WHERE id = $3`,
		post.Slug, post.ImageURL, post.ID,
	)
	if err != nil {
		var pqErr *pq.Error
		if errors.As(err, &pqErr) && pqErr.Code == "23505" {
			return domain.ErrConflict
		}
		return err
	}

	_, err = tx.ExecContext(ctx, `DELETE FROM post_translations WHERE post_id = $1`, post.ID)
	if err != nil {
		return err
	}

	for _, t := range translations {
		_, err := tx.ExecContext(ctx,
			`INSERT INTO post_translations (post_id, language_code, title, content) VALUES ($1, $2, $3, $4)`,
			t.PostID, t.LanguageCode, t.Title, t.Content,
		)
		if err != nil {
			return err
		}
	}

	_, err = tx.ExecContext(ctx, `DELETE FROM post_categories WHERE post_id = $1`, post.ID)
	if err != nil {
		return err
	}

	for _, catID := range categoryIDs {
		_, err := tx.ExecContext(ctx,
			`INSERT INTO post_categories (post_id, category_id) VALUES ($1, $2)`,
			post.ID, catID,
		)
		if err != nil {
			return err
		}
	}

	return tx.Commit()
}

func (r *PostRepo) Delete(ctx context.Context, id int64) error {
	result, err := r.db.ExecContext(ctx, `DELETE FROM posts WHERE id = $1`, id)
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

func (r *PostRepo) GetCategoryNames(ctx context.Context, postID int64, lang string) ([]domain.CategoryWithName, error) {
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
