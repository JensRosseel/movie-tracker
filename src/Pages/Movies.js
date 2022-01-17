import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Card from '../components/Card/Card'
import CustomPagination from '../components/Pagination/CustomPagination'
import Genres from '../components/Genres'
import useGenre from '../hooks/useGenre'

const Movies = () => {
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState();
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const genreforURL = useGenre(selectedGenres);

    const fetchMovies = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`);

        setContent(data.results);
        setNumOfPages(data.total_pages);
    }

    useEffect(() => {
        fetchMovies(); // eslint-disable-next-line 
    }, [genreforURL, page]); 

    return (
        <>
            <div className="page">
                <Genres 
                    type='movie'
                    genres={genres}
                    setGenres={setGenres}
                    selectedGenres={selectedGenres}
                    setSelectedGenres={setSelectedGenres}
                    setPage={setPage}
                />
                <div className="cards">
                    {
                        content && content.map((c) => (
                            <Card
                                key={c.id} 
                                id={c.id} 
                                poster={c.poster_path} 
                                title={c.title || c.name} 
                                date={c.first_air_date || c.release_date}
                                media_type='movie'
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
