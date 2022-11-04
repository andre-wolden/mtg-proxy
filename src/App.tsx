import React, {useState} from 'react';
import './App.css';
import {SearchResult} from "./components/SearchResult";
import {failure, initial, isPending, RemoteData, success} from "@devexperts/remote-data-ts";

function App() {

  const [searchValue, setSearchValue] = useState<string>('plague spitter');
  const [searchResult, setSearchResult] = useState<RemoteData<Error, any>>(initial)

  const handleSearch = async () => {
    fetch(`https://api.magicthegathering.io/v1/cards?name=${searchValue}`)
      .then(res => res.json())
      .then(jsonRes => setSearchResult(success(jsonRes)))
      .catch(e => setSearchResult(failure(e)))
  }

  return (
    <div>
      <h3>Search</h3>
      <input value={searchValue} onChange={e => setSearchValue(e.target.value)}/>
      <button disabled={isPending(searchResult)} onClick={handleSearch}>Search</button>
      <SearchResult searchResult={searchResult}/>
    </div>
  );
}

export default App;
