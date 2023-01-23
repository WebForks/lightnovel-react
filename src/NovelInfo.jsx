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
      <div className="">
         <nav className="flex  justify-center bg-gray-700 w-full fixed top-0 shadow-lg backdrop-blur bg-opacity-90 h-16 items-center z-40">
               <ul className="flex text-slate-300 font-bold">
                  <li className="mr-6">
                     <Link to='/'>Home</Link>
                  </li>
                  <li className="mr-6">
                     <Link to='/list'>List</Link>
                  </li>
                  <li className="">
                     <Link to='/login'>Account</Link>
                  </li>
               </ul>
         </nav>
         
         <div className=" mt-16 flex w-full">
         
            <div className="flex ml-16 mt-10 w-555 h-full basis-auto">
               <img className="" src={lninfos.coverImage.large !== 'N/A' ? lninfos.coverImage.large : 'https://viaplaceholder.com/400'} alt={lninfos.title.english} />
            </div>
            
            <div className="mt-10 text-slate-300 ml-10">
               <div className="font-bold">
                  <h1 className="font-bold text-6xl">{lninfos.title.english}</h1>
                  <h4 className=" ">{lninfos.title.romaji}</h4>
                  <h4 className="">{lninfos.title.native}</h4>
               </div>
               
               {
                  lninfos.description
                  ? (
                  <div className="mt-10">
                     <h2 className="font-bold text-2xl uppercase underline">summary</h2>
                     <p>{lninfos.description.replace(/<[^>]*>/g, "") // ///<br\s*\\?>/g, "\r\n"
                     } </p> 
                  </div>
                  ) : (
                     <div className="noFiles">
                        <h2 className="font-bold text-2xl uppercase underline">summary</h2>
                        <h2>No Summary</h2>
                     </div>
                  )
               }

               <div className="mt-10"> {/*https://stackoverflow.com/questions/23310736/two-p-tag-in-same-line*/}
                  <h2>genres: </h2>
                  <h4 className="flex ml-10 flex-row">{lninfos.genres.map((genre) => (
                     <button className="mr-10">{genre}</button>
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
         
      </div>
    )
}

export default NovelInfo;