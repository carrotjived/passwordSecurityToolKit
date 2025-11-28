import { CONFIG } from "./config";

const apiKey = import.meta.env.API_KEY;

export async function checkBreaches(prefix) {
  const url = CONFIG.HIBP_URL + prefix;

  const res = await fetch(url);
  const data = await res.text();
  return data.split("/n");
}

export async function getRemotePassword(len = 14) {
  const res = await fetch(CONFIG.API_NINJA_URL + len, {
    headers: { "X-Api-Key": apiKey },
  });
}
