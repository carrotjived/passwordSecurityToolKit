import { callPasswordGeneratorAPI } from "./ApiModule.mjs";

//Generate Password from api
export async function generatePasswordFromAPI(length, apiKey) {
  try {
    const password = await callPasswordGeneratorAPI({ length, apiKey });
    return password;
  } catch (error) {
    console.error("Error generating password: ", error);
    return null;
  }
}

//Copy to clipboard
export function copyPassword(outputElement, buttonElement) {
  const password = outputElement.textContent;

  if (!password) return;

  navigator.clipboard
    .writeText(password)
    .then(() => {
      buttonElement.textContent = "Copied!";
      setTimeout(() => {
        buttonElement.textContent = "Copy to Clipboard";
      }, 1500);
    })
    .catch((err) => {
      console.error("Clipboard copy failed: ", err);
      buttonElement.textContent = "Failed";
    });
}
