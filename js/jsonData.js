"use strict";

const container = document.getElementById("container");
let currentIndex = 0;

const jsonData = [
    { year; "25.000 f.kr - Venus fra Willendort", description: "Venus fra Willendorf-statue repræsentere et ældgammelt ideal om kvindekroppen med runde former. Det er en af de ældste kendte afbildninger af kvindekroppen"},
]

function createItem(item) {
    const element = document.createElement('div');
    element.className = 'item';
    element.innerHTML = `<h2>${item.year}</h2><p>${item.description}</p>`;
    return element;
}

function loadMoreContent () {
    if (currentIndex < jsonData.length) {
        const item = jsonData[currentIndex];
        container.appendChild(createItem(item));
        currentIndex++;
    }
}

for (let i = 0; i < 5; i++) {
    loadMoreContent();
}

container.addEventListener('scroll', () => {
    if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 300) {
        loadMoreContent();
    }
})