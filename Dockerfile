# Emscripten compiler
#
# Build :
#   docker build -t mamejs-compiler:latest .
#
# Usage :
#   docker run --rm -v $(pwd)/mame:/mame -w /mame mamejs-compiler:latest /emsdk_portable/emscripten/master/emmake make SUBTARGET="buildname" SOURCES=src/mame/drivers/cps1.cpp,src/mame/drivers/cps2.cpp
#
FROM debian:latest

MAINTAINER Yohan Boutin <yohan@comewithus.fr>

# use bash as default to use source
# http://stackoverflow.com/questions/20635472/using-the-run-instruction-in-a-dockerfile-with-source-does-not-work
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

RUN apt-get update
RUN apt-get -y upgrade

# http://docs.mamedev.org/initialsetup/compilingmame.html#debian-and-ubuntu-including-raspberry-pi-and-odroid-devices
RUN DEBIAN_FRONTEND=noninteractive apt-get -y install git build-essential cmake python2.7 nodejs default-jre libsdl2-dev libsdl2-ttf-dev libfontconfig-dev qt5-default wget

# emscripten installation, latest
RUN wget https://s3.amazonaws.com/mozilla-games/emscripten/releases/emsdk-portable.tar.gz

RUN tar -xzvf emsdk-portable.tar.gz

# Fetch the latest registry of available tools.
RUN emsdk_portable/emsdk update

# Download and install the latest SDK tools.
RUN emsdk_portable/emsdk install latest

# Set up the compiler configuration to point to the "latest" SDK.
RUN emsdk_portable/emsdk activate latest

# Linux/Mac OS X only: Set the current Emscripten path
# seems not working
RUN /bin/bash -c "source /emsdk_portable/emsdk_env.sh"

# Precompile a mame emulator to prebuild all libs like sdl2, and avoid fetch and build them at each run
RUN wget https://github.com/mamedev/mame/archive/mame0178.tar.gz && tar xzvf mame0178.tar.gz && cd mame-mame0178 && /emsdk_portable/emscripten/master/emmake make SUBTARGET=test SOURCES=src/mame/drivers/cps1.cpp && cd ../ && rm -Rf mame-mame0178*


