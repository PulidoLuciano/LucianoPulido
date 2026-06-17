package usecase_test

import (
	"context"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"

	"github.com/PulidoLuciano/LucianoPulido.git/internal/domain"
	"github.com/PulidoLuciano/LucianoPulido.git/internal/usecase"
	"github.com/PulidoLuciano/LucianoPulido.git/internal/usecase/testutil"
)

func TestCategoryAdminUseCase_ListCategories(t *testing.T) {
	ctx := context.Background()
	mockRepo := new(testutil.MockCategoryRepository)
	uc := usecase.NewCategoryAdminUseCase(mockRepo)

	t.Run("returns categories grouped by translations", func(t *testing.T) {
		cat := []domain.Category{
			{ID: 1, Slug: "go-backend", CreatedAt: time.Now()},
			{ID: 2, Slug: "frontend", CreatedAt: time.Now()},
		}
		tr := []domain.CategoryTranslation{
			{ID: 1, CategoryID: 1, LanguageCode: "en", Name: "Go Backend"},
			{ID: 2, CategoryID: 1, LanguageCode: "es", Name: "Backend en Go"},
			{ID: 3, CategoryID: 2, LanguageCode: "en", Name: "Frontend"},
		}

		mockRepo.On("List", ctx).Return(cat, tr, nil)

		output, err := uc.ListCategories(ctx)

		require.NoError(t, err)
		require.Len(t, output, 2)
		assert.Equal(t, "go-backend", output[0].Slug)
		assert.Len(t, output[0].Translations, 2)
		assert.Equal(t, "Go Backend", output[0].Translations["en"].Name)
		assert.Equal(t, "Backend en Go", output[0].Translations["es"].Name)
		assert.Len(t, output[1].Translations, 1)
		mockRepo.AssertExpectations(t)
	})

	t.Run("returns empty list when no categories", func(t *testing.T) {
		mockRepo := new(testutil.MockCategoryRepository)
		uc := usecase.NewCategoryAdminUseCase(mockRepo)

		mockRepo.On("List", ctx).Return([]domain.Category{}, []domain.CategoryTranslation{}, nil)

		output, err := uc.ListCategories(ctx)

		require.NoError(t, err)
		assert.Len(t, output, 0)
		mockRepo.AssertExpectations(t)
	})
}

func TestCategoryAdminUseCase_GetCategory(t *testing.T) {
	ctx := context.Background()
	mockRepo := new(testutil.MockCategoryRepository)
	uc := usecase.NewCategoryAdminUseCase(mockRepo)

	t.Run("returns category with translations", func(t *testing.T) {
		cat := &domain.Category{ID: 1, Slug: "go-backend", CreatedAt: time.Now()}
		tr := []domain.CategoryTranslation{
			{ID: 1, CategoryID: 1, LanguageCode: "en", Name: "Go Backend"},
			{ID: 2, CategoryID: 1, LanguageCode: "es", Name: "Backend en Go"},
		}

		mockRepo.On("GetByID", ctx, int64(1)).Return(cat, tr, nil)

		output, err := uc.GetCategory(ctx, 1)

		require.NoError(t, err)
		assert.Equal(t, int64(1), output.ID)
		assert.Equal(t, "go-backend", output.Slug)
		assert.Len(t, output.Translations, 2)
		mockRepo.AssertExpectations(t)
	})

	t.Run("returns error when not found", func(t *testing.T) {
		mockRepo := new(testutil.MockCategoryRepository)
		uc := usecase.NewCategoryAdminUseCase(mockRepo)

		mockRepo.On("GetByID", ctx, int64(999)).Return((*domain.Category)(nil), []domain.CategoryTranslation(nil), domain.ErrNotFound)

		_, err := uc.GetCategory(ctx, 999)

		require.Error(t, err)
		assert.Equal(t, domain.ErrNotFound, err)
		mockRepo.AssertExpectations(t)
	})
}

