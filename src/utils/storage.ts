interface DataStorage {
  get(key: string): string | null;
  set(key: string, value: string): void;
  delete(key: string): void;
  clear(): void;
}

class MemoryStorage implements DataStorage {
  private data = new Map<string, string>();

  get(key: string) {
    return this.data.get(key) ?? null;
  }

  set(key: string, value: string) {
    this.data.set(key, value);
  }

  delete(key: string) {
    this.data.delete(key);
  }

  clear() {
    this.data.clear();
  }
}

class LocalStorage implements DataStorage {
  private readonly storage: Storage;

  static canUse() {
    const testKey = '__druwa_local_storage_test__';

    try {
      window.localStorage.setItem(testKey, '1');
      window.localStorage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }

  constructor() {
    this.storage = window.localStorage;
  }

  get(key: string) {
    return this.storage.getItem(key);
  }

  set(key: string, value: string) {
    this.storage.setItem(key, value);
  }

  delete(key: string) {
    this.storage.removeItem(key);
  }

  clear() {
    this.storage.clear();
  }
}

let storage: DataStorage | null = null;

export function createStorage() {
  if (storage !== null) {
    return storage;
  }

  if (LocalStorage.canUse()) {
    storage = new LocalStorage();
  } else {
    storage = new MemoryStorage();
  }

  return storage;
}
