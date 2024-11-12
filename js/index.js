"use strict";

document.addEventListener("DOMContentLoaded", function() {
    const video = document.getElementById("forsideVideo");
    const soundToggle = document.getElementById("soundToggle");

    // Toggle mute/unmute and update button text
    soundToggle.addEventListener("click", function() {
        video.muted = !video.muted;
        soundToggle.textContent = video.muted ? "Unmute" : "Mute";
    });
});