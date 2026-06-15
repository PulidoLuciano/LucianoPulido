package port

import (
	"context"

	"github.com/PulidoLuciano/LucianoPulido.git/internal/domain"
)

type PostRepository interface {
	List(ctx context.Context, lang string, categorySlug string) ([]domain.PostWithTranslation, error)
	GetBySlug(ctx context.Context, slug string, lang string) (*domain.PostWithTranslation, error)
	Create(ctx context.Context, post *domain.Post, translations []domain.PostTranslation, categoryIDs []int64) (*domain.Post, error)
	Update(ctx context.Context, post *domain.Post, translations []domain.PostTranslation, categoryIDs []int64) error
	Delete(ctx context.Context, id int64) error
	GetCategoryNames(ctx context.Context, postID int64, lang string) ([]domain.CategoryWithName, error)
}
