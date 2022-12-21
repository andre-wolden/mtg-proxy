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
import {
  ApiCard,
  Card,
  ScryfallResponse,
  WizardsResponse,
} from "./components/types";
import { CardSelection } from "./components/CardSelection";
import { useCardSelection } from "./components/CardSelectionHook";

function App() {
  const [searchValue, setSearchValue] = useState<string>("plague spitter");
  const [searchResult, setSearchResult] =
    useState<RemoteData<Error, ApiCard[]>>(initial);

  const cardSelectionClient = useCardSelection();

  const handleSearch = async () => {
    setSearchResult(pending);
    fetch(`https://api.magicthegathering.io/v1/cards?name=${searchValue}`)
      .then((res) => res.json())
      .then((res: WizardsResponse) => {
        const cards = res.cards
          .filter((card) => card.imageUrl !== undefined)
          .map((card) => ({ name: card.name, imageUrl: card.imageUrl }));

        setSearchResult(success(cards));
      })
      .catch((e) => {
        console.log(`error = ${e}`);
      });
  };

  const handleScryfallSearch = async () => {
    setSearchResult(pending);
    fetch(`https://api.scryfall.com/cards/named?fuzzy=${searchValue}`)
      .then((res) => res.json())
      .then((res: ScryfallResponse) => {
        setSearchResult(
          success([{ name: res.name, imageUrl: res.image_uris.large }])
        );
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
        <button
          disabled={isPending(searchResult)}
          onClick={handleScryfallSearch}
        >
          Search
        </button>
        <ViewSearchResult
          searchResult={searchResult}
          selectCard={async (card: Card) => {
            cardSelectionClient.add(card)();
          }}
        />
      </LeftPanel>
      <RightPanel>
        <>
          <CardSelection cards={cardSelectionClient.cards} />
        </>
      </RightPanel>
    </div>
  );
}

export default App;
