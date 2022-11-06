import React, { useState } from "react";
import "./App.css";
import { ViewSearchResult } from "./components/ViewSearchResult";
import {
  initial,
  isPending,
  pending,
  RemoteData,
  success,
} from "@devexperts/remote-data-ts";
import { LeftPanel } from "./components/LeftPanel";
import { RightPanel } from "./components/RightPanel";
import { useLocalStorage } from "./components/LocalStorageHook";
import { Card, CardWithImage, WizardsResponse } from "./components/types";
import { CardSelection } from "./components/CardSelection";
import { useCardStorage } from "./components/CardStorageHook";

function App() {
  const [searchValue, setSearchValue] = useState<string>("plague spitter");
  const [cards, setCards] = useState<RemoteData<Error, Card[]>>(initial);
  // const [selectedCards, setSelectedCards]: [
  //   CardWithImage[],
  //   (cards: CardWithImage[]) => void
  // ] = useLocalStorage<CardWithImage[]>("mtg-cards", []);

  const [selectedCards, setSelectedCards] = useCardStorage();

  const handleSearch = async () => {
    setCards(pending);
    fetch(`https://api.magicthegathering.io/v1/cards?name=${searchValue}`)
      .then((res) => res.json())
      .then((res: WizardsResponse) => {
        const cards = res.cards
          .filter((card) => card.imageUrl !== undefined)
          .map((card) => ({ name: card.name, imageUrl: card.imageUrl }));

        setCards(success(cards));
      })
      .catch((e) => {
        console.log(`error = ${e}`);
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
          selectCard={async (card: CardWithImage) => {
            const currentlySelectedCards: CardWithImage[] = await selectedCards;
            setSelectedCards([card, ...currentlySelectedCards]);
          }}
        />
      </LeftPanel>
      <RightPanel>
        <>
          <CardSelection cardsPromise={selectedCards} />
        </>
      </RightPanel>
    </div>
  );
}

export default App;
