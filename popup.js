
function submitClicked() {
    
	// var x = document.createElement("HEADER");
	// x.setAttribute("id", "myHeader");
	// document.body.appendChild(x);

    // var y = document.createElement("H3"); 
    // var date = new Date()
    // var time = date.getHours()

	// var t = document.createTextNode(time);
    // y.appendChild(t);
    // document.getElementById("myHeader").appendChild(y);
    // var x = chrome.extension.getBackgroundPage();
    // let msg = {
    //     txt: "challengeCompleted"
    // }
    // chrome.runtime.sendMessage(msg);

    //get the timer period
    var timerPeriod = parseInt(document.getElementById("timer-period").value);
    //Clear the text
    document.getElementById('timer-period').value = "";

    chrome.alarms.create('challengeAlarm', {
        periodInMinutes: timerPeriod });

}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("timer-submit").addEventListener("click", submitClicked);
  });