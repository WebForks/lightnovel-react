let myFilter = {
   format: "NOVEL"
}

const anilist = require('anilist-node');
const Anilist = new anilist();

Anilist.searchEntry.manga(null, myFilter,1,25).then(data => {
   console.log(data);
});