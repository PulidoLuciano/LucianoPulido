package usecase

import (
	"context"
	"time"

	"github.com/PulidoLuciano/LucianoPulido.git/internal/domain"
	"github.com/PulidoLuciano/LucianoPulido.git/internal/port"
)

type CategoryAdminUseCase struct {
	categoryRepo port.CategoryRepository
}

func NewCategoryAdminUseCase(cr port.CategoryRepository) *CategoryAdminUseCase {
	return &CategoryAdminUseCase{categoryRepo: cr}
}

type CategoryTranslationInput struct {
	Name string
}

type CreateCategoryInput struct {
	Slug         string
	Translations map[string]CategoryTranslationInput
}

type CategoryTranslationOutput struct {
	Name string `json:"name"`
}

type CategoryOutput struct {
	ID           int64                                `json:"id"`
	Slug         string                               `json:"slug"`
	CreatedAt    time.Time                            `json:"created_at"`
	Translations map[string]CategoryTranslationOutput `json:"translations"`
}

func (uc *CategoryAdminUseCase) ListCategories(ctx context.Context) ([]CategoryOutput, error) {
	categories, translations, err := uc.categoryRepo.List(ctx)
	if err != nil {
		return nil, err
	}

	trByCat := make(map[int64]map[string]CategoryTranslationOutput)
	for _, t := range translations {
		if _, ok := trByCat[t.CategoryID]; !ok {
			trByCat[t.CategoryID] = make(map[string]CategoryTranslationOutput)
		}
		trByCat[t.CategoryID][t.LanguageCode] = CategoryTranslationOutput{Name: t.Name}
	}

	outputs := make([]CategoryOutput, 0, len(categories))
	for _, c := range categories {
		tr := trByCat[c.ID]
		if tr == nil {
			tr = make(map[string]CategoryTranslationOutput)
		}
		outputs = append(outputs, CategoryOutput{
			ID:           c.ID,
			Slug:         c.Slug,
			CreatedAt:    c.CreatedAt,
			Translations: tr,
		})
	}

	return outputs, nil
}

func (uc *CategoryAdminUseCase) GetCategory(ctx context.Context, id int64) (*CategoryOutput, error) {
	cat, translations, err := uc.categoryRepo.GetByID(ctx, id)
	if err != nil {
		return nil, err
	}

	tr := make(map[string]CategoryTranslationOutput)
	for _, t := range translations {
		tr[t.LanguageCode] = CategoryTranslationOutput{Name: t.Name}
	}

	return &CategoryOutput{
		ID:           cat.ID,
		Slug:         cat.Slug,
		CreatedAt:    cat.CreatedAt,
		Translations: tr,
	}, nil
}

func (uc *CategoryAdminUseCase) CreateCategory(ctx context.Context, input CreateCategoryInput) (*CategoryOutput, error) {
	if input.Slug == "" {
		return nil, domain.ErrInvalidInput
	}
	if len(input.Translations) == 0 {
		return nil, domain.ErrInvalidInput
	}

	now := time.Now()
	category := &domain.Category{
		Slug:      input.Slug,
		CreatedAt: now,
	}

	translations := make([]domain.CategoryTranslation, 0, len(input.Translations))
	for lang, t := range input.Translations {
		translations = append(translations, domain.CategoryTranslation{
			LanguageCode: lang,
			Name:         t.Name,
		})
	}

	created, err := uc.categoryRepo.Create(ctx, category, translations)
	if err != nil {
		return nil, err
	}

	tr := make(map[string]CategoryTranslationOutput, len(input.Translations))
	for lang, t := range input.Translations {
		tr[lang] = CategoryTranslationOutput{Name: t.Name}
	}

	return &CategoryOutput{
		ID:           created.ID,
		Slug:         created.Slug,
		CreatedAt:    created.CreatedAt,
		Translations: tr,
	}, nil
}

func (uc *CategoryAdminUseCase) UpdateCategory(ctx context.Context, id int64, input CreateCategoryInput) error {
	if input.Slug == "" {
		return domain.ErrInvalidInput
	}
	if len(input.Translations) == 0 {
		return domain.ErrInvalidInput
	}

	category := &domain.Category{
		ID:   id,
		Slug: input.Slug,
	}

	translations := make([]domain.CategoryTranslation, 0, len(input.Translations))
	for lang, t := range input.Translations {
		translations = append(translations, domain.CategoryTranslation{
			CategoryID:   id,
			LanguageCode: lang,
			Name:         t.Name,
		})
	}

	return uc.categoryRepo.Update(ctx, category, translations)
}

func (uc *CategoryAdminUseCase) DeleteCategory(ctx context.Context, id int64) error {
	return uc.categoryRepo.Delete(ctx, id)
}
