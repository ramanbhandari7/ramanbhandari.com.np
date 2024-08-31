const text = `A skilled data and inventory strategist, vlogger, and content creator, passionate about freelancing and digital solutions.`;
const speed = 50; // Typing speed in milliseconds
let index = 0;

function typeWriter() {
    const typewriterElement = document.getElementById("typewriter");

    if (typewriterElement) {
        // Add cursor span if not already present
        if (!document.querySelector(".cursor")) {
            const cursorSpan = document.createElement("span");
            cursorSpan.className = "cursor";
            typewriterElement.appendChild(cursorSpan);
        }

        // If there's text left to type
        if (index < text.length) {
            typewriterElement.insertBefore(document.createTextNode(text.charAt(index)), document.querySelector(".cursor"));
            index++;
            setTimeout(typeWriter, speed);
        } else {
            // Remove cursor after typing finishes
            document.querySelector(".cursor").remove();
        }
    }
}

// Ensure the function is called once the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    typeWriter(); // Start the typewriter animation
});
