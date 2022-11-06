import { CardWithImage, CardWithoutImage } from "./types";
import { useLocalStorage } from "./LocalStorageHook";
import { get, set } from "./indexeddb";
import { useState } from "react";

const MTG_LOCAL_STORAGE = "mtg-local-storage";

export const useCardStorage = (): [
  cards: Promise<CardWithImage[]>,
  setCards: (cards: CardWithImage[]) => void
] => {
  const [lsCards, setLsCards] = useLocalStorage<CardWithoutImage[]>(
    MTG_LOCAL_STORAGE,
    []
  );

  const [cards, setCardsWithImages] = useState<Promise<CardWithImage[]>>(
    async () => {
      const promises = lsCards.map(async (card) => {
        const arrayBuffer = await get(card.id);
        return {
          ...card,
          image: arrayBuffer,
        };
      });
      const cards: CardWithImage[] = await Promise.all(promises);
      return cards;
    }
  );

  const setCards = async (cards: CardWithImage[]): Promise<void> => {
    setLsCards(cards.map((card) => ({ id: card.id, name: card.name })));

    const promises = cards.map(async (card) => {
      return await set(card.id, card.image);
    });
    await Promise.all(promises);

    setCardsWithImages(() => new Promise(() => cards));
  };

  return [cards, setCards];
};
