// Back those
/*var word = chrome.extension.getBackgroundPage().data;
console.log(word)
chrome.extension.onMessage.addListener(function(message, messageSender, sendResponse) {
    console.log("data:" + message.msg)
});*/

//import { getCurentTab } from "./util.js"


document.addEventListener("DOMContentLoaded", async() => {
    let activeTab = await getCurentTab();
    let par = activeTab.url.split("?")[1];
    a = document.getElementById("output");
    if (activeTab.url.includes("youtube.com/")) {
        a.innerHTML = "This is youtube page";

        /*
        chrome.storage.sync.get([localStr], (dat) => {
            console.log(dat);
            let displa = dat[locaStr] ? JSON.parse(dat[localStr]) : [];
            console.log("displa:");
            console.log(displa);
            a.innerHTML += display.temp;
        })
        */
    } else {
        a.innerHTML = "This is not youtube page"
    }
});

async function getCurentTab() {
    let query = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(query);
    return tab
}