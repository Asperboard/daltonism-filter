/*
** EPITECH PROJECT, 2024
** mockup
** File description:
** github_normalizer.js
*/

function checkHtmlPath() {
    try {
        const url = window.location.pathname;
        if (url.startsWith('/html')) {
            return '/html';
        } else {
            return '';
        }

    } catch (e) {
        console.error("Invalid URL:", e);
        return '';
    }
}

