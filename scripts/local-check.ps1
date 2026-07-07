param(
  [switch]$SkipBuild
)

$ErrorActionPreference = 'Stop'

Push-Location (Join-Path $PSScriptRoot '..')
try {
  Write-Host '==> Generating Payload types'
  npm run generate:types

  Write-Host '==> Generating Payload import map'
  npm run generate:importmap

  Write-Host '==> Running lint'
  npm run lint

  if (-not $SkipBuild) {
    Write-Host '==> Running production build'
    npm run build
  }

  Write-Host '==> Local check completed'
} finally {
  Pop-Location
}
