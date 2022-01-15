import React from 'react'
import './CustomPagination.css'
import { Pagination } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: "dark",
    },
});

const CustomPagination = ({ setPage, numOfPages }) => {
    const pageChange = (page) => {
        setPage(page);
        window.scroll(0,0);
    }

    return (
        <div className="pagination">
            <ThemeProvider theme={theme}>
                <Pagination count={numOfPages} onChange={(e) => pageChange(e.target.textContent)} />
            </ThemeProvider>
        </div>
    )
}

export default CustomPagination
