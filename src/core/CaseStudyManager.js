// src/core/CaseStudyManager.js

/**
 * Manages the highlight state for the Maersk Case Study app.
 */
export default class CaseStudyManager {
  constructor() {
    this.highlightActive = false;
    this.listeners = [];
  }

  activateHighlight() {
    this.highlightActive = true;
    this.notifyListeners();
  }

  deactivateHighlight() {
    this.highlightActive = false;
    this.notifyListeners();
  }

  subscribe(callback) {
    this.listeners.push(callback);
  }

  notifyListeners() {
    this.listeners.forEach((cb) => cb(this.highlightActive));
  }
}
