package testutil

import (
	"context"

	"github.com/PulidoLuciano/LucianoPulido.git/internal/domain"
	"github.com/PulidoLuciano/LucianoPulido.git/internal/port"
	"github.com/stretchr/testify/mock"
)

var _ port.CategoryRepository = (*MockCategoryRepository)(nil)

type MockCategoryRepository struct {
	mock.Mock
}

func (m *MockCategoryRepository) ListByPostID(ctx context.Context, postID int64, lang string) ([]domain.CategoryWithName, error) {
	args := m.Called(ctx, postID, lang)
	return args.Get(0).([]domain.CategoryWithName), args.Error(1)
}

func (m *MockCategoryRepository) ListAll(ctx context.Context, lang string) ([]domain.CategoryWithName, error) {
	args := m.Called(ctx, lang)
	return args.Get(0).([]domain.CategoryWithName), args.Error(1)
}

func (m *MockCategoryRepository) List(ctx context.Context) ([]domain.Category, []domain.CategoryTranslation, error) {
	args := m.Called(ctx)
	return args.Get(0).([]domain.Category), args.Get(1).([]domain.CategoryTranslation), args.Error(2)
}

func (m *MockCategoryRepository) GetByID(ctx context.Context, id int64) (*domain.Category, []domain.CategoryTranslation, error) {
	args := m.Called(ctx, id)
	return args.Get(0).(*domain.Category), args.Get(1).([]domain.CategoryTranslation), args.Error(2)
}

func (m *MockCategoryRepository) Create(ctx context.Context, category *domain.Category, translations []domain.CategoryTranslation) (*domain.Category, error) {
	args := m.Called(ctx, category, translations)
	return args.Get(0).(*domain.Category), args.Error(1)
}

func (m *MockCategoryRepository) Update(ctx context.Context, category *domain.Category, translations []domain.CategoryTranslation) error {
	args := m.Called(ctx, category, translations)
	return args.Error(0)
}

func (m *MockCategoryRepository) Delete(ctx context.Context, id int64) error {
	args := m.Called(ctx, id)
	return args.Error(0)
}

var _ port.PostRepository = (*MockPostRepository)(nil)

type MockPostRepository struct {
	mock.Mock
}

func (m *MockPostRepository) List(ctx context.Context, lang string, categorySlug string, page int, perPage int) ([]domain.PostWithTranslation, int64, error) {
	args := m.Called(ctx, lang, categorySlug, page, perPage)
	return args.Get(0).([]domain.PostWithTranslation), args.Get(1).(int64), args.Error(2)
}

func (m *MockPostRepository) ListAll(ctx context.Context, lang string, categorySlug string, page int, perPage int) ([]domain.PostWithTranslation, int64, error) {
	args := m.Called(ctx, lang, categorySlug, page, perPage)
	return args.Get(0).([]domain.PostWithTranslation), args.Get(1).(int64), args.Error(2)
}

func (m *MockPostRepository) GetBySlug(ctx context.Context, slug string, lang string) (*domain.PostWithTranslation, error) {
	args := m.Called(ctx, slug, lang)
	return args.Get(0).(*domain.PostWithTranslation), args.Error(1)
}

func (m *MockPostRepository) GetByID(ctx context.Context, id int64) (*domain.Post, []domain.PostTranslation, []int64, error) {
	args := m.Called(ctx, id)
	return args.Get(0).(*domain.Post), args.Get(1).([]domain.PostTranslation), args.Get(2).([]int64), args.Error(3)
}

func (m *MockPostRepository) Create(ctx context.Context, post *domain.Post, translations []domain.PostTranslation, categoryIDs []int64) (*domain.Post, error) {
	args := m.Called(ctx, post, translations, categoryIDs)
	return args.Get(0).(*domain.Post), args.Error(1)
}

func (m *MockPostRepository) Update(ctx context.Context, post *domain.Post, translations []domain.PostTranslation, categoryIDs []int64) error {
	args := m.Called(ctx, post, translations, categoryIDs)
	return args.Error(0)
}

func (m *MockPostRepository) Delete(ctx context.Context, id int64) error {
	args := m.Called(ctx, id)
	return args.Error(0)
}

func (m *MockPostRepository) GetCategoryNames(ctx context.Context, postID int64, lang string) ([]domain.CategoryWithName, error) {
	args := m.Called(ctx, postID, lang)
	return args.Get(0).([]domain.CategoryWithName), args.Error(1)
}

var _ port.AuthRepository = (*MockAuthRepository)(nil)

type MockAuthRepository struct {
	mock.Mock
}

func (m *MockAuthRepository) GetAdminByEmail(ctx context.Context, email string) (*domain.Admin, error) {
	args := m.Called(ctx, email)
	return args.Get(0).(*domain.Admin), args.Error(1)
}

func (m *MockAuthRepository) CreateSession(ctx context.Context, adminID int64, durationHours int) (*domain.Session, error) {
	args := m.Called(ctx, adminID, durationHours)
	return args.Get(0).(*domain.Session), args.Error(1)
}

func (m *MockAuthRepository) GetSession(ctx context.Context, token string) (*domain.Session, error) {
	args := m.Called(ctx, token)
	return args.Get(0).(*domain.Session), args.Error(1)
}

func (m *MockAuthRepository) DeleteSession(ctx context.Context, token string) error {
	args := m.Called(ctx, token)
	return args.Error(0)
}

func (m *MockAuthRepository) DeleteSessionsByAdmin(ctx context.Context, adminID int64) error {
	args := m.Called(ctx, adminID)
	return args.Error(0)
}

func (m *MockAuthRepository) RecordLoginAttempt(ctx context.Context, email string) error {
	args := m.Called(ctx, email)
	return args.Error(0)
}

func (m *MockAuthRepository) IsAccountLocked(ctx context.Context, email string, maxAttempts int, lockoutMin int) (bool, error) {
	args := m.Called(ctx, email, maxAttempts, lockoutMin)
	return args.Bool(0), args.Error(1)
}

func (m *MockAuthRepository) DeleteExpiredSessions(ctx context.Context) (int64, error) {
	args := m.Called(ctx)
	return args.Get(0).(int64), args.Error(1)
}
