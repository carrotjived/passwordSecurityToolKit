import { generatePasswordFromAPI, showHistory } from "./PasswordGenerator.mjs";
import { updateStrengthMeter } from "./PasswordChecker.mjs";
import {
  loadFooter,
  copyPassword,
  saveToLocal,
  clearSavedPasswords,
} from "./util.mjs";

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
const clearSavedButton = document.querySelector(".clear-saved-password");
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
    historyButton.textContent = "Hide Saved Password(s)";
    historyDiv.style.display = "block";
    showHistory(historyBoxElement);
  } else {
    historyDiv.style.display = "none";
    historyButton.textContent = "Show Saved Password(s)";
  }
});

//clear saved passwords in local storage
clearSavedButton.addEventListener("click", () => {
  const confirmClear = confirm(
    "Are you sure you want to clear all saved password(s)?"
  );
  if (confirmClear) {
    clearSavedPasswords();
    showHistory(historyBoxElement);
  }
});
