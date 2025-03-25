function showSection(sectionId) {
    document.querySelectorAll("main section").forEach(section => {
        section.style.display = "none";
    });

    document.getElementById(sectionId).style.display = "block";
}

// theme toggle
let themeEnabled = false;
const themeLinkId = 'theme-style';

document.getElementById("toggle-theme").addEventListener("click", function() {
    const existing = document.getElementById(themeLinkId);

    if (existing) {
        existing.remove();
        themeEnabled = false;
    } else {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "./css/theme-dark.css";
        link.id = themeLinkId;
        document.head.appendChild(link);
        themeEnabled = true;
    }
});