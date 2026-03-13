#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const envPath = path.join(__dirname, '..', '.env')

function parseVersion(versionString) {
  const match = versionString.match(/(\d+)\.(\d+)\.(\d+)/)
  if (!match) throw new Error(`Invalid version format: ${versionString}`)
  return {
    major: parseInt(match[1], 10),
    minor: parseInt(match[2], 10),
    patch: parseInt(match[3], 10),
  }
}

function bumpVersion(version, type) {
  const { major, minor, patch } = parseVersion(version)

  switch (type) {
    case 'major':
      return `${major + 1}.0.0`
    case 'minor':
      return `${major}.${minor + 1}.0`
    case 'patch':
      return `${major}.${minor}.${patch + 1}`
    default:
      throw new Error(`Invalid version type: ${type}`)
  }
}

function updateEnvVersion(newVersion) {
  let envContent = fs.readFileSync(envPath, 'utf-8')
  envContent = envContent.replace(
    /VITE_APP_VERSION\s*=\s*[\d.]+/,
    `VITE_APP_VERSION = ${newVersion}`
  )
  fs.writeFileSync(envPath, envContent, 'utf-8')
}

function updatePackageJsonVersion(newVersion) {
  const packageJsonPath = path.join(__dirname, '..', 'package.json')
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))
  packageJson.version = newVersion
  fs.writeFileSync(
    packageJsonPath,
    JSON.stringify(packageJson, null, 2) + '\n',
    'utf-8'
  )
}

function createGitTag(version) {
  try {
    execSync(`git tag -a v${version} -m "chore: release v${version}"`, {
      stdio: 'pipe',
    })
  } catch (error) {
    // Tag might already exist, ignore
  }
}

function generateChangelog() {
  try {
    execSync(
      'yarn conventional-changelog -p conventionalcommits -i CHANGELOG.md -s --config .versionrc.json',
      { stdio: 'inherit' }
    )
  } catch (error) {
    console.warn('⚠️  Changelog generation had issues, but continuing...')
  }
}

function commitRelease(version) {
  try {
    execSync('git add CHANGELOG.md package.json .env', { stdio: 'pipe' })
    execSync(`git commit -m "chore: release v${version}"`, { stdio: 'inherit' })
    console.log(`📦 Committed release v${version}`)
  } catch (error) {
    console.warn(
      '⚠️  Could not commit release files (maybe no changes or not a git repo)'
    )
  }
}

try {
  const bumpType = process.argv[2]
  if (!bumpType) {
    console.error('Usage: node bump-version.js <major|minor|patch>')
    process.exit(1)
  }

  const envContent = fs.readFileSync(envPath, 'utf-8')
  const versionMatch = envContent.match(/VITE_APP_VERSION\s*=\s*([\d.]+)/)
  if (!versionMatch) {
    throw new Error('VITE_APP_VERSION not found in .env')
  }

  const currentVersion = versionMatch[1]
  const newVersion = bumpVersion(currentVersion, bumpType)

  updateEnvVersion(newVersion)
  updatePackageJsonVersion(newVersion)
  generateChangelog()
  commitRelease(newVersion)
  createGitTag(newVersion)

  console.log(`✅ Version bumped: ${currentVersion} → ${newVersion}`)
  console.log(`📝 Updated .env and package.json`)
  console.log(`📋 Generated changelog`)
  console.log(`🏷️  Created git tag v${newVersion}`)
} catch (error) {
  console.error(`❌ Error: ${error.message}`)
  process.exit(1)
}
