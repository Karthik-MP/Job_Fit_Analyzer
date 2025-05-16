chrome.action.onClicked.addListener((tab) => {
  // Open the side panel programmatically
  chrome.sidePanel.open({ windowId: tab.windowId });
});

chrome.runtime.onInstalled.addListener(() => {
  console.log("LinkedIn Job Analyzer Extension Installed");
});