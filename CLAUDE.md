# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A single-page note-taking application built with Vue 3 Composition API. Users can add/remove notes with search, sort-by-date, pagination, random background colors per note, and date stamps. The app is currently scaffolded but not yet implemented — `App.vue` displays the requirements spec rather than the actual UI.

## Sample UI
Video: https://rwazi-public.s3.amazonaws.com/interview/vue-notes-interview-project.webm

Screenshot: https://rwazi-public.s3.amazonaws.com/interview/rwazi-vue-notes-interview.png

## Commands

- `npm run dev` — start Vite dev server
- `npm run build` — type-check then build for production (runs `vue-tsc` + `vite build`)
- `npm run type-check` — run `vue-tsc` type checking only
- `npm run lint` — ESLint with auto-fix across .vue/.ts/.js files
- `npm run format` — Prettier on `src/`
- `npm run test:unit` — Vitest (runs in watch mode by default)
- `npm run test:e2e:dev` — Cypress e2e against Vite dev server (interactive)
- `npm run test:e2e` — Cypress e2e against production preview build

## Architecture

- **Framework**: Vue 3 with `<script setup lang="ts">` (Composition API), TypeScript, Vite
- **State management**: Pinia (stores in `src/stores/`)
- **Styling**: Tailwind CSS via PostCSS
- **Routing**: vue-router is installed but not yet configured (no router file exists)
- **Path alias**: `@` maps to `src/` (configured in `vite.config.ts` and `tsconfig.app.json`)
- **Unit tests**: Vitest + `@vue/test-utils`, test files live alongside components in `__tests__/` directories
- **E2E tests**: Cypress, specs in `cypress/e2e/`
