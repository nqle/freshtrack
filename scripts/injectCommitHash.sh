#!/bin/bash

set -eu

COMMIT_HASH=$(git rev-parse HEAD)
FILE_PATH="dist/index.html"
OS="$(uname)"

if [[ "$OS" == "Darwin" ]]; then
    sed -i '' "s/VERSION_PLACEHOLDER/$COMMIT_HASH/" $FILE_PATH
else
    sed -i "s/VERSION_PLACEHOLDER/$COMMIT_HASH/" $FILE_PATH
fi

echo "Injected commit hash: $COMMIT_HASH"