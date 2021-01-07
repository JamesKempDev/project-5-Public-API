let allUsers = []; // Create an empty array ready for data
const galleryDiv = document.querySelector('#gallery'); // Select the gallery div
const body = document.querySelector('body'); // Select body div
let close // Variable to use for dynamic creation of event listener on Modal closer
let modalContainer // variable to capture modal div
let output // Modal container output HTML

// Fetch 12 American users, parse the data and run generateCard function

fetch("https://randomuser.me/api/?results=12&nat=us")
  .then((response) => response.json())
  .then((data) => generateCard(data.results))
  .catch((error) => {
    console.log(new Error('There was an error returning data from the server: ' + error));
    errorPopup();
  })

///////////////
// Functions //
///////////////

function generateModal(id) { // Use the ID to pull data from the allUsers array of users

  //create date of birth variables
  let day = allUsers[id].dob.date.substring(8,10)
  let month = allUsers[id].dob.date.substring(5,7)
  let year = allUsers[id].dob.date.substring(0,4);

  // create location strings
  let number = allUsers[id].location.street.number;
  let street = allUsers[id].location.street.name;
  let city = allUsers[id].location.city
  let state = allUsers[id].location.state;
  let zip = allUsers[id].location.postcode;

  let output = `

  <div class="modal-container">
   <div class="modal">
       <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
       <div class="modal-info-container">
           <img class="modal-img" src=${allUsers[id].picture.large} alt="profile picture">
           <h3 id="name" class="modal-name cap">${allUsers[id].name.first} ${allUsers[id].name.last}</h3>
           <p class="modal-text">${allUsers[id].email}</p>
           <p class="modal-text cap">${city}</p>
           <hr>
           <p class="modal-text">${allUsers[id].cell}</p>
           <p class="modal-text">${number} ${street}, ${city}, ${state} ${zip}</p>
           <p class="modal-text">Birthday: ${month}/${day}/${year}</p>
       </div>
   </div>
  `
  body.insertAdjacentHTML('beforeend', output); // Insert the html into the body
  generateEventListener(); // generate an event listener on the newly generated ID for the close button

}

function errorPopup() {
  alert('There was an error returning the data. Please refresh the page to try again');
}


function generateCard(data) {

  for (let i = 0; i < data.length; i++) {
    allUsers[i] = data[i];
    let divCard = `
       <div class="card" id=${i}>
   <div class="card-img-container">
       <img class="card-img" src="${data[i].picture.large}" alt="profile picture">
   </div>
        `;
    let containerDiv = `
        <div class="card-info-container">
       <h3 id="name" class="card-name cap">${data[i].name.first} ${data[i].name.last}</h3>
       <p class="card-text">${data[i].email}</p>
       <p class="card-text cap">${data[i].location.city}, ${data[i].location.state}</p>
   </div>
 </div>  
        `
    galleryDiv.insertAdjacentHTML('beforeend', divCard + containerDiv);
  }
}

/////////////////////
// Event listeners //
/////////////////////

galleryDiv.addEventListener('click', (e) => {
  if (e.target.className.indexOf("card") !== -1) { // Check if the class name contains the word 'card'
    generateModal(e.target.closest(".card").id) // If it does, create the modal popup passing in the target ID
  }
});

function generateEventListener() {
  close = document.getElementById('modal-close-btn'); // Grab the newly created close button by ID
  modalContainer = document.querySelector('.modal-container'); // Select the newly generated modal container by ID
  // Add the event listener to the close button
  close.addEventListener('click', (e) => {
    // reset variables to empty and delete modal code block from the body HTML
    modalContainer.remove()
    close = null;
  })
}