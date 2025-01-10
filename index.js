import * as Carousel from "./Carousel.js";
import axios from "axios";

// The breed selection input element.
const breedSelect = document.getElementById("breedSelect");
// The information section div element.
const infoDump = document.getElementById("infoDump");
// The progress bar div element.
const progressBar = document.getElementById("progressBar");
// The get favourites button element.
const getFavouritesBtn = document.getElementById("getFavouritesBtn");

// Step 0: Store your API key here for reference and easy access.
// const API_KEY = "live_dYfTfAwgGIGOEe7nNzvhyqItnG6HM2VTwWLwZQ1TDKyPtGh2MvaU8JOODPk8BbRm";
const API_KEY = "dog";


export async function favourite(imgId) {
  // your code here
}

// Step 1
async function initialLoad() {
  // const response = await fetch(`https://api.thecatapi.com/v1/breeds?api_key=${API_KEY}`);
  const response = await fetch(`https://api.thecatapi.com/v1/breeds`, {
    headers: {
      'x-api-key' : API_KEY
    }
  });
  const breeds = await response.json();
  console.log(breeds);
  
  breeds.forEach(breed => {
    const option = document.createElement("option");
    option.setAttribute("value", breed.id);
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  })

}
initialLoad();


// Step 2
breedSelect.addEventListener("change", async (e) => {
  // const response = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${e.target.value}`);
  const response = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${e.target.value}&limit=10`);
  const data = await response.json();

  console.log(data);
});

// get 10 items - done
// for each object create new element for the carousel then append to carousel
// use other data to create informational section within the infoDump element





// sandbox
