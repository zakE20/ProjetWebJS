window.onload = () => {
    const email   = localStorage.getItem('currentUser');
    const scores  = JSON.parse(localStorage.getItem('scores') || '{}');
    document.getElementById('currentScore').textContent =
        localStorage.getItem('lastScore') || 0;
    document.getElementById('highScoreValue').textContent =
          scores[email] || 0;
    document.querySelector('.home-button')
            .addEventListener('click', () => location.href = 'accueil.html');
    document.querySelector('.restart-button')
            .addEventListener('click', () => location.href = 'canvas.html');
  };
  