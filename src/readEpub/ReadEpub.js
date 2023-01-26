import React, { useState } from 'react'
import { ReactReader } from 'react-reader'
import {useLocation} from 'react-router-dom';

//https://www.npmjs.com/package/react-reader#limitations
//https://github.com/gerhardsletten/react-reader/blob/master/src/modules/EpubView/style.js
//https://github.com/gerhardsletten/react-reader/blob/master/src/modules/ReactReader/style.js
//https://github.com/gerhardsletten/react-reader

const ReadEpub = () => {
    const URLroute = useLocation();
    const myString = (URLroute.pathname.replace(/%20/g, " "));
    const epubFile = (myString.replace(/^\/read\//, ""));

    var fileURL = `http://localhost:3001/download/${epubFile}`;
    
    console.log(fileURL)

    const [location, setLocation] = useState(null)
    const locationChanged = epubcifi => {
      // epubcifi is a internal string used by epubjs to point to a location in an epub. It looks like this: epubcfi(/6/6[titlepage]!/4/2/12[pgepubid00003]/3:0)
      setLocation(epubcifi)
    }
    return (
      <div style={{ height: '100vh' }}>
        <ReactReader
            url= {fileURL}
            //title="My Book"
            showToc={false}
            location={location}
            locationChanged={locationChanged}
            getRendition={(rendition) => {
            const spine_get = rendition.book.spine.get.bind(rendition.book.spine);
                rendition.book.spine.get = function (target) {
                    let t = spine_get(target);
                    if (!t) {
                        t = spine_get(undefined);
                    }
                    return t;
                };
            }}        
        />
      </div>
    )
}
export default ReadEpub;