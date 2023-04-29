const brandCardsSection = document.querySelector('.brand-cards'),
    modelSection = document.querySelector('.models');

let brandsCount = 0;

function hamburgerClick() {
    document.querySelector('header').classList.toggle('clicked');
}

// Fetching brand images
const fetchData = async(filename) => {
    const data = await fetch(`json/${filename}.json`);
    const jsonData = await data.json();
    return jsonData;
}

// Displaying brand cards
const displayBrandCards = async (start, end) => {
    const brandData = await fetchData('brands');
    let iHtml = '';
    brandsCount = brandData.length;
    for(let i=start; i<end; i++) {
        iHtml += `
            <div class='brand-card'>
                <img src='${brandData[i].imgUrl}' alt='${brandData[i].name} company' />
            </div>
        `;   
    }
    brandCardsSection.innerHTML = iHtml;
}


// Onclick funtion to show more brands
function showMoreBrands() {
    document.querySelector('.brands span').style.display = 'none';
    displayBrandCards(0, brandsCount);
}


// Displaying top selling models
const displayTopSellingModels = async() => {
    const modelsData = await fetchData('mobiles');
    let iHtml = '';
    modelsData.forEach(model => {
        iHtml += `
            <div class="model-card flex-center">
                <img src="${model.imgUrl}" alt="${model.name}" />
                <p>${model.name}</p>
            </div>
        `;
    });
    modelSection.innerHTML = iHtml;
}


// using iife to invoke both display functions
(
    function() {
        displayBrandCards(0, 4);
        displayTopSellingModels();
    }
)();