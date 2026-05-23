const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");
const TAMANIO_CELDA = 25; 

const serpiente = [
  { x: 10, y: 11 }, 
  { x: 10, y: 10 }, 
  { x: 9, y: 10 }, 
  { x: 8, y: 10 }   
];

let direccionActual = "derecha"; 
let bucleJuego = null;

let comida = { x: 0, y: 0 }; 
let puntaje = 0;             
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
  pintarParte(comida.x, comida.y, "#ef4444"); 
}

function atrapaComida() {
  const cabeza = serpiente[0];
  if (cabeza.x === comida.x && cabeza.y === comida.y) {
    return true;
  }
  return false;
}

function moverDerecha(crecer) {
  const cabezaActual = serpiente[0];
  const nuevaCabeza = { x: cabezaActual.x + 1, y: cabezaActual.y };
  serpiente.unshift(nuevaCabeza);
  if (!crecer) serpiente.pop();
  dibujarTodo();
}

function moverIzquierda(crecer) {
  const cabezaActual = serpiente[0];
  const nuevaCabeza = { x: cabezaActual.x - 1, y: cabezaActual.y };
  serpiente.unshift(nuevaCabeza);
  if (!crecer) serpiente.pop();
  dibujarTodo();
}

function moverArriba(crecer) {
  const cabezaActual = serpiente[0];
  const nuevaCabeza = { x: cabezaActual.x, y: cabezaActual.y - 1 };
  serpiente.unshift(nuevaCabeza);
  if (!crecer) serpiente.pop();
  dibujarTodo();
}

function moverAbajo(crecer) {
  const cabezaActual = serpiente[0];
  const nuevaCabeza = { x: cabezaActual.x, y: cabezaActual.y + 1 };
  serpiente.unshift(nuevaCabeza);
  if (!crecer) serpiente.pop();
  dibujarTodo();
}

function cambiarDireccion(nuevaDireccion) {
  direccionActual = nuevaDireccion;
}

function moverSerpiente() {
  console.log("moviendo");
  
  const incremento = atrapaComida();
  
  if (incremento) {
    puntaje++;
    document.getElementById("puntaje").innerText = puntaje;

    generarNuevaComida();
  }

  if (direccionActual === "derecha") {
    moverDerecha(incremento);
  } else if (direccionActual === "izquierda") {
    moverIzquierda(incremento);
  } else if (direccionActual === "arriba") {
    moverArriba(incremento);
  } else if (direccionActual === "abajo") {
    moverAbajo(incremento);
  }
}

function iniciarJuego() {
  if (bucleJuego !== null) return; 
  document.getElementById("estado").innerText = "Jugando";
  document.getElementById("mensaje").innerText = "Juego en curso";
  bucleJuego = setInterval(moverSerpiente, 200); 
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
  
  serpiente.length = 0;
  serpiente.push(
    { x: 10, y: 11 },
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 }
  );
  
  direccionActual = "derecha";
  puntaje = 0;
  document.getElementById("puntaje").innerText = puntaje;
  
  generarNuevaComida();
  dibujarTodo();
  
  document.getElementById("estado").innerText = "Listo";
  document.getElementById("mensaje").innerText = "Presiona iniciar para comenzar.";
}