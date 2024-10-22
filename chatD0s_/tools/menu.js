function openProfileSettings() {
    fetch('profile/profileSettings.php')
    .then(response => response.text())
    .then(data => {
        main.insertAdjacentHTML('beforeend', data);
        var activated = "settingWallet";
    })
    .catch(error => console.error('Erreur lors de la recuperation du contenu PHP :', error));
}