let modal = null;

// Ouverture de la modal qui affiche les travaux

const openModal = function (e) {
  e.preventDefault();
  modal = document.querySelector(e.target.getAttribute('href'));
  modal.style.display = null;
  modal.removeAttribute('aria-hidden', false)
  modal.setAttribute('aria-modal', 'true')
  modal.addEventListener('click', closeModal);
  modal.querySelector('.fermer-js').addEventListener('click', closeModal);
  modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);
}

// Fermeture de la modal

const closeModal = function (e) {
  if (modal === null) return;
  e.preventDefault();
  modal.style.display = "none";
  modal.removeAttribute('aria-hidden', true);
  modal.removeEventListener('click', closeModal);
  modal.querySelector('.fermer-js').removeEventListener('click', closeModal);
  modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation);
  modal = null;
}

// Fermeture de la modal quand on clique en dehors de la fenêtre

const stopPropagation = function (e) {
  e.stopPropagation()
}

document.querySelectorAll(".js-modal").forEach(a => {
  a.addEventListener('click', openModal)
})

// Afficher le formulaire d'ajout

const btnAddWork = document.querySelector(".ajout");
const modalEdit = document.querySelector(".modal-edit");
const modalForm = document.querySelector(".modal-form");

btnAddWork.addEventListener('click', () => {
    modalEdit.style.display = "none";
    modalForm.style.display = "block";
});

// Bouton de retour en arrière

function back() {
    modalEdit.style.display = "block";
    modalForm.style.display = "none";
}

const btnBack = document.querySelector(".retour");

btnBack.addEventListener('click', () => {
    back();
});