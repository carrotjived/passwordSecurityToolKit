export function loadFooter() {
  const footer = document.querySelector("footer");

  if (footer) {
    footer.innerHTML = `
        <p>© 2025 Password Security Toolkit - Victor Jared Onato</p>
        <p>For learning purposes only — no passwords are stored.</p>`;
  }
}
