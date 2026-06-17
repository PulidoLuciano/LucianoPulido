package postgres_test

import (
	"context"
	"sort"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	"github.com/PulidoLuciano/LucianoPulido.git/internal/adapter/repository/postgres"
	"github.com/PulidoLuciano/LucianoPulido.git/internal/adapter/repository/postgres/testutil"
	"github.com/PulidoLuciano/LucianoPulido.git/internal/domain"
)

func setupCategoryRepo(t *testing.T) *postgres.CategoryRepo {
	t.Helper()
	db := testutil.SetupTestDB(t)
	return postgres.NewCategoryRepo(db)
}

func TestCategoryRepo_Create(t *testing.T) {
	repo := setupCategoryRepo(t)
	ctx := context.Background()

	t.Run("creates category with translations", func(t *testing.T) {
		cat := &domain.Category{Slug: "test-create"}
		translations := []domain.CategoryTranslation{
			{LanguageCode: "en", Name: "Test Create"},
			{LanguageCode: "es", Name: "Prueba Crear"},
		}

		created, err := repo.Create(ctx, cat, translations)

		require.NoError(t, err)
		assert.NotZero(t, created.ID)
		assert.Equal(t, "test-create", created.Slug)
		assert.False(t, created.CreatedAt.IsZero())
	})

	t.Run("fails on duplicate slug", func(t *testing.T) {
		cat := &domain.Category{Slug: "test-dup"}
		translations := []domain.CategoryTranslation{
			{LanguageCode: "en", Name: "Dup"},
		}

		_, err := repo.Create(ctx, cat, translations)
		require.NoError(t, err)

		cat2 := &domain.Category{Slug: "test-dup"}
		_, err = repo.Create(ctx, cat2, translations)
		require.Error(t, err)
	})
}

func TestCategoryRepo_List(t *testing.T) {
	repo := setupCategoryRepo(t)
	ctx := context.Background()

	t.Run("returns all categories with translations", func(t *testing.T) {
		cat1, _ := repo.Create(ctx, &domain.Category{Slug: "list-one"}, []domain.CategoryTranslation{
			{LanguageCode: "en", Name: "List One"},
			{LanguageCode: "es", Name: "Lista Uno"},
		})
		cat2, _ := repo.Create(ctx, &domain.Category{Slug: "list-two"}, []domain.CategoryTranslation{
			{LanguageCode: "en", Name: "List Two"},
		})

		categories, translations, err := repo.List(ctx)

		require.NoError(t, err)
		assert.GreaterOrEqual(t, len(categories), 2)
		assert.GreaterOrEqual(t, len(translations), 3)

		findCategory := func(slug string) *domain.Category {
			for i := range categories {
				if categories[i].Slug == slug {
					return &categories[i]
				}
			}
			return nil
		}

		assert.NotNil(t, findCategory("list-one"))
		assert.NotNil(t, findCategory("list-two"))
		assert.Equal(t, cat1.ID, findCategory("list-one").ID)
		assert.Equal(t, cat2.ID, findCategory("list-two").ID)
	})

	t.Run("returns empty slices when no categories", func(t *testing.T) {
		repo := setupCategoryRepo(t)
		categories, translations, err := repo.List(ctx)

		require.NoError(t, err)
		assert.Len(t, categories, 0)
		assert.Len(t, translations, 0)
	})
}

func TestCategoryRepo_GetByID(t *testing.T) {
	repo := setupCategoryRepo(t)
	ctx := context.Background()

	t.Run("returns category with translations", func(t *testing.T) {
		cat := &domain.Category{Slug: "getbyid-test"}
		created, _ := repo.Create(ctx, cat, []domain.CategoryTranslation{
			{LanguageCode: "en", Name: "GetByID Test"},
			{LanguageCode: "es", Name: "Prueba GetByID"},
		})

		found, translations, err := repo.GetByID(ctx, created.ID)

		require.NoError(t, err)
		assert.Equal(t, created.ID, found.ID)
		assert.Equal(t, "getbyid-test", found.Slug)
		assert.Len(t, translations, 2)

		sort.Slice(translations, func(i, j int) bool {
			return translations[i].LanguageCode < translations[j].LanguageCode
		})
		assert.Equal(t, "en", translations[0].LanguageCode)
		assert.Equal(t, "GetByID Test", translations[0].Name)
		assert.Equal(t, "es", translations[1].LanguageCode)
		assert.Equal(t, "Prueba GetByID", translations[1].Name)
	})

	t.Run("returns ErrNotFound for nonexistent id", func(t *testing.T) {
		_, _, err := repo.GetByID(ctx, 999999)

		require.Error(t, err)
		assert.Equal(t, domain.ErrNotFound, err)
	})
}

func TestCategoryRepo_Update(t *testing.T) {
	repo := setupCategoryRepo(t)
	ctx := context.Background()

	t.Run("updates slug and replaces translations", func(t *testing.T) {
		cat := &domain.Category{Slug: "update-orig"}
		created, _ := repo.Create(ctx, cat, []domain.CategoryTranslation{
			{LanguageCode: "en", Name: "Original"},
			{LanguageCode: "es", Name: "Original ES"},
		})

		created.Slug = "update-new"
		err := repo.Update(ctx, created, []domain.CategoryTranslation{
			{CategoryID: created.ID, LanguageCode: "en", Name: "Updated"},
		})

		require.NoError(t, err)

		found, translations, _ := repo.GetByID(ctx, created.ID)
		assert.Equal(t, "update-new", found.Slug)
		assert.Len(t, translations, 1)
		assert.Equal(t, "en", translations[0].LanguageCode)
		assert.Equal(t, "Updated", translations[0].Name)
	})
}

func TestCategoryRepo_Delete(t *testing.T) {
	repo := setupCategoryRepo(t)
	ctx := context.Background()

	t.Run("deletes existing category", func(t *testing.T) {
		cat, _ := repo.Create(ctx, &domain.Category{Slug: "delete-me"}, []domain.CategoryTranslation{
			{LanguageCode: "en", Name: "Delete Me"},
		})

		err := repo.Delete(ctx, cat.ID)
		require.NoError(t, err)

		_, _, err = repo.GetByID(ctx, cat.ID)
		assert.Equal(t, domain.ErrNotFound, err)
	})

	t.Run("returns ErrNotFound for nonexistent id", func(t *testing.T) {
		err := repo.Delete(ctx, 999999)
		require.Error(t, err)
		assert.Equal(t, domain.ErrNotFound, err)
	})
}

func TestCategoryRepo_ListByPostID(t *testing.T) {
	ctx := context.Background()
	db := testutil.SetupTestDB(t)
	repo := postgres.NewCategoryRepo(db)

	t.Run("returns categories for a post", func(t *testing.T) {
		cat, _ := repo.Create(ctx, &domain.Category{Slug: "post-cat-test"}, []domain.CategoryTranslation{
			{LanguageCode: "en", Name: "Post Cat Test"},
		})

		_, err := db.ExecContext(ctx,
			`INSERT INTO posts (slug, is_public) VALUES ('test-post', true)`)
		require.NoError(t, err)

		_, err = db.ExecContext(ctx,
			`INSERT INTO post_categories (post_id, category_id)
			 SELECT p.id, $1 FROM posts p WHERE p.slug = 'test-post'`, cat.ID)
		require.NoError(t, err)

		categories, err := repo.ListByPostID(ctx, cat.ID, "en")
		require.NoError(t, err)
		assert.NotNil(t, categories)
	})
}
