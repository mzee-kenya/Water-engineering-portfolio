document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("body > section");
    // Target all links that have anchor hashes (in nav and inside hero buttons)
    const links = document.querySelectorAll('a[href^="#"]');

    function showSection(id) {
        if (!id || id === "#") id = "#home";

        // Hide all top-level sections
        sections.forEach(section => {
            section.style.display = "none";
        });

        // Show selected section
        const selectedSection = document.querySelector(id);
        if (selectedSection) {
            selectedSection.style.display = "block";
        } else {
            // Fallback to home if ID is not found
            const homeSection = document.querySelector("#home");
            if (homeSection) homeSection.style.display = "block";
        }
    }

    // Add click event listener to all anchor links
    links.forEach(link => {
        link.addEventListener("click", function (event) {
            const target = this.getAttribute("href");

            // Only override if target is an internal section hash
            if (target && target.startsWith("#")) {
                event.preventDefault();
                showSection(target);
                history.pushState(null, "", target);
            }
        });
    });

    // Handle Browser Back / Forward buttons
    window.addEventListener("popstate", function () {
        showSection(window.location.hash || "#home");
    });

    // Display section based on current URL hash on load (or default to #home)
    const initialHash = window.location.hash || "#home";
    showSection(initialHash);

    // Dynamically set footer year
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});