document.addEventListener('DOMContentLoaded', () => {
  const burgerMenu = document.getElementById('burger-menu');
  const navbar = document.getElementById('navbar');
    function checkSession() {
    return localStorage.getItem('currentUser');
  }
  function updateLoginButtons() {
      const userEmail = checkSession();
      const loginButtons = document.querySelectorAll('.btn-se-connecter, .btn-se-connecter-horizontal');
      if (userEmail) {
          loginButtons.forEach(button => {
              button.textContent = 'Se déconnecter';
              button.onclick = () => {
                    localStorage.removeItem('currentUser');
                location.reload();
              };
          });
      } else {
          loginButtons.forEach(button => {
              button.textContent = 'Se connecter';
              button.onclick = () => {
                  location.href = 'login.html';
              };
          });
      }
  }
    burgerMenu.addEventListener('click', () => {
      burgerMenu.classList.toggle('active');
      navbar.classList.toggle('active');
  });
updateLoginButtons();
});