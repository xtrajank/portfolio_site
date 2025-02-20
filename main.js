function showSection(sectionId) {
    document.querySelectorAll("main section").forEach(section => {
        section.style.display = "none";
    });

    document.getElementById(sectionId).style.display = "block";
}