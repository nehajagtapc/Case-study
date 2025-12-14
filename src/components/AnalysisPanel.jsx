import React from "react";

const AnalysisPanel = ({ caseStudyManager }) => {
  const handleReferenceClick = () => {
    caseStudyManager.activateHighlight();
    const pdf = document.querySelector(".pdf-container");
    if (pdf) pdf.scrollTo({ top: 1000, behavior: "smooth" });
  };

  return (
    <div className="analysis-container">
      <h2 className="title">Analysis</h2>
      <p className="text">
        No extraordinary or one-off items affecting EBITDA were reported in Maersk’s Q2 2025
        results. The report explicitly notes that EBITDA improvements stemmed from operational
        performance — including volume growth, cost control, and margin improvement across Ocean,
        Logistics & Services, and Terminals segments [1][2]. Gains or losses from asset sales, which
        could qualify as extraordinary items, are shown separately under EBIT and not included in
        EBITDA. The gain on sale of non-current assets was USD 25 m in Q2 2025, significantly lower
        than USD 208 m in Q2 2024, but these affect EBIT, not EBITDA [
        <span className="reference" onClick={handleReferenceClick}>
          3
        </span>
        ].
      </p>

      <button
        className="clear-btna"
        onClick={() => caseStudyManager.deactivateHighlight()}
      >
        Clear Highlight
      </button>
    </div>
  );
};

export default AnalysisPanel;
