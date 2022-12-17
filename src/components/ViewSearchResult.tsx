import React from "react";
import { fold, RemoteData } from "@devexperts/remote-data-ts";
import { ApiCard, Card } from "./types";
import { ViewCardSearchResult } from "./ViewCardSearchResult";

interface Props {
  searchResult: RemoteData<Error, ApiCard[]>;
  selectCard: (card: Card) => void;
}

export const ViewSearchResult = ({ searchResult, selectCard }: Props) => {
  const showResult = (cards: ApiCard[]) => {
    return cards.map((card: ApiCard, index: number) => (
      <ViewCardSearchResult key={index} card={card} selectCard={selectCard} />
    ));
  };

  return fold(
    () => <div>Not asked</div>,
    () => <div>Loading</div>,
    (e) => <div>Error: {JSON.stringify(e)}</div>,
    (cards: ApiCard[]) => {
      return <div>{showResult(cards)}</div>;
    }
  )(searchResult);
};
