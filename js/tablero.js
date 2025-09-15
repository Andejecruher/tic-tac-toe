// js/players.js
/**
 * Combinaciones ganadoras posibles en el tablero 3x3
 */
const WINNING_COMBINATIONS = [
  [0, 1, 2], // Fila superior
  [3, 4, 5], // Fila media
  [6, 7, 8], // Fila inferior
  [0, 3, 6], // Columna izquierda
  [1, 4, 7], // Columna media
  [2, 5, 8], // Columna derecha
  [0, 4, 8], // Diagonal principal
  [2, 4, 6], // Diagonal secundaria
];

document.addEventListener('DOMContentLoaded', () => {
  const playersData = JSON.parse(localStorage.getItem('players'));
  if (!playersData) {
    window.location.href = '/index.html';
    return;
  }

  console.log('Players data found:', playersData);
  const player1Button = document.getElementById('player1');
  const player2Button = document.getElementById('player2');
  const fichaPlayer1 = document.getElementById('ficha-player1');
  const fichaPlayer2 = document.getElementById('ficha-player2');

  fichaPlayer1.textContent = playersData.player1.ficha;
  fichaPlayer2.textContent = playersData.player2.ficha;

  player1Button.textContent = playersData.player1.nombre;
  player2Button.textContent = playersData.player2.nombre;

  // Construir tablero de jugadores
  const tablero = document.getElementById('tablero');
  const name_player = document.getElementById('name_player');

  let turno;
  let jugador;
  let tableroEstado = Array(9).fill(null);

  Object.keys(playersData).forEach((p) => {
    if (playersData[p].turno === 'primero') {
      turno = playersData[p].nombre;
      jugador = playersData[p].ficha;

      name_player.textContent = turno;
    }
  });

  function crearTablero() {
    for (let i = 0; i < 9; i++) {
      const celda = document.createElement('div');
      celda.classList.add('celda');
      // agregar un data-index a cada celda
      celda.setAttribute('data-index', i);
      celda.addEventListener('click', () => marcarCelda(celda));
      tablero.appendChild(celda);
    }
  }

  function cambiarTurno() {
    if (turno === playersData.player1.nombre) {
      turno = playersData.player2.nombre;
      jugador = playersData.player2.ficha;
    } else {
      turno = playersData.player1.nombre;
      jugador = playersData.player1.ficha;
    }
    name_player.textContent = turno;
  }

  function winner() {
    for (const combination of WINNING_COMBINATIONS) {
      const [a, b, c] = combination;
      if (
        tableroEstado[a] &&
        tableroEstado[a] === tableroEstado[b] &&
        tableroEstado[a] === tableroEstado[c]
      ) {
        return true;
      }
    }
  }

  function marcarCelda(celda) {
    if (celda.textContent !== '') return;
    const index = parseInt(celda.getAttribute('data-index'));
    tableroEstado[index] = jugador;
    // Actualizar el array en el HTML
    document.getElementById('tablero-estado').textContent = JSON.stringify(tableroEstado);
    celda.textContent = jugador;
    cambiarTurno();
    if (winner()) {
      setTimeout(() => {
        alert(`¡Felicidades ${turno}, has ganado!`);
        window.location.reload();
      }, 100);
    } else if (!tableroEstado.includes(null)) {
      setTimeout(() => {
        alert(`¡Es un empate!`);
        window.location.reload();
      }, 100);
    }
  }
  crearTablero();
});
