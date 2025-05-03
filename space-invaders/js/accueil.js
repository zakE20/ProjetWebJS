window.onload = function() {
    const highScore = localStorage.getItem('highScore') || 0; // on récupère le high score ou 0 si non défini
    document.getElementById('highScoreValue').textContent = highScore; 
}

document.querySelector('.play-button').addEventListener('click', function() {
    window.location.href = '../html/canvas.html'; 
});

document.getElementById('sound-button').addEventListener('click', function() {
    console.log('Sound button clicked');
});

document.getElementById('help-button').addEventListener('click', function() {
    const helpModal = document.getElementById('helpModal');
    helpModal.style.display = 'block'; 
});

document.getElementById('closeHelp').addEventListener('click', function() {
    const helpModal = document.getElementById('helpModal');
    helpModal.style.display = 'none';  
});

window.addEventListener('click', function(event) {
    const helpModal = document.getElementById('helpModal');
    if (event.target === helpModal) {
        helpModal.style.display = 'none';  
    }
});
