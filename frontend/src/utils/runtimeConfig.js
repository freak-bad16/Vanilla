import { BASE_URL as DEFAULT_BASE_URL } from "./config";

const KEY = "BASE_URL_OVERRIDE";

let store = null;
let initialized = false;

async function ensureStore() {
  if (initialized) return;
  initialized = true;
  try {
    const AsyncMod = await import("@react-native-async-storage/async-storage");
    const AsyncStorage = AsyncMod.default || AsyncMod;
    store = {
      getItem: (k) => AsyncStorage.getItem(k),
      setItem: (k, v) => AsyncStorage.setItem(k, v),
      removeItem: (k) => AsyncStorage.removeItem(k),
    };
    return;
  } catch (e) {}

  // fallback in-memory
  const map = new Map();
  console.warn("@react-native-async-storage/async-storage not available — using in-memory runtime config.");
  store = {
    getItem: async (k) => (map.has(k) ? map.get(k) : null),
    setItem: async (k, v) => map.set(k, v),
    removeItem: async (k) => map.delete(k),
  };
}

export async function getBaseUrl() {
  try {
    await ensureStore();
    const override = await store.getItem(KEY);
    return override || DEFAULT_BASE_URL;
  } catch (e) {
    console.warn("getBaseUrl error", e);
    return DEFAULT_BASE_URL;
  }
}

export async function setBaseUrl(url) {
  try {
    await ensureStore();
    if (!url) {
      await store.removeItem(KEY);
    } else {
      await store.setItem(KEY, url);
    }
    return true;
  } catch (e) {
    console.warn("setBaseUrl error", e);
    return false;
  }
}

export async function resetBaseUrl() {
  return setBaseUrl("");
}
