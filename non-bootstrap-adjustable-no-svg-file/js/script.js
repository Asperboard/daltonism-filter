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

const identityMatrix = [
    [1, 0, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0]
];

let baseMatrix = null;

// function applyFilter(filterClass) {
//     document.body.className = '';
//     if (filterClass !== 'normal') {
//         document.getElementById(filter_name_name).innerText = filterClass;
//         document.body.classList.add(filterClass);
//         baseMatrix = filters[filterClass];
//     } else {
//         document.getElementById(filter_name_name).innerText = 'None';
//         baseMatrix = identityMatrix;
//         // updateFilterTransparency();
//     }
//     updateFilter();
// }

function applyFilter(filterClass) {
    document.body.className = '';
    document.getElementById(filter_name_name).innerText = filterClass;
    document.body.classList.add(filterClass);
    baseMatrix = filters[filterClass];
    // document.getElementById(filter_name_name).innerText = 'None';
    // baseMatrix = identityMatrix;
    // updateFilterTransparency();
    updateFilter();
}

function applyMatrixToFilter(matrix) {
    const currentFilter = document.getElementById(filter_name_name).innerText;
    const filterElement = document.querySelector(`#${currentFilter}-filter feColorMatrix`);
    if (filterElement) {
        filterElement.setAttribute('values', matrix.flat().join(' '));
    }
}

function update_transparency_slider_display_value() {
    const data = document.getElementById(transparencySlider_name).value;
    // console.log("data = ", data);
    document.getElementById(transparencySliderValue_name).innerText = data;
}

function updateFilterTransparency() {
    update_transparency_slider_display_value();
    const transparency = document.getElementById(transparencySlider_name).value / 100;
    if (baseMatrix) {
        const transparentMatrix = baseMatrix.map(row =>
            row.map(val => val * transparency)
        );
        applyMatrixToFilter(transparentMatrix);
    }
    // else if (document.body.classList.contains('normal')) {
    //     const transparentMatrix = identityMatrix.map(row =>
    //         row.map(val => val * transparency)
    //     );
    //     applyMatrixToFilter(transparentMatrix);
    // }
}

function update_intensity_slider_display_value() {
    const data = document.getElementById(intensitySlider_name).value;
    // console.log("data = ", data);
    document.getElementById(intensitySliderValue_name).innerText = data;
}
function updateFilterIntensity() {
    update_intensity_slider_display_value();
    const intensity = document.getElementById(intensitySlider_name).value / 100;
    if (baseMatrix) {
        const intenseMatrix = baseMatrix.map((row, i) =>
            row.map((val, j) => val * intensity + identityMatrix[i][j] * (1 - intensity))
        );
        baseMatrix = intenseMatrix;
        applyMatrixToFilter(intenseMatrix);
    }
}


function updateFilter() {
    update_transparency_slider_display_value();
    update_intensity_slider_display_value();
    const intensity = document.getElementById(intensitySlider_name).value / 100;
    const transparency = document.getElementById(transparencySlider_name).value / 100;

    let currentMatrix = baseMatrix ? baseMatrix : identityMatrix;

    // Apply intensity adjustment
    const intenseMatrix = currentMatrix.map((row, i) =>
        row.map((val, j) => val * intensity + identityMatrix[i][j] * (1 - intensity))
    );

    // Apply transparency adjustment
    const finalMatrix = intenseMatrix.map(row =>
        row.map(val => val * transparency)
    );

    applyMatrixToFilter(finalMatrix);
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

document.getElementById(transparencySlider_name).addEventListener('input', updateFilter);

document.getElementById(intensitySlider_name).addEventListener('input', updateFilter);

document.addEventListener('DOMContentLoaded', function () {
    applyFilter('normal');
    update_transparency_slider_display_value();
    update_intensity_slider_display_value();
});



// ----------------------------- Inject the svg file into the html page ------------------------------

const svgFileContent = `
<svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="true">
    <!-- style="position: absolute; width: 0; height: 0; overflow: hidden;" -->
    <filter id="deuteranopia-filter">
        <feColorMatrix type="matrix"
            values="0.8 0.2 0 0 0
                    0.258 0.742 0 0 0
                    0 0.142 0.858 0 0
                    0 0 0 1 0" />
    </filter>
    <filter id="protanopia-filter">
        <feColorMatrix type="matrix"
            values="0.567 0.433 0 0 0
                    0.558 0.442 0 0 0
                    0 0.242 0.758 0 0
                    0 0 0 1 0" />
    </filter>
    <filter id="tritanopia-filter">
        <feColorMatrix type="matrix"
            values="1 0 0 0 0
                    0 0.9 0.1 0 0
                    0 0.5 0.5 0 0
                    0 0 0 1 0" />
    </filter>
    <filter id="monochromacy-filter">
        <feColorMatrix type="matrix"
            values="0.33 0.33 0.33 0 0
                    0.33 0.33 0.33 0 0
                    0.33 0.33 0.33 0 0
                    0 0 0 1 0" />
    </filter>
    <filter id="normal-filter">
        <feColorMatrix
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 1 0" />
    </filter>
</svg>
`;


async function inject_svg() {
    const svg_content = svgFileContent;
    if (!svg_content) {
        return;
    }
    const svg_container = document.createElement('div');
    svg_container.innerHTML = svg_content;
    svg_container.classList.add("daltonism-svg");
    document.body.appendChild(svg_container);
}

document.addEventListener('DOMContentLoaded', inject_svg);
