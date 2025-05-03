window.onload = function() {
    const currentScore = localStorage.getItem('currentScore') || 0;
    const highScore = localStorage.getItem('highScore') || 0;

    document.getElementById('currentScore').textContent = currentScore;
    document.getElementById('highScoreValue').textContent = highScore;

    document.querySelector('.home-button').addEventListener('click', function() {
        window.location.href = '../html/accueil.html';
    });

    document.querySelector('.restart-button').addEventListener('click', function() {
        window.location.href = '../html/canvas.html';
    });
};

function updateCurrentScore(score) {
    localStorage.setItem('currentScore', score);
}
