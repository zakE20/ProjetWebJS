import { getUser, requireLogin } from '../../js/auth.js';
import { playMenu,toggleMute } from './Son.js';

window.onload = function () {
    // pas d'invités
    requireLogin('../../login.html');        
    const email = getUser();                    
    const scores   = JSON.parse(localStorage.getItem('scores') || '{}');
    const best     = scores[email] || 0;
    document.getElementById('highScoreValue').textContent = best;
    playMenu(); 
};
document.querySelector('.play-button').addEventListener('click', function() {
    window.location.href = '../html/canvas.html'; 
});
document.getElementById('sound-button').addEventListener('click', function() {
const muted = toggleMute();
e.currentTarget.querySelector('img').style.opacity = muted ? .4 : 1;});
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
