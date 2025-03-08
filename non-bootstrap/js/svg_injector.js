/*
** EPITECH PROJECT, 2024
** daltonism-filter
** File description:
** svg_injector.js
*/

const filterPaths = "img/svg/filters.svg";

async function fetch_svg_file() {
    try {
        const response = await fetch(filterPaths);
        if (!response.ok) {
            throw new Error(`Failed to fetch SVG file: ${response.statusText}`);
        }
        const svg_content = await response.text();
        return svg_content;
    } catch (error) {
        console.error('Error fetching the SVG file:', error);
        return null;
    }
}

async function inject_svg() {
    const svg_content = await fetch_svg_file();
    const svg_container = document.createElement('div');
    if (!svg_content) {
        return;
    }
    svg_container.innerHTML = svg_content;
    svg_container.classList.add("daltonism-svg");
    document.body.appendChild(svg_container);
}

document.addEventListener('DOMContentLoaded', inject_svg);
