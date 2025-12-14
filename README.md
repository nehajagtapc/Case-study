# Case Study Objective: (React.js)

This React web app displays a PDF file (Maersk Q2 2025 Interim Report.pdf) on the left and an analysis panel on the right.
When you click reference [3] in the analysis section, the app automatically highlights the phrase
"Gain on sale of non-current assets, etc" in the PDF in bright yellow.

<img width="1910" height="966" alt="Screenshot 2025-10-28 230010" src="https://github.com/user-attachments/assets/82f40fa5-56bb-430c-b0cb-73abed19bd64" />

## Tech Stack

1. React.js – for UI
2. react-pdf – for rendering PDF documents
3. JavaScript (ES6) – for highlight logic
4. CSS – for layout and visuals

## Project Setup

1. Create the React App
npx create-react-app maersk-case-study
cd maersk-case-study

2. Install Dependencies
npm install react-pdf pdfjs-dist

3. Add the PDF File
Copy your Maersk Q2 2025 Interim Report.pdf into the /public folder:

- public/Maersk Q2 2025 Interim Report.pdf

4. Add Project Files

5. Inside the /src folder:
- Create a components folder for UI parts.
- Create a core folder for logic handling.

## Folder Structure

```
maersk-case-study/
│
├── public/
│   ├── Maersk Q2 2025 Interim Report.pdf     # The PDF file displayed in the app
│   └── index.html
│
├── src/
│   ├── components/
│   │   ├── PDFViewer.jsx                     # Renders PDF and handles highlighting
│   │   └── AnalysisPanel.jsx                 # Displays analysis text and handles [3] click
│   │
│   ├── core/
│   │   └── CaseStudyManager.js               # Manages highlight activation/deactivation
        └── PDFHighlighter.js
│   │
│   ├── App.js                                # Combines PDFViewer and AnalysisPanel
│   ├── App.css                               # Styles layout, highlight colors, and panels
│   ├── index.js
│   └── reportWebVitals.js
│
├── package.json
└── README.md
```

## Component Overview
1. PDFViewer.jsx

Displays the PDF using react-pdf.
Watches for a signal from CaseStudyManager.
When [3] is clicked, it finds and highlights
“Gain on sale of non-current assets, etc” in yellow within the text layer.

2. CaseStudyManager.js

Handles shared app logic for activating or clearing highlights.
Uses a subscriber pattern to notify PDFViewer when a highlight should be applied.

3. AnalysisPanel.jsx

Shows the “Analysis” paragraph.
When [3] is clicked:
Activates the highlight state via CaseStudyManager.
Smoothly scrolls the PDF to the section containing the target phrase.
“Clear Highlight” resets the state and removes yellow highlights.

4. PDFHighlighter.js

Takes a target phrase (like "Gain on sale of non-current assets, etc")
Normalizes the text for matching (ignoring dashes, spaces, capitalization)

5. App.css

Defines clean two-column layout.
Ensures highlighted text appears bright yellow and on top of the PDF layer.

## Run the App
```
npm start
```
Then open your browser at:
http://localhost:3000

# How It Works

1. The app loads the Maersk PDF on the left.
2. The right side shows your analysis text.
3. When you click reference [3], it:
4. Tells the PDFViewer to find "Gain on sale of non-current assets, etc".
5. Highlights the matching text in yellow inside the PDF.
6. Scrolls to that section.
7. Clicking Clear Highlight removes the yellow mark.
   
### Future Enhancements

Here’s a quick roadmap for extending the project:

1. Docker Integration (Planned)

Containerize the app using a multi-stage Dockerfile:
- Stage 1: Build React app (npm run build)
- Stage 2: Serve static files using Nginx
Enables consistent deployment across environments.
Future folder: /docker/ for Dockerfile and compose configuration.

2. Dynamic Phrase Highlighting

- Allow multiple reference tags [1], [2], [3] to trigger different phrases.
- Support for multi-word and partial matching across PDF pages.

3. Backend Integration (Optional)

Add an Express or FastAPI backend to fetch real financial data dynamically.
Enable cloud PDF fetching and caching.

4. Responsive Layout

Improve mobile and tablet layout for better readability.

### Author

**Neha Jagtap**  
**Software Development Engineer** 
