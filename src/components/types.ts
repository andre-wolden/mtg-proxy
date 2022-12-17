import { RemoteData } from "@devexperts/remote-data-ts";

export interface ApiCard {
  name: string;
  imageUrl: string;
}

export interface Card {
  id: string;
  name: string;
  image: ArrayBuffer;
}

export interface CardWithoutImage {
  id: string;
  name: string;
}

export type WizardsResponse = {
  cards: ApiCard[];
};
