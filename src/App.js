import React, { useEffect, useState } from "react";
import NovelWorld from "./NovelWorld";
import './App.css';

const App = () => {
   const handleKeyDown = event => {
      if (event.key === "Enter") {
         searchLightNovels(searchTerm)
      }
   }

   const [lightNovels, setLightNovels] = useState([]);
   const [searchTerm, setSearchTerm] = useState('')

   let myFilter = {
      format: "NOVEL"
   }

   const anilist = require('anilist-node');
   const Anilist = new anilist();

   const searchLightNovels = (title) => {
      const titles = String(title)
      Anilist.searchEntry.manga(titles, myFilter).then(data => {
          const media2 = (data.media);
          const idNumbers = media2.map(item => item.id);
          for (const i of idNumbers){
            Anilist.media.manga(i).then(data => {
                const a = JSON.stringify(data);
                const b = JSON.parse(a);
                console.log(b)
              })
          }
      });
   }

   useEffect(() => {
      searchLightNovels("Classroom of the Elite");
   }, []);

   return (
      <div className='Nav-Bar'>
         <div className='home-page-logo'>
            <button id='home-page'>Novel World</button>
         </div>
      
         <div className="search">
            <input id='search-bar'
               placeholder="Search for Light novels.."
               value={searchTerm}
               onChange={(e) => {setSearchTerm(e.target.value)}}
               onKeyDown={handleKeyDown}
            />
         </div>

         {
            lightNovels?.length > 0 
            ? (
               <div className="container">
                  {lightNovels.map((lightNovel) => (
                  <NovelWorld lightNovel={lightNovel} />
                  ))}
               </div>
            ) : (
               <div className="empty">
                  <h2>Light Novels not found</h2>
               </div>
            )
         }
    </div>

   );
}

export default App;
