 #!/bin/env sh
cd ./build-support/
npm install

export PATH="`pwd`/node_modules/node/bin:$PATH"

echo new path: $PATH

cd ..

npm install
npm run build
