# Emscripten compiler
#
# Build :
#   docker build -t mamejs-compiler:latest .
#
# Usage :
#   docker run --rm -v $(pwd)/mame:/mame -w /mame mamejs-compiler:latest /emsdk-portable/emscripten/master/emmake make SUBTARGET="buildname" SOURCES=src/mame/drivers/cps1.cpp,src/mame/drivers/cps2.cpp
#
FROM emscripten/emsdk:latest

MAINTAINER Yohan Boutin <yohan@comewithus.fr>

# use bash as default to use source
# http://stackoverflow.com/questions/20635472/using-the-run-instruction-in-a-dockerfile-with-source-does-not-work
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# download a version of mame, do it soon in the docker file in case of failure
RUN wget https://github.com/mamedev/mame/archive/mame0197.tar.gz && tar xzvf mame0197.tar.gz

RUN apt-get update
RUN apt-get -y upgrade

# http://docs.mamedev.org/initialsetup/compilingmame.html#debian-and-ubuntu-including-raspberry-pi-and-odroid-devices
RUN DEBIAN_FRONTEND=noninteractive apt-get -y install git build-essential cmake 2to3 python2-minimal python2 dh-python nodejs default-jre libsdl2-dev libsdl2-ttf-dev libfontconfig-dev qtbase5-dev wget

RUN ln -s /usr/bin/python2 /usr/bin/python

# Precompile a mame emulator to prebuild all libs like sdl2, and avoid fetch and build them at each run
RUN cd mame-mame0197 && emmake make SUBTARGET=test SOURCES=src/mame/drivers/cps1.cpp -j5 REGENIE=1 && cd ../ && rm -Rf mame-mame0197*
