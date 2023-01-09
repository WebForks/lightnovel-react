import React from "react";
import { Link } from 'react-router-dom';


const NovelWorld = ({lightNovel}) => {
    return (
        <div className='lightNovel'>
            <Link to={{pathname: `/lightnovel/${lightNovel.id}`, state: {lightNovel}}}>
                <button>
                    <div>

                        <p>{lightNovel.status}</p>
                        <p>{lightNovel.id}</p>
                    </div>
                    <div>
                        <img src={lightNovel.coverImage.large !== 'N/A' ? lightNovel.coverImage.large : 'https://viaplaceholder.com/400'} alt={lightNovel.title.english} />
                    </div>
                    <div>
                        <span>{lightNovel.format}</span>
                        <h3>{lightNovel.title.english !== null ? lightNovel.title.english : lightNovel.title.romaji}</h3>
                    </div>
                </button>
            </Link>
        </div>
    )
}

export default NovelWorld;