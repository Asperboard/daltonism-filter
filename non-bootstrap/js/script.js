/*
** EPITECH PROJECT, 2024
** daltonism-filter
** File description:
** script.js
*/

const filter_name = document.getElementById("c-filter");

function applyFilter(filterClass) {
    document.body.className = ''; // Clear existing classes
    if (filterClass !== 'normal') {
        filter_name.innerText = filterClass;
        document.body.classList.add(filterClass);
    } else {
        filter_name.innerText = 'None';
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

document.getElementById('monochromacy').addEventListener('click', function () {
    applyFilter('monochromacy');
});
