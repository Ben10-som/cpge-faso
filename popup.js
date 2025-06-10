/*function createPopup(_popup) {
    // Create a popup
    let popupNode = document.querySelector("#popup");
    let overlay = popupNode.querySelector(".overlay");
    let closeBtn = popupNode.querySelector(".close-btn");
    console.log("what's up",popupNode);
   console.log(overlay);
    console.log(closeBtn);  
    function openPopup (){
        popupNode.classList.add("active");

    }


    function closePopup() {
    popupNode.classList.remove("active");
    }

    overlay.addEventListener("click", closePopup);
    closeBtn.addEventListener("click", closePopup);
    return openPopup;

}

let popup = createPopup("#popup");
console.log(popup);
document.querySelector("#open-popup").addEventListener("click", popup);


function createPopup(_popup2) {
    // Create a popup
    let popupNode = document.querySelector("#popup2");
    let overlay = popupNode.querySelector(".overlay");
    let closeBtn = popupNode.querySelector(".close-btn");
    console.log(popupNode);
    console.log(overlay);
    console.log(closeBtn);
    function openPopup (){
        popupNode.classList.add("active");

    }


    function closePopup() {
    popupNode.classList.remove("active");
    }

    overlay.addEventListener("click", closePopup);
    closeBtn.addEventListener("click", closePopup);
    return openPopup;

}

let popup2 = createPopup("#popup2");
console.log(popup2);
document.querySelector("#open-popup2").addEventListener("click", popup);*/

// Sélectionner toutes les cartes et tous les popups
const cards = document.querySelectorAll('.card__article');
const popups = document.querySelectorAll('.popup');

// Associer chaque carte à son popup via index
cards.forEach((card, index) => {
  const button = card.querySelector('#open-popup');
  const popup = document.getElementById(`popup${index + 1}`);

  button.addEventListener('click', (e) => {
    e.preventDefault();

    // Fermer les autres popups
    popups.forEach(p => p.hidden = true);

    // Afficher le popup correspondant
    popup.hidden = false;
  });
});

// Fermer les popups au clic sur bouton ou overlay
popups.forEach(popup => {
  const closeBtn = popup.querySelector('.close-btn');
  const overlay = popup.querySelector('.overlay');

  closeBtn.addEventListener('click', () => {
    popup.hidden = true;
  });

  overlay.addEventListener('click', () => {
    popup.hidden = true;
  });
});

// Fermer tout popup si clic en dehors
document.addEventListener('click', (e) => {
  const isInPopup = [...popups].some(p => p.contains(e.target));
  const isInCard = [...cards].some(card => card.contains(e.target));
  if (!isInPopup && !isInCard) {
    popups.forEach(p => p.hidden = true);
  }
});