import React, { useEffect, useState } from "react";
import {useLocation} from 'react-router-dom';
import NovelInfo from "./NovelInfo.jsx";

const LNPage = () => {
   const location = useLocation();
   const id = parseInt(location.pathname.replace( /^\D+/g, ''));
   const anilist = require('anilist-node');
   const Anilist = new anilist();


   const [LnInfo, setLnInfo] = useState([]);

   const processData = async () => {
      let info = []
      const data = await Anilist.media.manga(id);
      info.push(data);
      setLnInfo(info)
    }

   console.log(LnInfo)
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