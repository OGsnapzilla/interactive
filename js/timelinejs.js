document.addEventListener("DOMContentLoaded", function () {
    const walkingGirl = document.getElementById("walking");
    const standingGirl = document.getElementById("standing");
    const animatedGirl = document.querySelector(".animated-girl");
    const main = document.querySelector("main");

    let lastScrollLeft = 0; // Den sidste scroll position
    let isScrolling;

    // Håndterer animationens position
    function scrollHandler() {
        const scrollLeft = main.scrollLeft;

        // Opdaterer animationens position relativ med scrollLeft i main'en 
        animatedGirl.style.left = `${scrollLeft + 50}px`; 

        // Tjekker om scroll positionen er ændret
        if (scrollLeft !== lastScrollLeft) {
            
            // Viser pigen som går når man scroller
            walkingGirl.classList.remove("hidden");
            standingGirl.classList.add("hidden");

            clearTimeout(isScrolling);
 
            // Sæt timeout til at stå stille når man ikke scroller
            isScrolling = setTimeout(() => {
                walkingGirl.classList.add("hidden");
                standingGirl.classList.remove("hidden");
            }, 150); // Adjust delay for smoother transition
        }

        lastScrollLeft = scrollLeft;
    }

    // Listen to the scroll event on the main container
    main.addEventListener("scroll", scrollHandler, { passive: true });

    // Ensure the animated girl scrolls horizontally without exceeding the main container
    animatedGirl.style.left = `${Math.min(scrollLeft + 50, 15707 - animatedGirl.offsetWidth)}px`;
});


//popup open and close

function togglePopip() {
    const popup = document.getElementById("pop-up-question");
    //endrer display
    if (popup.style.display === "block") {
        popup.style.display = "none";
    } else {
        popup.style.display = "block";
    }
};