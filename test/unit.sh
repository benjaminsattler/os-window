#!/bin/sh

python -m SimpleHTTPServer 8000 &

pid=$!
npx mocha-chrome http://localhost:8000/test/unit/
kill ${pid}
