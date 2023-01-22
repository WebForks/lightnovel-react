import React from "react";
import { Link } from "react-router-dom";
import data from "./idVolume.json";

import NovelFiles from './NovelFiles';

const NovelInfo = ({lninfos}) => {
   let volumeData = []
   data.map((postData) => {
      volumeData.push(postData);
   })
   
   let searchValue = String(lninfos.id);
   let thisIdInfo = [];

   for (let i = 0; i < volumeData.length; i++) {
      if (volumeData[i].id === searchValue) {
         thisIdInfo.push(volumeData[i])
      }
   }

   //console.log(thisIdInfo)
   //console.log(volumeData)
   //console.log(lninfos)

    return (
      <>
         <nav className="top-0 z-40 w-full shadow-lg navbar backdrop-blur bg-opacity-90">
            <div className="relative flex items-center h-16 mx-4 space-x-1 font-bold">
               <ul className="items-center hidden space-x-1 grow lg:flex">
                  <li className="block px-3 py-2 font-semibold rounded-md outline-none text-slate-300 hover:text-slate-200 hover:bg-gray-800 focus:bg-gray-800">
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
         
         <div className="flex">
         
            <div className="block w-auto h-auto mt-10 ml-20 overflow-auto" //block w-auto h-auto mt-10 ml-20 overflow-auto
            >
               <img className="shrink-0" src={lninfos.coverImage.large !== 'N/A' ? lninfos.coverImage.large : 'https://viaplaceholder.com/400'} alt={lninfos.title.english} />
            </div>
            
            <div className="flex-col mt-10 ml-10">
               <div className="w-auto h-auto mt-10 text-left Ln-title text-slate-300">
                  <h1 className="text-3xl">{lninfos.title.english}</h1>
                  <h4 className="text-base ">{lninfos.title.romaji}</h4>
                  <h4 className="text-base">{lninfos.title.native}</h4>
               </div>
               
               {
                  lninfos.description
                  ? (
                  <div className="w-auto h-auto mt-10 text-slate-300">
                     <h2>summary</h2>
                     <p>{lninfos.description.replace(/<[^>]*>/g, "") // ///<br\s*\\?>/g, "\r\n"
                     } </p> 
                  </div>
                  ) : (
                     <div className="noFiles">
                        <h2>No Summary</h2>
                     </div>
                  )
               }
            </div>

            <div className="Ln-genres"> {/*https://stackoverflow.com/questions/23310736/two-p-tag-in-same-line*/}
               <h2>genres: </h2>
                  <h4>{lninfos.genres.map((genre) => (
                     <button>{genre}</button>
                  ))}</h4>
            </div>

            <div className="Ln-status">
               <h3>status: {lninfos.status}</h3>
            </div>
            
            <div className="LN-dates">
               <h3>End month & year: {lninfos.endDate.month !== null ? lninfos.endDate.month : 'Releasing'}/{lninfos.endDate.year !== null ? lninfos.endDate.year : 'Releasing'}</h3> {/* need to put releasing/null if still releasing */}
               <h3>Start month & year: {lninfos.startDate.month} / {lninfos.startDate.year}</h3>
            </div>

            <div className="LN-volumes">
               <h3>Volumes: {lninfos.volumes !== null ? lninfos.volumes : 'Still releasing'}</h3>  {/* need to put releasing/null if still releasing */}
            </div>

         </div>
         


         {
            thisIdInfo[0]
            ? (
               <div className="hasFiles">
                  <NovelFiles thisIdInfo={thisIdInfo} lninfos={lninfos}/>
               </div>
            ) : (
               <div className="noFiles">
                  <h2>Light Novels not found</h2>
               </div>
            )
         }
         
      </>
    )
}

export default NovelInfo;