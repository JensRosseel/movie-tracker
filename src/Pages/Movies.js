import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Card from '../components/Card/Card'
import CustomPagination from '../components/Pagination/CustomPagination'

const Movies = () => {
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState();

    const fetchMovies = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en_US&sort_by=popularity.desc&include_adult=false&page=${page}`);

        setContent(data.results);
        setNumOfPages(data.total_pages);
    }

    useEffect(() => {
        fetchMovies();
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
                                media_type='Movie'
                                vote_average={c.vote_average}
                            />
                        ))
                    }
                </div>
                {numOfPages>1 && (
                    <CustomPagination setPage={setPage} numOfPages={numOfPages} />
                )}
            </div>
        </>
    )
}

export default Movies
