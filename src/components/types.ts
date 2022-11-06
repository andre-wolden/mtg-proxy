export interface Card {
  name: string;
  imageUrl: string;
}

export interface CardWithImage {
  id: string;
  name: string;
  image: ArrayBuffer;
}

export interface CardWithoutImage {
  id: string;
  name: string;
}

export type WizardsResponse = {
  cards: Card[];
};
