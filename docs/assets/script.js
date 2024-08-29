const text = `A skilled data and inventory strategist, vlogger, and content creator, passionate about freelancing and digital solutions.`;
const speed = 50; // Typing speed in milliseconds
let index = 0;

function typeWriter() {
    // Ensure the typewriter element is being targeted
    const typewriterElement = document.getElementById("typewriter");
    if (typewriterElement && index < text.length) {
        typewriterElement.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeWriter, speed);
    }
}

// Ensure the function is called once the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    typeWriter(); // Start the typewriter animation
});
