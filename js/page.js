// page.js - handles section switching and theme toggling

function showSection(sectionId) {
    document.querySelectorAll("main section").forEach(section => {
        section.style.display = "none";
    });
    document.getElementById(sectionId).style.display = "block";
}

// theme toggle
let themeEnabled = false;
document.getElementById("toggle-theme").addEventListener("click", () => {
    const existing = document.getElementById("theme-style");
    if (existing) {
        existing.remove();
        themeEnabled = false;
    } else {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "./css/theme-dark.css";
        link.id = "theme-style";
        document.head.appendChild(link);
        themeEnabled = true;
    }
});