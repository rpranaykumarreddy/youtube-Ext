console.log('Content.js');
window.addEventListener("load", start());
var data = { name: "", titles: [], time: [] };

function refresh(sec) {
    setTimeout(start, sec * 1000);
}

function start() {
    var urlStr = window.location.href;
    var playKey;
    playKey = urlStr.split("?")[0].includes("playlist");
    var docChe = document.querySelectorAll('.ytd-thumbnail-overlay-time-status-renderer');
    if (docChe.length) {
        console.log(docChe.length, "move on");
        makeData(playKey);
    } else {
        console.log(docChe.length, "time on");
        refresh(1);
    }

}

function makeData(pK) {
    if (pK) {
        const PlayTit = document.querySelectorAll("#title-form yt-formatted-string#text-displayed.style-scope.ytd-inline-form-renderer");
        const titDoc = document.querySelectorAll('a#video-title.yt-simple-endpoint.style-scope.ytd-playlist-video-renderer');
        const time = document.querySelectorAll("span.ytd-thumbnail-overlay-time-status-renderer");
        console.log(titDoc);
        console.log(time);
        if (titDoc.length != time.length) {
            refresh(1);
            return null;
        } else {
            data.name = PlayTit[0].innerText;
            for (it = 0; it < titDoc.length; it++) {
                data.titles.push(titDoc[it].innerText);
                let DomT, temp, sum;
                DomT = time[it].innerText;
                DomT.replace("\n", "").trim();
                temp = DomT.split(":");
                sum = 0;
                temp.reverse();
                switch (temp.length) {
                    case 1:
                        sum = Number(temp[0]);
                        break;
                    case 2:
                        sum = Number(temp[0]) + Number(temp[1]) * 60;
                        break;
                    case 3:
                        sum = Number(temp[0]) + Number(temp[1]) * 60 + Number(temp[2]) * 3600;
                        break;
                    case 4:
                        sum = Number(temp[0]) + Number(temp[1]) * 60 + Number(temp[2]) * 3600 + Number(temp[3]) * 86400;
                        break;
                }
                data.time.push(Number(sum));
            }
            console.log(data);
        }
    } else {
        const PlayTit = document.querySelectorAll(".title .yt-simple-endpoint.style-scope.yt-formatted-string");
        const titDoc = document.querySelectorAll('span#video-title.style-scope.ytd-playlist-panel-video-renderer');
        const time = document.querySelectorAll("ytd-playlist-panel-renderer#playlist span.ytd-thumbnail-overlay-time-status-renderer");
        console.log(titDoc);
        console.log(time);
        if (titDoc.length != time.length) {
            refresh(1);
            console.log("Watch not equal");
            return null;
        } else {
            data.name = PlayTit[0].innerText;
            for (it = 0; it < titDoc.length; it++) {
                data.titles.push(titDoc[it].innerText);
                let DomT, temp, sum;
                DomT = time[it].innerText;
                DomT.replace("\n", "").trim();
                temp = DomT.split(":");
                sum = 0;
                temp.reverse();
                switch (temp.length) {
                    case 1:
                        sum = Number(temp[0]);
                        break;
                    case 2:
                        sum = Number(temp[0]) + Number(temp[1]) * 60;
                        break;
                    case 3:
                        sum = Number(temp[0]) + Number(temp[1]) * 60 + Number(temp[2]) * 3600;
                        break;
                    case 4:
                        sum = Number(temp[0]) + Number(temp[1]) * 60 + Number(temp[2]) * 3600 + Number(temp[3]) * 86400;
                        break;
                }
                data.time.push(Number(sum));
            }
            console.log(data);
        }
    }
    sendBack(data);
}


function sendBack(data) {
    if (!data) {
        data = "Data coming";
    }
    chrome.runtime.sendMessage(data, (response) => {
        console.log('Response:', response);
    });
}