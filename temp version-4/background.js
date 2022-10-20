function a(te) { console.debug(te); }
a("Background.js");
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    a("received");
    a(message);
    if (message.temp === 'hello') {
        sendResponse("Got it");
    }
    a("sent");
});

chrome.storage.local.set({ key: "value" }, function() {
    a('Value is set to ' + "value");
});