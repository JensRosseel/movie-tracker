import React, { useEffect }from 'react'
import axios from 'axios'
import Chip from '@mui/material/Chip';

const Genres = ({
    genres,
    setGenres,
    selectedGenres,
    setSelectedGenres,
    type,
    setPage,
}) => {
    const handleAdd = (genre) => {
        setSelectedGenres([...selectedGenres, genre]);
        setGenres(genres.filter((g) => g.id !== genre.id));
        setPage(1);
    };
    
    const handleRemove = (genre) => {
        setSelectedGenres(
          selectedGenres.filter((selected) => selected.id !== genre.id)
        );
        setGenres([...genres, genre]);
        setPage(1);
    };

    const fetchGenres = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);

        setGenres(data.genres);
    }

    useEffect(() => {
        fetchGenres();

        return () => {
            setGenres({});
        } // eslint-disable-next-line 
    }, []);

    return (
        <div style={{ padding: '6px' }}>
            { selectedGenres.map((genre) => (
                <Chip
                    key={genre.id}
                    label={genre.name}
                    color='secondary'
                    style={{ margin: '2px' }}
                    clickable
                    onDelete={() => handleRemove(genre)}
                />
            )) }
            { genres.map((genre) => (
                <Chip
                    key={genre.id}
                    label={genre.name}
                    color='primary'
                    style={{ margin: '2px' }}
                    clickable
                    onClick={() => handleAdd(genre)}
                />
            )) }
        </div>
    )
}

export default Genres
