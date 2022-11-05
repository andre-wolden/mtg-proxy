export interface Card {
  name: string;
  imageUrl: string;
}

export interface CardWithImage {
  name: string;
  image: ArrayBuffer;
}

export type WizardsResponse = {
  cards: Card[]
}
