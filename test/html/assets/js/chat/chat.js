/*
** EPITECH PROJECT, 2024
** mockup
** File description:
** script.js
*/

function generateSentMessage(message) {
    const receiverMessage = document.createElement("div");
    receiverMessage.classList.add("talk-bubble", "sender", "tri-right", "right-top");
    const talkText = document.createElement("div");
    talkText.classList.add("talktext");
    const messageField = document.createElement("p");
    messageField.textContent = message;
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
    messageField.textContent = message;
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

function injectChatLog() {
    const chatLog = document.getElementById("chat-info");
    const username = window.cookie_manager.read("username") || "User";
    const messages = [
        {
            "sender": false,
            "name": "Marie",
            "icon": "",
            "message": "Mon fils de 10 ans a du mal avec les imprévus. On utilise un planning visuel à la maison, et ça l’aide beaucoup !"
        },
        {
            "sender": false,
            "name": "Paul",
            "icon": "",
            "message": "Pareil ici ! On lui explique chaque changement à l’avance, et on lui donne du temps pour s’adapter."
        },
        {
            "sender": false,
            "name": "Sophie",
            "icon": "",
            "message": "Est-ce que vos enfants ont des crises en rentrant de l’école ? Le mien est épuisé et s’énerve facilement…"
        },
        {
            "sender": false,
            "name": "Luc",
            "icon": "",
            "message": "Oui, c’est fréquent. On lui laisse 30 min de calme en rentrant, sans lui poser de questions. Ça change tout !"
        },
        {
            "sender": true,
            "name": username,
            "icon": "",
            "message": "Ici, on utilise un coin \"repos\" avec un casque anti-bruit et ses jouets préférés. Ça l’aide à décompresser."
        },
        {
            "sender": false,
            "name": "Emma",
            "icon": "",
            "message": "Mon fils ne supporte pas les étiquettes sur les vêtements. On coupe tout ou on prend des habits adaptés."
        },
    ];
    messages.forEach((message) => {
        chatLog.appendChild(beautifyMessage(message.message, message.sender, message.name, message.icon));
    });
}

document.addEventListener("DOMContentLoaded", injectChatLog);
