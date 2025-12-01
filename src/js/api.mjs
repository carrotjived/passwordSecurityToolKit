import { CONFIG } from "./config";

const apiKey = import.meta.env.API_KEY;

// export async function getRemotePassword(len = 14) {
//   const res = await fetch(CONFIG.API_NINJA_URL + len, {
//     headers: { "X-Api-Key": apiKey },
//   });
// }

async function sha1(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-1", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex.toUpperCase();
}

export async function checkBreaches(password) {
  const hash = await sha1(password);
  const prefix = hash.slice(0, 5);
  const suffix = hash.slice(5);

  const url = CONFIG.HIBP_URL + prefix;
  const res = await fetch(url);
  const data = await res.text();

  const lines = data.split("\n");

  for (const line of lines) {
    const [hashSuffix, count] = line.split(":");
    if (hashSuffix == suffix) {
      return { breached: true, count: parseInt(count, 10) };
    }
  }

  return { breached: false, count: 0 };
}
