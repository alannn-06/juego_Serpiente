const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");
const TAMANIO_CELDA = 25; 

let serpiente = [
  { x: 10, y: 11 }, 
  { x: 10, y: 10 }, 
  { x: 9, y: 10 }, 
  { x: 8, y: 10 }   
];

let direccionActual = "derecha"; 
let bucleJuego = null;

let comida = { x: 0, y: 0 }; 
let puntaje = 0;             
let velocidad = 200; 
let juegoTerminado = false; 

generarNuevaComida();
dibujarTodo();

function limpiarCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarTodo() {
  limpiarCanvas();
  dibujarTablero();   
  pintarSerpiente(); 
  pintarComida(); 
}

function dibujarTablero() {
  ctx.strokeStyle = "rgba(34, 197, 94, 0.15)"; 
  ctx.lineWidth = 1;

  for (let x = 0; x <= canvas.width; x += TAMANIO_CELDA) {
    ctx.beginPath();
    ctx.moveTo(x, 0);                 
    ctx.lineTo(x, canvas.height);     
    ctx.stroke();
  }

  for (let y = 0; y <= canvas.height; y += TAMANIO_CELDA) {
    ctx.beginPath();
    ctx.moveTo(0, y);                 
    ctx.lineTo(canvas.width, y);      
    ctx.stroke();
  }
}

function pintarParte(lineaX, lineaY, color) {
  const x = lineaX * TAMANIO_CELDA;
  const y = lineaY * TAMANIO_CELDA;

  ctx.fillStyle = color; 
  ctx.fillRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);

  ctx.strokeStyle = "#000000";
  ctx.strokeRect(x, y, TAMANIO_CELDA, TAMANIO_CELDA);
}

function pintarSerpiente() {
  for (let i = 0; i < serpiente.length; i++) {
    const parte = serpiente[i];
    if (i === 0) {
      pintarParte(parte.x, parte.y, "#fde047"); 
    } else {
      pintarParte(parte.x, parte.y, "#15803d"); 
    }
  }
}

function generarNuevaComida() {
  const lineasHorizontales = canvas.width / TAMANIO_CELDA;  
  const lineasVerticales = canvas.height / TAMANIO_CELDA;  
  comida.x = Math.floor(Math.random() * lineasHorizontales);
  comida.y = Math.floor(Math.random() * lineasVerticales);
}

function pintarComida() {
  ctx.fillStyle = "#ef4444";
  ctx.fillRect(comida.x * TAMANIO_CELDA, comida.y * TAMANIO_CELDA, TAMANIO_CELDA, TAMANIO_CELDA);
}

function atrapaComida() {
  const cabeza = serpiente[0];
  if (cabeza.x === comida.x && cabeza.y === comida.y) {
    return true;
  }
  return false;
}

// Actividad 1: Función para validar si la cabeza sale del tablero
function verificarColisionBordes(cabeza) {
  const lineasHorizontales = canvas.width / TAMANIO_CELDA;
  const lineasVerticales = canvas.height / TAMANIO_CELDA;

  if (
    cabeza.x < 0 || cabeza.x >= lineasHorizontales || cabeza.y < 0 || cabeza.y >= lineasVerticales
  ) {
    return true;
  }
  return false;
}
function cambiarDireccion(nuevaDireccion) {
  if (juegoTerminado) return;

  if (nuevaDireccion === "arriba" && direccionActual !== "abajo") {
    direccionActual = "arriba";
  }else if (nuevaDireccion === "abajo" && direccionActual !== "arriba") {
    direccionActual = "abajo";
  }
  else if (nuevaDireccion === "izquierda" && direccionActual !== "derecha") {
    direccionActual = "izquierda";
  }
  else if (nuevaDireccion === "derecha" && direccionActual !== "izquierda") {
    direccionActual = "derecha";
  }
}

function moverSerpiente() {
  if (juegoTerminado) return;

  console.log("moviendo");
  
  const cabezaActual = serpiente[0];
  let nuevaCabeza = { x: cabezaActual.x, y: cabezaActual.y };

  if (direccionActual === "derecha") {
    nuevaCabeza.x += 1;
  }else if (direccionActual === "izquierda") {
    nuevaCabeza.x -= 1;
  }else if (direccionActual === "arriba") {
    nuevaCabeza.y -= 1;
  }else if (direccionActual === "abajo") {
    nuevaCabeza.y += 1;
  }

  if (verificarColisionBordes(nuevaCabeza)) {
    juegoTerminado = true;
    clearInterval(bucleJuego);
    bucleJuego = null;
    document.getElementById("estado").innerText = "PERDISTE";
    document.getElementById("mensaje").innerText = "GAME OVER";
    return;
  }
  serpiente.unshift(nuevaCabeza);

  const incremento = atrapaComida();
  
  if (incremento) {
    puntaje++;
    document.getElementById("puntaje").innerText = puntaje;
    generarNuevaComida();

    if (velocidad > 70) { 
      velocidad -= 10; 
      clearInterval(bucleJuego);
      bucleJuego = setInterval(moverSerpiente, velocidad);
    }
  } else {
    serpiente.pop();
  }

  dibujarTodo();
}

function iniciarJuego() {
  if (bucleJuego !== null || juegoTerminado) return; 
  document.getElementById("estado").innerText = "Jugando";
  document.getElementById("mensaje").innerText = "Juego en curso";
  bucleJuego = setInterval(moverSerpiente, velocidad); 
}

function pausarJuego() {
  if (bucleJuego !== null) {
    clearInterval(bucleJuego); 
    bucleJuego = null; 
    document.getElementById("estado").innerText = "Pausado";
    document.getElementById("mensaje").innerText = "Juego pausado, presiona iniciar para continuar";
  }
}

function reiniciarJuego() {
  pausarJuego();
  
  juegoTerminado = false;
  serpiente.length = 0;
  serpiente.push(
    { x: 10, y: 11 },
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 }
  );
  
  direccionActual = "derecha";
  velocidad = 200;
  
  puntaje = 0;
  document.getElementById("puntaje").innerText = puntaje;
  
  generarNuevaComida();
  dibujarTodo();
  
  document.getElementById("estado").innerText = "Listo";
  document.getElementById("mensaje").innerText = "Presiona iniciar para comenzar.";
}