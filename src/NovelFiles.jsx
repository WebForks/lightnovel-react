import React from "react";
import { Link } from "react-router-dom";



const NovelFiles = (props) => {
   const {thisIdInfo, lninfos} = props;
    return (
         <div className="novelFiles">
            <div className="Volumes">
               <h3>{thisIdInfo[0].volumes}</h3>
            </div>

            <div className="Files">
               <ul style={{listStyleType: "none"}}>
                  {thisIdInfo[0].files.map((element, index) => {
                  return  <Link to={{pathname: `/read/${lninfos.id}/${element}`}}><li key={index}>{element}</li> </Link>})}
               </ul>
            </div>
            
            <div className="DownloadFiles">
               {thisIdInfo[0].files.map((element) => {
                  return  <a href={`http://localhost:3001/download/${lninfos.id}/${element}`}><button>download</button> </a>})
               }   
            </div>
         </div>   
    )
}

export default NovelFiles;