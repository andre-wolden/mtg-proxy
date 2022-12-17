import { openDB } from "idb";
import { StoreKey } from "idb/build/entry";

const INDEXED_NAME = "mtg-proxy-indexed-db";
const OBJECT_STORE_NAME = "mtg-proxy-object-store";

const db = openDB(INDEXED_NAME, 1, {
  upgrade(db) {
    db.createObjectStore(OBJECT_STORE_NAME);
  },
});

const get = async <T>(key: string): Promise<T> =>
  (await db).get(OBJECT_STORE_NAME, key);

const set = async <T>(key: string, val: T): Promise<any> =>
  (await db).put(OBJECT_STORE_NAME, val, key);

const del = async (key: string): Promise<void> =>
  (await db).delete(OBJECT_STORE_NAME, key);

const clear = async () => (await db).clear(OBJECT_STORE_NAME);

const keys = async () => (await db).getAllKeys(OBJECT_STORE_NAME);

const getAll = async () => (await db).getAll(OBJECT_STORE_NAME);

interface IndexedDb<T> {}

export const indexedDbClient = {
  get,
  getAll,
  set,
  del,
  clear,
  keys,
};
