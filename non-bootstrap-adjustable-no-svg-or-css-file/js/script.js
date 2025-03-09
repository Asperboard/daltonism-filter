/*
** EPITECH PROJECT, 2024
** daltonism-filter
** File description:
** script.js
*/

// ----------------------------- Introduction ------------------------------
// This code is a template for a daltonism filter that can be applied to a website.
// The code is divided into sections, each with a specific purpose.

// It is recommended to read the comments to understand the different sections of the code and how to update them.
// The order in which the functions and constants are defined in the code is important, so it is recommended to follow the order of the sections.

// This code works by using SVG filters to apply the daltonism filter to the website by settins class names to the body element.
// The code also includes sliders to adjust the intensity and transparency of the filters
// Although, as of current, the transparency filter is not working for the "normal" mode and the filter intensity will have no effect in the "normal" mode because it calculates a difference between the "normal" mode and the one selected by the user.

// As long as this javascript is included in the website, the functionalities should work without a hitch.

// For legibility reasons, the code is not minified, so it is easier to read and understand.

// For ease of access, the functions and variables can be called under window.daltonismFilter.

// For the moment, this code does not track the changes made to the filters, so if the page is reloaded, the filters will be reset to their default values, but you are free to call the daltonismApplyFilter(<filter_name>) to change it once it is loaded.
// Tips: Add a document.addEventListener('DOMContentLoaded', <your_function>); to call your function when the page is loaded.

// ----------------------------- Credits ------------------------------
// This code was written by (c) Henry Letellier

// If you have any problems or questions, please contact me on the GitHub repository where this code is hosted, there are templates that can be used to report issues or ask questions.

// ----------------------------- Constants references ------------------------------

// id tags to update
const daltonismFilterName_name = "c-filter";
const daltonismIntensitySlider_name = "intensity-slider";
const daltonismIntensitySliderValue_name = "intensity-value";
const daltonismTransparencySlider_name = "transparency-slider";
const daltonismTransparencySliderValue_name = "transparency-value";

// filter state buttons
const daltonismNormalButton_name = "normal";
const daltonismDeuteranopiaButton_name = "deuteranopia";
const daltonismProtanopiaButton_name = "protanopia";
const daltonismTritanopiaButton_name = "tritanopia";
const daltonismMonochromacyButton_name = "monochromacy";


// ----------------------------- Base functions in charge of simplifying certain processes during the declaration of the constants ------------------------------

function daltonismFlipKeysAndValues(obj) {
    const flippedObject = {};

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            flippedObject[value] = key;
        }
    }

    return flippedObject;
}

function daltonianReturnCorrectColourMatrixFilter(colour) {
    switch (colour) {
        case 'deuteranopia':
            return [
                [0.8, 0.2, 0, 0, 0],
                [0.258, 0.742, 0, 0, 0],
                [0, 0.142, 0.858, 0, 0],
                [0, 0, 0, 1, 0]
            ];
        case 'protanopia':
            return [
                [0.567, 0.433, 0, 0, 0],
                [0.558, 0.442, 0, 0, 0],
                [0, 0.242, 0.758, 0, 0],
                [0, 0, 0, 1, 0]
            ];
        case 'tritanopia':
            return [
                [1, 0, 0, 0, 0],
                [0, 0.9, 0.1, 0, 0],
                [0, 0.5, 0.5, 0, 0],
                [0, 0, 0, 1, 0]
            ];
        case 'monochromacy':
            return [
                [0.33, 0.33, 0.33, 0, 0],
                [0.33, 0.33, 0.33, 0, 0],
                [0.33, 0.33, 0.33, 0, 0],
                [0, 0, 0, 1, 0]
            ];
        case 'normal':
            return [
                [1, 0, 0, 0, 0],
                [0, 1, 0, 0, 0],
                [0, 0, 1, 0, 0],
                [0, 0, 0, 1, 0]
            ];
        default:
            return null;
    }
}

// ----------------------------- Constants ------------------------------


// class names
const daltonismClassNameEquivalence = {
    normal: "daltonism-normal",
    deuteranopia: "daltonism-deuteranopia",
    protanopia: "daltonism-protanopia",
    tritanopia: "daltonism-tritanopia",
    monochromacy: "daltonism-monochromacy"
};

