import React from "react";
import { Link } from "react-router-dom";



const NovelFiles = (props) => {
   const { thisIdInfo, lninfos } = props;
   return (
      <div className="text-slate-300 mt-7">
         <div className="">
            <ol className="list-none items-center flex flex-col">
               {thisIdInfo[0].files.map((element, index) => {
                  return ([
                     <div key={index} className="flex justify-between text-center items-center">
                        <span className="text-lg mr-2">{index + 1}.</span>
                        <Link to={{ pathname: `/read/${lninfos.id}/${element}` }}><li key={index}>{element}</li></Link>
                        <a className="ml-3 hover:bg-gray-900 p-1 rounded-lg" href={`https://light-novel.moe/files/${lninfos.id}/${element}`}><button className="">download</button> </a>
                        <div className="mb-10 "></div>
                     </div>
                  ])
               })}
            </ol>
         </div>
      </div>
   )
}

export default NovelFiles;