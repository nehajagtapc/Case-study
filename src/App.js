import React from "react";
import PDFViewer from "./components/PDFViewer";
import AnalysisPanel from "./components/AnalysisPanel";
import CaseStudyManager from "./core/CaseStudyManager";  // fixed import
import "./App.css";

const App = () => {
  const caseStudyManager = new CaseStudyManager();

  return (
    <div className="app-container">
      <div className="pdf-section">
        <PDFViewer caseStudyManager={caseStudyManager} />
      </div>
      <div className="analysis-section">
        <AnalysisPanel caseStudyManager={caseStudyManager} />
      </div>
    </div>
  );
};

export default App;