const daltonismClassNameEquivalenceFlipped = daltonismFlipKeysAndValues(daltonismClassNameEquivalence);

// filters
const daltonismFilters = Object.keys(daltonismClassNameEquivalence).reduce((acc, key) => {
    const response = daltonianReturnCorrectColourMatrixFilter(key);
    if (!response) {
        return acc;
    }
    acc[daltonismClassNameEquivalence[key]] = response;
    return acc;
}, {});

console.log("daltonismFilters: ", daltonismFilters);
console.log("daltonismClassNameEquivalence: ", daltonismClassNameEquivalence);

// svg class related definitions
const daltonismSVGArrayJoinCharacter = " ";

/* BEGIN DEBUG CHUNK , uncomment to see the values */
// console.log("normal equivalence", daltonismClassNameEquivalence["normal"]);
// console.log("deuteranopia equivalence", daltonismClassNameEquivalence["deuteranopia"]);
// console.log("protanopia equivalence", daltonismClassNameEquivalence["protanopia"]);
// console.log("tritanopia equivalence", daltonismClassNameEquivalence["tritanopia"]);
// console.log("monochromacy equivalence", daltonismClassNameEquivalence["monochromacy"]);

// console.log("deuteranopia", daltonismFilters[daltonismClassNameEquivalence["deuteranopia"]]);
// console.log("protanopia", daltonismFilters[daltonismClassNameEquivalence["protanopia"]]);
// console.log("tritanopia", daltonismFilters[daltonismClassNameEquivalence["tritanopia"]]);
// console.log("monochromacy", daltonismFilters[daltonismClassNameEquivalence["monochromacy"]]);
// console.log("normal", daltonismFilters[daltonismClassNameEquivalence["normal"]]);
/* END DEBUG CHUNK */

const daltonismSVGFileContent = `
<svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="true">
    <filter id="${daltonismClassNameEquivalence["deuteranopia"]}-filter">
        <feColorMatrix
            type="matrix"
            values="${(daltonismFilters[daltonismClassNameEquivalence["deuteranopia"]].flat()).join(daltonismSVGArrayJoinCharacter)}" />
    </filter>
    <filter id="${daltonismClassNameEquivalence["protanopia"]}-filter">
        <feColorMatrix
            type="matrix"
            values="${(daltonismFilters[daltonismClassNameEquivalence["protanopia"]].flat()).join(daltonismSVGArrayJoinCharacter)}" />
    </filter>
    <filter id="${daltonismClassNameEquivalence["tritanopia"]}-filter">
        <feColorMatrix
            type="matrix"
            values="${(daltonismFilters[daltonismClassNameEquivalence["tritanopia"]].flat()).join(daltonismSVGArrayJoinCharacter)}" />
    </filter>
    <filter id="${daltonismClassNameEquivalence["monochromacy"]}-filter">
        <feColorMatrix
            type="matrix"
            values="${(daltonismFilters[daltonismClassNameEquivalence["monochromacy"]].flat()).join(daltonismSVGArrayJoinCharacter)}" />
    </filter>
    <filter id="${daltonismClassNameEquivalence["normal"]}-filter">
        <feColorMatrix
            type="matrix"
            values="${(daltonismFilters[daltonismClassNameEquivalence["normal"]].flat()).join(daltonismSVGArrayJoinCharacter)}" />
    </filter>
</svg>
`;

// css class related definitions

