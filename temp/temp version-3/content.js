//Back those
/*
console.log('page is fully loaded');
let out = calcLen(1);
chrome.runtime.sendMessage({ "sec": out });
console.log('Sendmessage is Closed');
*/
document.addEventListener("DOMContentLoaded", start);
var data = { url: "" };

var head = document.getElementsByTagName('HEAD')[0];
var link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = "chrome-extension://" + chrome.runtime.id + "/style.css";
head.appendChild(link);
var htmDiv = { in: "" }

let html = "<div id=\"you-chr-ext-but\"><h1>YT</h1></div><div id=\"you-chr-ext\" style=\"position: fixed;\"><input class=\"start\" onblur=\"check()\" type=\"number\" step=\"1\" min=\"1\" value=\"1\"><input class=\"end\" onblur=\"check()\" type=\"number\" step=\"1\" min=\"1\" value=\"2\"><h3>No of videos : <br><span class=\"NumVid\"></span></h3><h3>Average length of video : <br> <br> <span class=\"AvgLen\"></span></h3><h3>Total length of playlist : <br> <span class=\"TotLen\"></span></h3><h3>At 1.25x : <br> <span class=\"Tot1.25\"></span></h3><h3>At 1.50x : <br> <span class=\"Tot1.50\"></span></h3><h3>At 1.75x : <br> <span class=\"Tot1.75\"></span></h3><h3>At 2.00x : <br><span class=\"Tot2.00\"></span></h3></div>";
let parser = new DOMParser();
let doc = parser.parseFromString(html, 'text/html');
var wrapper = document.createElement('div');
wrapper.innerHTML = html;
var heaEle = document.getElementById("secondary");
console.log(wrapper)
heaEle.appendChild(wrapper);

function start() {
    let urlStr = window.location.href;
    if (urlStr.includes("youtube.com/")) {
        let playKey = urlStr.split("?")[0].includes("playlist");
        console.log(calcLen(1, playKey));
    }
}

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

function calcLen(x, playKey) {
    console.log('calcLen is Opened');
    let timeRoot;
    if (playKey) {
        timeRoot = document.querySelectorAll("span.ytd-thumbnail-overlay-time-status-renderer");
    } else {
        timeRoot = document.querySelectorAll("ytd-playlist-panel-renderer#playlist span.ytd-thumbnail-overlay-time-status-renderer");
    }
    let len = timeRoot.length;
    let time = 0;
    if (x < 1) {
        x = 1;
    }
    console.log(len);
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


start();