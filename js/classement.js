window.addEventListener('DOMContentLoaded', () => {
  const tbody      = document.getElementById('tbody');
  const scoresObj  = JSON.parse(localStorage.getItem('scores') || '{}');
   const current    = localStorage.getItem('currentUser');
  Object.entries(scoresObj)
        .sort((a,b) => b[1]-a[1])
        .slice(0,10)
        .forEach(([email, score], idx) => {
          const tr = document.createElement('tr');
          if (email === current) tr.classList.add('me');    
          tr.innerHTML = `
            <td>${idx+1}</td>
            <td>${email}</td>
            <td>${score}</td>`;
          tbody.appendChild(tr);
        });
});
