window.onload = function() {
    const email  = localStorage.getItem('currentUser');
  const scores = JSON.parse(localStorage.getItem('scores') || '{}');

  document.getElementById('currentScore').textContent =
        localStorage.getItem('lastScore') || 0;

  document.getElementById('highScoreValue').textContent =
        scores[email] || 0;
    document.querySelector('.home-button').addEventListener('click', function() {
        window.location.href = '../html/accueil.html';
    });
    document.querySelector('.restart-button').addEventListener('click', function() {
        let idx = parseInt(localStorage.getItem('lastUnlockedLevel'), 10);
        let niveau = isNaN(idx) ? 1 : idx + 1;
        window.location.href =  `../html/canvas.html?level=${niveau}`;
    });
    document.querySelector('.restart-level').addEventListener('click', function() {
        window.location.href = `../html/canvas.html`;
    });
};
function updateCurrentScore(score) {
    localStorage.setItem('currentScore', score);
}
