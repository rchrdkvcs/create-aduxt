#!/bin/sh
set -e

node /app/api/build/server.js &
node /app/web/.output/server/index.mjs &

wait
