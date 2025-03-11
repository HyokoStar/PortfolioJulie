// Fonction pour obtenir l'identifiant de la page actuelle
function getPageId() {
    return window.location.pathname.split('/').pop().split('.').shift(); // ex: 'page1' pour 'page1.html'
}

// Initialisation des données à partir du Local Storage pour la page actuelle
const pageId = getPageId();
const secteurs = JSON.parse(localStorage.getItem(`${pageId}_secteurs`)) || [];
const metiers = JSON.parse(localStorage.getItem(`${pageId}_metiers`)) || [];
const personnes = JSON.parse(localStorage.getItem(`${pageId}_personnes`)) || [];

function ajouterSecteur() {
    const nom = document.getElementById('secteurNom').value.trim();
    if (nom === '') {
        alert('Veuillez entrer un nom de secteur valide.');
        return;
    }
    // Vérifier si le secteur existe déjà
    if (secteurs.some(secteur => secteur.nom.toLowerCase() === nom.toLowerCase())) {
        alert('Ce secteur existe déjà.');
        return;
    }
    secteurs.push({ nom });
    mettreAJourSelectSecteurs('secteurSelectPersonne');
    sauvegarderDonnees();
}

function ajouterMetier() {
    const nom = document.getElementById('metierNom').value.trim();
    if (nom === '') {
        alert('Veuillez entrer un nom de métier valide.');
        return;
    }
    // Vérifier si le métier existe déjà
    if (metiers.some(metier => metier.nom.toLowerCase() === nom.toLowerCase())) {
        alert('Ce métier existe déjà.');
        return;
    }
    metiers.push({ nom });
    mettreAJourSelectMetiers('metierSelectPersonne');
    sauvegarderDonnees();
}

// Ajouter une personne avec une pop-up de confirmation
function ajouterPersonne() {
    const nom = document.getElementById('personneNom').value.trim();
    const telephone = document.getElementById('personneTel').value.trim();
    const secteur = document.getElementById('secteurSelectPersonne').value;
    const metier = document.getElementById('metierSelectPersonne').value;

    // Vérifier que les champs obligatoires sont remplis
    if (nom === '' || telephone === '' || secteur === '') {
        alert('Veuillez remplir les champs nom, téléphone et secteur.');
        return;
    }

    // Ajouter la personne même si le champ métier est vide
    personnes.push({ nom, telephone, secteur, metier });
    afficherDonnees();
    sauvegarderDonnees();
    
    // Afficher une pop-up de confirmation
    alert('Personne ajoutée avec succès!');
}

function mettreAJourSelectSecteurs(selectId, selectedValue = '') {
    const select = document.getElementById(selectId);
    if (!select) return;
    select.innerHTML = '';
    secteurs.forEach(secteur => {
        const option = document.createElement('option');
        option.value = secteur.nom;
        option.textContent = secteur.nom;
        if (secteur.nom === selectedValue) {
            option.selected = true;
        }
        select.appendChild(option);
    });
}

function mettreAJourSelectMetiers(selectId, selectedValue = '') {
    const select = document.getElementById(selectId);
    if (!select) return;
    select.innerHTML = '<option value=""></option>';
    metiers.forEach(metier => {
        const option = document.createElement('option');
        option.value = metier.nom;
        option.textContent = metier.nom;
        if (metier.nom === selectedValue) {
            option.selected = true;
        }
        select.appendChild(option);
    });
}

window.addEventListener("load", function () {
    mettreAJourSelectSecteurs('secteurSelectPersonne');
    mettreAJourSelectMetiers('metierSelectPersonne');
    afficherDonnees();
});

function afficherDonnees(data = personnes) {
    const tbody = document.querySelector('#dataTable tbody');
    tbody.innerHTML = '';

    const secteursMap = new Map();
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    const actionsColumn = document.getElementById('actionsColumn');
    if (actionsColumn) {
        actionsColumn.style.display = isLoggedIn ? 'table-cell' : 'none';
    }

    data.forEach((personne, index) => {
        if (personne.secteur && personne.nom && personne.telephone) {
            if (!secteursMap.has(personne.secteur)) {
                secteursMap.set(personne.secteur, []);
            }
            secteursMap.get(personne.secteur).push({ ...personne, index });
        }
    });

    secteursMap.forEach((personnes, secteur) => {
        const secteurRow = document.createElement('tr');
        secteurRow.innerHTML = `<td colspan="${isLoggedIn ? 5 : 4}" style="background-color: #e0e0e0; font-weight: bold;">${secteur}</td>`;
        tbody.appendChild(secteurRow);

        personnes.forEach(personne => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${personne.secteur}</td>
                <td>${personne.metier || ''}</td>
                <td>${personne.nom}</td>
                <td>${personne.telephone}</td>
                ${isLoggedIn ? `<td>
                    <button class="modP" onclick="modifierPersonne(${personne.index})">Modifier</button>
                    <button class="supP" onclick="supprimerPersonne(${personne.index})">Supprimer</button>
                </td>` : ''}
            `;
            tbody.appendChild(row);
        });

        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = `<td colspan="${isLoggedIn ? 5 : 4}" style="background-color: #f5f5f5;"></td>`;
        tbody.appendChild(emptyRow);
    });
}

window.addEventListener("load", function () {
    afficherDonnees();
});

function modifierPersonne(index) {
    ouvrirPopupModification(index);
}

function ouvrirPopupModification(index) {
    const personne = personnes[index];
    document.getElementById('modifierNom').value = personne.nom;
    document.getElementById('modifierTel').value = personne.telephone;
    mettreAJourSelectSecteurs('modifierSecteur', personne.secteur);
    mettreAJourSelectMetiers('modifierMetier', personne.metier);

    document.getElementById('popup').style.display = 'flex';
    
    document.getElementById('validerModificationButton').onclick = function() {
        validerModification(index);
    };
}

document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'none';
});

window.addEventListener('click', function(event) {
    if (event.target === document.getElementById('popup')) {
        document.getElementById('popup').style.display = 'none';
    }
});

function validerModification(index) {
    const personne = personnes[index];
    personne.nom = document.getElementById('modifierNom').value.trim();
    personne.telephone = document.getElementById('modifierTel').value.trim();
    personne.secteur = document.getElementById('modifierSecteur').value;
    personne.metier = document.getElementById('modifierMetier').value || '';

    sauvegarderDonnees();
    afficherDonnees();
    document.getElementById('popup').style.display = 'none';

    /* alert('Personne modifiée avec succès!'); */
}

function supprimerPersonne(index) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette personne ?')) {
        personnes.splice(index, 1);
        sauvegarderDonnees();
        afficherDonnees();
        
        /* alert('Personne supprimée avec succès!'); */
    }
}

function sauvegarderDonnees() {
    localStorage.setItem(`${pageId}_secteurs`, JSON.stringify(secteurs));
    localStorage.setItem(`${pageId}_metiers`, JSON.stringify(metiers));
    localStorage.setItem(`${pageId}_personnes`, JSON.stringify(personnes));
}

mettreAJourSelectSecteurs();
mettreAJourSelectMetiers();
afficherDonnees();

function supprimerToutesLesDonnees() {
    secteurs.length = 0;
    metiers.length = 0;
    personnes.length = 0;
    sauvegarderDonnees();
    mettreAJourSelectSecteurs();
    mettreAJourSelectMetiers();
    afficherDonnees();
}

window.addEventListener("load", function () {
    mettreAJourSelectSecteurs('secteurSelectPersonne');
    mettreAJourSelectMetiers('metierSelectPersonne');
    afficherDonnees();
});
