#!/usr/bin/env sh
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
echo "Generating OpenAPI client in ${SCRIPT_DIR}/src/generated/api"
rm -rf "${SCRIPT_DIR}/src/generated/api"
npx openapi-typescript https://developer.peblar.com/openapi.yaml -o  ${SCRIPT_DIR}/src/generated/api/v1.d.ts