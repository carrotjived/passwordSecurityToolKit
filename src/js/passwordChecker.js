import { updateStrengthMeter } from "./PasswordChecker.mjs";
import { callHaveIBeenPwned } from "./ApiModule.mjs";

//Elements
const meterBar = document.querySelector(".meter-bar");
const meterText = document.querySelector(".meter-text");
const inputBox = document.querySelector(".styled-input");
const breachedText = document.querySelector(".breached-text");

//Check if the password is in the database of breached passwords
async function breachedPassword(password) {
  const breached = document.querySelector(".breached-text");

  const result = await callHaveIBeenPwned(password);

  if (result.breached) {
    breached.textContent = `⚠️ This password is not good! Not good! Breached for ${result.count} times!`;

    //Add a blinking red style
    breached.style.color = "var(--weak)";
    breached.style.animation = "blink 1s steps(2, start) infinite";
    breached.style.fontWeight = "bold";
  } else {
    breached.textContent = "This password is safe!";
    breached.style.color = "var(--epic)";
    breached.style.animation = "none";
    breached.style.fontWeight = "normal";
  }
}

//Clear Function

function clearButton(input) {
  input.value = "";
  updateStrengthMeter("", meterBar, inputBox, meterText);

  //Hide texts
  meterText.textContent = "";
  breachedText.textContent = "";

  breachedText.style.animation = "none";
  breachedText.style.color = "inherit";
  inputBox.style.border = `2px solid var(--buttons)`;
}

//Event Listeners
//Strength Meter and API comparison
document.querySelector(".styled-input").addEventListener("input", async (e) => {
  const password = e.target.value;
  updateStrengthMeter(password, meterBar, inputBox, meterText);
  breachedPassword(password);
});

//Clear Button

document.querySelector(".clearInput").addEventListener("click", () => {
  clearButton(inputBox);
});