const daltonismCSSClasses = [
    {
        name: ".daltonism-svg",
        content: `position: absolute;\nwidth: 0;\nheight: 0;\noverflow: hidden;`
    },
    {
        name: ":root",
        content: `--daltonism-view-mode-deuteranopia: url(#${daltonismClassNameEquivalence["deuteranopia"]}-filter);\n--daltonism-view-mode-protanopia: url(#${daltonismClassNameEquivalence["protanopia"]}-filter);\n--daltonism-view-mode-tritanopia: url(#${daltonismClassNameEquivalence["tritanopia"]}-filter);\n--daltonism-view-mode-monochromacy: url(#${daltonismClassNameEquivalence["monochromacy"]}-filter);\n--daltonism-view-mode-normal: url(#${daltonismClassNameEquivalence["normal"]}-filter);`
    },
    {
        name: `.${daltonismClassNameEquivalence["normal"]}`,
        content: `-webkit-filter: var(--daltonism-view-mode-normal);\n-moz-filter: var(--daltonism-view-mode-normal);\n-ms-filter: var(--daltonism-view-mode-normal);\n-o-filter: var(--daltonism-view-mode-normal);\nfilter: var(--daltonism-view-mode-normal);`
    },
    {
        name: `.${daltonismClassNameEquivalence["deuteranopia"]}`,
        content: `-webkit-filter: var(--daltonism-view-mode-deuteranopia);\n-moz-filter: var(--daltonism-view-mode-deuteranopia);\n-ms-filter: var(--daltonism-view-mode-deuteranopia);\n-o-filter: var(--daltonism-view-mode-deuteranopia);\nfilter: var(--daltonism-view-mode-deuteranopia);`
    },
    {
        name: `.${daltonismClassNameEquivalence["protanopia"]}`,
        content: `-webkit-filter: var(--daltonism-view-mode-protanopia);\n-moz-filter: var(--daltonism-view-mode-protanopia);\n-ms-filter: var(--daltonism-view-mode-protanopia);\n-o-filter: var(--daltonism-view-mode-protanopia);\nfilter: var(--daltonism-view-mode-protanopia);`
    },
    {
        name: `.${daltonismClassNameEquivalence["tritanopia"]}`,
        content: `-webkit-filter: var(--daltonism-view-mode-tritanopia);\n-moz-filter: var(--daltonism-view-mode-tritanopia);\n-ms-filter: var(--daltonism-view-mode-tritanopia);\n-o-filter: var(--daltonism-view-mode-tritanopia);\nfilter: var(--daltonism-view-mode-tritanopia);`
    },
    {
        name: `.${daltonismClassNameEquivalence["monochromacy"]}`,
        content: `-webkit-filter: var(--daltonism-view-mode-monochromacy);\n-moz-filter: var(--daltonism-view-mode-monochromacy);\n-ms-filter: var(--daltonism-view-mode-monochromacy);\n-o-filter: var(--daltonism-view-mode-monochromacy);\nfilter: var(--daltonism-view-mode-monochromacy);`
    }
];

// // class names
const daltonismClassNames = Object.keys(daltonismFilters);

// matrix for the transparency
const daltonismIdentityMatrix = [
    [1, 0, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0]
];

// current status of the matrix in use
let daltonismBaseMatrix = null;

// ----------------------------- Functions for displaying the slider values ------------------------------
function daltonismUpdateTransparencySliderDisplayValue() {
    const data = document.getElementById(daltonismTransparencySlider_name).value;
    console.log("(daltonismUpdateTransparencySliderDisplayValue) value: ", data);
    document.getElementById(daltonismTransparencySliderValue_name).innerText = data;
}

function daltonismUpdateIntensitySliderDisplayValue() {
    const data = document.getElementById(daltonismIntensitySlider_name).value;
    console.log("(daltonismUpdateIntensitySliderDisplayValue) value: ", data);
    document.getElementById(daltonismIntensitySliderValue_name).innerText = data;
}

// ----------------------------- Functions for managing the filters ------------------------------
function daltonismApplyFilter(filterClass) {
    document.body.className = '';
    console.log("(daltonismApplyFilter) filterClass: ", filterClass);
    const currentFilter = daltonismClassNameEquivalence[`${filterClass}`];
    console.log("(daltonismApplyFilter) currentFilter: ", currentFilter);
    document.getElementById(daltonismFilterName_name).innerText = filterClass;
    document.body.classList.add(`${currentFilter}`);
    const chosenMatrix = daltonismFilters[`${currentFilter}`];
    console.log("(daltonismApplyFilter) chosenMatrix: ", chosenMatrix);
    daltonismBaseMatrix = chosenMatrix;
    daltonismUpdateFilter();
}

