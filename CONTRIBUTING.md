# Contributing to MarketFlow AI

Thank you for your interest in contributing to **MarketFlow AI**! We welcome contributions from developers of all experience levels.

---

## 🧭 Code of Conduct

By participating in this project, you agree to abide by our values of respect, inclusivity, and collaboration.

---

## 🛠 How to Contribute

### 1. Reporting Bugs
- Search existing [Issues](https://github.com/HaithamAbuDraz/MarketFlow-Ai/issues) before submitting a new one.
- Use the **Bug Report Template** and provide clear steps to reproduce.

### 2. Suggesting Enhancements
- Open a feature request issue outlining the rationale, suggested design, and alternatives considered.

### 3. Submitting Pull Requests
1. Fork the repo and create your branch from `main`:
   ```bash
   git checkout -b feature/my-feature-name
   ```
2. Ensure your code compiles and passes all checks:
   ```bash
   cd frontend
   npm run build
   ```
3. Commit with [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat: ...` for new features
   - `fix: ...` for bug fixes
   - `docs: ...` for documentation
   - `refactor: ...` for code refactoring
   - `chore: ...` for build/tooling maintenance
4. Push to your fork and submit a Pull Request to `main`.

---

## 🎨 Code Style Guidelines

- **React / Frontend**:
  - Keep components modular and single-responsibility.
  - Use Tailwind CSS tokens and utility classes cleanly.
  - Use `@/` path aliases for internal imports.
  - Test responsive breakpoints on mobile (`< 1024px`) and desktop.

- **Laravel / Backend**:
  - Adhere to PSR-12 coding standards.
  - Keep business logic in Services or Actions when applicable.
  - Use Form Requests for payload validation.
