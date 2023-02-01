import React from "react";
import { Link } from "react-router-dom";
import data from "../idVolume.json";

import NovelFiles from './NovelFiles';

const NovelInfo = ({lninfos}) => {
   //gets data from idVolume.json and stores it in an array
   let volumeData = []
   data.map((postData) => {
      volumeData.push(postData);
   })
   
   let searchValue = String(lninfos.id);
   let thisIdInfo = [];

   //searches through volumeData array to find matching id and pushes matching id info to thisIdInfo arary
   for (let i = 0; i < volumeData.length; i++) {
      if (volumeData[i].id === searchValue) {
         thisIdInfo.push(volumeData[i])
      }
   }

   //console.log(thisIdInfo) current pages info in idVolume.json (id: string, volumes: int, files: array[fileName])
   //console.log(volumeData) puts idVolume.json file into an array
   //console.log(lninfos) javascript object of the anilist api info of the current page novel/id

    return (
      <div className="">
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
         
         <div className=" mt-16 flex w-full">
         
            <div className="flex ml-16 mt-10 w-555 h-auto basis-auto">
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

               <div className="mt-5 flex text-1xl uppercase w-auto basis-auto"> {/*https://stackoverflow.com/questions/23310736/two-p-tag-in-same-line*/}
                  <h2 className="font-bold">genres: </h2>
                  <h4 className="flex ml-10 flex-row w-auto">{lninfos.genres.map((genre) => (
                     <button className="mr-10">{genre}</button>
                  ))}</h4>
               </div>

               <div className="mt-5 flex">
                  <h3 className="font-bold uppercase text-1xl">status:</h3>
                  <h3 className="ml-3">{lninfos.status}</h3>
               </div>
               
               <div className="mt-5 flex">
                  <h3 className="font-bold">Start Month & Year: </h3>
                  <h3 className="ml-3">{lninfos.startDate.month} / {lninfos.startDate.year}</h3>
               </div>

               <div className="flex">
                  <h3 className="font-bold">End month & year: </h3>
                  <h3 className="ml-3">{lninfos.endDate.month !== null ? lninfos.endDate.month : 'Releasing'}/{lninfos.endDate.year !== null ? lninfos.endDate.year : 'Releasing'}</h3>
               </div>

               <div className="mt-5 flex">
                  <h3 className="font-bold">Volumes:</h3>
                  <h3 className="ml-3">{lninfos.volumes !== undefined ? lninfos.volumes : thisIdInfo[0].volumes + " currently"}</h3>
               </div>
            </div>
         </div>
         


         {
            thisIdInfo[0]
            ? (
               <div className="justify-center text-center mt-14">
                  <h3 className="text-slate-300 text-3xl font-bold underline">Volumes</h3>
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
