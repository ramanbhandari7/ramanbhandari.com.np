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
    const navLinks = document.querySelectorAll('.navbar ul.nav-links a');
    const sections = [];
    navLinks.forEach(link => {
        const sectionId = link.getAttribute('href');
        if (sectionId.startsWith('#')) {
            const section = document.querySelector(sectionId);
            if (section) {
                sections.push(section);
            }
        }
    });

    function changeActiveLink() {
        let index = sections.length;

        while(--index && window.scrollY + 100 < sections[index].offsetTop) {} // 100 is an offset
        
        navLinks.forEach((link) => link.classList.remove('active'));
        // Ensure the link corresponding to the current section exists before adding 'active'
        if (navLinks[index]) {
            navLinks[index].classList.add('active');
        } else if (window.scrollY < sections[0].offsetTop - 100 && navLinks[0]) {
            // If scrolled above the first section (e.g. very top of page), make 'Home' active
            navLinks[0].classList.add('active');
        }
    }

    // Initial call if page loads scrolled or for hash links
    if (sections.length > 0) {
        changeActiveLink(); 
        window.addEventListener('scroll', changeActiveLink);
    }
    // --- End Single-Page Scroll Active Link Highlighting ---


    // Typewriter effect (Only for Home Page - index.html)
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) { // This will only run if #typewriter is on the current page (which it is in index.html)
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
                setTimeout(() => isDeleting = true, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }
            const typeSpeed = isDeleting ? 50 : 120;
            setTimeout(type, typeSpeed);
        }
        if (texts.length > 0) type();
    }
    
    // Home section video mute/unmute functionality
    const video = document.getElementById('homeVideo');
    const muteButton = document.getElementById('muteButton');
    if (video && muteButton) { // This will only run if these elements are on the page
        muteButton.addEventListener('click', function() {
            if (video.muted) {
                video.muted = false;
                muteButton.textContent = 'Mute';
            } else {
                video.muted = true;
                muteButton.textContent = 'Unmute';
            }
        });
    }

    // Footer copyright year
    const yearSpanPersonalFooter = document.getElementById('currentYearPersonalFooter');
    if (yearSpanPersonalFooter) {
        yearSpanPersonalFooter.textContent = new Date().getFullYear();
    }

    // Contact form submission (placeholder)
    const contactForm = document.getElementById('portfolio-contact-form');
    if (contactForm) { // This will only run if the form is on the page
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); 
            alert('Thank you for your message! (This is a demo, form data not sent)');
            contactForm.reset();
        });
    }
});