function daltonismApplyMatrixToFilter(matrix) {
    const currentFilter = document.getElementById(daltonismFilterName_name).innerText;
    console.log("(daltonismApplyMatrixToFilter) currentFilter: ", currentFilter);
    const currentFilterEquivalent = daltonismClassNameEquivalence[`${currentFilter}`];
    console.log("(daltonismApplyMatrixToFilter) currentFilterEquivalent: ", currentFilterEquivalent);
    const filterElement = document.querySelector(`#${currentFilterEquivalent}-filter feColorMatrix`);
    if (filterElement) {
        console.log("(daltonismApplyMatrixToFilter) filterElement: ", filterElement);
        console.log("(daltonismApplyMatrixToFilter) matrix: ", matrix);
        filterElement.setAttribute('values', matrix.flat().join(' '));
    }
}

function daltonismUpdateFilterTransparency() {
    daltonismUpdateTransparencySliderDisplayValue();
    console.log("(daltonismUpdateFilterTransparency) daltonismUpdateFilterTransparency called");
    const transparency = document.getElementById(daltonismTransparencySlider_name).value / 100;
    if (daltonismBaseMatrix) {
        console.log("(daltonismUpdateFilterTransparency) intensity: ", intensity);
        const transparentMatrix = daltonismBaseMatrix.map(row =>
            row.map(val => val * transparency)
        );
        console.log("(daltonismUpdateFilterTransparency) transparentMatrix: ", transparentMatrix);
        daltonismApplyMatrixToFilter(transparentMatrix);
    }
}

function daltonismUpdateFilterIntensity() {
    daltonismUpdateIntensitySliderDisplayValue();
    console.log("(daltonismUpdateFilterIntensity) daltonismUpdateFilterIntensity called");
    const intensity = document.getElementById(daltonismIntensitySlider_name).value / 100;
    if (daltonismBaseMatrix) {
        console.log("(daltonismUpdateFilterIntensity) intensity: ", intensity);
        const intenseMatrix = daltonismBaseMatrix.map((row, i) =>
            row.map((val, j) => val * intensity + daltonismIdentityMatrix[i][j] * (1 - intensity))
        );
        console.log("(daltonismUpdateFilterIntensity) intenseMatrix: ", intenseMatrix);
        daltonismBaseMatrix = intenseMatrix;
        daltonismApplyMatrixToFilter(intenseMatrix);
    }
}

function daltonismUpdateFilter() {
    console.log("(daltonismUpdateFilter) daltonismUpdateFilter called");
    daltonismUpdateTransparencySliderDisplayValue();
    daltonismUpdateIntensitySliderDisplayValue();
    const intensity = document.getElementById(daltonismIntensitySlider_name).value / 100;
    const transparency = document.getElementById(daltonismTransparencySlider_name).value / 100;

    console.log('(daltonismUpdateFilter) intensity: ', intensity);
    console.log('(daltonismUpdateFilter) transparency: ', transparency);

    let currentMatrix = daltonismBaseMatrix ? daltonismBaseMatrix : daltonismIdentityMatrix;

    console.log('(daltonismUpdateFilter) currentMatrix: ', currentMatrix);

    // Apply intensity adjustment
    const intenseMatrix = currentMatrix.map((row, i) =>
        row.map((val, j) => val * intensity + daltonismIdentityMatrix[i][j] * (1 - intensity))
    );
    console.log('(daltonismUpdateFilter) intenseMatrix: ', intenseMatrix);

    // Apply transparency adjustment
    const finalMatrix = intenseMatrix.map(row =>
        row.map(val => val * transparency)
    );
    console.log('(daltonismUpdateFilter) finalMatrix: ', finalMatrix);

    daltonismApplyMatrixToFilter(finalMatrix);
}

// ----------------------------- Section to add the theme togglers ------------------------------
document.getElementById(`${daltonismNormalButton_name}`).addEventListener('click', function () {
    daltonismApplyFilter('normal');
});

document.getElementById(`${daltonismDeuteranopiaButton_name}`).addEventListener('click', function () {
    daltonismApplyFilter('deuteranopia');
});

document.getElementById(`${daltonismProtanopiaButton_name}`).addEventListener('click', function () {
    daltonismApplyFilter('protanopia');
});

document.getElementById(`${daltonismTritanopiaButton_name}`).addEventListener('click', function () {
    daltonismApplyFilter('tritanopia');
});

document.getElementById(`${daltonismMonochromacyButton_name}`).addEventListener('click', function () {
    daltonismApplyFilter('monochromacy');
});

