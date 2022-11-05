import React, {useState} from 'react';
import './App.css';
import {SearchResult} from "./components/SearchResult";
import {failure, initial, isPending, RemoteData, success, pending} from "@devexperts/remote-data-ts";
import {LeftPanel} from "./components/LeftPanel";
import {RightPanel} from "./components/RightPanel";
import {useLocalStorage} from "./components/LocalStorageHook";
import {Card} from "./components/types";

function App() {

  const [searchValue, setSearchValue] = useState<string>('plague spitter');
  const [searchResult, setSearchResult] = useState<RemoteData<Error, any>>(initial)
  const [cards, setCards]: [Card[], (cards: Card[]) => void] = useLocalStorage<Card[]>("mtg-cards", [])

  const handleSearch = async () => {
    setSearchResult(pending)
    fetch(`https://api.magicthegathering.io/v1/cards?name=${searchValue}`)
      .then(res => res.json())
      .then(jsonRes => setSearchResult(success(jsonRes)))
      .catch(e => setSearchResult(failure(e)))
  }

  return (
    <div className="wrapper">
      <LeftPanel>
        <h3>Search</h3>
        <input value={searchValue} onChange={e => setSearchValue(e.target.value)}/>
        <button disabled={isPending(searchResult)} onClick={handleSearch}>Search</button>
        <SearchResult
          searchResult={searchResult}
          selectCard={(card: Card) => {
            setCards([card, ...cards])
          }}
        />
      </LeftPanel>
      <RightPanel>
        <div>Cards selected for print:</div>
        { cards.length === 0 && <div>No cards selected</div>}
        {
          cards.map((card: Card) => {
            return (
              <div key={card.name}>
                <img src={card.imageUrl}/>
              </div>
            )
          })
        }
      </RightPanel>
    </div>
  );
}

export default App;
