.PHONY: help install install-frontend install-backend dev dev-frontend dev-backend build build-frontend clean test

# Default target
help:
	@echo "Available commands:"
	@echo "  make install          - Install all dependencies (frontend + backend)"
	@echo "  make install-frontend - Install frontend dependencies"
	@echo "  make install-backend  - Install backend dependencies"
	@echo "  make dev              - Run both frontend and backend in development mode"
	@echo "  make dev-frontend     - Run frontend development server"
	@echo "  make dev-backend      - Run backend development server"
	@echo "  make build            - Build frontend for production"
	@echo "  make build-frontend   - Build frontend for production"
	@echo "  make clean            - Clean build artifacts and node_modules"
	@echo "  make test             - Run tests"

# Install all dependencies
install: install-frontend install-backend
	@echo "✅ All dependencies installed"

# Install frontend dependencies
install-frontend:
	@echo "📦 Installing frontend dependencies..."
	cd frontend && npm install

# Install backend dependencies
install-backend:
	@echo "📦 Installing backend dependencies..."
	cd backend && python3 -m venv venv && \
	. venv/bin/activate && \
	pip install -r requirements.txt

# Run both frontend and backend
dev:
	@echo "🚀 Starting development servers..."
	@echo "Frontend will run on http://localhost:5173"
	@echo "Backend will run on http://localhost:8000"
	@make -j2 dev-frontend dev-backend

# Run frontend development server
dev-frontend:
	@echo "🎨 Starting frontend development server..."
	cd frontend && npm run dev

# Run backend development server
dev-backend:
	@echo "⚙️  Starting backend development server..."
	cd backend && . venv/bin/activate && python -m uvicorn app.main:app --reload

# Build frontend for production
build: build-frontend

build-frontend:
	@echo "🏗️  Building frontend for production..."
	cd frontend && npm run build

# Clean build artifacts
clean:
	@echo "🧹 Cleaning build artifacts..."
	rm -rf frontend/dist
	rm -rf frontend/node_modules
	rm -rf backend/venv
	rm -rf backend/__pycache__
	rm -rf backend/app/__pycache__
	find . -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
	find . -type f -name "*.pyc" -delete 2>/dev/null || true
	@echo "✅ Clean complete"

# Run tests
test:
	@echo "🧪 Running tests..."
	cd backend && . venv/bin/activate && python -m pytest tests/
