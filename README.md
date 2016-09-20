# mamejs - Run classics arcade games in your Browser

Work In Progress, Demo coming soon !

## MAME compiler
Provide a simple tool to build MAME for javascript with Emscripten in one command line.
see https://github.com/mamedev/mame for more informations

The Emscripten compiler is provide by a docker image, Go to http://docker.com to install Docker if you don't have it on your system

### Usage
First, clone the module with recursion (this can take a while as it will clone MAME github repository):

    git clone --recursive git@github.com:ybootin/mamejs.git

Then go to the `mamejs` folder, and you can start build your first emulator. For example, you can build Capcom cps1 emulator for running Street Fighters 2 and others super cool games :

    ./mame-compiler.sh cps1

First build will take a long time, because it will fetch docker image `ybootin/mamejs-compiler` from docker hub.
When everything is finished, it should have build 3 files in the `dist/` folder

    cps1.js     --> the main emulator, uncompressed
    cps1.js.gz  --> the emulator gzip
    cps1.json   --> json Array containing drivers list of the build

You can also build an emulator with multiple drivers. For example, you can build MAME with cps1, cps2 and system16

    ./mame-compiler.sh cps1,cps2,segas16a,segas16b

will build

    mame.js
    mame.js.gz
    mame.json

You can specified the build name as a second argument

    ./mame-compiler.sh cps1,cps2,segas16a,segas16b multi

will build

    multi.js
    multi.js.gz
    multi.json

Now you can use the mame emulator with the mamejs app !


### Testing your emulator

Upload your emulator here : 
http://rawgit.com/ybootin/mamejs/master/tools/gamelist-generator.html

It will output all embed drivers into a json file.

## Build image

You can build your own docker by yourself. 

    ./mame-compiler.sh --builddocker

This can take a while, emscripten compilation take a long time


### Next step


your help is greatly appreciated !

