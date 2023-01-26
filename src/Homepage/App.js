import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NovelWorld from "./NovelWorld.jsx";
import SearchIcon from "../search.svg";
import "../index.css"


const App = () => {

   //Press Enter Key to search with searchbar
   const handleKeyDown = event => {
      if (event.key === "Enter") {
         searchLightNovels(searchTerm)
      }
   }

   const [lightNovels, setLightNovels] = useState([]);
   const [searchTerm, setSearchTerm] = useState('')

   //filter for anilist search
   let myFilter = {
      format: "NOVEL"
   }

   const anilist = require('anilist-node');
   const Anilist = new anilist();

   //takes search of string to find novels id and gets info.  Stores novel info in setLightNovels
   const searchLightNovels = async (title) => {
      let shows = [];
      const titles = String(title)
      const data = await Anilist.searchEntry.manga(titles, myFilter)
      await Promise.all(data.media.map(item => item.id).map(async i => {
           const data = await Anilist.media.manga(i)
           shows.push(data)
      }))
      setLightNovels(shows)
   }

   useEffect(() => {
      searchLightNovels();
   }, []);

   return (
      <div className="" >
         <nav className="flex justify-center bg-gray-700 w-full fixed top-0 shadow-lg backdrop-blur bg-opacity-90 h-16 items-center z-4">
               <ul className="flex text-slate-300 font-bold">
                  <li className="mr-6">
                     <Link className='hover:bg-gray-900 p-3 rounded-lg' to='/'>Home</Link>
                  </li>
                  <li className="mr-6">
                     <Link className='hover:bg-gray-900 p-3 rounded-lg' to='/list'>List</Link>
                  </li>
                  <li className="">
                     <Link className='hover:bg-gray-900 p-3 rounded-lg' to='/login'>Account</Link>
                  </li>
               </ul>
         </nav>

         <div className="flex items-center justify-center text-3xl rounded-lg">
            <input className="mt-40 text-center bg-gray-700 text-slate-300 text-3xl" //change my-40 to mt-40 maybe if want word outside of box
               placeholder="Search for Light Novels.."
               value={searchTerm}
               onChange={(e) => {setSearchTerm(e.target.value)}}
               onKeyDown={handleKeyDown}
            />
            <img className="mt-40 ml-2" //add mt-40 if want word outside of box
            src={SearchIcon} alt="search-icon" onClick={() => searchLightNovels(searchTerm)} />
         </div>
      
         {
            lightNovels?.length > 0 
            ? (
               <div className="flex flex-wrap items-center justify-center w-full mt-12">
                  {lightNovels.map((lightNovel) => (
                  <NovelWorld lightNovel={lightNovel} />
                  ))}
               </div>
            ) : (
               <div className="items-center justify-center w-full mt-12 text-center text-slate-300">
                  <h2>Light Novels not found</h2>
               </div>
            )
         }
    </div>
   
   );
}

export default App;
