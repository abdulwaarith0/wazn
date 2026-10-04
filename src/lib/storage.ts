// A small key-value store over localStorage that never throws. When localStorage is blocked
// or full (private browsing, some school devices), it keeps values in memory for this visit.

export type Store = {
  get: (key: string) => string | null;
  set: (key: string, value: string) => void;
};

function browserStorage(): Storage | undefined {
  try {
    return globalThis.localStorage;
  } catch {
    return undefined;
  }
}

export function createStore(backing: Storage | undefined = browserStorage()): Store {
  const memory = new Map<string, string>();
  return {
    get(key) {
      try {
        const value = backing?.getItem(key);
        if (value != null) return value;
      } catch {
        // fall through to memory
      }
      return memory.get(key) ?? null;
    },
    set(key, value) {
      memory.set(key, value);
      try {
        backing?.setItem(key, value);
      } catch {
        // kept in memory only
      }
    },
  };
}
