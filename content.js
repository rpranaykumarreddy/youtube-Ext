var st = -1,
    ed = -1;

function start() {
    let urlStr = window.location.href;
    if (urlStr.includes("youtube.com/")) {
        let playKey = urlStr.split("?")[0].includes("playlist");
        st = window.prompt("Starting from");
        st = Number(st);
        ed = window.prompt("end till");
        ed = Number(ed);
        temp = calcLen(st, ed, playKey)
        console.log(temp);
        window.alert(temp)
    }
}

function secToStr(sec) {
    let temp, min, hr;
    hr = Math.floor(sec / 3600);
    min = Math.floor((sec - (hr * 3600)) / 60);
    sec = Math.floor(sec - (hr * 3600) - (min * 60));
    temp = hr + (hr - 1 ? " hrs " : " hr ") + min + (min - 1 ? " mins " : " min ") + sec + (sec - 1 ? " secs " : " sec ");
    return temp;
}

function calcLen(x, y, playKey) {
    let timeRoot;
    if (playKey) {
        timeRoot = document.querySelectorAll("span.ytd-thumbnail-overlay-time-status-renderer");
    } else {
        timeRoot = document.querySelectorAll("ytd-playlist-panel-renderer#playlist span.ytd-thumbnail-overlay-time-status-renderer");
    }
    let len = timeRoot.length;
    let time = 0;
    if (x > y) { return "x>y" }
    if (x < 1) x = 1;
    if (x - 1 > len) x = len;
    if (y - 1 > len) y = len;
    if (y < 1) y = x;
    for (i = (x - 1); i < y - 1; i++) {
        let DomT = timeRoot[i].innerText;
        DomT.replace("\n", "").trim();
        let temp = DomT.split(":");
        time += Number(temp[0]) * 60 + Number(temp[1]);
    }
    let bw = y - x + 1;

    let out = "No of videos : " + bw + "\nAverage length of video : " + secToStr(time / bw) + "\nTotal length of playlist : " + secToStr(time) +
        "\nAt 1.25 x : " + secToStr(time / 1.25) + "\nAt 1.50 x : " + secToStr(time / 1.5) + "\nAt 1.75 x : " + secToStr(time / 1.75) + "\nAt 2.00 x : " + secToStr(time / 2);
    console.log('calcLen is Closed');
    return out;
}

start();