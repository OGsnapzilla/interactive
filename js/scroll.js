"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const main = document.querySelector("main");
    let targetScrollPosition = 0;
    let currentScrollPosition = 0;
    const scrollSpeed = 0.3; // Redigér hastighed

    // Eventlistener der lytter til scroll input
    main.addEventListener("wheel", (event) => {
        event.preventDefault(); // Sørger for der ikke er default scrolling behaviour
        targetScrollPosition += event.deltaY * scrollSpeed; 

        //Sørger for scroll position passer til main containers width 
        targetScrollPosition = Math.max(0, Math.min(targetScrollPosition, main.scrollWidth - main.clientWidth));
    });

    function animateScroll() {
        // Animerer så scrolling bliver smooth 
        currentScrollPosition += (targetScrollPosition - currentScrollPosition) * 0.1;
        main.scrollLeft = currentScrollPosition;

        requestAnimationFrame(animateScroll);
    }

    // Starter animations loop
    animateScroll();
});