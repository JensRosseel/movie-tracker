import React from 'react'
import { img_300, unavailable } from '../../config'
import './Card.css'

const Card = ({
        id, 
        poster, 
        title, 
        date, 
        media_type, 
        vote_avarage
    }) => {
        return (
            <div className="card">
                <img src={poster ? `${img_300}/${poster}` : unavailable} alt={title} />
                <b className="title">{title}</b>
                <div className="subText">
                    <span>{media_type === 'tv' ? 'TV Series' : "Movie"}</span>
                    <span>{date}</span>
                </div>
            </div>
        )
}

export default Card
