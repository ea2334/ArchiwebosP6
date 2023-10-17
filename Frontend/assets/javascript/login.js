// On cherche le bouton connexion
const btnSubmit = document.querySelector("#connection");

// On créer un événement au click sur le bouton connexion

btnSubmit.addEventListener("click", function(event) {
  event.preventDefault();
  // On cherche les valeurs des input
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  // Si les valeurs ne sont pas bonnes, on affiche un message d'erreur
  if (!email || !password) {
    document.querySelector(".error-login").innerHTML = 'Email ou mot de passe incorrect';
    return;
  }

  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
    .then(response => response.json())
    .then(data => {

      if (data.token) {
        localStorage.setItem("token", data.token);
        window.location.href = "index.html";
      } else {
        document.querySelector(".error-login").innerHTML = 'Email ou mot de passe incorrect';
        console.error("Échec de la connexion :", data);
      }
    })
    .catch(error => {
      console.error("Erreur lors de la requête de connexion :", error);
    });

});