import { CardWithImage } from "./types";
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
  cardsPromise: Promise<CardWithImage[]>;
}

export const CardSelection = ({ cardsPromise }: Props) => {
  const [cards, setCards] =
    useState<RemoteData<Error, CardWithImage[]>>(initial);

  const prepareCards = async () => {
    const cards = await cardsPromise;
    setCards(success(cards));
  };

  useEffect(() => {
    if (isInitial(cards)) {
      setCards(pending);
      prepareCards();
    }
  });

  const handleRenderPdf = (cards: CardWithImage[]) => {
    generatePdf(cards);
  };

  const viewCardsWhenReady = (cards: CardWithImage[]) => {
    return (
      <div>
        <div>Cards selected for print:</div>
        <button onClick={() => handleRenderPdf(cards)}>Download PDF</button>

        {cards.length === 0 && <div>No cards selected</div>}
        {cards.map((card: CardWithImage) => {
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
    (cards: CardWithImage[]) => <div>{viewCardsWhenReady(cards)}</div>
  )(cards);
};
