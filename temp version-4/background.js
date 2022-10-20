console.log("Background.js");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // 2. A page requested user data, respond with a copy of `user`

    console.log("received");
    if (message === 'get-user-data') {
        sendResponse("hi");
    }
    console.log("sent");
});
/*
chrome.tabs.onActivated.addListener(function(activeInfo) {
    console.log("clicked");
    console.log(activeInfo);
    chrome.tabs.get(activeInfo.tabId, function(tab) {
        console.log(tab);
        let tabId = tab.id;
        if (tab.url && tab.url.includes("watch")) {
            console.log("Watch msg open");
            chrome.tabs.sendMessage(tabId, {
                type: "watch"
            });
            console.log("Watch msg sent");

        } else if (tab.url && tab.url.includes("playlist")) {
            console.log("Playlist msg open");
            chrome.tabs.sendMessage(tabId, {
                type: "playlist"
            }, function(response) {
                console.log(response.farewell);
            });
            console.log("playlist msg sent");

        }
    })
});

const user = {
    username: 'demo-user'
};
*/
/*
async function star() {
    console.log("clicked");
    let activeTa = await getCurentTab();
    let tabId = activeTa.id;
    console.log(activeTa)
    if (activeTa.url && activeTa.url.includes("watch")) {
        chrome.tabs.sendMessage(tabId, {
            type: "watch"
        });
        console.log("Watch msg sent");

    } else if (activeTa.url && activeTa.url.includes("playlist")) {
        chrome.tabs.sendMessage(tabId, {
            type: "playlist"
        });
        console.log("playlist msg sent");

    }
};
async function getCurentTab() {
    console.log("gettTab open");
    let query = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(query);
    console.log("getteb close");
    return tab
}
*/
//Back those
/*chrome.runtime.onMessage.addListener(receiver);
var data;

function receiver(request) {
    data = request.sec;
    console.log(data);
}
chrome.runtime.sendMessage({ msg: 'hello there' }); */