console.log('Content.js');

var open = false;
function OpenOb() {
    const elementToObserve = document.querySelector("#content");
    const observer = new MutationObserver(() => {
        start();
    });
    observer.observe(elementToObserve, { subtree: true, childList: true });
    console.log("open Ob");
}
//data structure
var prevData = { name: "", titles: [], time: [], status: "open" };
var data = { name: "", titles: [], time: [], status: "open" };

//sync of list every 5 secs on load
//sync(5);
// sync function start on first time then get to interval after few sec...
// async function sync(sec) {
//     start();
//     intTi = await setInterval(start, (sec * 1000));
// }
start();
window.addEventListener("load", () => {
    start();
});


//refresh on playlist not loaded into page...
function refresh(sec) {
    setTimeout(start, sec * 1000);
}

//start process
function start() {
    var urlStr = window.location.href;
    var playKey;
    playKey = urlStr.split("?")[0].includes("playlist") ? true : (urlStr.split("?")[0].includes("watch") ? false : "null");
    //console.log("play key: " + playKey);
    var docChe = document.querySelectorAll('.ytd-thumbnail-overlay-time-status-renderer');
    if (docChe.length) {
        //console.log("move on");
        makeData(playKey);
    } else {
        //console.log("time on");
        refresh(1);
    }
    if (!open) {
        setTimeout(OpenOb(), 3000);
        open = true;
    }
}

function makeData(pK) {
    data = { name: "", titles: [], time: [], status: "entry" };
    if (pK === true) {
        //console.log("Enter pk true");
        const cheTyPL = document.querySelectorAll('[aria-label="Edit description"]');
        var PlayTit;
        if (cheTyPL.length) {
            PlayTit = document.querySelectorAll("ytd-inline-form-renderer#title-form.style-scope.ytd-playlist-sidebar-primary-info-renderer");
        } else {
            PlayTit = document.querySelectorAll("h1#title.style-scope.ytd-playlist-sidebar-primary-info-renderer");
        }

        if (!(PlayTit[0])) {
            PlayTit = document.querySelectorAll("yt-formatted-string#text.style-scope");
        }
        const titDoc = document.querySelectorAll('a#video-title.yt-simple-endpoint.style-scope.ytd-playlist-video-renderer');
        const time = document.querySelectorAll("span.ytd-thumbnail-overlay-time-status-renderer");
        //console.log(titDoc);
        //console.log(time);
        if (titDoc.length != time.length) {
            refresh(1);
            console.log("Watch not equal");
            return null;
        } else {
            data = { name: "", titles: [], time: [], status: "done" };
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
        }
    } else if (pK === false) {
        // console.log("Enter pk false");
        const PlayTit = document.querySelectorAll(".title .yt-simple-endpoint.style-scope.yt-formatted-string");
        const titDoc = document.querySelectorAll('span#video-title.style-scope.ytd-playlist-panel-video-renderer');
        const time = document.querySelectorAll("ytd-playlist-panel-renderer#playlist span.ytd-thumbnail-overlay-time-status-renderer");
        //console.log(titDoc);
        //console.log(time);
        if (titDoc.length != time.length) {
            refresh(1);
            // console.log("Watch not equal");
            return null;
        } else {
            data = { name: "", titles: [], time: [] };
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
        }
    } else {
        //console.log("Enter pk null");
    }
    sendBack(data);
}


function sendBack(data) {
    if (!document.hidden) {
        if (!(data.time.length)) {
            data = "Data coming";
        }
        if (JSON.stringify(prevData) != JSON.stringify(data)) {
            console.log(data);
            chrome.runtime.sendMessage(data, (response) => {
                console.log('Response:', response);
                prevData = data;
            });
        } else {
            //console.log("no change in the things");
        }
    } else {
        console.log("data not sent has page is not inactive");
    }
}

