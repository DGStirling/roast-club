const addRoastBtn = document.getElementById('btn-add-roast');
const addRoastModal = document.getElementById('add-roast-screen');
const backdrop = document.getElementById('backdrop');
const cancelAddBtn = document.getElementById('cancel-add-roast');
const confirmAddBtn = document.getElementById('confirm-add-roast');
const roastShowcase = document.getElementById('roast-showcase');
const roastShowcaseList= roastShowcase.querySelector('.roast-entry-list');
const seeMoreBtn = document.querySelector('.see-more');


const roastList = [];
let roastLogEntry = {};
let userInputs = addRoastModal.querySelectorAll('input, textarea')
let counter = 0;


// Show add roast drop-over
const addVisible = (...elements) => {
  for (const el of elements) {
    el.classList.add('visible');
  }
};

const removeVisible = (...elements) => {
  for (const el of elements) {
    el.classList.remove('visible');
  }
};

const addRoastHandler = () => {
  addVisible(addRoastModal, backdrop);
}

const removeRoastHandler = () => {
  removeUserInputs();
  removeVisible(addRoastModal, backdrop);
};


// CLEAR INPUTS FUNCTION

const removeUserInputs = () => {
  console.log(userInputs)
 for (const input of userInputs) {
   console.log(input.value);
   input.value = '';
 }

};


// WRITES USER INPUT & ADDS TO ROAST LIST


const calculateRatingMean = () => {

  ratingPotato = parseInt(addRoastModal.querySelector('#rating-potato').value);
  ratingGravy = parseInt(addRoastModal.querySelector('#rating-gravy').value);
  ratingPortion = parseInt(addRoastModal.querySelector('#rating-portion').value);

  const meanRating = ((ratingPotato + ratingGravy + ratingPortion) / 3).toFixed(1);
  return meanRating;


  
};

const pushToUI = (venue, city, imgURL, rating, comment) => {

  const newEntry = document.createElement('div');
  newEntry.classList.add('roast-entry');
  newEntry.innerHTML = `
  <div class="roast-entry-container">
  <h3>${venue}</h3>
  <div class="city-pin">
    <h4><i class="fas fa-location"></i> ${city}</h4>
  </div>
  <p class="star-rating">${rating} / 5 stars</p>
  <p>
  ${comment}
  </p>
</div>
<img class="roast-entry-image" src="${imgURL}" alt="${venue} Roast" />`


  roastShowcaseList.append(newEntry);


};


const addRoastProcess = () => {

  let venueVar = addRoastModal.querySelector('#roast-venue').value.trim();
  let locationVar = addRoastModal.querySelector('#roast-location').value.trim();
  let imageUrlVar = addRoastModal.querySelector('#roast-img').value.trim();
  let meanRatingVar = calculateRatingMean();
  let commentVar = addRoastModal.querySelector('#roast-comment').value.trim();


  if  (venueVar === ''){
    alert('Please enter valid restaurant.');
    return;
  } else if(locationVar === '') {
    alert('Please enter valid location.');
    return;
  } else if (imageUrlVar === '' ){
    alert('Please enter valid url.');
    return;
  } else if (meanRatingVar < 1) {
    alert ('Please enter valid ratings.');
    return;
  } else if (commentVar === '') {
    alert('Please enter valid comment');
    return;
  }

  counter++;



  roastLogEntry = {
  logEntry: counter,
  venue: venueVar,
  location: locationVar,
  imageUrl: imageUrlVar,
  rating: meanRatingVar,
  comment: commentVar

}

  roastList.push(roastLogEntry);
  pushToUI(venueVar, locationVar, imageUrlVar, meanRatingVar, commentVar);

  removeUserInputs();
  removeRoastHandler(); 

};



if (roastList.length > 3) {
seeMoreBtn.style.display = 'block';
}



calculateRatingMean();


addRoastBtn.addEventListener('click', addRoastHandler);
backdrop.addEventListener('click', removeRoastHandler, removeUserInputs)
cancelAddBtn.addEventListener('click', removeRoastHandler, removeUserInputs)
confirmAddBtn.addEventListener('click',addRoastProcess)


