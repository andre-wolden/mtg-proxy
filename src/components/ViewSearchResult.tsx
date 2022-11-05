import React from "react";
import { fold, RemoteData } from "@devexperts/remote-data-ts";
import { Card, CardWithImage } from "./types";
import { ViewCardSearchResult } from "./ViewCardSearchResult";

interface Props {
  searchResult: RemoteData<Error, Card[]>;
  selectCard: (card: CardWithImage) => void;
}

export const ViewSearchResult = ({ searchResult, selectCard }: Props) => {
  const showResult = (cards: Card[]) => {
    return cards.map((card: Card, index: number) => (
      <ViewCardSearchResult key={index} card={card} selectCard={selectCard} />
    ));
  };

  return fold(
    () => <div>Not asked</div>,
    () => <div>Loading</div>,
    (e) => <div>Error: {JSON.stringify(e)}</div>,
    (cards: Card[]) => {
      return <div>{showResult(cards)}</div>;
    }
  )(searchResult);
};
