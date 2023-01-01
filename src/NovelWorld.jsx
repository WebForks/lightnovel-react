import React from "react";

const NovelWorld = ({lightNovel}) => {
    return (
        <div className='lightNovel'>
            <div>
                <p>{lightNovel.status}</p>
            </div>
            <div>
                <img src={lightNovel.coverImage.large !== 'N/A' ? lightNovel.Poster : 'https://viaplaceholder.com/400'} alt={lightNovel.Title} />
            </div>
            <div>
                <span>{lightNovel.format}</span>
                <h3>{lightNovel.title.english}</h3>
            </div>
        </div>
    )
}

export default NovelWorld;