# Mame Emscripten compiler
Provide a simple tool to build MAME for javascript in one command line.

This tool is build upon docker, so you should have docker installed on your system.
Go to http://docker.com to install Docker

## Usage
First, clone the module with recursion (this can take a while as it will clone MAME github repository):

    git clone --recursive git@github.com:mamejs/mamejs-compiler.git

Then go to the `mamejs-compiler` folder, and you can start build your first emulator. For example, you can build Capcom cps1 emulator for running Street Fighters 2 and others super cool games :

    ./build-emulator.sh cps1

First build will take a long time, because it will fetch docker image `ybootin/mamejs-compiler` from docker hub.
When everything is finished, it should have build 3 files in the `build/` folder

    cps1.js     --> the main emulator, uncompressed
    cps1.js.gz  --> the emulator gzip, can be directly use as this
    cps1.json   --> json Array containing drivers list of the build

You can also build an emulator with multiple drivers. For example, you can build MAME with cps1, cps2 and system16

    ./build-emulator.sh cps1,cps2,segas16a,segas16b

will build

    mame.js
    mame.js.gz
    mame.json

You can specified the build name as a second argument

    ./build-emulator.sh cps1,cps2,segas16a,segas16b multi

will build

    multi.js
    multi.js.gz
    multi.json

Now you can use the mame emulator with the mamejs-loader app !

## Using the `./emmake.sh` build tools

This script is a shorcut for the Emscripten `emmake make` tool.
You can use it simply as this:

    ./emmake.sh sourcesfiles subtargetname

For example, to build cps1, here the command

    ./emmake.sh src/mame/drivers/cps1.cpp cps1

This command will build the file 

    mame/mamecps1.js

if you ommit subtarget, it will build under `mame/mamemulti.js`

## Testing your emulator

Upload your emulator here : 
http://rawgit.com/mamejs/mamejs-compiler/master/gamelist-generator.html

It will output all embed drivers into a json file.

## Build image

You can build your own docker by yourself. 

    ./build-docker.sh

This can take a while, emscripten compilation take a long time


## Next step


your help is greatly appreciated !


