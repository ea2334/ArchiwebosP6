function fetchWorks(){

  fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(works => {

      showWorks(works);
      deleteWork(works);
      addWorks();
      btnFiltres(works);
      btnAll(works);

  });

}

fetchWorks();

function btnFiltres(works){

  const filtreBtn = document.querySelectorAll('.filtres-button[data-id]')
  filtreBtn.forEach(button => { // Boucle pour traiter les boutons individuellement
    button.addEventListener("click", () => {
      const dataId = button.dataset.id
      let filtre = works.filter(function(element){
        return element.categoryId == dataId;
      });
      document.querySelector('.gallery').innerHTML = '';
      showWorks(filtre)
    });
  });

}

function btnAll(works){

  const gallery = document.querySelector('.gallery');
  const btnAll = document.querySelector('.all-btn');

  btnAll.addEventListener("click", () => {
    gallery.innerHTML = "";
    return showWorks(works);
  });

}