/*
** EPITECH PROJECT, 2024
** daltonism-filter
** File description:
** script.js
*/

function applyFilter(filterClass) {
    document.body.className = ''; // Clear existing classes
    if (filterClass !== 'normal') {
        document.body.classList.add(filterClass);
    }
}

document.getElementById('normal').addEventListener('click', function () {
    applyFilter('normal');
});

document.getElementById('deuteranopia').addEventListener('click', function () {
    applyFilter('deuteranopia');
});

document.getElementById('protanopia').addEventListener('click', function () {
    applyFilter('protanopia');
});

document.getElementById('tritanopia').addEventListener('click', function () {
    applyFilter('tritanopia');
});
