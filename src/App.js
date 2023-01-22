import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NovelWorld from "./NovelWorld.jsx";
import SearchIcon from "./search.svg";
import "./index.css"


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
         <nav className="fixed top-0 z-40 w-full bg-gray-700 shadow-lg navbar backdrop-blur bg-opacity-90">
            <div className="relative flex items-center h-16 mx-4 space-x-1 font-bold">
               <ul className="hidden space-x-1 grow lg:flex justify-center">
                  <li className=" block px-3 py-2 font-semibold rounded-md outline-none text-slate-300 hover:text-slate-200 hover:bg-gray-800 focus:bg-gray-800">
                     <Link to='/'>Home</Link>
                  </li>
                  <li className="block px-3 py-2 font-semibold rounded-md outline-none text-slate-300 hover:text-slate-200 hover:bg-gray-800 focus:bg-gray-800">
                     <Link to='/list'>List</Link>
                  </li>
                  <li className="block px-3 py-2 font-semibold rounded-md outline-none text-slate-300 hover:text-slate-200 hover:bg-gray-800 focus:bg-gray-800">
                     <Link to='/login'>Account</Link>
                  </li>
               </ul>
            </div>
         </nav>

         <div className="flex items-center justify-center text-3xl rounded-lg">
            <input className="mt-40 text-center bg-gray-700 text-slate-300" //change my-40 to mt-40 maybe if want word outside of box
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
