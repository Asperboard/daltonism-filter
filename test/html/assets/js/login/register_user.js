/*
** EPITECH PROJECT, 2024
** area-rattrapage
** File description:
** register_user.js
*/

async function register_user() {
    const dashboard = "/routes/user/dashboard";
    const username = document.getElementById("registerUsername").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const password_confirmation = document.getElementById("registerPasswordConfirmation").value;

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

    if (password !== password_confirmation) {
        update_error_message("Passwords do not match !");
        return;
    }

    console.log("passwords match");

    const response = await window.update_server.register(username, email, password);

    console.log(`register: JSON response: ${JSON.stringify(response)}`);

    if (response.ok) {
        console.log("Registration successful:", response);
        // window.location.pathname = window.constants.dashboard_page;
        window.location.pathname = checkHtmlPath() + dashboard;
    } else {
        update_error_message("Registration failed: " + response.message);
    }
}
async function register_user_professional() {
    const suivi = "/routes/pro/suivi";
    const username = document.getElementById("registerUsername").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const password_confirmation = document.getElementById("registerPasswordConfirmation").value;

    console.log("window.location", window.location);
    console.log("suivi: ", suivi);

    if (password !== password_confirmation) {
        update_error_message("Passwords do not match !");
        return;
    }

    console.log("passwords match");

    const response = await window.update_server.register_professional(username, email, password);

    console.log(`register: JSON response: ${JSON.stringify(response)}`);

    if (response.ok) {
        console.log("Registration successful:", response);
        // window.location.pathname = window.constants.dashboard_page;
        window.location.pathname = checkHtmlPath() + suivi;
    } else {
        update_error_message("Registration failed: " + response.message);
    }
}
