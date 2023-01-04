import React from "react";

const NovelWorld = ({lightNovel}) => {
    return (
        <div className='lightNovel'>

                <div>
                    <p>{lightNovel.status}</p>
                </div>
                <div>
                    <img src={lightNovel.coverImage.large !== 'N/A' ? lightNovel.coverImage.large : 'https://viaplaceholder.com/400'} alt={lightNovel.Title} />
                </div>
                <div>
                    <span>{lightNovel.format}</span>
                    <h3>{lightNovel.title.english !== null ? lightNovel.title.english : lightNovel.title.romaji}</h3>
                </div>

        </div>
    )
}

export default NovelWorld;