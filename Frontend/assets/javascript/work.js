/* Affichage travaux sur la modale et sur l'index */

const galleryEdit = document.querySelector("#openmodal");
const gallery = document.querySelector(".gallery");

function showWorks(works) {

  works.forEach(work => {
    figure = document.createElement("figure");
    figure.id = work.id;

    imageWrapper = document.createElement("div");
    imageWrapper.classList.add("image-wrapper");

    image = document.createElement("img");
    image.src = work.imageUrl;
    image.crossOrigin = "Anonymous";

    btnSupp = document.createElement("button");
    btnSupp.setAttribute('data-id', work.id);
    btnSupp.classList.add("delete");
    //btnSupp.dataset.id = work.id;

    supp = document.createElement("i");
    supp.classList.add("fa-solid", "fa-trash-can");

    figcaption = document.createElement("figcaption");
    figcaption.textContent = "éditer";

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(supp);

    figure.appendChild(imageWrapper);
    figure.appendChild(figcaption);
    figure.appendChild(btnSupp);
    btnSupp.appendChild(supp);

    galleryEdit.appendChild(figure);
  });

  works.forEach(work => {
    const figure = document.createElement("figure");
    figure.id = work.id;
    const image = document.createElement("img");
    image.src = work.imageUrl;
    image.alt = work.title;
    image.crossOrigin = "Anonymous";
    const figcaption = document.createElement("figcaption");
    figcaption.textContent = work.title;
    figure.appendChild(image);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
  });
}

// Affichage des images sur le formulaire
  
const ImageWork = document.querySelector("#work-image");
const ApercuImage = document.querySelector("#image-apercu");

ImageWork.addEventListener("change", function(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
    ApercuImage.src = e.target.result;
  };

  reader.readAsDataURL(file);
});

// Ajout de la catégorie sur le nouveau projet

const categorieSelect = document.querySelector("#categorie-work");

function fetchCategories() {
  fetch("http://localhost:5678/api/categories")
    .then(response => response.json())
    .then(categories => {
      categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name;
        categorieSelect.appendChild(option);
      });
    })
    .catch(error => {
      console.error("Erreur lors de la requête GET pour récupérer les catégories :", error);
    });
}

fetchCategories();

// Suppression des travaux

function deleteWork() {

    const btnDeletes = document.querySelectorAll(".delete");
    const idGallery = document.querySelectorAll('.gallery figure');
  
    btnDeletes.forEach((btnDelete, index) => {
      btnDelete.addEventListener('click', (e) => {
        e.preventDefault();

        const idDelete = btnDelete.dataset.id;
        const figure = btnDelete.parentNode;
        const token = localStorage.getItem('token');
  
        if (token) {
          fetch(`http://localhost:5678/api/works/${idDelete}`, {
            method: 'DELETE',
            headers: {
              "Accept": "application/json",
              Authorization: `Bearer ${token}`
            }
          })
            .then(response => {
              if (response.ok) {

                figure.remove();

                if (idGallery[index]) {
                  idGallery[index].remove();
                }
                console.log('Réponse fetch delete', response.json);
                } else {
                console.log('Erreur de suppression sur le serveur:', response.statusText);
                }
            })
            .catch(error => {
              console.error('Erreur de suppression:', error);
            });
        }
  
      });
    });

}

// Ajout des travaux

const workForm = document.getElementById('work-form');
const titre = document.getElementById('titre-work');
const categorieId = document.getElementById('categorie-work');
const imageFile = document.getElementById('image');
const submit = document.getElementById('submit');

function updateSubmitButton() {
  if (titre.value && categorieId.value && imageFile.files[0]) {
    submit.classList.add('valid');
  } else {
    submit.classList.remove('valid');
  }
}

titre.addEventListener('input', updateSubmitButton);
categorieId.addEventListener('input', updateSubmitButton);
imageFile.addEventListener('input', updateSubmitButton);

function addWorks(){

  submit.addEventListener('click', (e) => {
    e.preventDefault();
    if (!titre.value || !categorieId.value || !imageFile.files[0]) {
      console.log("erreur");
      const errorContainer = document.querySelector(".error-post");
      errorContainer.innerHTML = "Veuillez remplir correctement le formulaire";
    } else {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('title', titre.value);
      formData.append('category', categorieId.value);
      formData.append('image', imageFile.files[0]);

      fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData
      })
      .then(response => response.json())
      .then(() => {
        back();
        fetchWorks();
        gallery.innerHTML = '';
        galleryEdit.innerHTML = '';

        document.getElementById('titre-work').value = "";
        document.getElementById('categorie-work').value = "";
        document.getElementById('image-apercu').removeAttribute("src");
        submit.classList.remove('valid'); // Retirer la classe "valid" une fois le formulaire soumis
        imgForm.style.display = "block";
        telechargement.removeChild(imageApercu);
      })
      .catch(error => {
        console.error('Erreur lors de l\'ajout du travail :', error);
      });
    }
  });

}

// Affiche de l'image téléchargée dans le formulaire

const inputImage = document.getElementById('image');
const labelImage = document.querySelector('.image-travaux label');
const telechargement = document.querySelector('.telecharger');
const imgForm = document.querySelector('.img-form');

const imageApercu = document.createElement('img');
imageApercu.setAttribute('id', 'image-apercu');
imageApercu.style.maxWidth = '200px';
imageApercu.style.maxHeight = '100%';
imageApercu.style.marginLeft = '110px';

inputImage.addEventListener('change', (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = () => {
    imageApercu.src = reader.result;
    imageApercu.style.display = 'block'; 
    imgForm.style.display = "none";

    telechargement.appendChild(imageApercu);
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    imageApercu.src = '';
    imageApercu.style.display = 'none';
    labelImage.style.display = 'block';
  }
});