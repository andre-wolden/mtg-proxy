import React from 'react';
import {fold, RemoteData} from "@devexperts/remote-data-ts";
import {Card} from "./types";


interface Props {
  searchResult: RemoteData<Error, any>;
  selectCard: (card: Card) => void;
}

export const SearchResult = ({searchResult, selectCard}: Props) => {

  const showResult = (result: any) => {
    return result.cards.map((card: any) => {
      return (
        <div key={card.name}>
          <button
            onClick={() => {
              selectCard({name: card.name, imageUrl: card.imageUrl})
            }}
          >
            Add
          </button>
          <img src={card.imageUrl}/>
        </div>)
    })
  }


  return fold(
    () => (<div>Not asked</div>),
    () => (<div>Loading</div>),
    (e) => (<div>Error: {JSON.stringify(e)}</div>),
    showResult
  )(searchResult)
}