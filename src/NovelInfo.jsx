import React from "react";
import { Link } from "react-router-dom";
import './NovelInfo.css'

const NovelInfo = ({lninfos}) => {

    return (
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


               <h3>{lninfos.endDate.year !== null ? lninfos.endDate.year : 'Still releasing 1'}</h3> {/* need to put releasing/null if still releasing */}
               <h3>{lninfos.startDate.year}</h3>
               <h3>{lninfos.volumes !== null ? lninfos.volumes : 'Still releasing'}</h3>  {/* need to put releasing/null if still releasing */}
               <h3>{lninfos.siteUrl}</h3>
               <h3>{lninfos.countryOfOrigin}</h3>

        </div>
    )
}

export default NovelInfo;