// js/players.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('players-form');
  console.log('🚀 ---------------------🚀');
  console.log('🚀 ~ :4 ~ form:', form);
  console.log('🚀 ---------------------🚀');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const nombre1 = document.getElementById('nombre1').value;
    const nombre2 = document.getElementById('nombre2').value;
    const turno1 = document.getElementById('turno1').value;
    const turno2 = document.getElementById('turno2').value;
    const ficha1 = document.getElementById('ficha1').value;
    const ficha2 = document.getElementById('ficha2').value;

    if (!nombre1 || !nombre2) {
      alert('Por favor, ingrese los nombres de ambos jugadores.');
      return;
    }

    if (turno1 === turno2) {
      alert('Por favor, seleccione quién comienza primero.');
      return;
    }

    if (ficha1 === ficha2) {
      alert('Por favor, seleccione fichas diferentes para cada jugador.');
      return;
    }

    const players = {
      player1: {
        nombre: nombre1,
        ficha: ficha1,
        turno: turno1,
      },
      player2: {
        nombre: nombre2,
        ficha: ficha2,
        turno: turno2,
      },
    };

    localStorage.setItem('players', JSON.stringify(players));
    window.location.href = '/pages/tablero.html';
  });
});
