import { Card } from "./types";
import React from "react";
import { generatePdf } from "./pdf";

interface Props {
  cards: Card[];
}

export const CardSelection = ({ cards }: Props) => {
  const handleRenderPdf = () => {
    generatePdf(cards);
  };

  return (
    <>
      <div>Cards selected for print:</div>
      <button onClick={handleRenderPdf}>Download PDF</button>

      {cards.length === 0 && <div>No cards selected</div>}
      {cards.map((card: Card) => {
        return (
          <div key={card.name}>
            <img alt="asdf" src={card.imageUrl} />
          </div>
        );
      })}
    </>
  );
};
