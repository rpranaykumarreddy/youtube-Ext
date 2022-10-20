console.log("Popup.js");
var background = chrome.extension.getBackgroundPage();
console.log(background);

chrome.storage.local.get(['key'], function(result) {
    console.log('Value currently is ' + result.key);
});
chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        console.log(
            `Storage key "${key}" in namespace "${namespace}" changed.`,
            `Old value was "${oldValue}", new value is "${newValue}".`
        );
        console.log(newValue);
    }
});

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
    var timeRoot = document.querySelectorAll('ytd-playlist-panel-renderer span.ytd-thumbnail-overlay-time-status-renderer');
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