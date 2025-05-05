document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('burger-menu');
  const navbar = document.getElementById('navbar');
  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    navbar.classList.toggle('active');
  });
  const loginBtns = document.querySelectorAll('.btn-se-connecter, .btn-se-connecter-horizontal');
  const user = localStorage.getItem('currentUser');
  loginBtns.forEach(btn => {
    if (user) {
      btn.textContent = 'Se déconnecter';
      btn.onclick = () => {
        localStorage.removeItem('currentUser');
        location.reload();
      };
    } else {
      btn.textContent = 'Se connecter';
      btn.onclick = () => location.href = 'login.html';
    }
  });
  const home = document.getElementById('home-view');
  const game = document.getElementById('game-view');
  const back = document.getElementById('back-btn');
  window.showGame = (title, desc, imgUrl) => {
    document.getElementById('detail-title').textContent = title;
    document.getElementById('detail-desc').textContent  = desc;
    const img = document.getElementById('detail-img');
    img.src = imgUrl;
    img.alt = title;

    home.classList.add('hidden');
    game.classList.add('visible');
  };

  // retour
  back.addEventListener('click', () => {
    game.classList.remove('visible');
    home.classList.remove('hidden');
  });
});
