document.addEventListener("DOMContentLoaded", function() {
  const menuHTML = `
      <nav>
          <ul>
              <li><a href="Accueil.html">Page d'accueil</a></li>
              <li><a href="page1.html">Gestion</a></li>
              <li><a href="page2.html">Médico Technique</a></li>
              <li><a href="page3.html">GIE IRM</a></li>
              <li><a href="page4.html">Soins Critiques</a></li>
              <li><a href="page5.html">Médical</a></li>
              <li><a href="page6.html">Chirurgical</a></li>
              <li><a href="page7.html">Femme Enfant</a></li>
              <li><a href="page8.html">Gérontologie</a></li>
              <li><a href="page9.html">Divers</a></li>
          </ul>
      </nav>`;
  
  document.querySelector('header').innerHTML = menuHTML;

  // Ajouter un écouteur d'événement pour la recherche
  const searchButton = document.querySelector(".search-button");
  searchButton.addEventListener("click", function () {
      const searchInput = document.querySelector(".search-bar");
      rechercherPersonne(searchInput.value);
  });
});

function rechercherPersonne(query) {
  // Filtrer les données selon la recherche (par secteur, métier, nom, ou téléphone)
  const results = personnes.filter(entry => {
      return entry.secteur.toLowerCase().includes(query.toLowerCase()) ||
             entry.metier.toLowerCase().includes(query.toLowerCase()) ||
             entry.nom.toLowerCase().includes(query.toLowerCase()) ||
             entry.telephone.includes(query);
  });

  // Afficher la pop-up avec les résultats de la recherche
  afficherPopup(results);
}

function afficherPopup(results) {
  // Supprimer les anciens résultats
  const existingPopup = document.getElementById("popup");
  if (existingPopup) {
      existingPopup.remove();
  }

  // Créer et afficher une nouvelle pop-up avec les résultats
  const popup = document.createElement("div");
  popup.id = "popup";
  popup.style.position = "fixed";
  popup.style.top = "50%";
  popup.style.left = "50%";
  popup.style.transform = "translate(-50%, -50%)";
  popup.style.padding = "20px";
  popup.style.backgroundColor = "white";
  popup.style.border = "1px solid #ccc";
  popup.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.2)";
  popup.style.zIndex = 1000;
  popup.style.maxHeight = "80vh"; // Limiter la hauteur de la pop-up
  popup.style.overflowY = "auto"; // Activer le défilement vertical

  // Ajouter le contenu des résultats à la pop-up
  const resultList = document.createElement("div");
  results.forEach(result => {
      const resultItem = document.createElement("div");
      resultItem.classList.add("info");
      resultItem.innerHTML = `
          <strong>Secteur :</strong> ${result.secteur}<br>
          <strong>Métier :</strong> ${result.metier}<br>
          <strong>Nom :</strong> ${result.nom}<br>
          <strong>Téléphone :</strong> ${result.telephone}
      `;
      resultItem.style.marginBottom = "10px";
      resultList.appendChild(resultItem);
  });

  // Ajouter un bouton pour fermer la pop-up
  const closeButton = document.createElement("button");
  closeButton.innerHTML = "Fermer";
  closeButton.style.marginTop = "10px";
  closeButton.addEventListener("click", function () {
      popup.remove();
  });

  popup.appendChild(resultList);
  popup.appendChild(closeButton);

  // Ajouter la pop-up au body
  document.body.appendChild(popup);
}

document.addEventListener("DOMContentLoaded", function() {
  const menuToggle = document.querySelector(".menu-toggle");
  const navUl = document.querySelector("nav ul");

  menuToggle.addEventListener("click", function() {
      navUl.classList.toggle("active");
  });
});
