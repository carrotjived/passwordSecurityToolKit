export function loadFooter() {
  const footer = document.querySelector("footer");

  if (footer) {
    footer.innerHTML = `
        <p>© 2025 Password Security Toolkit - Victor Jared Onato</p>
        <p>For learning purposes only — no passwords are stored.</p>`;
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

export function saveToLocal(password, strengthColor) {
  //Get passwords from local storage or create new array

  if (!password) {
    alert("Nothing to be saved.");
    return;
  }
  let history = JSON.parse(localStorage.getItem("saved-password")) || [];

  const duplicate = history.some((item) => item.password == password);

  if (duplicate) {
    alert("This password is already saved.");
    return;
  }

  //Add new password to array
  history.push({ password, color: strengthColor });

  //Limit history to last 10 histories
  if (history.length > 10) {
    history = history.slice(-10);
  }

  //save to local storage
  localStorage.setItem("saved-password", JSON.stringify(history));
}

export function getToLocal() {
  return JSON.parse(localStorage.getItem("saved-password")) || [];
}

export function savedCheckerHistory(
  password,
  score,
  strength,
  color,
  breached
) {
  let history = JSON.parse(localStorage.getItem("checker-history")) || [];

  history.push({ password, score, strength, color, breached });

  if (history.length > 15) {
    history = history.slice(-15);
  }

  localStorage.setItem("checker-history", JSON.stringify(history));
}

export function getCheckedhistory() {
  return JSON.parse(localStorage.getItem("checker-history")) || [];
}

export function clearOnUnload() {
  windows.addEventListener("beforeunload", () => {
    localStorage.removeItem("saved-password");
    localStorage.removeItem("checker-history");
  });
}
