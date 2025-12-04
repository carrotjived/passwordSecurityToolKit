import { generatePasswordFromAPI, copyPassword } from "./PasswordGenerator.mjs";
import { updateStrengthMeter } from "./PasswordChecker.mjs";
import { loadFooter } from "./util.mjs";

//Load Footer
loadFooter();

//Elements
const button = document.querySelector(".generate-button");
const output = document.querySelector(".generate-text");
const copyButton = document.querySelector(".copy-button");
const meterBar = document.querySelector(".meter-bar");
const meterText = document.querySelector(".meter-text");
const inputBox = document.querySelector(".generate-text");

async function generatePassword() {
  const length = 16;
  const apiKey = import.meta.env.VITE_API_KEY;

  const password = await generatePasswordFromAPI(length, apiKey);

  if (password) {
    output.textContent = password;
    return password;
  } else {
    output.textContent = "Failed to generate password.";
    return null;
  }
}

//Event listners
button.addEventListener("click", async () => {
  const passwordOutput = await generatePassword();
  output.textContent = passwordOutput;
  updateStrengthMeter(passwordOutput, meterBar, inputBox, meterText);
});
copyButton.addEventListener("click", () => {
  copyPassword(output, copyButton);
});
