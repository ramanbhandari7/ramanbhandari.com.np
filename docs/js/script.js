document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navMenuEl = document.getElementById('nav-menu');
    if (menuToggle && navMenuEl) {
        menuToggle.addEventListener('click', () => {
            navMenuEl.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        // Close mobile menu when a link is clicked (good for single-page)
        navMenuEl.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenuEl.classList.contains('active')) {
                    navMenuEl.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            });
        });
    }

    // --- Single-Page Scroll Active Link Highlighting ---
    // Note: This section seems designed for a single-page application where
    // nav links point to sections on the same page (e.g., href="#about").
    // Your provided HTML seems to be for a multi-page site, so this
    // might not function as intended unless you have sections with these IDs
    // on a single long page.
    const navLinks = document.querySelectorAll('.navbar ul.nav-links a');
    const sections = [];
    navLinks.forEach(link => {
        const sectionId = link.getAttribute('href');
        // Only process if it's an internal anchor link
        if (sectionId && sectionId.startsWith('#')) {
            try {
                const section = document.querySelector(sectionId);
                if (section) {
                    sections.push(section);
                }
            } catch (e) {
                // console.warn(`Could not find section with ID: ${sectionId} for scroll highlighting.`);
            }
        }
    });

    function changeActiveLink() {
        if (sections.length === 0) return; // Don't run if no sections were found

        let index = sections.length;
        const offset = 100; // Adjust this offset as needed

        while(--index >= 0 && window.scrollY + offset < sections[index].offsetTop) {}

        navLinks.forEach((link) => link.classList.remove('active'));

        // Check if the calculated index is valid for navLinks
        // This also assumes navLinks order matches sections order
        if (index >= 0 && navLinks[index] && sections[index] && sections[index].id === navLinks[index].getAttribute('href').substring(1)) {
            navLinks[index].classList.add('active');
        } else if (window.scrollY < (sections[0] ? sections[0].offsetTop - offset : 0) && navLinks[0]) {
            // If scrolled above the first section or if no specific section is active yet, make the first navLink active
            // This logic might need adjustment based on whether your first link is "Home" and points to "#home" or "index.html"
             navLinks.forEach((link) => link.classList.remove('active')); // Clear all
             // Heuristic: If the first link is "Home" or similar, make it active when at the top or no specific section matches.
             // This part is tricky for multi-page sites with scrollspy.
             // For now, let's assume the first link is what should be active at the very top.
             if (navLinks[0]) {
                //  navLinks[0].classList.add('active');
                //  More robust: find the link corresponding to the current page or a default "Home"
                const homeLink = Array.from(navLinks).find(link => link.getAttribute('href') === 'index.html' || link.getAttribute('href') === '#home');
                if (homeLink && window.scrollY < (sections[0] ? sections[0].offsetTop - offset : Infinity)) {
                    homeLink.classList.add('active');
                } else if (navLinks[index]) { // Fallback to indexed link if conditions above aren't met
                     navLinks[index].classList.add('active');
                }
             }
        }
    }

    if (sections.length > 0) {
        changeActiveLink();
        window.addEventListener('scroll', changeActiveLink);
    } else {
        // For multi-page sites, highlight the link matching the current page
        const currentPage = window.location.pathname.split("/").pop() || "index.html"; // Get current page (e.g., "about.html")
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href').split("/").pop();
            if (linkPage === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    // --- End Single-Page Scroll Active Link Highlighting ---


    // Typewriter effect (Only for Home Page - index.html)
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) { // This will only run if #typewriter is on the current page
        const texts = ["Inventory Strategist", "Web Enthusiast", "Data Specialist", "Freelancer"];
        let textIndex = 0;
        let charIndex = 0;
        let currentText = '';
        let isDeleting = false;
        function type() {
            currentText = texts[textIndex];
            if (isDeleting) {
                typewriterElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typewriterElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            if (!isDeleting && charIndex === currentText.length) {
                setTimeout(() => isDeleting = true, 2000); // Pause before deleting
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(type, 500); // Pause before typing next word
                return; // Skip the default timeout at the end
            }
            const typeSpeed = isDeleting ? 50 : 120;
            setTimeout(type, typeSpeed);
        }
        if (texts.length > 0) {
            setTimeout(type, 1000); // Initial delay before starting
        }
    }

    // Home section video mute/unmute functionality (WITH DEBUGGING console.log)
    const video = document.getElementById('homeVideo');
    const muteButton = document.getElementById('muteButton');

    if (video && muteButton) {
        console.log("DEBUG: Video element and muteButton element found in the DOM.");

        // Set initial button text based on video's muted state (it's muted by HTML attribute)
        // The HTML already sets the button text to "Unmute", which is correct.
        // muteButton.textContent = video.muted ? 'Unmute' : 'Mute'; // This line isn't strictly necessary if HTML is correct

        muteButton.addEventListener('click', function() {
            console.log("DEBUG: Mute button clicked!");
            if (video.muted) {
                console.log("DEBUG: Video was muted. Attempting to unmute.");
                video.muted = false;
                muteButton.textContent = 'Mute';
                // Attempt to play again in case autoplay was blocked before interaction
                video.play().then(() => {
                    console.log("DEBUG: Video play initiated after unmute.");
                }).catch(error => {
                    console.error("DEBUG: Error trying to play video after unmute:", error);
                });
            } else {
                console.log("DEBUG: Video was unmuted. Attempting to mute.");
                video.muted = true;
                muteButton.textContent = 'Unmute';
            }
            console.log("DEBUG: Video muted state is now:", video.muted);
        });
    } else {
        // Only log error if we expect these elements (e.g., on the homepage)
        if (document.getElementById('homeVideo') || document.getElementById('muteButton')) {
            console.error("DEBUG: Video element or muteButton element was NOT found, but one was expected.");
        } else {
            // console.log("DEBUG: Video/mute button not relevant for this page.");
        }
    }

    // Footer copyright year
    const yearSpanPersonalFooter = document.getElementById('currentYearPersonalFooter');
    if (yearSpanPersonalFooter) {
        yearSpanPersonalFooter.textContent = new Date().getFullYear();
    }

    // Contact form submission (placeholder for pages with this form)
    const contactForm = document.getElementById('portfolio-contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            alert('Thank you for your message! (This is a demo, form data not sent)');
            contactForm.reset();
        });
    }
});
