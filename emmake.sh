#!/bin/bash

DOCKER_IMAGE="ybootin/mamejs-compiler:latest"
EMMAKE_PATH="/emsdk_portable/emscripten/master/emmake"
MAME_PATH="$(pwd)/mame"

emmake() {
  docker run --rm \
         -v $MAME_PATH:/mame \
         -v /etc/localtime:/etc/localtime:ro \
         -w /mame $DOCKER_IMAGE \
         $EMMAKE_PATH make SUBTARGET=$2 SOURCES=$1
}

clean() {
  docker run --rm \
     -v $MAME_PATH:/mame \
     -v /etc/localtime:/etc/localtime:ro \
     -w /mame $DOCKER_IMAGE \
     $EMMAKE_PATH make clean
}

error() {
  echo "ERROR $1"
  echo ""
  usage
  exit
}

usage() {
  echo "emcc emmake tool for mamejs"
  echo ""
  echo "Build emulator with docker"
  echo ""
  echo "Usage: ./emmake.sh sources subtarget"
  echo ""
  echo "  ex : ./emmake.sh src/mame/drivers/cps1.cpp cps1"
  echo ""
  echo "you can also specify multiple sources"
  echo "  ex : ./emmake.sh src/mame/drivers/cps1.cpp,src/mame/drivers/cps2 cps"
  echo " will compile mame with cps1 & cps2 emulators"
}

SUBTARGET="$2"
SOURCES="$1"

if [ "$SOURCES" = "clean" ]; then
  clean
  exit
elif [ "$SOURCES" = "" ] ; then
  error "you must specify the sources files"
elif [ "$SUBTARGET" = "" ]; then
  SUBTARGET = "multi"
fi

emmake "$SOURCES" "$SUBTARGET"

