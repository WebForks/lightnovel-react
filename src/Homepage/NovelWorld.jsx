import React from "react";
import { Link } from 'react-router-dom';


const NovelWorld = ({lightNovel}) => {
    return (
        <div className='relative m-6 border-0 border-transparent border-none border-rad rounded-xl w-80 h-auto shadow-3xl transition-all duration-0.4 ease-custom-timing'>
            <Link to={{pathname: `/lightnovel/${lightNovel.id}`, state: {lightNovel}}}>
                <button>
                    
                    <div>
                        <img className="rounded-xl" src={lightNovel.coverImage.large !== 'N/A' ? lightNovel.coverImage.large : 'https://viaplaceholder.com/400'} alt={lightNovel.title.english} />
                    </div>
                    
                    <div className="w-full h-full">
                        <h3 className="mt-2 text-xl text-left break-words text-slate-200 line-clamp-3">{lightNovel.title.english !== null ? lightNovel.title.english : lightNovel.title.romaji}</h3>
                    </div>

                    <div className="flex mt-2 text-xs">
                        <p className="flex items-center gap-1 text-lg grow text-slate-200">{lightNovel.status}</p>
                        <span className="flex items-center gap-1 text-lg text-slate-200">{lightNovel.format}</span>
                    </div>
                    
                </button>
            </Link>
        </div>
    )
}

export default NovelWorld;