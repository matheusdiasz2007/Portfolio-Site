/* ============================================
   CURSOR CUSTOMIZADO
   ============================================ */
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursor-ring');

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

// Atualiza posição do cursor principal imediatamente
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

// Anel segue com delay suave (lerp)
(function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  ring.style.left = ringX + 'px';
  ring.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
})();


/* ============================================
   EFEITO TYPEWRITER
   ============================================ */
const phrases = [
  'Desenvolvedor Full Stack',
  'Python Developer',
  'React Developer',
  'Criador de Soluções'
];

let phraseIndex  = 0;
let charIndex    = 0;
let isDeleting   = false;

const typewriterEl = document.getElementById('typewriter');

function type() {
  const currentPhrase = phrases[phraseIndex];

  if (!isDeleting) {
    // Digitando
    typewriterEl.textContent = currentPhrase.slice(0, ++charIndex);

    if (charIndex === currentPhrase.length) {
      // Chegou ao fim — pausa antes de apagar
      isDeleting = true;
      setTimeout(type, 1800);
      return;
    }
    setTimeout(type, 80);

  } else {
    // Apagando
    typewriterEl.textContent = currentPhrase.slice(0, --charIndex);

    if (charIndex === 0) {
      // Terminou de apagar — vai para próxima frase
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(type, 400);
      return;
    }
    setTimeout(type, 45);
  }
}

// Aguarda animação do hero antes de iniciar
setTimeout(type, 1400);


/* ============================================
   SCROLL REVEAL
   ============================================ */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

revealElements.forEach((el) => revealObserver.observe(el));


/* ============================================
   TOGGLE DE PROJETOS (EXPANDIR / RECOLHER)
   ============================================ */
function toggleProject(card) {
  const wasOpen = card.classList.contains('open');

  // Fecha todos os cards abertos
  document.querySelectorAll('.project-card.open').forEach((c) => {
    c.classList.remove('open');
  });

  // Se estava fechado, abre
  if (!wasOpen) {
    card.classList.add('open');
  }
}