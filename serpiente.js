const canvas = document.getElementById("canvasJuego");
const ctx = canvas.getContext("2d");
const TAMANIO_CELDA = 25; 
const serpiente = [
  { x: 10, y: 11 }, 
  { x: 10, y: 10 }, 
  { x: 9, y: 10 }, 
  { x: 8, y: 10 }   
];

dibujarTodo();

function limpiarCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarTodo() {
  limpiarCanvas();
  dibujarTablero();   
  pintarSerpiente(); 
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
      pintarParte(parte.x, parte.y, "#ff0000"); 
    }
  }
}