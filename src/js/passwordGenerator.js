import { generatePasswordFromAPI } from "./PasswordGenerator.mjs";

const button = document.querySelector(".generate-button");
const output = document.querySelector(".generate-text");

async function generatePassword() {
  const length = 16;
  const apiKey = import.meta.env.VITE_API_KEY;

  const password = await generatePasswordFromAPI(length, apiKey);

  if (password) {
    output.textContent = password;
  } else {
    output.textContent = "Failed to generate password.";
  }
}

//Event listners
button.addEventListener("click", generatePassword);
