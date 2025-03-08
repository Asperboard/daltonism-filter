/*
** EPITECH PROJECT, 2024
** area-rattrapage
** File description:
** log_user_in.js
*/

async function log_user_in() {
    const dashboard = "/routes/user/dashboard";
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    console.log("window.location", window.location);
    console.log("window.location.origin", window.location.origin);
    console.log("window.location.host", window.location.host);
    console.log("window.location.hostname", window.location.hostname);
    console.log("window.location.protocol", window.location.protocol);
    console.log("window.location.port", window.location.port);
    console.log("window.location.search", window.location.search);
    console.log("window.location.hash", window.location.hash);
    console.log("window.location.pathname", window.location.pathname);
    console.log("dashboard", dashboard);

    const response = await window.update_server.login(email, password);

    console.log(`login: JSON response: ${JSON.stringify(response)}`);

    if (response.ok) {
        console.log("Login successful:", response);
        // window.location.pathname = window.constants.dashboard_page;
        window.location.pathname = checkHtmlPath() + dashboard;
    } else {
        update_error_message("Login failed: " + response.message);
    }
}

async function log_user_in_professional() {
    const suivi = "/routes/pro/suivi";
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    console.log("window.location", window.location);
    console.log("suivi: ", suivi);

    const response = await window.update_server.login_professional(email, password);

    console.log(`login: JSON response: ${JSON.stringify(response)}`);

    if (response.ok) {
        console.log("Login successful:", response);
        // window.location.pathname = window.constants.dashboard_page;
        window.location.pathname = checkHtmlPath() + suivi;
    } else {
        update_error_message("Login failed: " + response.message);
    }
}
