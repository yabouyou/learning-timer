var challengeComplete = false;


const filter = {
    urls: [
    'https://*.facebook.com/*'
    ],
}

const webRequestFlags = [
'blocking',
];

function page() {
    if (!challengeComplete){
        return {
        redirectUrl : chrome.extension.getURL("MemoryGame/index.html")
        };
    }   
}

window.chrome.webRequest.onBeforeRequest.addListener(page, filter, webRequestFlags);

chrome.runtime.onMessage.addListener(function(msg) {
    if (msg.txt == "challengeCompleted"){
        console.log("Challenge Completed");
        challengeComplete = true;
    }
});


chrome.alarms.onAlarm.addListener(function(alarm){
    console.log("alarm Triggered");
    challengeComplete = false;
});


