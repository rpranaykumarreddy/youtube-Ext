let localStr = "";

console.log("Opened ()");
let data = { temp: "hello", type: "null" };
chrome.runtime.onMessage.addListener((msg, sender, reciever) => {
    console.log("onMessage started & Message received");
    let { type } = msg;
    data.type = type;
    if (type == "watch") {
        console.log("Watch received");
        //Code of watch tab
        temp = calcLen(1, "w");
        data.type = temp;
        console.log("watch:" + temp)
    } else if (type == "playlist") {
        console.log("Playlist received");
        //Code of playlist tab}
        temp = calcLen(1, "p");
        console.log("watch:" + temp)
    }

    console.log(data);
    chrome.storage.sync.set({
        [localStr]: JSON.stringify([data])
    });
});

console.log(data);
chrome.storage.sync.set({
    [localStr]: JSON.stringify([data])
});
console.log("Closed ()");


//Back those
/*
console.log('page is fully loaded');
let out = calcLen(1);
chrome.runtime.sendMessage({ "sec": out });
console.log('Sendmessage is Closed');
*/

function secToStr(sec) {
    console.log('secToStr is Opened');
    let temp, min, hr;
    hr = Math.floor(sec / 3600);
    min = Math.floor((sec - (hr * 3600)) / 60);
    sec = Math.floor(sec - (hr * 3600) - (min * 60));
    temp = hr + (hr - 1 ? " hrs " : " hr ") + min + (min - 1 ? " mins " : " min ") + sec + (sec - 1 ? " secs " : " sec ");
    console.log('SecToStr is Closed');
    return temp;
}

function calcLen(x, t) {
    console.log('calcLen is Opened');
    if (t == "w") {
        let timeRoot = document.querySelectorAll('ytd-playlist-panel-renderer span.ytd-thumbnail-overlay-time-status-renderer');
    } else if (t == "p") {
        let timeRoot = document.querySelectorAll('span.ytd-thumbnail-overlay-time-status-renderer');
    }
    let timeRoot = document.querySelectorAll('span.ytd-thumbnail-overlay-time-status-renderer');
    let len = timeRoot.length;
    let time = 0;
    for (i = (x - 1); i < len; i++) {
        let DomT = timeRoot[i].innerText;
        DomT.replace("\n", "").trim();
        let temp = DomT.split(":");
        time += Number(temp[0]) * 60 + Number(temp[1]);
    }
    console.log(time);
    let out = secToStr(time);
    console.log('calcLen is Closed');
    return out;
}