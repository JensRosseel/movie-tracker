import './App.css';
import Header from './components/Header/Header';
import Nav from './components/Nav';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Container from '@material-ui/core/container';
import Trending from './Pages/Trending';
import Movies from './Pages/Movies';
import Series from './Pages/Series';
import Search from './Pages/Search';
import './Pages/Page.css'

function App() {
  return (
    <>
      <Router>
        <Header />
        <Container>
          <Routes>
            <Route path="/movies" element={<Movies />} />
            <Route path="/series" element={<Series />} />
            <Route path="/search" element={<Search />} />
            <Route path="/" element={<Trending />} />
          </Routes>   
        </Container>
        <Nav />
      </Router>   
    </>  
  );
}

export default App;
