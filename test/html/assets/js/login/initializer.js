/*
** EPITECH PROJECT, 2024
** area-rattrapage
** File description:
** initializer.js
*/

function inject_submit_actions() {
    const formId = "loginForm";
    const registerFormId = "registerForm";
    const personal = "submit";
    const professional = "submit_professional";
    const elementFormId = document.getElementById(formId);
    const elementRegisterFormId = document.getElementById(registerFormId);

    if (elementFormId === null) {
        console.error("No login form found");
        return;
    }
    if (elementRegisterFormId === null) {
        console.error("No register form found");
        return;
    }

    if (elementFormId.querySelector(`button[type="${personal}"]`)) {
        console.log(`Found ${personal} button`);
        elementFormId.addEventListener(personal, function (event) {
            event.preventDefault();
            log_user_in();
        });
        elementRegisterFormId.addEventListener(personal, function (event) {
            event.preventDefault();
            register_user();
        });
    } else if (elementFormId.querySelector(`button[type="${professional}"]`)) {
        console.log(`Found ${professional} button`);
        elementFormId.addEventListener(professional, async function (event) {
            event.preventDefault();
            log_user_in_professional();
        });
        elementRegisterFormId.addEventListener(professional, async function (event) {
            event.preventDefault();
            register_user_professional();
        });
        console.log(`${professional} button found and added event listener`);
    } else {
        console.error("No submit button found");
    }
}

// Add a a rule to only run once the page is loaded
document.addEventListener("DOMContentLoaded", inject_submit_actions);
