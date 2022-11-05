import {RemoteData} from "@devexperts/remote-data-ts";

export interface Card {
  name: string;
  imageUrl: string;
  image: RemoteData<Error, ArrayBuffer>;
}

export type WizardsResponse = {
  cards: Card[]
}
