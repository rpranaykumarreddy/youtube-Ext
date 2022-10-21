//var word = chrome.extension.getBackgroundPage().data;
//console.log(word)
chrome.extension.onMessage.addListener(function(message, messageSender, sendResponse) {
    console.log("data:" + message.msg)
});