const anilist = require('anilist-node');
const Anilist = new anilist();

let myFilter = {
   format: "NOVEL"
}

Anilist.searchEntry.manga("ReZERO -Starting Life in Another World", myFilter).then(data => {
   searchFile(data);
});

function searchFile(data) {
   let arr = [ { id: 85737, title: [Object] }, { id: 87262, title: [Object] } ];
   let idList = arr.map(obj => obj.id);
   console.log(idList[0]);
}