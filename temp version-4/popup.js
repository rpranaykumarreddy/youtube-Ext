var data = { name: "", titles: [], time: [], status: "" };
var opt = [0, -1, 0];
console.trace("Popup.js");
const intSet = setInterval(optFix, 100);
getData();

function optFix() {
    let x = document.getElementById("sat").value;
    if (x == "loading") {
        opt[2] = data.titles.length;
        if ((opt[2] != 0) && (opt[1] == -1)) {
            opt[1] = data.titles.length;
        }
        addOption(opt[0], opt[1], opt[2]);
        clearInterval(intSet);
        console.trace("done option")
    }
}
chrome.storage.onChanged.addListener(function(changes, namespace) {
    getData();
});

function getData() {
    chrome.storage.local.get(['key'], function(result) {
        data = result.key;
        console.trace(['Intial Value:', result, data]);
        addOption(0, data.titles.length - 1, data.titles.length);
    });
}

document.getElementById("sat").addEventListener('change', onSelCha);
document.getElementById("endEle").addEventListener('change', onSelCha);

function onSelCha() {
    opt[0] = document.getElementById("sat").value;
    opt[1] = document.getElementById("endEle").value;
    console.trace('changed the select: ', opt);
}

function addOption(st, ed, len) {
    console.trace([st, ed, len]);
    if (len) {
        var satEle = document.getElementById("sat");
        var endEle = document.getElementById("endEle");
        satEle.innerHTML = "";
        endEle.innerHTML = "";
        for (let i = 0; i <= ed; i++) {
            var x = document.createElement("OPTION");
            x.setAttribute("value", i);
            t = document.createTextNode(data.titles[i]);
            x.appendChild(t);
            if (i == st) {
                console.trace(i + " " + st);
                x.setAttribute("selected", true);
            }
            satEle.appendChild(x);
        }
        for (let i = st; i < len; i++) {
            var x = document.createElement("OPTION");
            x.setAttribute("value", i);
            t = document.createTextNode(data.titles[i]);
            x.appendChild(t);
            if (i == ed) {
                console.trace(i + " " + ed);
                x.setAttribute("selected", true);
            }
            endEle.appendChild(x);
        }
    }
    console.trace("options updated");
}

function secToStr(sec) {
    console.trace('secToStr is Opened');
    let temp, min, hr;
    hr = Math.floor(sec / 3600);
    min = Math.floor((sec - (hr * 3600)) / 60);
    sec = Math.floor(sec - (hr * 3600) - (min * 60));
    temp = hr + (hr - 1 ? " hrs " : " hr ") + min + (min - 1 ? " mins " : " min ") + sec + (sec - 1 ? " secs " : " sec ");
    console.trace('SecToStr is Closed');
    return temp;
}

function calcLen(arr, s, e) {
    console.trace('calcLen is Opened');
    var out = 0;
    for (i = s; i <= e; i++) {
        out += arr[i];
    }
    console.trace('calcLen is Closed ' + out);
    return out;
}