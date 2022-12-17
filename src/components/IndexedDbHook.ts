import { failure, RemoteData, success } from "@devexperts/remote-data-ts";
import { Card } from "./types";

interface TypeWithId {
  id: string;
}

interface IndexedDbClient<T extends TypeWithId> {
  selection: RemoteData<Error, T[]>;
  add: (card: T) => RemoteData<Error, string>;
  remove: (cardId: string) => RemoteData<Error, string>;
  removeAll: () => RemoteData<Error, "ok">;
}

export const useIndexedDbHook = <
  T extends TypeWithId
>(): IndexedDbClient<T> => {
  const selection: RemoteData<Error, T[]> = success([]);

  const add = (item: T): RemoteData<Error, string> => {
    return failure(new Error("Not implemented"));
  };
  const remove = (itemId: string): RemoteData<Error, string> => {
    return failure(new Error("Not implemented"));
  };
  const removeAll = (): RemoteData<Error, "ok"> => {
    return failure(new Error("Not implemented"));
  };

  return {
    selection,
    add,
    remove,
    removeAll,
  };
};
