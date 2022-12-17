import { Card } from "./types";
import { indexedDbClient } from "./indexeddb";
import { useEffect, useState } from "react";
import {
  initial,
  isInitial,
  isSuccess,
  pending,
  RemoteData,
  success,
} from "@devexperts/remote-data-ts";
import { none, some } from "fp-ts/Option";
import { TaskOption } from "fp-ts/TaskOption";

interface CardSelectionClient {
  cards: RemoteData<Error, Card[]>;
  add: (card: Card) => TaskOption<Error>;
  remove: (cardId: string) => TaskOption<Error>;
  removeAll: TaskOption<Error>;
}

export const useCardSelection = (): CardSelectionClient => {
  const [cards, setCards] = useState<RemoteData<Error, Card[]>>(initial);

  useEffect(() => {
    if (isInitial(cards)) {
      setCards(pending);
      indexedDbClient.getAll().then((res) => {
        console.log("is this happening?");
        setCards(success(res));
      });
    }
  });

  const add: (card: Card) => TaskOption<Error> = (card) => async () => {
    console.log("adding");
    if (isSuccess(cards)) {
      setCards(success([card, ...cards.value]));
      return indexedDbClient
        .set(card.id, card)
        .then((_) => none)
        .catch((e) => some(e));
    } else {
      return some(new Error("failed to save card to indexedDb"));
    }
  };

  const remove: (cardId: string) => TaskOption<Error> = (cardId) => () =>
    new Promise((res) => none);

  const removeAll: TaskOption<Error> = () => new Promise((res) => none);

  return {
    cards,
    add,
    remove,
    removeAll,
  };
};
