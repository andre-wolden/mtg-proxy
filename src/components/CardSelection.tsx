import { Card } from "./types";
import React, { useEffect, useState } from "react";
import { generatePdf } from "./pdf";
import { ViewCard } from "./ViewCard";
import {
  RemoteData,
  initial,
  pending,
  isInitial,
  success,
  fold,
} from "@devexperts/remote-data-ts";

interface Props {
  cards: RemoteData<Error, Card[]>;
}

export const CardSelection = ({ cards }: Props) => {
  const handleRenderPdf = (cards: Card[]) => {
    generatePdf(cards);
  };

  const viewCards = (cards: Card[]) => {
    return (
      <div>
        <div>Cards selected for print:</div>
        <button onClick={() => handleRenderPdf(cards)}>Download PDF</button>

        {cards.length === 0 && <div>No cards selected</div>}
        {cards.map((card: Card) => {
          return (
            <div key={card.id}>
              <ViewCard card={card} />
            </div>
          );
        })}
      </div>
    );
  };

  return fold(
    () => <div>Loading cards...</div>,
    () => <div>Loading cards...</div>,
    (e) => <div>Error: {JSON.stringify(e)}</div>,
    (cards: Card[]) => <div>{viewCards(cards)}</div>
  )(cards);
};
