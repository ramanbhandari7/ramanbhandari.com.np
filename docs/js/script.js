document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navMenuEl = document.getElementById('nav-menu'); // Renamed to avoid conflict
    if (menuToggle && navMenuEl) {
        menuToggle.addEventListener('click', () => {
            navMenuEl.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        // Close mobile menu when a link is clicked
        navMenuEl.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenuEl.classList.contains('active')) {
                    navMenuEl.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            });
        });
    }

    // Active navigation link highlighting
    const navLinks = document.querySelectorAll('.navbar ul.nav-links a');
    let currentFullPagename = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
    if (currentFullPagename === "") {
        currentFullPagename = "index.html"; // Default to index.html if path is empty
    }

    navLinks.forEach(link => {
        const linkPageName = link.getAttribute('href');
        if (linkPageName === currentFullPagename) {
            link.classList.add('active');
        }
    });

    // Typewriter effect (Only for Home Page - index.html)
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
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
    
    // Home section video mute/unmute functionality (Only for Home Page - index.html)
    const video = document.getElementById('homeVideo');
    const muteButton = document.getElementById('muteButton');
    if (video && muteButton) {
        // Video is muted by default via HTML attribute
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

    // Footer copyright year (For all pages)
    const yearSpanPersonalFooter = document.getElementById('currentYearPersonalFooter');
    if (yearSpanPersonalFooter) {
        yearSpanPersonalFooter.textContent = new Date().getFullYear();
    }

    // Contact form submission (placeholder)
    const contactForm = document.getElementById('portfolio-contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent actual submission for now
            // You would typically gather form data here:
            // const name = document.getElementById('contact-name').value;
            // const email = document.getElementById('contact-email').value;
            // const message = document.getElementById('contact-message').value;
            // console.log('Form submitted:', { name, email, message });
            alert('Thank you for your message! (This is a demo, form data not sent)');
            contactForm.reset(); // Optionally reset the form
        });
    }
});
