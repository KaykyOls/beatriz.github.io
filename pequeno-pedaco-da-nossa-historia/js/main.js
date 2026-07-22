/* =========================================================
   CONFIGURAÇÃO
   Altere a data abaixo para o dia que fizer sentido para você
   (ex.: o dia em que se conheceram). Formato: 'AAAA-MM-DD'.
========================================================= */
const START_DATE = '2025-10-25';

/* =========================================================
   INICIALIZAÇÃO
========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  initTilts();
  initScrollReveal();
  initLetter();
  initScrollCue();
  initLightbox();
  initMusicPlayer();
  initFinalSequence();
  initCounter();
  initPetals();
  initParallax();
});

/* =========================================================
   TILTS ALEATÓRIOS (polaroids / scrapbook)
========================================================= */
function initTilts() {
  document.querySelectorAll('[data-tilt]').forEach(el => {
    const deg = el.getAttribute('data-tilt');
    el.style.setProperty('--r', deg + 'deg');
  });
  document.querySelectorAll('[data-rotate]').forEach(el => {
    const deg = el.getAttribute('data-rotate');
    el.style.setProperty('--r', deg + 'deg');
  });
}

/* =========================================================
   SCROLL REVEAL — Intersection Observer
========================================================= */
function initScrollReveal() {
  const items = document.querySelectorAll('.reveal-up');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.dataset.delayIndex ? Number(el.dataset.delayIndex) * 90 : 0;
        setTimeout(() => el.classList.add('is-visible'), delay);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });

  // Stagger elements that share a parent container (e.g. polaroid grid)
  const groups = {};
  items.forEach(el => {
    const parent = el.closest('.polaroid-grid, .scrapbook') || el.parentElement;
    if (!groups[parent]) groups[parent] = [];
    const list = groups[parent] || (groups[parent] = []);
  });

  const seen = new Map();
  items.forEach(el => {
    const parent = el.closest('.polaroid-grid, .scrapbook');
    if (parent) {
      const count = seen.get(parent) || 0;
      el.dataset.delayIndex = count;
      seen.set(parent, count + 1);
    }
    observer.observe(el);
  });
}

/* =========================================================
   CARTA — abre suavemente ao entrar na tela
========================================================= */
function initLetter() {
  const letter = document.getElementById('letter');
  if (!letter) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => letter.classList.add('is-open'), 300);
        observer.unobserve(letter);
      }
    });
  }, { threshold: 0.4 });

  observer.observe(letter);
}

/* =========================================================
   INDICADOR DE SCROLL — clique leva à próxima seção
========================================================= */
function initScrollCue() {
  const cue = document.getElementById('scrollCue');
  if (!cue) return;
  cue.addEventListener('click', () => {
    document.getElementById('carta')?.scrollIntoView({ behavior: 'smooth' });
  });
}

/* =========================================================
   LIGHTBOX
========================================================= */
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const closeBtn = document.getElementById('lightboxClose');
  if (!lightbox) return;

  document.querySelectorAll('[data-lightbox]').forEach(fig => {
    fig.addEventListener('click', () => {
      const img = fig.querySelector('img');
      if (!img) return;
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || '';
      lightbox.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    });
  });

  const close = () => {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  closeBtn.addEventListener('click', close);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}

/* =========================================================
   MÚSICA — não toca automaticamente
========================================================= */
function initMusicPlayer() {
  const player = document.getElementById('musicPlayer');
  const toggle = document.getElementById('musicToggle');
  const audio = document.getElementById('audio');
  if (!toggle || !audio) return;

  let playing = false;

  toggle.addEventListener('click', () => {
    if (!playing) {
      audio.play().catch(() => {
        toggle.querySelector('.music-label').textContent = 'Adicione o arquivo de música';
      });
      playing = true;
      player.classList.add('playing');
      toggle.querySelector('.music-label').textContent = 'Tocando agora';
      toggle.setAttribute('aria-label', 'Pausar música');
    } else {
      audio.pause();
      playing = false;
      player.classList.remove('playing');
      toggle.querySelector('.music-label').textContent = 'Se desejar, aperte play';
      toggle.setAttribute('aria-label', 'Tocar música');
    }
  });
}

/* =========================================================
   SEÇÃO FINAL — sequência suave de textos
========================================================= */
function initFinalSequence() {
  const finalSection = document.getElementById('final');
  const textTwo = document.getElementById('finalTextTwo');
  const signature = document.getElementById('finalSignature');
  if (!finalSection) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => textTwo?.classList.add('is-visible'), 1800);
        setTimeout(() => signature?.classList.add('is-visible'), 3000);
        observer.unobserve(finalSection);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(finalSection);
}

/* =========================================================
   CONTADOR DE TEMPO
========================================================= */
function initCounter() {
  const el = document.getElementById('finalCounter');
  if (!el) return;

  const start = new Date(START_DATE);
  if (isNaN(start.getTime())) return;

  function update() {
    const now = new Date();
    let diff = Math.floor((now - start) / 1000);
    if (diff < 0) { el.textContent = ''; return; }

    const days = Math.floor(diff / 86400);
    const years = Math.floor(days / 365);
    const remDays = days % 365;

    let text = '';
    if (years > 0) text += `${years} ano${years > 1 ? 's' : ''} `;
    text += `${remDays} dia${remDays !== 1 ? 's' : ''}`;

    el.textContent = `${text} desde aquele dia`;
  }

  update();
  setInterval(update, 60000);
}

/* =========================================================
   PÉTALAS — canvas discreto
========================================================= */
function initPetals() {
  const canvas = document.getElementById('petals');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let petals = [];
  let width, height;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const count = prefersReduced ? 0 : (window.innerWidth < 640 ? 9 : 16);

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function makePetal() {
    return {
      x: Math.random() * width,
      y: Math.random() * -height,
      size: 5 + Math.random() * 6,
      speedY: 0.25 + Math.random() * 0.4,
      speedX: (Math.random() - 0.5) * 0.4,
      sway: Math.random() * Math.PI * 2,
      swaySpeed: 0.005 + Math.random() * 0.01,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 0.4,
      opacity: 0.2 + Math.random() * 0.25
    };
  }

  for (let i = 0; i < count; i++) petals.push(makePetal());

  function drawPetal(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.globalAlpha = p.opacity;
    ctx.fillStyle = '#D9AFAD';
    ctx.beginPath();
    ctx.ellipse(0, 0, p.size, p.size * 0.62, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    petals.forEach(p => {
      p.sway += p.swaySpeed;
      p.y += p.speedY;
      p.x += p.speedX + Math.sin(p.sway) * 0.3;
      p.rotation += p.rotSpeed;

      if (p.y > height + 20) {
        Object.assign(p, makePetal(), { y: -20 });
      }
      drawPetal(p);
    });
    requestAnimationFrame(animate);
  }

  if (count > 0) animate();
}

/* =========================================================
   PARALLAX SUAVE — hero e frase em tela cheia
========================================================= */
function initParallax() {
  const heroImg = document.querySelector('.hero__image');
  const quoteBg = document.querySelector('.quote-section__bg');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  let ticking = false;

  function update() {
    const scrollY = window.scrollY;

    if (heroImg) {
      const offset = Math.min(scrollY * 0.15, 80);
      heroImg.style.transform = `scale(1.08) translateY(${offset}px)`;
    }

    if (quoteBg) {
      const rect = quoteBg.parentElement.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        const offset = (progress - 0.5) * 60;
        quoteBg.style.transform = `scale(1.1) translateY(${offset}px)`;
      }
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  });
  update();
}
