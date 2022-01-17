import { Badge } from '@mui/material'
import React from 'react'
import { img_300, unavailable } from '../../config'
import CustomModal from '../CustomModal/CustomModal';
import './Card.css'

const Card = ({
        id, 
        poster, 
        title, 
        date, 
        media_type, 
        vote_average
    }) => {
        return (
            <CustomModal media_type={media_type} id={id}>
                <Badge badgeContent={vote_average} color={vote_average>5 ? 'primary' : 'secondary'} />
                    <img src={poster ? `${img_300}/${poster}` : unavailable} alt={title} />
                <b className="title">{title}</b>
                <div className="subText">
                    <span>{media_type === 'tv' ? 'TV Series' : "Movie"}</span>
                    <span>{date}</span>
                </div>
            </CustomModal>
        )
}

export default Card
