param(
  [string]$OutputDir = '..\..\outputs\releases'
)

$ErrorActionPreference = 'Stop'

$ProjectRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$ResolvedOutputDir = [System.IO.Path]::GetFullPath((Join-Path $ProjectRoot $OutputDir))
$Timestamp = Get-Date -Format 'yyyyMMdd-HHmmss'
$ReleaseName = "company-site-$Timestamp"
$StagingDir = Join-Path $env:TEMP $ReleaseName
$ZipPath = Join-Path $ResolvedOutputDir "$ReleaseName.zip"

$ExcludeDirs = @(
  '.git',
  '.next',
  'node_modules',
  'db-backups',
  'public/media',
  'test-results',
  'playwright-report',
  'blob-report'
)

$ExcludeFiles = @(
  '.env',
  'company-site.db',
  'dev-server.log',
  'public/robots.txt',
  'public/sitemap.xml',
  'public/sitemap-0.xml'
)

function Test-IsExcluded {
  param([string]$RelativePath, [bool]$IsDirectory)

  $Normalized = $RelativePath -replace '\\', '/'

  foreach ($dir in $ExcludeDirs) {
    if ($Normalized -eq $dir -or $Normalized.StartsWith("$dir/")) {
      return $true
    }
  }

  if (-not $IsDirectory) {
    foreach ($file in $ExcludeFiles) {
      if ($Normalized -eq $file) {
        return $true
      }
    }
  }

  return $false
}

if (Test-Path $StagingDir) {
  Remove-Item -LiteralPath $StagingDir -Recurse -Force
}

New-Item -ItemType Directory -Path $StagingDir | Out-Null
New-Item -ItemType Directory -Path $ResolvedOutputDir -Force | Out-Null

Push-Location $ProjectRoot
try {
  Get-ChildItem -Force | ForEach-Object {
    $relative = $_.Name
    if (-not (Test-IsExcluded -RelativePath $relative -IsDirectory $_.PSIsContainer)) {
      Copy-Item -LiteralPath $_.FullName -Destination (Join-Path $StagingDir $_.Name) -Recurse -Force
    }
  }

  Compress-Archive -Path (Join-Path $StagingDir '*') -DestinationPath $ZipPath -Force
  if (-not (Test-Path $ZipPath)) {
    throw "Release package was not created: $ZipPath"
  }
  Write-Host "Release package created: $ZipPath"
} finally {
  Pop-Location
  if (Test-Path $StagingDir) {
    Remove-Item -LiteralPath $StagingDir -Recurse -Force
  }
}
