/*
** EPITECH PROJECT, 2024
** mockup
** File description:
** cookies.js
*/

const feedback_form_cookie_name = 'feedback_form';

function inject_feedback_banner(ID = 'feedback_banner') {
    const banner = document.getElementById(ID) || document.createElement("div");
    const trigger_node = `window.open('${checkHtmlPath()}/feedback', '_blank', 'width=640px,height=480px');`;
    const opens_externally = `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"><i class="fas fa-external-link-alt"></i>`;
    banner.classList.add("cookie-banner");
    banner.classList.add("style_popup_banner_container");
    banner.innerHTML = `
        <p data-type="feedback">
            Votre avis nous intéresse:
            <button onclick="${trigger_node}">Remplir le formulaire ${opens_externally}</button>
            <button onclick="permaHideFeedbackBanner(this.parentElement)">Ne plus montrer</button>
            <button onclick="redirectToQrCode()">QR code</button>
            <button data-theme="cross" onclick="hideFeedbackBanner(this.parentElement)">X</button>
        </p>
    `;
}

function redirectToQrCode() {
    window.location.pathname = `${checkHtmlPath()}/feedback/qr`;
}

function permaHideFeedbackBanner(element) {
    element.parentElement.style.display = 'none';
    console.log("Feedback banner hidden permanently (for a year)");
    window.cookie_manager.createCookie(feedback_form_cookie_name, 'true', 365);
}

function hideFeedbackBanner(element) {
    element.parentElement.style.display = 'none';
    console.log("Feedback banner hidden for this session");
    window.cookie_manager.createCookie(feedback_form_cookie_name, 'true', window.cookie_manager.toMinute(30));
}

async function inject_the_feedback_banner() {
    const id = "feedback_banner";
    let maxTries = 10;

    while (maxTries > 0) {
        if (window.cookie_manager) {
            break;
        }
        await sleep(1000);
        maxTries--;
    }

    if (!window.cookie_manager) {
        console.error("feedback module is still missing after multiple retries.");
        return;
    }
    const cookie_accepted = window.cookie_manager.readCookie(feedback_form_cookie_name);
    console.log("form_banner_closed: '", cookie_accepted, "'");
    if (cookie_accepted === "" && document.getElementById(id) !== null) {
        console.log("Feedback not accepted");
        inject_feedback_banner(id);
    } else {
        console.log("Feedback already accepted");
    }
}

document.addEventListener("DOMContentLoaded", inject_the_feedback_banner);
