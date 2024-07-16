export function htmlPlainText(s: string) {
  var span = document.createElement("span");
  span.innerHTML = s;
  const text = span.textContent || span.innerText;
  return text;
}
