document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.getElementById('loginButton');
    const adminSections = document.querySelectorAll('.admin-section');
    
    // Fonction pour afficher/masquer les sections admin
    function updateAdminSections() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        adminSections.forEach(section => {
            section.style.display = isLoggedIn ? 'block' : 'none';
        });
        loginButton.textContent = isLoggedIn ? 'Déconnexion' : 'Se connecter';
        afficherDonnees(); // Actualiser l'affichage des données
    }

    // Vérifier si l'utilisateur est déjà connecté
    updateAdminSections();

    loginButton.addEventListener('click', function() {
        if (loginButton.textContent === 'Se connecter') {
            const username = prompt('Entrez l\'identifiant de l\'administrateur :');
            const password = prompt('Entrez le mot de passe :');
            
            if (username === 'a' && password === 'a') {
                localStorage.setItem('isLoggedIn', 'true');
            } else {
                alert('Identifiant ou mot de passe incorrect.');
            }
        } else {
            localStorage.removeItem('isLoggedIn');
        }
        updateAdminSections();
    });
});
