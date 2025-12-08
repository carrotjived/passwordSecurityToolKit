import { getCheckedhistory } from "./util.mjs";

const strongPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|:;"'<>,.?/~`]).{8,}$/;

const historyBoxElement = document.querySelector(".check-history-list");

export function calculateStrength(password) {
  let score = 0;

  if (!password) {
    return { score: 0, strength: "Weak", color: "var(--weak)" };
  }

  //Length Scoring
  if (password.length >= 8) score += 25;
  if (password.length >= 15) score += 15;

  //Character Scoring
  if (strongPattern.test(password)) {
    score += 60;
  } else {
    if (/[a-z]/.test(password)) score += 10;
    if (/[A-Z]/.test(password)) score += 10;
    if (/[0-9]/.test(password)) score += 10;
    if (/[^A-Za-z0-9]/.test(password)) score += 10;
  }

  if (score > 100) score = 100;

  let strength, color;
  if (score < 40) {
    strength = "Weak";
    color = "var(--weak)";
  } else if (score < 70) {
    strength = "Medium";
    color = "var(--medium)";
  } else if (score < 90) {
    strength = "Strong";
    color = "var(--strong)";
  } else if (score == 100) {
    strength = "Epic";
    color = "var(--epic)";
  }

  return { score, strength, color };
}

export function updateStrengthMeter(password, meterBar, inputBox, meterText) {
  const { score, strength, color } = calculateStrength(password);

  //Update width base on score
  meterBar.style.width = score + "%";

  //Update color based on strength
  if (strength == "Weak") {
    meterBar.style.backgroundColor = color;
  } else if (strength == "Medium") {
    meterBar.style.backgroundColor = color;
  } else if (strength == "Strong") {
    meterBar.style.backgroundColor = color;
  } else {
    meterBar.style.backgroundColor = color;
  }

  //Update input border color for effects
  inputBox.style.border = `2px solid ${color}`;

  //Update text label
  meterText.textContent = `Strength: ${strength} (${score}/100)`;
}

//To show the history of the checked password
export function showCheckedHistory(historyBoxElement) {
  const history = getCheckedhistory();

  historyBoxElement.innerHTML = history
    .map(
      (item) =>
        `<li style = "color: ${item.color}">${item.password} - ${item.strength} (${item.score}/100) ${item.breached ? "⚠️ Breached" : "✅ Safe"}</li>`
    )
    .join("");
}
