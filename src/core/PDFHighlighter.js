import React from "react";

export default class PDFHighlighter {
  constructor(targetPhrase) {
    this.targetPhrase = targetPhrase;
  }

  normalize(text) {
    return text
      .replace(/[\u2010-\u2015]/g, "-") // normalize fancy dashes
      .replace(/\s+/g, " ") // collapse spaces
      .toLowerCase();
  }

renderWithHighlight(str) {
  if (!str || !this.targetPhrase) return str;

  const normalizedTarget = this.normalize(this.targetPhrase);
  const normalizedStr = this.normalize(str);

  // check for partial match of the *first few words* of the phrase
  const firstWord = this.targetPhrase.split(" ")[0].toLowerCase();

  if (normalizedStr.includes(normalizedTarget) || normalizedStr.includes(firstWord)) {
    return (
      <mark style={{
        backgroundColor: "yellow",
        fontWeight: "bold",
        borderRadius: "3px",
        padding: "0 2px"
      }}>
        {str}
      </mark>
    );
  }

  return str;
}

}
