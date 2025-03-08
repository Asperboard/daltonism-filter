/*
** EPITECH PROJECT, 2024
** mockup
** File description:
** suivi_pro.js
*/

function generateSentMessage(message) {
    const receiverMessage = document.createElement("div");
    receiverMessage.classList.add("talk-bubble", "sender", "tri-right", "right-top");
    const talkText = document.createElement("div");
    talkText.classList.add("talktext");
    const messageField = document.createElement("p");
    if (typeof message === "object") {
        messageField.appendChild(message);
    } else {
        messageField.innerText = message;
    }
    talkText.appendChild(messageField);
    receiverMessage.appendChild(talkText);
    return receiverMessage;
}

function generateReceivedMessage(message) {
    const receiverMessage = document.createElement("div");
    receiverMessage.classList.add("talk-bubble", "receiver", "tri-right", "left-top");
    const talkText = document.createElement("div");
    talkText.classList.add("talktext");
    const messageField = document.createElement("p");
    if (typeof message === "object") {
        messageField.appendChild(message);
    } else {
        messageField.innerText = message;
    }
    talkText.appendChild(messageField);
    receiverMessage.appendChild(talkText);
    return receiverMessage;
}

function beautifyMessage(message, sender, name, icon) {
    const receiverMessage = document.createElement("div");
    const metaData = document.createElement("div");
    const nameElem = document.createElement("p");

    receiverMessage.classList.add("message-box");

    nameElem.textContent = name;
    nameElem.classList.add(sender ? "sender-text" : "receiver-text");  // This handles left or right alignment

    metaData.appendChild(nameElem);
    if (icon) {
        const iconElement = document.createElement("img");
        iconElement.src = icon;
        iconElement.style.width = '30px'; // You can adjust the icon size here
        metaData.appendChild(iconElement);
    }

    receiverMessage.appendChild(metaData);

    if (sender) {
        receiverMessage.style.alignItems = "flex-end";
        receiverMessage.appendChild(generateSentMessage(message));
    } else {
        receiverMessage.appendChild(generateReceivedMessage(message));
    }

    return receiverMessage;
}

function generateResults() {
    const results = document.createElement("div");
    results.classList.add("results");
    const userGame = getIframeOfTheGame();
    results.appendChild(userGame);
    results.appendChild(document.createElement("br"));
    results.appendChild(document.createElement("br"));
    const userScore = document.createElement("p");
    userScore.textContent = "Résultat: 4/5";
    results.appendChild(userScore);
    const userTime = document.createElement("p");
    userTime.textContent = "Temps: 2 minutes";
    results.appendChild(userTime);
    return results;
}

function injectChatLog() {
    const chatLog = document.getElementById("chat-info");
    const username = window.cookie_manager.read("username") || "User";
    const messages = [
        {
            "sender": true,
            "name": username,
            "icon": "",
            "message": `Bonjour Lucas ! Comme promis, voici un petit jeu pour t’aider à mieux comprendre les émotions. Tu peux y jouer quand tu veux, et on en reparlera ensemble la prochaine fois !`
        },
        {
            "sender": true,
            "name": username,
            "icon": "",
            "message": generateResults()
        },
        {
            "sender": false,
            "name": "Lucas",
            "icon": "",
            "message": "J’ai testé le jeu ! C’était sympa, mais parfois je ne savais pas trop quoi répondre."
        },
        {
            "sender": true,
            "name": username,
            "icon": "",
            "message": "Super que tu aies essayé ! Si tu veux, on pourra voir ensemble les situations qui t’ont posé problème et en parler."
        },
        {
            "sender": false,
            "name": "Lucas",
            "icon": "",
            "message": "Oui, je veux bien ! Il y avait une question où je ne savais pas si c’était de la peur ou de la colère."
        },
        {
            "sender": true,
            "name": username,
            "icon": "",
            "message": "Super que tu aies essayé ! Si tu veux, on pourra voir ensemble les situations qui t’ont posé problème et en parler."
        },
    ];
    messages.forEach((message) => {
        chatLog.appendChild(beautifyMessage(message.message, message.sender, message.name, message.icon));
    });
}

document.addEventListener("DOMContentLoaded", injectChatLog);
