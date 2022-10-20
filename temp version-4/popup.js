function a(te) { console.debug(te); }
a("Popup.js");
var background = chrome.extension.getBackgroundPage();
a(background);

chrome.storage.local.get(['key'], function(result) {
    a('Value currently is ' + result.key);
});

function secToStr(sec) {
    a('secToStr is Opened');
    let temp, min, hr;
    hr = Math.floor(sec / 3600);
    min = Math.floor((sec - (hr * 3600)) / 60);
    sec = Math.floor(sec - (hr * 3600) - (min * 60));
    temp = hr + (hr - 1 ? " hrs " : " hr ") + min + (min - 1 ? " mins " : " min ") + sec + (sec - 1 ? " secs " : " sec ");
    a('SecToStr is Closed');
    return temp;
}

function calcLen(x, t) {
    a('calcLen is Opened');
    var timeRoot;
    if (t == "w") {
        timeRoot = document.querySelectorAll('ytd-playlist-panel-renderer span.ytd-thumbnail-overlay-time-status-renderer');
    } else if (t == "p") {
        timeRoot = document.querySelectorAll('span.ytd-thumbnail-overlay-time-status-renderer');
    }
    let len = timeRoot.length;
    let time = 0;
    for (i = (x - 1); i < len; i++) {
        let DomT = timeRoot[i].innerText;
        DomT.replace("\n", "").trim();
        let temp = DomT.split(":");
        time += Number(temp[0]) * 60 + Number(temp[1]);
    }
    a(time);
    let out = secToStr(time);
    a('calcLen is Closed');
    return out;
}