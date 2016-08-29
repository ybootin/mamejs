# Mame Emscripten compiler
The goal is to provide an easy to use mame compiler for emscripten. optimize, and reference compilation option.

At the final stage, this project should provide build configuration for each emulator. ans each emulator should build in one command line.

see http://docs.mamedev.org/initialsetup/compilingmame.html#emscripten-javascript-and-html for more infos about mame compilation with emscripten

All of this is absolutly experimental ! Browsers are still à little bit slow to run everything correctly, and generated js file is big (about 20M not gz), but it works : 
https://archive.org/details/arcade_outrun


## Build image

The docker image is actually not available on dockerhub, you must build it by yourself 

    ./build-docker.sh

This can take a while, emscripten compilation take more than one our

## Usage

The Docker image provide all tools, and can directly be used as a command, like this : 

    docker run --rm \
               -v $(pwd)/mame:/mame \
               -v /etc/localtime:/etc/localtime:ro \ # share localtime to avoid clock screw # http://stackoverflow.com/questions/24551592/how-to-make-sure-dockers-time-syncs-with-that-of-the-host
               -w /mame mame-compiler \
               /emsdk_portable/emscripten/master/emmake make SUBTARGET=bublbobl SOURCES=src/mame/drivers/bublbobl.cpp

The `./build-game.sh` script build mame for running Bubble Bobble in `emulators/mamebublbobl.js` (UNTESTED - loader still in dev)

you can clean the mame build using `./clean.sh` script

## Next step

Provide a script for compile each game, such as

    ./build.sh bublbobl

your help is greatly appreciated !


