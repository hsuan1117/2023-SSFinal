#!/bin/zsh
/Applications/CocosCreator/Creator/2.4.8/CocosCreator.app/Contents/MacOS/CocosCreator --path "$(pwd)" --build "platform=web-desktop;debug=true"
gh-pages -d build/web-desktop