import { CONFIG } from "./config";



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

export async function callHaveIBeenPwned(password) {
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

export async function callPasswordGeneratorAPI(options) {
  const { length, apiKey } = options;
  const url = `${CONFIG.API_NINJA_URL}${length}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-Api-Key": apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.random_password;
  } catch (error) {
    console.error("Failed to fetch password: ", error);
    throw error;
  }
}
