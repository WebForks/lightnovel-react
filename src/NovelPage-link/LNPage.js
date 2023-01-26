import React, { useEffect, useState } from "react";
import {useLocation} from 'react-router-dom';
import NovelInfo from "./NovelInfo.jsx";

const LNPage = () => {

   //gets the manga id from the url
   const location = useLocation();
   const id = parseInt(location.pathname.replace( /^\D+/g, ''));
   const anilist = require('anilist-node');
   const Anilist = new anilist();


   const [LnInfo, setLnInfo] = useState([]);

   //https://stackoverflow.com/questions/70609856/get-a-list-of-files-in-a-react-web-application
   
   //gets info of the manga id
   const processData = async () => {
      let info = []
      const data = await Anilist.media.manga(id);
      info.push(data);
      setLnInfo(info)
    }

   useEffect(() => {
      processData();
   }, []);

   return (
      <> 
         <div>
            {LnInfo.map((lninfos) => (
               <NovelInfo lninfos={lninfos} />
            ))}
         </div>

      </>   

   )
}

export default LNPage;