func TestCategoryAdminUseCase_CreateCategory(t *testing.T) {
	ctx := context.Background()

	t.Run("creates category successfully", func(t *testing.T) {
		mockRepo := new(testutil.MockCategoryRepository)
		uc := usecase.NewCategoryAdminUseCase(mockRepo)

		input := usecase.CreateCategoryInput{
			Slug: "go-backend",
			Translations: map[string]usecase.CategoryTranslationInput{
				"en": {Name: "Go Backend"},
				"es": {Name: "Backend en Go"},
			},
		}

		mockRepo.On("Create", ctx, mock.MatchedBy(func(c *domain.Category) bool {
			return c.Slug == "go-backend"
		}), mock.MatchedBy(func(t []domain.CategoryTranslation) bool {
			return len(t) == 2
		})).Return(&domain.Category{ID: 1, Slug: "go-backend", CreatedAt: time.Now()}, nil)

		output, err := uc.CreateCategory(ctx, input)

		require.NoError(t, err)
		assert.Equal(t, int64(1), output.ID)
		assert.Equal(t, "go-backend", output.Slug)
		assert.Len(t, output.Translations, 2)
		mockRepo.AssertExpectations(t)
	})

	t.Run("fails with empty slug", func(t *testing.T) {
		uc := usecase.NewCategoryAdminUseCase(new(testutil.MockCategoryRepository))

		_, err := uc.CreateCategory(ctx, usecase.CreateCategoryInput{
			Slug: "",
			Translations: map[string]usecase.CategoryTranslationInput{
				"en": {Name: "Test"},
			},
		})

		require.Error(t, err)
		assert.Equal(t, domain.ErrInvalidInput, err)
	})

	t.Run("fails with duplicate slug", func(t *testing.T) {
		mockRepo := new(testutil.MockCategoryRepository)
		uc := usecase.NewCategoryAdminUseCase(mockRepo)

		input := usecase.CreateCategoryInput{
			Slug: "existing-slug",
			Translations: map[string]usecase.CategoryTranslationInput{
				"en": {Name: "Duplicate"},
			},
		}

		mockRepo.On("Create", ctx, mock.Anything, mock.Anything).
			Return((*domain.Category)(nil), domain.ErrConflict)

		_, err := uc.CreateCategory(ctx, input)

		require.Error(t, err)
		assert.Equal(t, domain.ErrConflict, err)
		mockRepo.AssertExpectations(t)
	})
}

func TestCategoryAdminUseCase_UpdateCategory(t *testing.T) {
	ctx := context.Background()

	t.Run("updates category successfully", func(t *testing.T) {
		mockRepo := new(testutil.MockCategoryRepository)
		uc := usecase.NewCategoryAdminUseCase(mockRepo)

		input := usecase.CreateCategoryInput{
			Slug: "updated-slug",
			Translations: map[string]usecase.CategoryTranslationInput{
				"en": {Name: "Updated Name"},
			},
		}

		mockRepo.On("Update", ctx, mock.MatchedBy(func(c *domain.Category) bool {
			return c.ID == int64(1) && c.Slug == "updated-slug"
		}), mock.MatchedBy(func(t []domain.CategoryTranslation) bool {
			return len(t) == 1 && t[0].CategoryID == int64(1)
		})).Return(nil)

		err := uc.UpdateCategory(ctx, 1, input)

		require.NoError(t, err)
		mockRepo.AssertExpectations(t)
	})

	t.Run("fails with empty slug", func(t *testing.T) {
		uc := usecase.NewCategoryAdminUseCase(new(testutil.MockCategoryRepository))

		err := uc.UpdateCategory(ctx, 1, usecase.CreateCategoryInput{
			Slug: "",
			Translations: map[string]usecase.CategoryTranslationInput{
				"en": {Name: "Test"},
			},
		})

		require.Error(t, err)
		assert.Equal(t, domain.ErrInvalidInput, err)
	})

	t.Run("fails with empty translations", func(t *testing.T) {
		uc := usecase.NewCategoryAdminUseCase(new(testutil.MockCategoryRepository))

		err := uc.UpdateCategory(ctx, 1, usecase.CreateCategoryInput{
			Slug:         "test",
			Translations: map[string]usecase.CategoryTranslationInput{},
		})

		require.Error(t, err)
		assert.Equal(t, domain.ErrInvalidInput, err)
	})

	t.Run("fails with duplicate slug", func(t *testing.T) {
		mockRepo := new(testutil.MockCategoryRepository)
		uc := usecase.NewCategoryAdminUseCase(mockRepo)

		input := usecase.CreateCategoryInput{
			Slug: "existing-slug",
			Translations: map[string]usecase.CategoryTranslationInput{
				"en": {Name: "Duplicate"},
			},
		}

		mockRepo.On("Update", ctx, mock.Anything, mock.Anything).
			Return(domain.ErrConflict)

		err := uc.UpdateCategory(ctx, 1, input)

		require.Error(t, err)
		assert.Equal(t, domain.ErrConflict, err)
		mockRepo.AssertExpectations(t)
	})
}

func TestCategoryAdminUseCase_DeleteCategory(t *testing.T) {
	ctx := context.Background()

	t.Run("deletes category successfully", func(t *testing.T) {
		mockRepo := new(testutil.MockCategoryRepository)
		uc := usecase.NewCategoryAdminUseCase(mockRepo)

		mockRepo.On("Delete", ctx, int64(1)).Return(nil)

		err := uc.DeleteCategory(ctx, 1)

		require.NoError(t, err)
		mockRepo.AssertExpectations(t)
	})

	t.Run("returns error when not found", func(t *testing.T) {
		mockRepo := new(testutil.MockCategoryRepository)
		uc := usecase.NewCategoryAdminUseCase(mockRepo)

		mockRepo.On("Delete", ctx, int64(999)).Return(domain.ErrNotFound)

		err := uc.DeleteCategory(ctx, 999)

		require.Error(t, err)
		assert.Equal(t, domain.ErrNotFound, err)
		mockRepo.AssertExpectations(t)
	})
}
