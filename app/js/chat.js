// Attach DOM controls
let textsubmit = document.getElementById("textsubmit");
let textinput = document.getElementById("textinput");
let characterinput = document.getElementById("characterinput");
let messagecontainer = document.getElementById("message-container");
let chats = [];
let lastUser = null, lastMinute = -6, lastHour;

// Handle message entering
function enterMessage() {
    let msg = textinput.innerText;
    textinput.innerText = "";
    if (msg !== "") {
        let user;
        if (msg.indexOf(':') != -1) {
            user = msg.split(':', 2)[0];
            msg = msg.split(':', 2)[1];
        }
        else {
            user = lastUser;
        }
        let date = new Date();
        if (date.getHours() != lastHour || date.getMinutes() >= lastMinute + 5 || user != lastUser) {
            lastHour = date.getHours();
            lastMinute = date.getMinutes();
            let timeString = `${date.getHours() > 12 ? date.getHours() - 12 : date.getHours()}:${date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes()} ${date.getHours() >= 12 ? 'PM' : 'AM'}`;
            let HTMLtime = document.createElement("div");
            HTMLtime.className = "chat-time";
            HTMLtime.innerText = `${user}, ${timeString}`;
            messagecontainer.insertAdjacentElement("beforeend", HTMLtime);
        }
        if(user != lastUser || user == null){
            let HTMLuser = document.createElement("div");
            HTMLuser.className = "chat-profile";
            HTMLuser.innerText = user.substring(0,1);
            characterinput.innerText = user.substring(0,1);
            messagecontainer.insertAdjacentElement("beforeend", HTMLuser);
            lastUser = user;
        }
        let HTMLmessage = document.createElement("div");
        HTMLmessage.className = "chat-bubble";
        HTMLmessage.innerText = msg;
        messagecontainer.insertAdjacentElement("beforeend", HTMLmessage).scrollIntoView();
        chats.push({ usr: user, msg: msg, hr: date.getHours(), min: date.getMinutes() });
        localStorage.setItem("chat", JSON.stringify({ chats: chats }));
    }
}

// Attach event listeners
textsubmit.addEventListener('click', enterMessage());
textinput.addEventListener('keydown', function (e) {
    switch (e.key) {
        case "Enter":
            e.preventDefault();
            enterMessage();
            break;
        default:
            break;
    }
});

function onboard() {
    try {
        chats = JSON.parse(localStorage.getItem("chat")).chats;
    }
    catch (e) {
        chats = [];
    }
    console.log(localStorage.getItem("chat"));
    lastMinute = -6;
    lastHour = -6;
    for (let i = 0; i < chats.length; i++) {
        let HTMLmessage = document.createElement("div");
        HTMLmessage.className = "chat-bubble";
        try {
            HTMLmessage.innerText = chats[i].msg;
        }
        catch (e) {
            console.log("Corrupted database");
            localStorage.clear();
        }
        if (chats[i].min >= lastMinute + 5 || chats[i].hr != lastHour || chats[i].usr != lastUser) {
            lastMinute = chats[i].min;
            lastHour = chats[i].hr;
            let HTMLtime = document.createElement("div");
            HTMLtime.innerText = `${chats[i].usr}, ${lastHour > 12 ? lastHour - 12 : lastHour}:${lastMinute >= 10 ? lastMinute : "0" + lastMinute} ${lastHour >= 12 ? 'PM' : 'AM'}`;
            HTMLtime.className = "chat-time";
            messagecontainer.insertAdjacentElement("beforeend", HTMLtime);
        }
        if(chats[i].usr != lastUser || chats[i].usr == null){
            let HTMLuser = document.createElement("div");
            HTMLuser.className = "chat-profile";
            HTMLuser.innerText = chats[i].usr.substring(0,1);
            characterinput.innerText = chats[i].usr.substring(0,1);
            messagecontainer.insertAdjacentElement("beforeend", HTMLuser);
            lastUser = chats[i].usr;
        }
        messagecontainer.insertAdjacentElement("beforeend", HTMLmessage).scrollIntoView();
    }
}
document.addEventListener('load', onboard());