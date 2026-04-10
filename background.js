// Service worker: toggle mesurer on extension icon click
chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.id) return;

  try {
    // Try to send a toggle message first (if content script already loaded)
    await chrome.tabs.sendMessage(tab.id, { type: "MESURER_TOGGLE" });
  } catch {
    // Content script not yet injected — inject it
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["dist/content.js"],
      });
    } catch (err) {
      console.error("Mesurer: failed to inject content script", err);
    }
  }
});
