console.log("time");
chrome.runtime.onMessage.addListener(receiver);
var data;

function receiver(request) {
    data = request.sec;
    console.log(data);
}
chrome.runtime.sendMessage({ msg: 'hello there' });