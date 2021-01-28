# Get version number
echo "what is the version number?"
read version
# Back to main folder
cd ..
# Go to the library project 
cd lib-workspace/projects/mat-phone-code-validator/
# Take build
ng build mat-phone-code-validator --prod
# Go to dist folder
cd ..
cd ..
cd dist/mat-phone-code-validator/
# Pack the dist files using npm
npm pack
# Back to demo project folder
cd ..
cd ..
cd ..
cd angularAppDemo/
# Install the packed package
npm install ../lib-workspace/dist/mat-phone-code-validator/mat-phone-code-validator-$version.tgz