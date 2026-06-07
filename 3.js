// ============================================
// ESTADO GLOBAL
// ============================================
let cartaAbierta = false;
let matrixInterval = null;
const MAX_GOTAS = 45; // máximo de elementos "Te amo" en pantalla a la vez

// ============================================
// ANIMACIÓN DE SHAKE (error de contraseña)
// ============================================
const styleTag = document.createElement("style");
styleTag.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%       { transform: translateX(-6px); }
    40%       { transform: translateX(6px); }
    60%       { transform: translateX(-4px); }
    80%       { transform: translateX(4px); }
  }
`;
document.head.appendChild(styleTag);

// ============================================
// ENTER PARA ABRIR
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("codigo").addEventListener("keydown", (e) => {
    if (e.key === "Enter") abrirCarta();
  });
});

// ============================================
// FUNCIÓN PRINCIPAL — ABRIR / OCULTAR CARTA
// ============================================
function abrirCarta() {
  const btn    = document.getElementById("btnPrincipal");
  const musica = document.getElementById("musica");
  const carta  = document.getElementById("carta");
  const envelope = document.getElementById("envelope");

  // ── CERRAR: si la carta ya está abierta ──
  if (cartaAbierta) {
    // Ocultar carta con fade
    carta.style.transition = "opacity 0.6s ease";
    carta.style.opacity = "0";
    setTimeout(() => {
      carta.style.display = "none";
      carta.style.opacity = "1";
      carta.style.transition = "";
    }, 600);

    // Cerrar sobre (quitar clase "open")
    envelope.classList.remove("open");

    // Pausar música
    musica.pause();

    // Detener lluvia de texto
    detenerMatrix();

    // Cambiar botón a estado "abrir"
    btn.innerHTML = '<span class="btn-icon">💖</span> Abrir carta <span class="btn-icon">💖</span>';
    btn.classList.remove("btn-cerrar");

    cartaAbierta = false;
    return;
  }

  // ── ABRIR: verificar código ──
  const codigoCorrecto = "07/01/2026"; //cambiar contraseña
  const codigo = document.getElementById("codigo").value;

  if (codigo !== codigoCorrecto) {
    const input = document.getElementById("codigo");
    input.style.borderColor = "#ff3366";
    input.style.animation = "shake 0.4s ease";
    setTimeout(() => {
      input.style.borderColor = "";
      input.style.animation = "";
    }, 600);
    alert("Ese no es el código amor 💔 (pista: 07/mm/aa)");
    return;
  }

  // Código correcto → abrir
  envelope.classList.add("open");

  setTimeout(() => {
    carta.style.display = "block";
    carta.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 1800);

  musica.play();
  musica.volume = 0.5;

  iniciarMatrixTeAmo();

  // Cambiar botón a estado "cerrar"
  btn.innerHTML = '<span class="btn-icon">🙈</span> Ocultar carta <span class="btn-icon">🙈</span>';
  btn.classList.add("btn-cerrar");

  cartaAbierta = true;
}

// ============================================
// EFECTO MATRIX — controlado, sin colapsar
// ============================================
function iniciarMatrixTeAmo() {
  if (matrixInterval) return; // evitar doble arranque

  const frases = [
    "Te adoro ❤️", "Te adoro 💕", "Te adoro 💗", "Te adoro 💖",
    "Te adoro 🌹", "Te adoro 💝", "Te adoro 💘", "Te adoro ❤️‍🔥"
  ];

  matrixInterval = setInterval(() => {
    // Límite: no crear más gotas si ya hay MAX_GOTAS en pantalla
    const actuales = document.querySelectorAll(".teAmoMatrix").length;
    if (actuales >= MAX_GOTAS) return;

    const gota = document.createElement("div");
    gota.className = "teAmoMatrix";
    gota.innerText = frases[Math.floor(Math.random() * frases.length)];
    gota.style.left = Math.random() * 100 + "vw";
    gota.style.top = "-40px";
    gota.style.fontSize = (Math.random() * 65 + 60 + 73) + "%";
    gota.style.opacity = (Math.random() * 0.35 + 0.4 + 0.7 + 0.8).toFixed(2);
    gota.style.animationDuration = (Math.random() * 5 + 5) + "s"; // más lento → menos elementos simultáneos

    document.body.appendChild(gota);
    gota.addEventListener("animationend", () => gota.remove());
  }, 800); // cada 800ms en vez de 300ms
}

function detenerMatrix() {
  if (matrixInterval) {
    clearInterval(matrixInterval);
    matrixInterval = null;
  }
  // Limpiar gotas que quedaron en pantalla
  document.querySelectorAll(".teAmoMatrix").forEach(el => el.remove());
}


// Ejemplo: cambiar clases según el tamaño de pantalla dinámicamente
window.addEventListener('resize', () => {
  const menu = document.querySelector('.menu');
  if (window.innerWidth <= 768) {
    menu.classList.add('menu-mobile');
  } else {
    menu.classList.remove('menu-mobile');
  }
});