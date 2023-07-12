import './App.css';
import Banner from './components/Banner';
import NavBar from './components/NavBar';
import Movies from './components/Movies';
import Pagination from './components/Pagination';
import Favourites from './components/Favourites';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageNotFound from './components/PageNotFound';

function App() {
  return (
    <>
      <BrowserRouter>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={
          <>
          <Banner></Banner>
          <Movies></Movies>
          </>
        }></Route>
        <Route path="/fav" element={
          <Favourites></Favourites>
        }></Route>
        <Route path="*" element={
          <PageNotFound></PageNotFound>
        }></Route>
      </Routes>
      
      </BrowserRouter>
    </>
  );
}

export default App;
