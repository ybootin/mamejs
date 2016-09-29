#!/bin/bash
# simple template tool to embed all assets an simple html file
# all path are relative to this folder

TEMPLATE="template.html"
ASSETS=( "SPLASHSCREEN" )
ASSETSFILES=( "../assets/splashscreen.jpg" )

# http://stackoverflow.com/questions/59895/can-a-bash-script-tell-which-directory-it-is-stored-in
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )/"

tmpl=$(cat "$DIR$TEMPLATE")

for i in "${ASSETS[@]}"
do
  CURRENT="\{\{"${ASSETS[$i]}"\}\}"
  CURRENTF=$(base64 $DIR${ASSETSFILES[$i]})

  tmpl=${tmpl//$CURRENT/$CURRENTF}
done

echo $tmpl
