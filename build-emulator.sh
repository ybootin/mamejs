#!/bin/bash

# bubblbobbl test, just a simple compilation test for the moment, will be updated later
docker run --rm \
		   -v $(pwd)/mame:/mame \
		   -v /etc/localtime:/etc/localtime:ro \ # share localtime to avoid clock screw # http://stackoverflow.com/questions/24551592/how-to-make-sure-dockers-time-syncs-with-that-of-the-host
		   -w /mame mame-compiler \
		   /emsdk_portable/emscripten/master/emmake make SUBTARGET=bublbobl SOURCES=src/mame/drivers/bublbobl.cpp

mkdir emulators
mv mame/mamebublbobl.js emulators/