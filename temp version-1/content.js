console.log('page is fully loaded');
let out = calcLen(1);
chrome.runtime.sendMessage({ "sec": out });
console.log('Sendmessage is Closed');



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

function calcLen(x) {
    console.log('calcLen is Opened');
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