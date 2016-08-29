# Mame Emscripten compiler
The goal is to provide an easy to use mame compiler for emscripten. optimize, and reference compilation option.

At the final stage, this project should provide build configuration for each emulator. ans each emulator should build in one command line.

see http://docs.mamedev.org/initialsetup/compilingmame.html#emscripten-javascript-and-html for more infos about mame compilation with emscripten

## Build image

The docker image is not actually available on dockerhub, you must build it yourself 

	./build-docker.sh

This can take a while, emscripten compilation is more than one our

## Usage

the base idea is to provide the docker image as a binary, to be used like this : 
	
	docker run -i -v $(pwd):/mame -w /mame --rm mame-compiler make SOURCES=src/mame/drivers/pacman.cpp

But this don't work for the moment. To make it work, you must laucn a shell inside the docker, and launch the command inside

	docker run -i -v $(pwd):/mame -w /mame --rm mame-compiler sh -c "/bin/bash"

and than, compile your game inside the shell : 
	
	emmake make SUBTARGET=bubblebobble SOURCES=src/mame/drivers/bublbobl.cpp



