// Lazily load secure storage. Tries, in order:
// 1) expo-secure-store
// 2) @react-native-async-storage/async-storage
// 3) in-memory fallback (non-persistent)

const TOKEN_KEY = "auth_token";

let store = null;
let initialized = false;

async function ensureStore() {
  if (initialized) return;
  initialized = true;
  // Try expo-secure-store
  try {
    const SecureStore = await import("expo-secure-store");
    store = {
      getItem: (k) => SecureStore.getItemAsync(k),
      setItem: (k, v) => SecureStore.setItemAsync(k, v),
      deleteItem: (k) => SecureStore.deleteItemAsync(k),
    };
    return;
  } catch (e) {}

  // Try AsyncStorage
  try {
    const AsyncStorageMod = await import("@react-native-async-storage/async-storage");
    const AsyncStorage = AsyncStorageMod.default || AsyncStorageMod;
    store = {
      getItem: (k) => AsyncStorage.getItem(k),
      setItem: (k, v) => AsyncStorage.setItem(k, v),
      deleteItem: (k) => AsyncStorage.removeItem(k),
    };
    return;
  } catch (e) {}

  // Fallback: in-memory
  const map = new Map();
  console.warn(
    "No secure storage available. Using in-memory fallback. Install expo-secure-store for secure persistent storage."
  );
  store = {
    getItem: async (k) => (map.has(k) ? map.get(k) : null),
    setItem: async (k, v) => map.set(k, v),
    deleteItem: async (k) => map.delete(k),
  };
}

export async function saveToken(token) {
  try {
    await ensureStore();
    await store.setItem(TOKEN_KEY, token);
  } catch (e) {
    console.warn("Failed to save token:", e);
  }
}

export async function getToken() {
  try {
    await ensureStore();
    return await store.getItem(TOKEN_KEY);
  } catch (e) {
    console.warn("Failed to read token:", e);
    return null;
  }
}

export async function deleteToken() {
  try {
    await ensureStore();
    await store.deleteItem(TOKEN_KEY);
  } catch (e) {
    console.warn("Failed to delete token:", e);
  }
}
