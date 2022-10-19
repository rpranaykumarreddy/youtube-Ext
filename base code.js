//let timeRoot = document.querySelectorAll('ytd-playlist-panel-renderer span.ytd-thumbnail-overlay-time-status-renderer');

let a = document.getElementById("playlist");

let timeRoot = document.querySelectorAll("ytd-playlist-panel-renderer#playlist span.ytd-thumbnail-overlay-time-status-renderer");
let len = timeRoot.length;
let time = 0;
for (i = 0; i < len; i++) {
    let DomT = timeRoot[i].innerHTML;
    DomT.replace("\n", "").trim();
    let temp = DomT.split(":");
    time += Number(temp[0]) * 60 + Number(temp[1]);
}

console.log(time);
console.log(secToStr(time));


function secToStr(sec) {
    let temp, min, hr;
    hr = Math.floor(sec / 3600);
    min = Math.floor((sec - (hr * 3600)) / 60);
    sec = Math.floor(sec - (hr * 3600) - (min * 60));
    temp = hr + (hr - 1 ? " hrs " : " hr ") + min + (min - 1 ? " mins " : " min ") + sec + (sec - 1 ? " secs " : " sec ");
    return temp;
}