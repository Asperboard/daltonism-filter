/*
** EPITECH PROJECT, 2024
** mockup
** File description:
** image_checker.js
*/

async function checkImageExists(url) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;

        img.referrerPolicy = "no-referrer";
    }).catch(() => false);
}


