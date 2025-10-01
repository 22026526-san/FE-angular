# Angular 19+ Project Setup với ESLint, Prettier & Husky

Hướng dẫn chi tiết khởi tạo dự án Angular và cấu hình tự động kiểm tra code khi commit.

## 📋 Mục lục

- [Khởi tạo dự án](#khởi-tạo-dự-án)
- [Cài đặt ESLint](#cài-đặt-eslint)
- [Cài đặt Prettier](#cài-đặt-prettier)
- [Tích hợp Husky & Lint-staged](#tích-hợp-husky--lint-staged)
- [Cấu hình Git Line Endings](#cấu-hình-git-line-endings)
- [Sử dụng](#sử-dụng)

## 🚀 Khởi tạo dự án

### Cài đặt Angular CLI

```bash
npm install -g @angular/cli@latest
```

### Tạo project mới

```bash
ng new my-angular-project
cd my-angular-project
```

Chọn các tùy chọn phù hợp khi CLI hỏi về:

- Stylesheet format (CSS/SCSS/SASS/LESS)
- Server-Side Rendering (SSR)

## 🔍 Cài đặt ESLint

### Bước 1: Cài đặt các packages

```bash
npm install --save-dev eslint @eslint/js @angular-eslint/eslint-plugin @angular-eslint/template-parser typescript-eslint
```

### Bước 2: Tạo file cấu hình `eslint.config.js`

```javascript
// eslint.config.js
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('@angular-eslint/eslint-plugin');
const angularTemplate = require('@angular-eslint/eslint-plugin-template');

module.exports = tseslint.config(
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    extends: [...angularTemplate.configs.recommended, ...angularTemplate.configs.accessibility],
    rules: {},
  },
);
```

### Bước 3: Thêm scripts vào `package.json`

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

## 💅 Cài đặt Prettier

### Bước 1: Cài đặt packages

```bash
npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier
```

### Bước 2: Tạo file `.prettierrc`

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "endOfLine": "lf"
}
```

### Bước 3: Tạo file `.prettierignore`

```
# Dependencies
node_modules

# Build outputs
dist
build
.angular

# IDE
.vscode
.idea

# Logs
*.log
npm-debug.log*

# OS
.DS_Store
Thumbs.db
```

### Bước 4: Thêm scripts vào `package.json`

```json
{
  "scripts": {
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

### Bước 5: Cấu hình VS Code (tùy chọn)

Tạo file `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "eslint.validate": ["javascript", "typescript", "html"]
}
```

## 🐺 Tích hợp Husky & Lint-staged

### Bước 1: Cài đặt packages

```bash
npm install --save-dev husky lint-staged
```

### Bước 2: Khởi tạo Husky

```bash
npx husky init
```

Lệnh này sẽ tạo thư mục `.husky` và script `prepare` trong `package.json`.

### Bước 3: Cấu hình lint-staged

Thêm vào `package.json`:

```json
{
  "scripts": {
    "prepare": "husky"
  },
  "lint-staged": {
    "*.{ts,html}": ["eslint --fix", "prettier --write"],
    "*.{json,css,scss,md}": ["prettier --write"]
  }
}
```

### Bước 4: Tạo pre-commit hook

Tạo/Cập nhật file `.husky/pre-commit`:

```bash
npx lint-staged
```

### Bước 5: (Tùy chọn) Thêm commit-msg hook

Nếu muốn kiểm tra format của commit message:

```bash
npm install --save-dev @commitlint/cli @commitlint/config-conventional
```

Tạo file `commitlint.config.js`:

```javascript
module.exports = {
  extends: ['@commitlint/config-conventional'],
};
```

Tạo file `.husky/commit-msg`:

```bash
npx --no -- commitlint --edit $1
```

## 📝 Sử dụng

### Kiểm tra code thủ công

```bash
# Chạy ESLint
npm run lint

# Sửa lỗi ESLint tự động
npm run lint:fix

# Format code với Prettier
npm run format

# Kiểm tra format
npm run format:check
```

### Commit code

Khi bạn commit, Husky sẽ tự động:

1. Chạy ESLint trên các file `.ts` và `.html` đã staged
2. Chạy Prettier để format code
3. Chỉ cho phép commit nếu không có lỗi

```bash
git add .
git commit -m "feat: add new feature"
```

Nếu có lỗi, commit sẽ bị hủy và bạn cần sửa lỗi trước khi commit lại.

## 🎯 Commit Message Convention (nếu dùng commitlint)

Format: `<type>(<scope>): <subject>`

**Types:**

- `feat`: Tính năng mới
- `fix`: Sửa lỗi
- `docs`: Thay đổi documentation
- `style`: Format code (không ảnh hưởng logic)
- `refactor`: Refactor code
- `test`: Thêm/sửa tests
- `chore`: Thay đổi build process, tools, dependencies

**Ví dụ:**

```bash
git commit -m "feat(auth): add login functionality"
git commit -m "fix(api): resolve CORS issue"
git commit -m "docs: update README"
```

## 🔗 Tài liệu tham khảo

- [Angular ESLint](https://github.com/angular-eslint/angular-eslint)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Husky](https://typicode.github.io/husky/)
- [lint-staged](https://github.com/okonet/lint-staged)
- [Commitlint](https://commitlint.js.org/)
