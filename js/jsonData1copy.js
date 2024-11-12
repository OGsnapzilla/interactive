"use strict";

const container = document.getElementById("container");
let currentIndex = 0;
let jsonData = []; // Vi initialiserer jsonData som en tom array

// Funktion til at hente JSON-data dynamisk fra en ekstern fil
async function fetchData() {
    try {
        const response = await fetch('../JSON/kropsIdealer.json'); // Skift stien til din JSON-fil
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        jsonData = await response.json();
        loadInitialContent(); // Indlæs det første sæt indhold efter data er hentet
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
}

function createItem(item, index) {
    const element = document.createElement('div');
    element.className = `item item-${index + 1}`; // Dynamisk klassetildeling baseret på indeks
    element.innerHTML = `<h2>${item.year}</h2><p>${item.description}</p>`;
    return element;
}

function loadMoreContent() {
    if (currentIndex < jsonData.length) {
        const item = jsonData[currentIndex];
        container.appendChild(createItem(item, currentIndex));
        currentIndex++;
    }
}

function loadInitialContent() {
    for (let i = 0; i < 17; i++) {
        loadMoreContent();
    }
}

container.addEventListener('scroll', () => {
    if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 300) {
        loadMoreContent();
    }
});

// Start fetch ved at kalde fetchData
fetchData();
