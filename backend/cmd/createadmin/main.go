package main

import (
	"database/sql"
	"flag"
	"fmt"
	"log/slog"
	"os"
	"syscall"

	_ "github.com/lib/pq"
	"golang.org/x/crypto/bcrypt"
	"golang.org/x/term"

	"github.com/PulidoLuciano/LucianoPulido.git/internal/config"
)

func hashPassword(password string, cost int) (string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), cost)
	if err != nil {
		return "", err
	}
	return string(hash), nil
}

func main() {
	logger := slog.New(slog.NewTextHandler(os.Stderr, nil))

	cfg := config.Load()

	email := flag.String("email", "", "Admin email (required)")
	flag.Parse()

	if *email == "" {
		fmt.Fprintln(os.Stderr, "Usage: createadmin --email=admin@example.com")
		flag.PrintDefaults()
		os.Exit(1)
	}

	fmt.Fprint(os.Stderr, "Password: ")
	passwordBytes, err := term.ReadPassword(int(syscall.Stdin))
	if err != nil {
		logger.Error("failed to read password", "error", err)
		os.Exit(1)
	}
	fmt.Fprintln(os.Stderr)

	if len(passwordBytes) == 0 {
		logger.Error("password cannot be empty")
		os.Exit(1)
	}

	db, err := sql.Open("postgres", cfg.DatabaseURL)
	if err != nil {
		logger.Error("failed to open database", "error", err)
		os.Exit(1)
	}
	defer db.Close()

	if err := db.Ping(); err != nil {
		logger.Error("failed to ping database", "error", err)
		os.Exit(1)
	}

	hash, err := hashPassword(string(passwordBytes), cfg.BcryptCost)
	if err != nil {
		logger.Error("failed to hash password", "error", err)
		os.Exit(1)
	}

	var existingEmail string
	err = db.QueryRow(`SELECT email FROM admins WHERE email = $1`, *email).Scan(&existingEmail)
	if err == nil {
		logger.Error("admin already exists", "email", *email)
		os.Exit(1)
	}

	_, err = db.Exec(`INSERT INTO admins (email, password_hash) VALUES ($1, $2)`, *email, hash)
	if err != nil {
		logger.Error("failed to insert admin", "error", err)
		os.Exit(1)
	}

	logger.Info("admin created", "email", *email)
}
