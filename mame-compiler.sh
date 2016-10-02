#!/bin/bash

trap "exit" INT

########## ENV VARS ##############

OUTPUT_PATH="dist/"
OUTPUT_FILENAME="mame.js"
MAME_PATH="$(pwd)/mame"

# Docker env var (ybootin/mamejs-compiler:latest on dockerhub)
DOCKER_IMAGE_NAME="mamejs-compiler:latest"
DOCKER_IMAGE="ybootin/$DOCKER_IMAGE_NAME"

# emmake command inside the docker machine
EMMAKE_CMD="docker run --rm -v $MAME_PATH:/mame -w /mame $DOCKER_IMAGE /emsdk_portable/emscripten/master/emmake"

# driver path inside the mame path
DRIVERS_PATH="src/mame/drivers/"

####################################

usage() {
  echo "-------------------------------------------------"
  echo "mame-compiler  - Emscripten build tool for JS target"
  echo ""
  echo "Usage: ./mame-compiler.sh drivers"
  echo ""
  echo "  ex : ./mame-compiler.sh cps1,cps2,cp3"
  echo ""
  echo "build result > $BUILD_PATH$OUTPUT_FILENAME"
  echo "-------------------------------------------------"
}

error() {
  printf "ERROR $1"
  echo ""
  usage
  exit
}

if [ "$1" = "--builddocker" ]; then
  docker build -t "$DOCKER_IMAGE_NAME" - < Dockerfile
  exit
fi

if [ "$1" = "--clean" ]; then
  $EMMAKE_CMD make clean
  exit
fi

# split drivers name from $1
GAMES=$(echo $1 | tr "," " ")

if [ "$GAMES" = "" ]; then
  error "You must specify at least one game name"
fi

EXTENSION=".cpp"
SOURCES=""
CURRENT_SEPARATOR=""
for game in $GAMES
do
  # check if driver file exists !
  sourcefile="$DRIVERS_PATH$game$EXTENSION"
  if [ ! -f "$MAME_PATH/$sourcefile" ]; then
      error "driver source not exists for game $game!\n(file doesn't exists $MAME_PATH/$sourcefile)"
  fi
  SOURCES="$SOURCES$CURRENT_SEPARATOR$sourcefile"
  CURRENT_SEPARATOR=","
done

# generate a build name for each build
# better do this than a `make clean`, because many files are pre-compiled on first run
SUBTARGET=$(date +%Y)$(date +%m)$(date +%d)$(date +%H)$(date +%M)

# compiler
$EMMAKE_CMD make SUBTARGET=$SUBTARGET SOURCES=$SOURCES

if [ ! -d "$OUTPUT_PATH" ]; then
  mkdir $OUTPUT_PATH
fi

# copy all & gzip
BUILD_PATH_FULL="$OUTPUT_PATH$OUTPUT_FILENAME"

cp -f "$MAME_PATH""/mame""$SUBTARGET"".js" "$BUILD_PATH_FULL" && \
gzip -c "$BUILD_PATH_FULL" > "$BUILD_PATH_FULL.gz"

printf "All done, open http://rawgit.com/ybootin/mamejs/master/tools/gamelist-generator.html to test your build"
