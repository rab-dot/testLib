# Versioning Guide

This project uses [Semantic Versioning](https://semver.org/) and [Conventional Commits](https://www.conventionalcommits.org/).

## Version Format

Version is stored in `.env` as `VITE_APP_VERSION` and follows the format: `MAJOR.MINOR.PATCH`

Example: `5.0.0`

## Commit Types

- **feat**: A new feature (bumps MINOR version)
- **fix**: A bug fix (bumps PATCH version)
- **docs**: Documentation only changes
- **style**: Changes that don't affect code meaning (formatting, etc.)
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: Code change that improves performance
- **test**: Adding or updating tests
- **chore**: Changes to build process, dependencies, etc.
- **ci**: Changes to CI/CD configuration
- **revert**: Reverts a previous commit

## Making Commits

Use commitizen to make conventional commits:

```bash
yarn cz
```

This will guide you through creating a properly formatted commit message.

## Generating Changelog

### Initialize Changelog (first time only)

```bash
yarn changelog:init
```

This generates a complete changelog from all git history.

### Update Changelog

After making commits, update the changelog:

```bash
yarn changelog
```

This prepends new changes to `CHANGELOG.md`.

## Bumping Version

### Patch Release (bug fixes)

```bash
yarn version:patch
```

Updates version from `5.0.0` → `5.0.1`

### Minor Release (new features)

```bash
yarn version:minor
```

Updates version from `5.0.0` → `5.1.0`

### Major Release (breaking changes)

```bash
yarn version:major
```

Updates version from `5.0.0` → `6.0.0`

## Workflow Example

1. Make changes and commit using `yarn cz`
2. When ready to release, bump version: `yarn version:patch`
3. Generate changelog: `yarn changelog`
4. Review changes in `CHANGELOG.md`
5. Commit version bump and changelog: `git add . && git commit -m "chore: release v5.0.1"`
6. Tag release: `git tag v5.0.1`
7. Push: `git push && git push --tags`

## Version Info Page

The version information is displayed in the app at the Version Info page, which reads from `CHANGELOG.md` and displays it with proper formatting.
