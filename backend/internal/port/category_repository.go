package port

import (
	"context"

	"github.com/PulidoLuciano/LucianoPulido.git/internal/domain"
)

type CategoryRepository interface {
	ListByPostID(ctx context.Context, postID int64, lang string) ([]domain.CategoryWithName, error)
	List(ctx context.Context) ([]domain.Category, []domain.CategoryTranslation, error)
	GetByID(ctx context.Context, id int64) (*domain.Category, []domain.CategoryTranslation, error)
	Create(ctx context.Context, category *domain.Category, translations []domain.CategoryTranslation) (*domain.Category, error)
	Update(ctx context.Context, category *domain.Category, translations []domain.CategoryTranslation) error
	Delete(ctx context.Context, id int64) error
}
