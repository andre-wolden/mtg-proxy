import { openDB } from "idb";
import { StoreKey } from "idb/build/entry";

export const INDEXED_NAME = "mtg-proxy-indexed-db";
export const OBJECT_STORE_NAME = "mtg-proxy-object-store";

const dbPromise = openDB(INDEXED_NAME, 1, {
  upgrade(db) {
    db.createObjectStore(OBJECT_STORE_NAME);
  },
});

export const get = async (key: string): Promise<ArrayBuffer> =>
  (await dbPromise).get(OBJECT_STORE_NAME, key);

export const set = async (key: string, val: ArrayBuffer) =>
  (await dbPromise).put(OBJECT_STORE_NAME, val, key);

export const del = async (key: string) =>
  (await dbPromise).delete(OBJECT_STORE_NAME, key);

export const clear = async () => (await dbPromise).clear(OBJECT_STORE_NAME);

export const keys = async () => (await dbPromise).getAllKeys(OBJECT_STORE_NAME);
