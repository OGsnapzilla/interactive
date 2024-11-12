# Integration af JSON-data 

##Forklaring på opstilling af JSON-data i JSON-filen kropsIdealer.json

Vores JSON-data er skrevet i en JSON-fil, kropsIdealer.json. 

I vores JSON-fil er det vigtigt at starte og slutte med kantede paranteser, [], fordi vi arbejder med en liste(array) af objekter. Det er samtidig med til at JSON strukturen kan være gyldig. 

Inde i vores array er hvert objekt omsluttet af {}, som indeholder key-value-pairs. 

Gennemgående for vores JSON-data er, key="year", som er en streng der repræsenterer value. Value er også en streng, og altså det der står i "" efter "year": Det samme gør sig gældende for "description":

Komma er nødvendigt for at adskille key-value-pairs i objekterne samt adskille objekterne i arrayet. 


## Arbejdet med JSON-data

Vi har oprettet en seperat javascript-fil, jsonData1copy.js, hvori vi integrerer og henter(fetcher) vores JSON-data. 

```javascript 
"use strict";
 ```
Gør at vi følger en standard for JavaScript. 

```javascript 
const container = document.getElementById("container");
```
Henter HTML-elementet med ID'en "container" fra HTML-dokumentet timeline.html. 

Vi har givet variablen "container" en konstant, da "container" er et unikt ID i timeline.html, da kun et html-element må have denne ID. 

```javascript
let currentIndex = 0; 
```
Er en variabel med en startværdi på 0, og i dette tilfælde bruges den til at holde styr på en position i et array. Vi bruger let fordi variablen ændres. 

```javascript 
let jsonData = [];
```
Opretter et tomt array, som vi senere tilføjer data til. Dataen kommer fra vores json-fil kropsIdealer.json. 

let foran variablen jsonData, gør at vi kan ændre i variablen. 

### Brug af fetch

Ved at bruge fetch-metoden, kan vi hente data fra vores json-fil dynamisk (https://www.w3schools.com/js/js_api_fetch.asp). 

Vi opretter en asynkron funktion:
```javascript 
async function fetchData (){
    try {
        const response = await fetch('../JSON/kropsIdealer.json');
        if (!response.ok) {
            throw new Error (`HTTP error! Status: ${response.status}`),
        }
        jsonData = await response.json();
        loadInitialContent();
    }   catch (error) {
        console.error("Error fetching data", error);
    }
}
```

Med en asynkron funktion har vi mulighed for at bruge await, som står skrevet på linje 52 i denne fil eller linje 10 i js-filen. 
I vores tilfælde bruges await til at vente på at fetch()-operationen er færdig, før resten af koden bliver indlæst. Resultatet gemmes i variablen 'response'. 

Er der en fejl, kommer der en fejl med HTTP-statuskode. 
```javascript
jsonData = await response.json();
```
konverterer svarer til JSON-format, og resultatet gemmes i variablen jsonData, som vi definerede på linje 5 i js-filen. 

Funktionen
```javascript 
loadInitialContent();
```
indlæser det første sæt indbold, der er baseret på de hentede data, og bruger vores variabel på linje 5 til at vise informationen på vores website. 

Skulle der opstå fejl i under udførelsen af koden i try-blokken, udskrives der en fejlmedelselse til konsollen - se linje 16-17 i js-filen. 

### Hvert JSON-objekt får HTML-element 

Med Javascript laver vi en funktion der opretter en div for hvert JSON-objekt:

```javascript
function createItem (item, index) {
    const element = document.createElement('div');
    element.className = `item item-${index+1}`;
    element.innerHTML = `<h2>${item.year}</h2><p>${item.description}</p>`;
    return element;
}
```
Funktionen createItem har fået to parametre, item og index. 
Item repræsenterer et element fra JSON-filen og index repræsenterer det aktuelle element i en liste, som hver får en unik klasse. 

Med 
```javascript
const element = document.createElement('div');
```
oprettes et nyt div-element i HTML-filen timeline.html, som gemmes i variablen element. 
Hvis man går ind i HTML-filen i sin editor, vil div-elementerne ikke være synlige. Men trykker man derimod inspect/undersøg i sin browser, og finder et element der har ID'en container, vil man se at der er 17 div-elementer med hver sin unikke klasse:
(img/readme.webp). 

```javascript
element.className = `item item-${index+1}`;
```
Gør at div-elementerne kan få sin unikke klasse. 

Med JavaScript indsætter vi også indhold til vores div-elementer i HTML-filen. Det gør vi ved hjælp af:
```javascript
element.innerHTML = `<h2>${item.year}</h2><p>${item.description}</p>`;
```

Som nævnt repræsenterede item et element fra vores JSON-fil, year og description, og med JavaScript og DOM-manipulatioin, kan vi ændre indholdet i vores h2-element og p-tag. 

Til sidst returneres det oprettede og tilpassede div-element. 













