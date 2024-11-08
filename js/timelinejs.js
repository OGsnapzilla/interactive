document.addEventListener("DOMContentLoaded", function () {
    const walkingGirl = document.getElementById("walking");
    const standingGirl = document.getElementById("standing");
    const animatedGirl = document.querySelector(".animated-girl");
    const main = document.querySelector("main");

    let lastScrollLeft = 0; // Track last scroll position
    let isScrolling;

    // Function to handle girl's position on scroll
    function scrollHandler() {
        const scrollLeft = main.scrollLeft;

        // Update girl's horizontal position relative to main's scrollLeft
        animatedGirl.style.left = `${scrollLeft + 50}px`; // Adjust horizontal position with offset if needed

        // Check if scrolling direction changed
        if (scrollLeft !== lastScrollLeft) {
            // Show walking animation while scrolling
            walkingGirl.classList.remove("hidden");
            standingGirl.classList.add("hidden");

            // Clear previous scrolling timeout
            clearTimeout(isScrolling);

            // Set timeout to switch to standing after scrolling stops
            isScrolling = setTimeout(() => {
                walkingGirl.classList.add("hidden");
                standingGirl.classList.remove("hidden");
            }, 150); // Adjust delay for smoother transition
        }

        lastScrollLeft = scrollLeft;
    }

    // Listen to the scroll event on the main container
    main.addEventListener("scroll", scrollHandler, { passive: true });
});