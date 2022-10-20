function a(te) { console.debug(te); }
a('Content.js');

let data = { temp: "hello", type: "null" };
chrome.runtime.sendMessage(data, (response) => {
    a('Response:', response);

});