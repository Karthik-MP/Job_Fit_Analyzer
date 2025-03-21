chrome.action.onClicked.addListener((tab) => {
  // Open the side panel programmatically
  chrome.sidePanel.open({ windowId: tab.windowId });
});