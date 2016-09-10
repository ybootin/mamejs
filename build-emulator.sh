#!/bin/bash

trap "exit" INT

########## ENV VARS ##############

EMMAKE_PATH="./emmake.sh"
DRIVERS_PATH="src/mame/drivers/"
SEPARATOR=","
EXTENSION=".cpp"
MAME_PATH="mame/"
BUILD_PATH="build/"

####################################

GAMES=$(echo $1 | tr "$SEPARATOR" " ")
OUTPUT_NAME=$2

error() {
  printf "ERROR $1"
  echo ""
  usage
  exit
}

usage() {
    echo "-------------------------------------------------"
    echo "mamejs emulator build tool"
    echo ""
    echo "Usage: ./build-emulator.sh drivers outputname"
    echo ""
    echo "  ex : ./build-emulator.sh cps1 mamecps1"
    echo ""
    echo "you can also specify multiple drivers"
    echo "  ex : ./build-emulator.sh cps1,cps2 cps"
    echo " will compile mamejs with cps1 & cps2 emulators"
    echo "-------------------------------------------------"
}

if [ "$GAMES" = "" ]; then
  error "You must specify at least one game name"
fi

SOURCES=""
CURRENT_SEPARATOR=""
NB_SOURCES=0
for game in $GAMES
do
    # check if driver file exists !
    sourcefile="$DRIVERS_PATH$game$EXTENSION"
    if [ ! -f "$MAME_PATH$sourcefile" ]; then
        error "driver source not exists for game $game!\n(file doesn't exists $MAME_PATH$sourcefile)"
    fi
    SOURCES="$SOURCES$CURRENT_SEPARATOR$sourcefile"
    CURRENT_SEPARATOR=","
    NB_SOURCES=$((NB_SOURCES + 1))
done

# default name if not specified
if [ "$OUTPUT_NAME" = "" ]; then
  if [ "$NB_SOURCES" = "1" ]; then
    OUTPUT_NAME="$GAMES"
  else
    OUTPUT_NAME="mame"
  fi
fi

# compiler
$EMMAKE_PATH "$SOURCES" "$OUTPUT_NAME"

if [ ! -d "$BUILD_PATH" ]; then
  mkdir $BUILD_PATH
fi

JS_NAME="$OUTPUT_NAME.js"
BUILD_PATH_FULL="$BUILD_PATH$JS_NAME"

# copy builded file to build folder, and also gunzip the js file
cp -f "$MAME_PATH""mame""$JS_NAME" "$BUILD_PATH_FULL"
gzip -c "$BUILD_PATH_FULL" > "$BUILD_PATH_FULL.gz"

# generate json array with all included drivers
# ex : ["m92", "segas16"]
JSON="["
JSON_SEPARATOR=""
for game in $GAMES
do
  JSON="$JSON""$JSON_SEPARATOR""\n\t\"$game\""
  JSON_SEPARATOR=","
done
JSON="$JSON""\n]"
printf $JSON > "$BUILD_PATH""/$OUTPUT_NAME"".json"
