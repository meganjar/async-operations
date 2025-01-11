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
const API_KEY = "live_dYfTfAwgGIGOEe7nNzvhyqItnG6HM2VTwWLwZQ1TDKyPtGh2MvaU8JOODPk8BbRm";

export async function favourite(imgId) {
  // your code here
}

// Step 1
async function initialLoad() {
  const response = await fetch(`https://api.thecatapi.com/v1/breeds?api_key=${API_KEY}`);
  const breeds = await response.json();
  
  breeds.forEach(breed => {
    // only create an option element if breed has images available
    if (breed.image) {
      const option = document.createElement("option");
      option.setAttribute("value", breed.id);
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    }
  });

  renderUI(breedSelect.value);
}
initialLoad();


// Step 2
breedSelect.addEventListener("change", handleSelect);

async function handleSelect(e) {
  renderUI(e.target.value);
}

async function renderUI(breedID) {
  Carousel.clear();
  infoDump.innerHTML = '';
  const breedData = await getBreedData(breedID);
  populateCarousel(breedData);
  renderBreedInfo(breedData[0].breeds[0]);
  Carousel.start();
}

function populateCarousel(catArray) {
  catArray.forEach(cat => {
    const carouselItem = Carousel.createCarouselItem(cat.url, "cat image", cat.id);
    Carousel.appendCarousel(carouselItem);
  });
}

async function getBreedData(id) {
  const response = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${id}&limit=10&api_key=${API_KEY}`);
  const breedData = await response.json();
  return breedData;
}

function renderBreedInfo(breedInfo) {
  infoDump.innerHTML = `
    <div>
      <h3>${breedInfo.name}</h3>
      <p>
        The ${breedInfo.name} is a breed known for its curiosity, intelligence, and communication skills. ${breedInfo.description}
        They score ${breedInfo.adaptability}/5 for adaptability, ${breedInfo.affection_level}/5 for affection, and ${breedInfo.energy_level}/5 for energy levels. They are child-friendly (${breedInfo.child_friendly}/5) and dog-friendly (${breedInfo.dog_friendly}/5).
        With a lifespan of ${breedInfo.life_span} years, moderate grooming needs (${breedInfo.grooming}/5), and a hypoallergenic coat (${breedInfo.hypoallergenic === 1 ? "Yes" : "No"}), they are a relatively low-maintenance breed.
      </p>
    </div>
  `;
}
