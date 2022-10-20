console.log('Content.js');
window.addEventListener("load", start());

function start() {
    var urlStr = window.location.href;
    var playKey;
    playKey = urlStr.split("?")[0].includes("playlist");
    makeData(playKey);
    sendBack();
}

function makeData(pK) {
    if (pK) {
        var titles = [];
        var titDoc = document.querySelectorAll('#content a#video-title.yt-simple-endpoint.style-scope.ytd-playlist-video-renderer');
        for (it = 0; it < titDoc.length; it++) {
            titles.push(titDoc[it].innerText);
        }
        console.log(titles);
        time = document.querySelectorAll("span.ytd-thumbnail-overlay-time-status-renderer");
    } else {
        time = document.querySelectorAll("ytd-playlist-panel-renderer#playlist span.ytd-thumbnail-overlay-time-status-renderer");
    }
}

function sendBack(data) {
    if (!data) {
        data = "Data coming";
    }
    chrome.runtime.sendMessage(data, (response) => {
        console.log('Response:', response);
    });
}