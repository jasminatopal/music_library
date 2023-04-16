import { useEffect, useState, useRef } from 'react';
import SearchBar from './components/SearchBar';
import Gallery from './components/Gallery';
import { DataContext } from './contexts/DataContext';
import { SearchContext } from './contexts/SearchContext';

import './App.css';

function App() {

  let [message, setMessage] = useState('Search for Music!');
  let [data, setData] = useState([]);
  let searchInput = useRef('')

    const handleSearch= async searchTerm => {
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
      <SearchContext.Provider value={
        {
          term: searchInput,
          handleSearch
        }
      }>
        <SearchBar />
      </SearchContext.Provider>

      {message}
      <DataContext.Provider value={{ data }}>

        <Gallery />
      </DataContext.Provider>


    </div>
  );
}

export default App;
