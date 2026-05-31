# CI/CD Demo — учебный пайплайн

Реальный пример CI/CD на GitHub Actions для Node.js + Docker.

## Структура проекта

```
cicd-demo/
├── src/
│   ├── app.js          # Express приложение
│   └── server.js       # Точка входа
├── tests/
│   └── app.test.js     # Jest тесты
├── .github/
│   └── workflows/
│       └── ci-cd.yml   # GitHub Actions пайплайн
├── Dockerfile          # Мульти-стейдж сборка
├── docker-compose.yml  # Локальный запуск / staging
├── nginx.conf          # Reverse proxy
└── package.json
```

## Запуск локально

```bash
npm install
npm test          # тесты + coverage
npm run lint      # линтинг
npm run dev       # dev-сервер на :3000
```

## Запуск через Docker

```bash
docker build -t cicd-demo .
docker run -p 3000:3000 cicd-demo

# Или через compose (app + nginx)
docker compose up
```

## Пайплайн — что происходит при git push

| Шаг | Триггер | Что делает |
|-----|---------|------------|
| Lint | push/PR | ESLint проверяет код |
| Tests | push/PR | Jest + coverage ≥ 80% |
| Build | после lint+test | Docker image → GHCR |
| Deploy staging | после build | SSH deploy на staging |
| Integration tests | после staging | Smoke-тесты по HTTP |
| Deploy production | только main | SSH deploy + rollback |

## Секреты GitHub (Settings → Secrets)

```
STAGING_HOST        IP или hostname staging сервера
STAGING_USER        SSH пользователь
STAGING_SSH_KEY     Приватный SSH ключ

PROD_HOST           IP production сервера
PROD_USER           SSH пользователь
PROD_SSH_KEY        Приватный SSH ключ
```

## Environments (Settings → Environments)

- **staging** — автоматический деплой
- **production** — добавь "Required reviewers" для ручного approve

## API

```
GET /health              → { status: "ok", version: "..." }
GET /api/greet?name=Bob  → { message: "Hello, Bob!" }
```
