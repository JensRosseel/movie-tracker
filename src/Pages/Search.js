import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Card from '../components/Card/Card';
import CustomPagination from '../components/Pagination/CustomPagination';
import './Page.css'

const Search = () => {
    const [type, setType] = useState(0);
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState();

    const theme = createTheme({
        palette: {
            mode: "dark",
        },
    });

    const fetchSearch = async () => { 
        const { data } = await axios.get(`https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`);
        
        setContent(data.results);
        setNumOfPages(data.total_pages);
    }   

    useEffect(() => {
        window.scroll(0, 0);
        fetchSearch(); // eslint-disable-next-line
    }, [type, page]);

    return (
        <>
            <ThemeProvider theme={theme}>
                <div style={{ display: 'flex', marginTop: '10px'}}>
                    <TextField 
                        style={{ flex: 1 }}
                        className="searchBox"
                        label="Search"
                        variant="filled"
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <Button onClick={fetchSearch} variant='contained' style={{ marginLeft: 10 }} ><SearchIcon /></Button>
                </div>
                <Tabs 
                    centered
                    value={type} 
                    indicatorColor='primary' 
                    textColor='primary'
                    onChange={(newValue) => {
                        setType(newValue);
                        setPage(1);
                    }}
                >
                    <Tab style={{ width: '50%'}} label="Search Movies" />
                    <Tab style={{ width: '50%'}} label="Search TV Series" />
                </Tabs>
            </ThemeProvider>
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
                            media_type={type ? "tv" : "movie"}
                            vote_average={c.vote_average}
                        />
                    ))
                }
                {
                    searchText && !content && (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)
                }
                </div>
                {numOfPages>1 && (
                    <CustomPagination setPage={setPage} numOfPages={numOfPages} />
                )} 
            </div>
            
        </>
    )
}

export default Search
