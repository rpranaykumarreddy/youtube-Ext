let msg = "wait";
set();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("received");
    console.log(message);
    msg = message;
    sendResponse("Got it");
    console.log("sent");
    set();
});

function set() {
    chrome.storage.local.set({ key: msg }, function() {
        console.log('Value is set to ' + msg);
    });
}