// ----------------------------- Section to add a listener to the sliders ------------------------------
document.getElementById(daltonismTransparencySlider_name).addEventListener('input', daltonismUpdateFilter);

document.getElementById(daltonismIntensitySlider_name).addEventListener('input', daltonismUpdateFilter);

// ----------------------------- Section in charge of initialising the desired theme on the page ------------------------------
function daltonismBootUP() {
    daltonismApplyFilter('normal');
    daltonismUpdateTransparencySliderDisplayValue();
    daltonismUpdateIntensitySliderDisplayValue();
}

document.addEventListener('DOMContentLoaded', daltonismBootUP);

// ----------------------------- Inject the svg file into the html page ------------------------------

async function daltonismInjectSVG() {
    const svg_container = document.createElement('div');
    console.log("(daltonismInjectSVG) svg_container: ", svg_container);
    svg_container.innerHTML = daltonismSVGFileContent;
    svg_container.classList.add("daltonism-svg");
    document.body.appendChild(svg_container);
}

document.addEventListener('DOMContentLoaded', daltonismInjectSVG);

// ----------------------------- Inject the css file into the html page ------------------------------

function daltonismEnsureCSSComponentExists(componentName, styles, identifier = 'daltonism-styles') {
    // Check if a style element with the identifier exists
    let styleElement = document.querySelector(`style[data-identifier="${identifier}"]`);
    console.log(`(daltonismEnsureCSSComponentExists) styleElement: `, styleElement);

    if (!styleElement) {
        // Create a new style element if it doesn't exist
        styleElement = document.createElement('style');
        styleElement.setAttribute('data-identifier', identifier);
        document.head.appendChild(styleElement);
        console.log(`CSS component with identifier "${identifier}" created.`);
    } else {
        console.log(`CSS component with identifier "${identifier}" already exists.`);
    }

    // Check if the class already exists in the style element
    const classExists = styleElement.innerHTML.includes(`${componentName} {`);
    console.log(`(daltonismEnsureCSSComponentExists) classExists: `, classExists);

    if (!classExists) {
        // Append the new class to the existing style element
        styleElement.innerHTML += `\n${componentName} {\n ${styles}\n }`;
        console.log(`CSS class "${componentName}" added to the existing style component.`);
    } else {
        console.log(`CSS class "${componentName}" already exists in the style component.`);
    }
}

// Example usage
function daltonismInjectCSSCode() {
    daltonismCSSClasses.forEach(({ name, content }) => {
        daltonismEnsureCSSComponentExists(name, content);
    });
}

document.addEventListener('DOMContentLoaded', daltonismInjectCSSCode);

// ----------------------------- Exporting the functions and variables to a daltonismFilter namespace ------------------------------

// The content here, is arranged by type and length, however, it might not appear the same way when you try to access it in the browser console.

const daltonismFilter = [
    daltonismIdentityMatrix,
    daltonismFilters,
    daltonismBaseMatrix,
    daltonismCSSClasses,
    daltonismClassNames,
    daltonismSVGFileContent,
    daltonismFilterName_name,
    daltonismNormalButton_name,
    daltonismIntensitySlider_name,
    daltonismClassNameEquivalence,
    daltonismProtanopiaButton_name,
    daltonismTritanopiaButton_name,
    daltonismSVGArrayJoinCharacter,
    daltonismTransparencySlider_name,
    daltonismDeuteranopiaButton_name,
    daltonismMonochromacyButton_name,
    daltonismIntensitySliderValue_name,
    daltonismTransparencySliderValue_name,
    daltonismClassNameEquivalenceFlipped,
    daltonismBootUP,
    daltonismInjectSVG,
    daltonismApplyFilter,
    daltonismUpdateFilter,
    daltonismInjectCSSCode,
    daltonismFlipKeysAndValues,
    daltonismApplyMatrixToFilter,
    daltonismUpdateFilterIntensity,
    daltonismUpdateFilterTransparency,
    daltonismEnsureCSSComponentExists,
    daltonianReturnCorrectColourMatrixFilter,
    daltonismUpdateIntensitySliderDisplayValue,
    daltonismUpdateTransparencySliderDisplayValue
]

window.daltonismFilter = daltonismFilter;
document.daltonismFilter = daltonismFilter;

// ----------------------------- End of the code ------------------------------
