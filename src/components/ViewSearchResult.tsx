import React from "react";
import { fold, RemoteData } from "@devexperts/remote-data-ts";
import { Card } from "./types";
import { ViewCard } from "./ViewCard";

interface Props {
  searchResult: RemoteData<Error, Card[]>;
  selectCard: (card: Card) => void;
}

export const ViewSearchResult = ({ searchResult, selectCard }: Props) => {
  const showResult = (cards: Card[]) => {
    return cards.map((card: Card, index: number) => (
      <ViewCard key={index} card={card} />
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
