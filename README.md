1. Delete const { AbortController } = require("abort-controller"); from fetch.js anilist-node package
2. install npm version 9.4.0 and nodejs version 18.12.1 using nvm
3. run npm run build
4. run npm install -g serve
5. run npm install forever -g
6. cd into builds folder and run forever start -c "serve -s" ./
7. cd into backend folder and run forever start -c "node index.js" ./

npm list -g = corepack, forever, npm, serve
