import { generatePasswordFromAPI, showHistory } from "./PasswordGenerator.mjs";
import { updateStrengthMeter } from "./PasswordChecker.mjs";
import { loadFooter, copyPassword, saveToLocal } from "./util.mjs";

//Load Footer
loadFooter();

//Elements
const generateButton = document.querySelector(".generate-button");
const output = document.querySelector(".generate-text");
const copyButton = document.querySelector(".copy-button");
const meterBar = document.querySelector(".meter-bar");
const meterText = document.querySelector(".meter-text");
const inputBox = document.querySelector(".generate-text");
const saveButton = document.querySelector(".save-button");
const historyButton = document.querySelector(".show-history-button");
const historyBoxElement = document.querySelector(".history-list");
const historyDiv = document.querySelector(".password-history");
let strengthColor;

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
generateButton.addEventListener("click", async () => {
  const passwordOutput = await generatePassword();
  output.textContent = passwordOutput;
  updateStrengthMeter(passwordOutput, meterBar, inputBox, meterText);
  strengthColor = meterBar.style.backgroundColor;
});
copyButton.addEventListener("click", () => {
  copyPassword(output, copyButton);
});

saveButton.addEventListener("click", () => {
  saveToLocal(output.textContent, strengthColor);

  if (historyDiv.style.display == "block") {
    showHistory(historyBoxElement);
  }
});

historyButton.addEventListener("click", () => {
  if (historyDiv.style.display == "none" || historyDiv.style.display == "") {
    historyButton.textContent = "Hide History";
    historyDiv.style.display = "block";
    showHistory(historyBoxElement);
  } else {
    historyDiv.style.display = "none";
    historyButton.textContent = "Show History";
  }
});
