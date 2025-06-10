const cards = document.querySelectorAll('.card__article');
const popups = document.querySelectorAll('.popup');

// Associer chaque bouton à son popup via index
cards.forEach((card, index) => {
  const button = card.querySelector('.open-popup');
  const popup = document.getElementById(`popup${index + 1}`);

  if (button && popup) {
    button.addEventListener('click', (e) => {
      e.preventDefault();

      // Fermer tous les autres popups
      popups.forEach(p => p.hidden = true);

      // Afficher ce popup
      popup.hidden = false;
    });
  }
});

// Fermer les popups au clic sur bouton ou overlay
popups.forEach(popup => {
  const closeBtn = popup.querySelector('.close-btn');
  const overlay = popup.querySelector('.overlay');

  closeBtn?.addEventListener('click', () => {
    popup.hidden = true;
  });

  overlay?.addEventListener('click', () => {
    popup.hidden = true;
  });
});

// Fermer si clic en dehors de carte ou popup
document.addEventListener('click', (e) => {
  const isInPopup = [...popups].some(p => p.contains(e.target));
  const isInCard = [...cards].some(card => card.contains(e.target));
  if (!isInPopup && !isInCard) {
    popups.forEach(p => p.hidden = true);
  }
});
