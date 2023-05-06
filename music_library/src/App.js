import { useState, useRef, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createResource as fetchData } from './components/helper';

import SearchBar from './components/SearchBar';
import Gallery from './components/Gallery';
import { DataContext } from './contexts/DataContext';
import { SearchContext } from './contexts/SearchContext';
import AlbumView from './components/AlbumView';
import ArtistView from './components/ArtistView';
import Spinner from './components/Spinner';

import './App.css';


function App() {

  let [message, setMessage] = useState('Search for Music!');
  let [data, setData] = useState([]);
  let searchInput = useRef('')

  const renderGallery = () => {
    if (data) {
      return (
        <Suspense fallback={<Spinner />}>
          <Gallery data={data} />
        </Suspense>
      )
    }
  }

  const handleSearch = async searchTerm => {

    if (!searchTerm) return
    document.title = `${searchTerm} Music`;
    const response = await fetch(`https://itunes.apple.com/search?term=${searchTerm}`);
    const resData = await response.json();
    if (resData.results.length) {
      setData(resData.results)

    } else {
      setData([]);
      setMessage("Nothing found for this artist")
    }
    console.log(resData)
  }

  return (
    <div className="App">
      {message}
      <Router>
        <Routes>
          <Route path='/' element={
            <>
              <SearchContext.Provider value={
                {
                  term: searchInput,
                  handleSearch
                }
              }>
                <SearchBar />
              </SearchContext.Provider>

              <DataContext.Provider value={{ data }}>
                <Suspense fallback={<h1>Loading...</h1>}>
                  <Gallery />
                </Suspense>

              </DataContext.Provider>
            </>
          } />
          <Route path="/album/:id" element={<AlbumView />} />
          <Route path="/artist/:id" element={<ArtistView />} />

        </Routes>
      </Router>
    </div>

  );

}

export default App;
