import React, { useState } from "react";
import "./App.css";
import { ViewSearchResult } from "./components/ViewSearchResult";
import {
  failure,
  initial,
  isPending,
  RemoteData,
  success,
  pending,
} from "@devexperts/remote-data-ts";
import { LeftPanel } from "./components/LeftPanel";
import { RightPanel } from "./components/RightPanel";
import { useLocalStorage } from "./components/LocalStorageHook";
import {Card, WizardsResponse} from "./components/types";
import { CardSelection } from "./components/CardSelection";
import {wizardsPath} from "./components/utils";

function App() {
  const [searchValue, setSearchValue] = useState<string>("plague spitter");
  const [cards, setCards] = useState<RemoteData<Error, Card[]>>(initial);
  const [selectedCards, setSelectedCards]: [Card[], (cards: Card[]) => void] = useLocalStorage<
    Card[]
  >("mtg-cards", []);

  const handleSearch = async () => {
    setCards(pending);
    fetch(`https://api.magicthegathering.io/v1/cards?name=${searchValue}`)
      .then((res) => res.json())
      .then((res: WizardsResponse) => {

        const cards = res.cards
          .filter(card => card.imageUrl !== undefined)
          .map(card => ({name: card.name, imageUrl: card.imageUrl, image: initial}))

        setCards(success(cards))
      })
      .catch((e) => {
        console.log(e)
      });
  };

  return (
    <div className="wrapper">
      <LeftPanel>
        <h3>Search</h3>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button disabled={isPending(cards)} onClick={handleSearch}>
          Search
        </button>
        <ViewSearchResult
          searchResult={cards}
          selectCard={(card: Card) => {
            setSelectedCards([card, ...selectedCards]);
          }}
          updateCards={(updatedCards: Card[]) => {
            setCards(success(updatedCards))
          }}
        />
      </LeftPanel>
      <RightPanel>
        <>
          <CardSelection cards={selectedCards} />
        </>
      </RightPanel>
    </div>
  );
}

export default App;
