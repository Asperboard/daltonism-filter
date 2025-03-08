/*
** EPITECH PROJECT, 2024
** mockup
** File description:
** cookies.js
*/

const cookie_consent_cookie_name = 'cookie_consent';

function inject_cookie_banner(ID = 'cookie_banner') {
    const banner = document.getElementById(ID) || document.createElement("div");
    banner.classList.add("cookie-banner");
    banner.classList.add("style_popup_banner_container");
    banner.innerHTML = `
        <p data-type="cookie">
            Ce site utilise des cookies qui sont essentiels pour sont bon fonctionnement, aucune de vos données ne sort de votre ordinateur.
            <button onclick="acceptCookies(this.parentElement)">Accepter</button>
        </p>
    `;
}

function acceptCookies(element) {
    element.parentElement.style.display = 'none';
    window.cookie_manager.createCookie(cookie_consent_cookie_name, 'true', 365);
}

async function inject_banner() {
    const id = "cookie_banner";
    let maxTries = 10;

    while (maxTries > 0) {
        if (window.cookie_manager) {
            break;
        }
        await sleep(1000);
        maxTries--;
    }

    if (!window.cookie_manager) {
        console.error("cookie_manager module is still missing after multiple retries.");
        return;
    }
    const cookie_accepted = window.cookie_manager.readCookie(cookie_consent_cookie_name);
    console.log("cookie_accepted: '", cookie_accepted, "'");
    if (cookie_accepted === "" && document.getElementById(id) !== null) {
        console.log("Cookie not accepted");
        inject_cookie_banner(id);
    } else {
        console.log("Cookie already accepted");
    }
}

document.addEventListener("DOMContentLoaded", inject_banner);
