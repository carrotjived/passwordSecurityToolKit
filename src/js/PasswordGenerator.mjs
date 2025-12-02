import { callPasswordGeneratorAPI } from "./ApiModule.mjs";

export async function generatePasswordFromAPI(length, apiKey) {
  try {
    const password = await callPasswordGeneratorAPI({ length, apiKey });
    return password;
  } catch (error) {
    console.error("Error generating password: ", error);
    return null;
  }
}
