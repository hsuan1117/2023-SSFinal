#!/bin/zsh
/Applications/CocosCreator/Creator/2.4.8/CocosCreator.app/Contents/MacOS/CocosCreator --path "$(pwd)" --build "platform=web-desktop;debug=true"
echo ""
gh-pages -d build/web-desktop
echo "Deployed!"
cd ..
wget https://github.com/hsuan1117/2023-SSFinal/archive/refs/heads/main.zip -o FinalProject.zip
md5 FinalProject.zip