#!/bin/bash

#make clean
docker run --rm \
		   -v $(pwd)/mame:/mame \
		   -v /etc/localtime:/etc/localtime:ro \
		   -w /mame mame-compiler \
		   /emsdk_portable/emscripten/master/emmake make clean

