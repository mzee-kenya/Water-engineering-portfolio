document.addEventListener("DOMContentLoaded", function () {
    /* =====================================================
       MOBILE HAMBURGER MENU
       ===================================================== */
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", function () {
            this.classList.toggle("active");
            navLinks.classList.toggle("active");
        });

        // Close mobile menu when a link is clicked
        navLinks.querySelectorAll(".nav-link").forEach(function (link) {
            link.addEventListener("click", function () {
                hamburger.classList.remove("active");
                navLinks.classList.remove("active");
            });
        });

        // Close mobile menu on outside click
        document.addEventListener("click", function (e) {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                hamburger.classList.remove("active");
                navLinks.classList.remove("active");
            }
        });
    }


    /* =====================================================
       SECTION ROUTING (SPA-style)
       ===================================================== */
    const sections = document.querySelectorAll("body > section");
    const links = document.querySelectorAll('a[href^="#"]');
    const navLinkElements = document.querySelectorAll(".nav-link");

    function showSection(id) {
        if (!id || id === "#") id = "#home";

        sections.forEach(function (section) {
            section.style.display = "none";
        });

        const selectedSection = document.querySelector(id);
        if (selectedSection) {
            selectedSection.style.display = "block";
        } else {
            const homeSection = document.querySelector("#home");
            if (homeSection) homeSection.style.display = "block";
        }

        // Update active nav link
        navLinkElements.forEach(function (link) {
            link.classList.remove("active");
            if (link.getAttribute("href") === id) {
                link.classList.add("active");
            }
        });

        // Scroll to top of page
        window.scrollTo(0, 0);
    }

    links.forEach(function (link) {
        link.addEventListener("click", function (event) {
            const target = this.getAttribute("href");

            if (target && target.startsWith("#")) {
                event.preventDefault();
                showSection(target);
                history.pushState(null, "", target);
            }
        });
    });

    window.addEventListener("popstate", function () {
        showSection(window.location.hash || "#home");
    });

    // Show section based on current URL hash on load
    const initialHash = window.location.hash || "#home";
    showSection(initialHash);


    /* =====================================================
       FOOTER YEAR
       ===================================================== */
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
