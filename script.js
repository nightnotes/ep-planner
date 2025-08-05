const users = { "Nuneaux": "Nunonightnotes123!", "Erry": "Martijnnightnotes123!" };
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');
    if (users[username] && users[username] === password) {
        window.location.href = 'home.html';
    } else {
        errorMessage.textContent = 'Ongeldige gebruikersnaam of wachtwoord.';
    }
});