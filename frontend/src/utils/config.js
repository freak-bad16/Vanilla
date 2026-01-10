// Default configuration notes:
// - If you connect your Android phone via USB and run `adb reverse`, keep BASE_URL as localhost:
//     adb reverse tcp:3000 tcp:3000
//     export const BASE_URL = "http://localhost:3000";
// - If you use Wi‑Fi (device and PC on same network), set the PC LAN IP, e.g.:
//     export const BASE_URL = "http://192.168.1.42:3000";
// Change the port if your backend uses a different one.
export const BASE_URL = "http://localhost:3000"; // default for adb reverse (server uses port 3000)
