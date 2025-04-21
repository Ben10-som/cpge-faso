// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Animation des images une fois chargées
    document.querySelectorAll('.school-img').forEach(img => {
      img.addEventListener('load', () => {
        img.classList.add('loaded');
      });
    });
  
    // Animation des cartes à l'ouverture
    anime({
      targets: '.card',
      translateY: [40, 0],
      opacity: [0, 1],
      delay: anime.stagger(100),
      duration: 700,
      easing: 'easeOutQuad'
    });
  
    // Affichage des détails
    document.querySelectorAll('.voir-plus').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault(); // Empêche d’aller sur le lien
        const details = btn.nextElementSibling;
        if (details.classList.contains('hidden')) {
          details.classList.remove('hidden');
          anime({
            targets: details,
            opacity: [0, 1],
            translateY: [-10, 0],
            duration: 400,
            easing: 'easeOutQuad'
          });
        } else {
          anime({
            targets: details,
            opacity: [1, 0],
            translateY: [0, -10],
            duration: 400,
            easing: 'easeInQuad',
            complete: () => details.classList.add('hidden')
          });
        }
      });
    });
  });