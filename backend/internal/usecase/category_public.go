package usecase

import (
	"context"

	"github.com/PulidoLuciano/LucianoPulido.git/internal/domain"
	"github.com/PulidoLuciano/LucianoPulido.git/internal/port"
)

type CategoryPublicOutput struct {
	ID   int64  `json:"id"`
	Slug string `json:"slug"`
	Name string `json:"name"`
}

type CategoryPublicUseCase struct {
	categoryRepo port.CategoryRepository
}

func NewCategoryPublicUseCase(cr port.CategoryRepository) *CategoryPublicUseCase {
	return &CategoryPublicUseCase{categoryRepo: cr}
}

func (uc *CategoryPublicUseCase) ListCategories(ctx context.Context, lang string) ([]CategoryPublicOutput, error) {
	if lang == "" {
		return nil, domain.ErrInvalidInput
	}

	categories, err := uc.categoryRepo.ListAll(ctx, lang)
	if err != nil {
		return nil, err
	}

	result := make([]CategoryPublicOutput, 0, len(categories))
	for _, c := range categories {
		result = append(result, CategoryPublicOutput{
			ID:   c.ID,
			Slug: c.Slug,
			Name: c.Name,
		})
	}

	return result, nil
}
