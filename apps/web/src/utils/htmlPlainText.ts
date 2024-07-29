export function htmlPlainText(s: string) {
  const span = document.createElement("span");
  span.innerHTML = s;
  const text = span.textContent || span.innerText;
  return text;
}
