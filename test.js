let myFilter = {
format: "NOVEL"
}

const anilist = require('anilist-node');
const Anilist = new anilist();


let shows = [];

Anilist.searchEntry.manga("Classroom of the Elite", myFilter).then(data => {
   const idNumbers = data.media.map(item => item.id);
   console.log(idNumbers)
   for (const i of idNumbers){
      const a = Anilist.media.manga(i)
      shows.push(a)
   }
   console.log(shows)
});

const handleKeyDown = event => {
   if (event.key === "Enter") {
      searchLightNovels(searchTerm)
   }
}