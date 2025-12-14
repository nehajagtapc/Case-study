import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import PDFHighlighter from "../core/PDFHighlighter";

// Worker setup for pdfjs-dist v5+
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const PDFViewer = ({ caseStudyManager }) => {
  const [numPages, setNumPages] = useState(null);
  const [highlightActive, setHighlightActive] = useState(false);
  const [pageText, setPageText] = useState([]);

  const highlighter = new PDFHighlighter("Gain on sale of non-current assets, etc");

  useEffect(() => {
    caseStudyManager.subscribe(setHighlightActive);
  }, [caseStudyManager]);

  // Extracts text from each page for debugging
  const onLoadSuccess = async (pdf) => {
    setNumPages(pdf.numPages);
    const allText = [];
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      allText.push(textContent.items.map((t) => t.str).join(" "));
    }
    setPageText(allText);
    console.log("Extracted text layer:", allText);
  };

  return (
    <div className="pdf-container">
      <Document
        file="/Maersk Q2 2025 Interim Report.pdf"
        onLoadSuccess={onLoadSuccess}
        loading={<p>Loading PDF...</p>}
      >
        {Array.from(new Array(numPages), (_, i) => (
          <Page
            key={`page_${i + 1}`}
            pageNumber={i + 1}
            renderTextLayer
            onRenderTextLayerSuccess={() => {
              if (highlightActive) {
                const textLayer = document.querySelectorAll(
                  `.react-pdf__Page:nth-child(${i + 1}) .react-pdf__Page__textContent span`
                );

                textLayer.forEach((span) => {
                  const txt = span.textContent?.toLowerCase().replace(/\s+/g, " ");
                  // highlight only the exact phrase
                  if (txt.includes("gain on sale of non-current assets, etc")) {
                    span.style.backgroundColor = "yellow";
                    span.style.fontWeight = "bold";
                    span.style.borderRadius = "3px";
                    span.style.padding = "0 2px";
                  } else {
                    // remove highlight for others
                    span.style.backgroundColor = "";
                    span.style.fontWeight = "normal";
                  }
                });
              } else {
                // 🧹 clear highlights when deactivated
                const allSpans = document.querySelectorAll(".react-pdf__Page__textContent span");
                allSpans.forEach((s) => {
                  s.style.backgroundColor = "";
                  s.style.fontWeight = "normal";
                });
              }
            }}
            customTextRenderer={({ str }) => str}
          />
        ))}
      </Document>

      {/* Debug output */}
      <div style={{ marginTop: "20px", fontSize: "14px", color: "#555" }}>
        <h4>Debug: Extracted Page Text (first 500 chars)</h4>
        <p>{pageText[0]?.slice(0, 500) || "No text detected in PDF"}</p>
      </div>
    </div>
  );
};

export default PDFViewer;
