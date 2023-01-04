import React, { useEffect, useState } from "react";
import NovelWorld from "./NovelWorld";
import SearchIcon from "./search.svg";
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
      let shows = [];
      const titles = String(title)
      Anilist.searchEntry.manga(titles, myFilter).then(data => {
          for (const i of data.media.map(item => item.id)){
            Anilist.media.manga(i).then(data => {
               shows.push(data)
              })
          }
          console.log(shows)
          setLightNovels(shows)
      })
   }

   //https://stackoverflow.com/questions/63443574/react-searches-do-not-render
   useEffect(() => {
      searchLightNovels();
   }, []);

   return (

      <div className="app">
         <h1>NovelWorld</h1>

         <div className="search">
         <input
            placeholder="Search for Light Novels.."
            value={searchTerm}
            onChange={(e) => {setSearchTerm(e.target.value)}}
            onKeyDown={handleKeyDown}
         />
         <img src={SearchIcon} alt="search-icon" onClick={() => searchLightNovels(searchTerm)} />
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
