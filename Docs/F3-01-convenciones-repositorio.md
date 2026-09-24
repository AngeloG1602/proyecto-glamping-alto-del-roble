# F3-01 · Convenciones de Repositorio — Glamping Alto del Roble

> Cerrado — 21 sep 2026.

| Campo | Valor |
|---|---|
| Repositorio | `nova-alto-del-roble-web` |
| Ramas | `main` (producción) · `staging` · `dev` |
| Estructura | Next.js App Router estándar: `/app`, `/components`, `/lib`, `/prisma` |
| Reglas de negocio | Viven en `/lib/reservas` — nunca dentro de componentes |
| Commits | Atómicos, en español, formato `tipo(R-##): descripción` |
| Carpeta de docs | `/docs` — copia de los F-documentos según F2-05 |
| Linter/formato | ESLint + Prettier, config estándar de la agencia |
