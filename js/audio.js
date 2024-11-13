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

//henter knappene og popup
const popup = document.getElementById('pop-up-question');
const openPopupBtn = document.getElementById('open-btn');
const closePopupBtn = document.getElementById('close-btn-popup');

//klikk gjør at popup blir synlig eller gjemt
openPopupBtn.addEventListener('click', () => {
    popup.classList.remove('hidden');
    popup.classList.add('visible');

});

closePopupBtn.addEventListener('click', () => {
    popup.classList.remove('visible');
    popup.classList.add('hidden');
});


