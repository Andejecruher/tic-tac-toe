// js/players.js
document.addEventListener('DOMContentLoaded', () => {
  const playersData = localStorage.getItem('players');
  if (!playersData) {
    window.location.href = '/index.html';
    return;
  }
});

