import React from "react";
import { Link } from "react-router-dom";
import './NovelInfo.css'
import data from "./idVolume.json";


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

         <div className='Ln-info'>

            <div className="Nav-Bar">
               <button id="nav-bar-home-btn"><Link to='/' style={{ textDecoration: 'none' }}>Home</Link></button>
               <button id="nav-bar-list-btn"><Link to='/list' style={{ textDecoration: 'none' }}>List</Link></button>
               <button id="nav-bar-account-btn">Account</button>
            </div>

            <div className="Ln-pic">
               <img src={lninfos.coverImage.large !== 'N/A' ? lninfos.coverImage.large : 'https://viaplaceholder.com/400'} alt={lninfos.title.english} />
            </div>

            <div className="Ln-title">
               <h1>{lninfos.title.english}</h1>
               <h4>{lninfos.title.romaji}</h4>
               <h4>{lninfos.title.native}</h4>
            </div>

            <div className="Ln-description">
               <h2>summary</h2>
               <p>{lninfos.description.replace(/<br\s*\\?>/g, "\r\n")}</p>
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
      </>
    )
}

export default NovelInfo;