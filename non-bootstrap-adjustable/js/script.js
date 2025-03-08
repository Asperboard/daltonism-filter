/*
** EPITECH PROJECT, 2024
** daltonism-filter
** File description:
** script.js
*/

const filter_name_name = "c-filter";
const intensitySlider_name = "intensity-slider";
const intensitySliderValue_name = "intensity-value";
const transparencySlider_name = "transparency-slider";
const transparencySliderValue_name = "transparency-value";

const filters = {
    deuteranopia: [
        [0.8, 0.2, 0, 0, 0],
        [0.258, 0.742, 0, 0, 0],
        [0, 0.142, 0.858, 0, 0],
        [0, 0, 0, 1, 0]
    ],
    protanopia: [
        [0.567, 0.433, 0, 0, 0],
        [0.558, 0.442, 0, 0, 0],
        [0, 0.242, 0.758, 0, 0],
        [0, 0, 0, 1, 0]
    ],
    tritanopia: [
        [1, 0, 0, 0, 0],
        [0, 0.9, 0.1, 0, 0],
        [0, 0.5, 0.5, 0, 0],
        [0, 0, 0, 1, 0]
    ],
    monochromacy: [
        [0.33, 0.33, 0.33, 0, 0],
        [0.33, 0.33, 0.33, 0, 0],
        [0.33, 0.33, 0.33, 0, 0],
        [0, 0, 0, 1, 0]
    ]
};

let currentMatrix = null;

function applyFilter(filterClass) {
    document.body.className = ''; // Clear existing classes
    if (filterClass !== 'normal') {
        document.getElementById(filter_name_name).innerText = filterClass;
        document.body.classList.add(filterClass);
        updateFilterIntensity();
    } else {
        document.getElementById(filter_name_name).innerText = 'None';
    }
    updateFilterTransparency();
}

function update_transparency_slider_display_value() {
    const data = document.getElementById(transparencySlider_name).value;
    console.log("data = ", data);
    document.getElementById(transparencySliderValue_name).innerText = data;
}

function updateFilterTransparency() {
    update_transparency_slider_display_value();
    const transparency = document.getElementById(transparencySlider_name).value / 100;

    const currentFilter = document.getElementById(filter_name_name).innerText;
    if (filters[currentFilter]) {
        const matrix = filters[currentFilter].map(row =>
            row.map(val => val * transparency)
        );
        const filterElement = document.querySelector(`#${currentFilter}-filter feColorMatrix`);
        if (filterElement) {
            filterElement.setAttribute('values', matrix.flat().join(' '));
        }
    }
}

function update_intensity_slider_display_value() {
    const data = document.getElementById(intensitySlider_name).value;
    console.log("data = ", data);
    document.getElementById(intensitySliderValue_name).innerText = data;
}
function updateFilterIntensity() {
    update_intensity_slider_display_value();
    const intensity = document.getElementById(intensitySlider_name).value / 100;
    const identityMatrix = [
        [1, 0, 0, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 1, 0]
    ];
    const currentFilter = document.getElementById(filter_name_name).innerText;
    if (filters[currentFilter]) {
        const matrix = filters[currentFilter].map((row, i) =>
            row.map((val, j) => val * intensity + identityMatrix[i][j] * (1 - intensity))
        );
        const filterElement = document.querySelector(`#${currentFilter}-filter feColorMatrix`);
        if (filterElement) {
            filterElement.setAttribute('values', matrix.flat().join(' '));
        }
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

document.getElementById(transparencySlider_name).addEventListener('input', updateFilterTransparency);

document.getElementById(intensitySlider_name).addEventListener('input', updateFilterIntensity);

document.addEventListener('DOMContentLoaded', function () {
    applyFilter('normal');
    update_transparency_slider_display_value();
    update_intensity_slider_display_value();
}
);
