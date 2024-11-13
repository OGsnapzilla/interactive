# Integration af JSON-data 

## Forklaring på opstilling af JSON-data i JSON-filen kropsIdealer.json

Vores JSON-data er skrevet i en JSON-fil, kropsIdealer.json. 

I vores JSON-fil er det vigtigt at starte og slutte med kantede paranteser, [], fordi vi arbejder med en liste(array) af objekter. Det er samtidig med til at JSON strukturen kan være gyldig (https://www.w3schools.com/js/js_json_arrays.asp). 

Inde i vores array er hvert objekt omsluttet af {}, som indeholder key-value-pairs (https://www.w3schools.com/js/js_json_objects.asp). 

Gennemgående for vores JSON-data er, key="year", som er en streng der repræsenterer value. Value er også en streng, og altså det der står i "" efter "year": Det samme gør sig gældende for "description":

Komma er nødvendigt for at adskille key-value-pairs i objekterne samt adskille objekterne i arrayet. 


## Arbejdet med JSON-data

Vi har oprettet en seperat javascript-fil, jsonData1copy.js, hvori vi integrerer og henter(fetcher) vores JSON-data. 

```javascript 
"use strict";
 ```
Gør at vi følger en standard for JavaScript (https://www.w3schools.com/js/js_strict.asp). 

```javascript 
const container = document.getElementById("container");
```
Gør at vi med DOM-manupulation, henter HTML-elementet med ID'en "container" fra HTML-dokumentet timeline.html (https://www.w3schools.com/js/js_htmldom_elements.asp). 

Vi har givet variablen "container" en konstant, da "container" er et unikt ID i timeline.html, da kun et html-element må have denne ID (https://www.w3schools.com/js/js_const.asp). 

```javascript
let currentIndex = 0; 
```
Er en variabel med en startværdi på 0, og i dette tilfælde bruges den til at holde styr på en position i et array. Vi bruger let fordi variablen ændres (https://www.w3schools.com/js/js_let.asp). 

```javascript 
let jsonData = [];
```
Opretter et tomt array, som vi senere tilføjer data til. Dataen kommer fra vores json-fil kropsIdealer.json. 

let foran variablen jsonData, gør at vi kan ændre i variablen. 

### Brug af fetch

Ved at bruge fetch-metoden, kan vi hente data fra vores json-fil dynamisk (https://www.w3schools.com/js/js_api_fetch.asp). 

Vi opretter en asynkron funktion: (https://www.w3schools.com/js/js_async.asp)
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
I vores tilfælde bruges await til at vente på at fetch()-operationen er færdig, før resten af koden bliver indlæst. Resultatet gemmes i variablen 'response' (https://www.w3schools.com/js/js_async.asp). 

Er der en fejl, kommer der en fejl med HTTP-statuskode. 
```javascript
jsonData = await response.json();
```
konverterer svaret til JSON-format, og resultatet gemmes i variablen jsonData, som vi definerede på linje 5 i js-filen. 

Funktionen
```javascript 
loadInitialContent();
```
indlæser det første sæt indbold, der er baseret på de hentede data, og bruger vores variabel på linje 5 i js-filen til at vise informationen på vores website. 

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

Med JavaScript og DOM-manupulation indsætter vi også indhold til vores div-elementer i HTML-filen (https://www.w3schools.com/jsref/prop_html_innerhtml.asp). Det gør vi ved hjælp af:
```javascript
element.innerHTML = `<h2>${item.year}</h2><p>${item.description}</p>`;
```

Som nævnt repræsenterede item et element fra vores JSON-fil, year og description, og med JavaScript og DOM-manipulatioin, kan vi ændre indholdet i vores h2-element og p-tag. 

Til sidst returneres det oprettede og tilpassede div-element. 

Efterfølgende opretter vi en ny funktion uden parametre:
```javascript 
function loadMoreContent (){
    if (currentIndex < jsonData.lenght) {
        const item = jsonData[currentIndex];
        container.appendChild(createItem(item, currentIndex));
        curentIndex++;
    }
}


if (currentIndex < jsonData.length)
```
er en betingelse der kontrollere om currentIndex er mindre end længden af jsonData, altså om der stadig er flere objekter at hente fra jsonData. 
Derfor bruger vi if statement, for at angive en kodeblok, som udføres, hvis en specifik betingelse er sand (https://w3schools.com/js/js_if_else.asp). 

Det næste objekt hentes fra jsonData-arrayet ved hjælp af currentIndex. Variablen item repræsentere objekt tilsvarende det aktuelle indeks. 


```javascript 
container.appendChild(createItem(item, currentIndex));
```
gør flere ting:
1. `(createItem(item, currentIndex)) kalder på funktionen fra tidligere på linje 22 i js-filen, 
2.  og med DOM-manipulation, oprettes et barn til 'container'-elementet fra HTMl-filen. 

```javascript
curentIndex++;
```
henter det næste objekt i JSON-arrayet. 

### Funktion til at indlæse første sæt indhold, når siden åbnes

```javascript
function loadInitialContent() {
    for (let i = 0; i < 17; i++) {
        loadMoreContent();
    }
}
```
Vi har oprettet en funktion der indlæser det første sæt indhold, når vores side åbnes. 
Funktionen gør: 
1. Vi har skrevet en 'for'-løkke, som kører 17 gange, altså fra 0-16 = 17, fordi 0 tæller med. 
2. Iterationerne kalder på 'loadMoreContent' funktionen
Det betyder at når funktionen 'loadInitialContent' bliver kaldt på, indlæser den de første 17 elementer fra vores array i JSON-filen. 


### Tilføjelse af event-listener for scrolling

Vi har tilføjet en event listener til 'container' elementet, som lytter efter scroll-begivenheder (https://www.w3schools.com/js/js_htmldom_eventlistener.asp). 

Denne lytter sættes op ved hjælp af:
```javascript 
container.addEventListener('scroll', ()=>)
```
og som udløses hver gang der scrolles i containeren. 

Vi har skrevet en betingelse inde i event listeneren:
```javascript
if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 300)
```
Betingelsen tjekker om brugeren har scrollet næsten til enden af containeren (w3schools.com/js/js_if_else.asp). De 300 er en slags buffer, der gør, at nyt indhold bliver indlæst kort før man når helt til enden. Det betyder at hvis brugeren er tæt på enden, altså hvis betingelsen er sand, så kaldes:
```javascript
loadMoreContent();
```

## Brug af AI
Vi har brugt ChatGPT og Perplexity til at forklare og forstå vores kode:

(https://www.perplexity.ai/search/hvad-betyder-async-i-javascrip-bC3UH60uT6CeUKtyw7vt2A)

(https://chatgpt.com/share/67344f53-c820-8009-9622-9b49ca4f4d05)




















