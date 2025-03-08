/*
** EPITECH PROJECT, 2024
** mockup
** File description:
** theme_toggle.js
*/

console.log("js/theme_toggle initialising");


const themeIcons = {
    light: `
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-sun-fill mb-1">
                <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"></path>
            </svg>`,
    dark: `
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-moon-stars-fill mb-1">
                <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278"></path>
                <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z"></path>
            </svg>`,
    auto: `
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-circle-half mb-1">
                <path d="M8 15A7 7 0 1 0 8 1zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16"></path>
            </svg>`
};

function injectThemeToggle(togglerName = 'themeToggler') {
    console.log("Injecting theme toggler");
    const themeToggler = document.getElementById(togglerName);
    if (!themeToggler) {
        console.error(togglerName + " not found");
        return;
    }

    const html = `
<button id="themeToggleButton" class="btn btn-link" aria-expanded="false" type="button" style="color: var(--bs-body-color);">
    ${themeIcons.light}
<div style="display:inline-block; text-decoration:none !important; padding-left: 4px;">&dtrif;</div>
</button>
<div id="themeDropdown" class="dropdown-menu" style="display: none; position: absolute;">
    <a class="dropdown-item d-flex align-items-center" href="#" data-bs-theme-value="light">
        ${themeIcons.light}Light
    </a>
    <a class="dropdown-item d-flex align-items-center" href="#" data-bs-theme-value="dark">
        ${themeIcons.dark}Dark
    </a>
    <a class="dropdown-item d-flex align-items-center" href="#" data-theme="auto">
        ${themeIcons.auto}Auto
    </a>
</div>
`;

    themeToggler.innerHTML = html;
    const elements = themeToggler.classList.keys();
    for (let i = 0; i < elements.length; i++) {
        themeToggler.classList.remove(elements[i]);
    }
    themeToggler.classList.add("theme-switcher", "dropdown");

    const button = document.getElementById("themeToggleButton");
    const dropdown = document.getElementById("themeDropdown");

    // Toggle dropdown visibility
    button.addEventListener("click", (event) => {
        event.stopPropagation();
        dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (event) => {
        if (!button.contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.style.display = "none";
        }
    });

    // Handle theme selection
    dropdown.querySelectorAll(".dropdown-item").forEach((item) => {
        item.addEventListener("click", (event) => {
            event.preventDefault();
            const theme = item.getAttribute("data-theme");
            setTheme(theme);
            dropdown.style.display = "none"; // Close dropdown after selection
        });
    });
    console.log("theme toggler injected");
}

function updateThemeIcon(theme) {
    const buttonIcon = document.querySelector("#themeToggleButton svg");

    if (!buttonIcon) return;

    buttonIcon.outerHTML = themeIcons[theme] || themeIcons.auto;
}

function get_theme() {
    const forcedTheme = document.documentElement.getAttribute('data-bss-forced-theme');
    const storedTheme = window.local_storage_manager ? window.local_storage_manager.readVariable('theme') : null;
    const pageTheme = document.documentElement.getAttribute('data-bs-theme');
    const browserPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

    return forcedTheme || storedTheme || pageTheme || browserPreference || 'light';
}

function toggle_theme() {
    const theme = get_theme();
    if (theme === 'auto') {
        setTheme('dark');
        return;
    }
    if (theme === 'dark') {
        setTheme('light');
        return;
    }
    setTheme('dark');
}

function setTheme(themeName = 'light') {
    if (themeName === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        themeName = 'dark';
    }

    document.documentElement.setAttribute('data-bs-theme', themeName);

    if (window.local_storage_manager) {
        window.local_storage_manager.createVariable('theme', themeName);
    } else {
        console.warn("local_storage_manager module is not available; theme preference may not persist.");
    }

    updateThemeIcon(themeName);

    document.documentElement.className = themeName;
}

async function applyCorrectTheme() {
    let maxTries = 10;

    while (maxTries > 0) {
        if (window.local_storage_manager) {
            break;
        }
        await sleep(1000);
        maxTries--;
    }

    if (!window.local_storage_manager) {
        console.error("local_storage_manager module is still missing after multiple retries.");
        return;
    }

    setTheme(get_theme());
}

async function injectThemeToggler() {
    injectThemeToggle();
    await applyCorrectTheme();
}

const themeToggle = {
    setTheme,
    get_theme,
    themeIcons,
    toggle_theme,
    updateThemeIcon,
    injectThemeToggle,
    applyCorrectTheme,
    injectThemeToggler
};

// document.addEventListener("DOMContentLoaded", injectThemeToggler);

window.themeToggle = themeToggle;

console.log("js/theme_toggle initialised");
