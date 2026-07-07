#!/usr/bin/env sh
set -eu

cd "$(dirname "$0")/.."

echo "==> Installing dependencies"
npm ci

echo "==> Generating Payload types"
npm run generate:types

echo "==> Generating Payload import map"
npm run generate:importmap

echo "==> Running production build"
npm run build

echo "==> Server build completed"
