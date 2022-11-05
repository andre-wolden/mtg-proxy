import React from "react";
import { fold, RemoteData } from "@devexperts/remote-data-ts";
import {Card} from "./types";
import {ViewCard} from "./ViewCard";

interface Props {
  searchResult: RemoteData<Error, Card[]>;
  selectCard: (card: Card) => void;
  updateCards: (cards: Card[]) => void;
}

export const ViewSearchResult = ({ searchResult, selectCard, updateCards }: Props) => {
  const showResult = (cards: Card[]) => {
    return cards.map((card: Card, index: number) => (
      <ViewCard
        card={card}
        index={index}
        updateCard={(updatedCard: Card) => {
          const updatedCards = [...cards]
          updatedCards[index] = updatedCard
          updateCards(updatedCards)
        }}
      />
    ));
  };

  return fold(
    () => <div>Not asked</div>,
    () => <div>Loading</div>,
    (e) => <div>Error: {JSON.stringify(e)}</div>,
    (cards: Card[]) => <div>{showResult([cards[0]])}</div>
  )(searchResult);
};
