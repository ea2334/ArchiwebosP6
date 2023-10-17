fetch("http://localhost:5678/api/categories") 
.then(response => response.json())
.then(categories => {

  // Affichage du bouton Tous  

  const filtersContainer = document.getElementById("filtres");
  const allFilterButton = document.createElement("button");
  allFilterButton.textContent = "Tous";
  allFilterButton.classList.add("all-btn");
  filtersContainer.appendChild(allFilterButton);

  // Affichage de tous les filtres

  categories.forEach(category => {
    const filterButton = document.createElement("button");
    filterButton.textContent = category.name;
    filterButton.setAttribute('data-id', category.id)
    filterButton.classList.add("filtres-button");

    filtersContainer.appendChild(filterButton);

  });
  
});