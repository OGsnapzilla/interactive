"use strict";

//henter audio elementet og knappen
const audio = document.getElementById("audio");
const audioBtn = document.getElementById("audio-btn");

//Laver tænd/sluk funktion
audioBtn.addEventListener("click", () =>{
    if (audio.muted) {
        audio.muted = false; 
        audioBtn.textContent = "Sluk musik";
    }
    else{
        audio.muted = true;
        audioBtn.textContent = "Tænd musik";
    }
});