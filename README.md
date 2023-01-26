1. Delete const { AbortController } = require("abort-controller"); from fetch.js anilist-node package
   install npm version 9.4.0 and nodejs version 18.12.1
2. run npm run build
3. run npm install -g serve
4. run npm install forever -g
5. cd into builds folder and run "forever start -c "serve -s" ./"
