# Rwazi Note App

A single-page note-taking application built with Vue 3 Composition API.

See [README.original.md](./README.original.md) for the original project requirements.

## Features

- Add and remove notes
- Search notes by text (case-insensitive)
- Sort notes by date created (newest/oldest first)
- Pagination (12 notes per page)
- Random pastel background color per note
- Date stamp on each note
- Persistent storage via localStorage
- Responsive layout (2/3/4 column grid)

## Tech Stack

- **Vue 3** with `<script setup lang="ts">` (Composition API)
- **Pinia** for state management
- **Tailwind CSS** for styling
- **Vite** for bundling and dev server
- **TypeScript** throughout

## Getting Started

```sh
npm install
npm run dev
```

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview production build |
| `npm run test:unit` | Run unit tests (Vitest) |
| `npm run test:e2e` | Run e2e tests (Cypress) against production build |
| `npm run test:e2e:dev` | Run e2e tests against dev server (interactive) |
| `npm run lint` | Lint with ESLint |
| `npm run format` | Format with Prettier |

## Project Structure

```
src/
├── App.vue                        # Main app (search, sort, pagination)
├── main.ts                        # App entry point
├── assets/main.css                # Tailwind imports
├── components/
│   ├── NoteCard.vue               # Individual note display
│   └── NoteInput.vue              # Note creation form
└── stores/
    └── notes.ts                   # Pinia store (CRUD + localStorage)
```

## Testing

- **Unit tests**: `src/stores/__tests__/notes.spec.ts` — tests for add, remove, and color generation
- **E2E tests**: `cypress/e2e/notes.cy.ts` — 10 tests covering all features end-to-end
