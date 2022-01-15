import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Card from '../components/Card/Card'
import CustomPagination from '../components/Pagination/CustomPagination'

const Trending = () => {
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);

    const fetchTrending = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`); 

        setContent(data.results);
    }

    useEffect(() => {
        fetchTrending();
    }, [page])

    return (
        <>
            <div className="page">
                <div className="cards">
                    {
                        content && content.map((c) => (
                            <Card
                                key={c.id} 
                                id={c.id} 
                                poster={c.poster_path} 
                                title={c.title || c.name} 
                                date={c.first_air_date || c.release_date}
                                media_type={c.media_type}
                                vote_average={c.vote_average}
                            />
                        ))
                    }
                </div>
                <CustomPagination setPage={setPage}/>
            </div>
        </>  
    )
}

export default Trending
