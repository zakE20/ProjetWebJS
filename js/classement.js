// classement.js
window.addEventListener('DOMContentLoaded', () => {
    const tbody        = document.getElementById('tbody');
    const scoresObj    = JSON.parse(localStorage.getItem('scores') || '{}');
    const currentUser  = localStorage.getItem('currentUser');
    const currentScore = Number(localStorage.getItem('currentScore') || 0);

    // If there is a new score to record, add it into the leaderboard
    if (currentUser && currentScore > 0) {
        scoresObj[currentUser] = (scoresObj[currentUser] || 0) + currentScore;
        localStorage.setItem('scores', JSON.stringify(scoresObj));
        localStorage.removeItem('currentScore');
    }

    Object.entries(scoresObj)
        .sort(([, aScore], [, bScore]) => bScore - aScore)
        .slice(0, 10)
        .forEach(([email, totalScore], idx) => {
            const tr = document.createElement('tr');
            if (email === currentUser) tr.classList.add('me');
            tr.innerHTML = `
            <td>${idx + 1}</td>
            <td>${email}</td>
            <td>${totalScore}</td>
          `;
            tbody.appendChild(tr);
        });
});
