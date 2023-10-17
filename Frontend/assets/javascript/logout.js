function deconnexion() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

const boutonDeconnexion = document.querySelector('#btn-logout');
boutonDeconnexion.addEventListener("click", function(event) {
  event.preventDefault();
  if (event.target.id === 'btn-logout') {
    deconnexion();
  }
});


function log() {
  const logout = document.querySelector(".logout");
  const login = document.querySelector(".login");
  
  barAdmin = document.querySelector("#barre");
  const btnModifier = document.querySelector(".js-modal");
  const btnModifierDeux = document.querySelector(".modifier-deux");

  const lesfiltres = document.querySelector("#filtres");


  if (localStorage.getItem('token')) {
    logout.style.display = "block";
    login.style.display = "none";
    
    barAdmin.style.display = "block";
    btnModifier.style.display = "block";
    btnModifierDeux.style.display = "block"
    lesfiltres.style.display = "none";
    
    

  } else {
    logout.style.display = "none";
    login.style.display = "block";

    barAdmin.style.display = "none";
    btnModifier.style.display = "none";
    btnModifierDeux.style.display = "none"
    lesfiltres.style.display = "flex";

  }}

log();

  