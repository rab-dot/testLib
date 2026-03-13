## [0.19.0](https://github.com/mironhlopkovus-del/esma-system-frontend/compare/1.9.0...2.0.0) (2026-03-12)

### Features

- **pages/version-info:** added versioning added ([88fa72c](https://github.com/mironhlopkovus-del/esma-system-frontend/commit/88fa72c))

## [0.18.0](https://github.com/mironhlopkovus-del/esma-system-frontend/compare/1.8.0...1.9.0) (2026-03-12)

### Features

- **ci:** integrate Steiger FSD linter with CI pipeline (#18) ([9c4c600](https://github.com/mironhlopkovus-del/esma-system-frontend/commit/9c4c600))

## [0.17.0](https://github.com/mironhlopkovus-del/esma-system-frontend/compare/1.7.0...1.8.0) (2026-03-11)

### Features

- **testing:** added ci with unit tests (#16) ([c1a666e](https://github.com/mironhlopkovus-del/esma-system-frontend/commit/c1a666e))

## [0.16.0](https://github.com/mironhlopkovus-del/esma-system-frontend/compare/1.6.0...1.7.0) (2026-03-05)

### Features

- **shared/ui:** added setting for toggle tooltip and create conditional tooltip component (#14) ([6560c8e](https://github.com/mironhlopkovus-del/esma-system-frontend/commit/6560c8e))

## [0.15.0](https://github.com/mironhlopkovus-del/esma-system-frontend/compare/1.5.0...1.6.0) (2026-02-18)

### Features

- **widgets/filters-sidebar:** ui for mobile filters drawer (#12) ([d9a0a33](https://github.com/mironhlopkovus-del/esma-system-frontend/commit/d9a0a33))

## [0.14.0](https://github.com/mironhlopkovus-del/esma-system-frontend/compare/1.4.0...1.5.0) (2026-02-17)

### Features

- **shared/api:** feature/11 - config app for work with api container (#11) ([ea481e8](https://github.com/mironhlopkovus-del/esma-system-frontend/commit/ea481e8))

## [0.13.0](https://github.com/mironhlopkovus-del/esma-system-frontend/compare/1.3.0...1.4.0) (2026-02-16)

### Features

- **widgets/search-results:** Feature/10 - adaptive results contols component (#10) ([0d14e5a](https://github.com/mironhlopkovus-del/esma-system-frontend/commit/0d14e5a))

## [0.12.1](https://github.com/mironhlopkovus-del/esma-system-frontend/compare/1.2.0...1.3.0) (2026-02-15)

### Bug Fixes

- **dependencies:** fix types and dependencies (#9) ([de0d2a2](https://github.com/mironhlopkovus-del/esma-system-frontend/commit/de0d2a2))

## [0.12.0](https://github.com/mironhlopkovus-del/esma-system-frontend/compare/1.1.0...1.2.0) (2026-02-14)

### Features

- **build:** added react compiler (#8) ([bc2350b](https://github.com/mironhlopkovus-del/esma-system-frontend/commit/bc2350b))

## [0.11.0](https://github.com/mironhlopkovus-del/esma-system-frontend/compare/1.0.0...1.1.0) (2026-02-13)

### Features

- **widgets/search-results:** added pagination with chosing limits (#7) ([0feffd4](https://github.com/mironhlopkovus-del/esma-system-frontend/commit/0feffd4))

## [0.10.0](https://github.com/mironhlopkovus-del/esma-system-frontend/compare/0.9.0...1.0.0) (2026-02-12)

### Features

- **widgets/search-results:** added virtualization for the SearchResults(#6) ([629e6e8](https://github.com/mironhlopkovus-del/esma-system-frontend/commit/629e6e8))

## [0.9.0](https://github.com/mironhlopkovus-del/esma-system-frontend/compare/0.8.0...0.9.0) (2026-02-12)

### Features

- **pages/search:** added server logic for search and filters (#5) ([bcf3ebf](https://github.com/mironhlopkovus-del/esma-system-frontend/commit/bcf3ebf))

## [0.8.0](https://github.com/mironhlopkovus-del/esma-system-frontend/compare/0.7.0...0.8.0) (2026-02-12)

### Features

- **shared/theme:** change theme switcher (#4) ([8cae7c0](https://github.com/mironhlopkovus-del/esma-system-frontend/commit/8cae7c0))

## [0.7.0](https://github.com/mironhlopkovus-del/esma-system-frontend/compare/0.6.0...0.7.0) (2026-02-12)

### Features

- **docker:** added docker configuration for mock (#3) ([4f0b302](https://github.com/mironhlopkovus-del/esma-system-frontend/commit/4f0b302))

## [0.6.0](https://github.com/mironhlopkovus-del/esma-system-frontend/compare/0.5.0...0.6.0) (2026-02-12)

### Features

- **shared/theme:** feature/2 - migration to chakra ui v3 (#2) ([fc91a99](https://github.com/mironhlopkovus-del/esma-system-frontend/commit/fc91a99))

## [0.5.0] (2026-02-10)

### Features

- **widgets/filters-sidebar:** added a collapsible/expandable facet filter sidebar panel
- **widgets/filters-sidebar:** added a mobile drawer for filters on small screens
- **entities/facet:** created `FacetGroup` component to display facet groups with checkboxes and counters
- **features/filters:** added filter model (`SelectedFilters`) — topics, persons, organizations, locations

## [0.4.0] (2026-02-05)

### Features

- **pages/search:** added document search page with responsive grid layout
- **widgets/search-bar:** created search bar widget
- **widgets/search-results:** created search results display widget
- **shared/api:** added `documentSearch` API module for full-text search

## [0.3.0] (2026-01-31)

### Features

- **shared/ui:** created reusable component library — `Badge`, `UIButton`, `UIIconButton`, `DeleteButton`, `DownloadButton`
- **shared/ui:** added input components — `UiInput`, `PasswordInput`
- **shared/ui:** added `NavLink` component for navigation links
- **shared/ui:** added `MotionBox` — a Chakra Box wrapper with Framer Motion support
- **shared/ui:** added `Snackbar` (`useSnackbar` hook) for notifications
- **shared/ui:** fixed `ErrorFallback` reset behavior

## [0.2.0] (2026-01-20)

### Features

- **pages/version-info:** added application version information page
- **widgets/sidebar:** created a collapsible sidebar with state persisted in `localStorage`
- **shared/ui/layout:** added main layout with dynamic offsets for header and sidebar
- **shared/hooks:** added `useLocalStorage` hook
- **features/user:** added modules — logout, profile, settings
- **shared/theme:** extended Chakra UI theme — customized `Modal`, `Popover`, `Card`, `Drawer`, `Tooltip`, `Menu` components
- **shared/theme:** added semantic colors `accent`, `accentBg`, `accentBgLight`

## [0.1.0] (2026-01-17)

### Features

- **pages/auth:** added authentication functionality
- **auth/model:** created authentication module — API, types, token storage
- **shared/libs:** added `crypto` utility (MD5 with salt)
- **shared/ui:** added `PrivateRoute` component for route protection

## [0.0.1] (2026-01-15)

### Project Initialization

- set up **Chakra UI** library with custom theme (dark/light mode)
- created project structure following **FSD** (Feature-Sliced Design) methodology
- configured **Tailwind CSS** v3
- added **layout** with **sidebar** and **header**
- added **theme switcher** (light / dark)
- configured `tsconfig.json` with path aliases (`@/`)
- configured `vite.config.ts` (SPA, alias, dev server on port 3001)
- configured **Husky** with `lint-staged` for pre-commit code checks
- configured **ESLint** (Airbnb + Prettier)
- added mock server for local development
