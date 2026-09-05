const email = 'samuelouvera@gmail.com';

/* ── Estrela atrás do nome: anima só na entrada, nunca de novo ── */
const nameStar = document.querySelector('.name-star.intro');
if (nameStar) {
  nameStar.addEventListener('animationend', (e) => {
    if (e.animationName === 'star-intro') nameStar.classList.remove('intro');
  });
}

/* ── Alternância de tema claro/escuro ── */
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  const root = document.documentElement;
  const syncLabel = () => {
    const isLight = root.getAttribute('data-theme') === 'light';
    themeToggle.setAttribute('aria-label', isLight ? 'Alternar para modo escuro' : 'Alternar para modo claro');
  };
  syncLabel();
  themeToggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    if (next === 'light') {
      root.setAttribute('data-theme', 'light');
    } else {
      root.removeAttribute('data-theme');
    }
    localStorage.setItem('theme', next);
    syncLabel();
  });
}

const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

function closeMenu() {
  navToggle.classList.remove('open');
  navLinks.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
}

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navItems.forEach((item) => item.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');

      const newHash = '#' + entry.target.id;
      if (window.location.hash !== newHash) {
        history.replaceState(null, '', newHash);
      }
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach((section) => navObserver.observe(section));

const animateObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      animateObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.animate').forEach((element) => {
  animateObserver.observe(element);
});

function setupEmailCopy(btnId, labelId, getDisplayText) {
  const btn = document.getElementById(btnId);
  const label = document.getElementById(labelId);
  if (!btn || !label) return;

  const isDynamic = typeof getDisplayText === 'function';
  const displayText = () => (isDynamic ? getDisplayText() : getDisplayText);
  label.textContent = displayText();

  if (isDynamic) {
    window.addEventListener('resize', () => { label.textContent = displayText(); });
  }

  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(email);
      label.textContent = 'Copiado!';
    } catch {
      label.textContent = displayText();
      window.location.href = `mailto:${email}`;
    }

    setTimeout(() => {
      label.textContent = displayText();
    }, 1500);
  });
}

const isMobileViewport = () => window.matchMedia('(max-width: 760px)').matches;

setupEmailCopy('email-btn', 'email-label', email);
setupEmailCopy('email-btn-2', 'email-label-2', () => (isMobileViewport() ? 'E-mail' : email));

/* ── Scroll progress bar ── */
const prog = document.getElementById('scroll-prog');
window.addEventListener('scroll', () => {
  if (!prog) return;
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  prog.style.width = pct + '%';
  prog.style.opacity = window.scrollY > 10 ? '1' : '0';
}, { passive: true });

/* ── Lightbox das capturas de tela ── */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.getElementById('lightbox-close');

function openLightbox(src, caption) {
  lightboxImg.src = src;
  lightboxImg.alt = caption;
  lightboxCaption.textContent = caption;
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  lightboxImg.src = '';
}

/* delegação: cobre tanto as .shot-box da página quanto as injetadas no modal de projetos */
document.addEventListener('click', (e) => {
  const box = e.target.closest('.shot-box');
  if (!box) return;
  const img = box.querySelector('img');
  openLightbox(img.src, img.alt);
});
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter' && e.key !== ' ') return;
  const box = e.target.closest('.shot-box');
  if (!box) return;
  e.preventDefault();
  const img = box.querySelector('img');
  openLightbox(img.src, img.alt);
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
});

/* ── Modal de estudo de caso dos projetos ── */
const projectModal = document.getElementById('project-modal');
const pmTitle = document.getElementById('pm-title');
const pmDesc = document.getElementById('pm-desc');
const pmDot = document.getElementById('pm-dot');
const pmMeta = document.getElementById('pm-meta');
const pmBody = document.getElementById('pm-body');
const projectModalClose = document.getElementById('project-modal-close');

function openProjectModal(card) {
  const tpl = document.getElementById(`tpl-${card.dataset.project}`);
  if (!tpl) return;

  const head = card.querySelector('.project-card-head');
  pmTitle.textContent = head.querySelector('h3').textContent;
  pmDesc.textContent = card.querySelector('.project-desc').textContent;
  pmDot.className = 'dot ' + (head.querySelector('.dot').classList.contains('live') ? 'live' : 'dev');
  pmMeta.innerHTML = card.querySelector('.project-card-meta').innerHTML;
  pmBody.innerHTML = '';
  pmBody.appendChild(tpl.content.cloneNode(true));

  projectModal.classList.add('open');
  projectModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  projectModal.classList.remove('open');
  projectModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.querySelectorAll('.project-card, .project-card-mini').forEach((card) => {
  card.addEventListener('click', () => openProjectModal(card));
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openProjectModal(card);
    }
  });
});

projectModalClose.addEventListener('click', closeProjectModal);
projectModal.addEventListener('click', (e) => {
  if (e.target === projectModal) closeProjectModal();
});
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && projectModal.classList.contains('open')) closeProjectModal();
});

/* ── Estrelas e tag reagem ao mouse (parallax) ── */
const heroVisual = document.querySelector('.hero-visual');
if (heroVisual && window.matchMedia('(hover: hover)').matches) {
  heroVisual.addEventListener('mousemove', (e) => {
    const rect = heroVisual.getBoundingClientRect();
    const mx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const my = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    heroVisual.style.setProperty('--mx', (mx * 12).toFixed(1));
    heroVisual.style.setProperty('--my', (my * 12).toFixed(1));
  });
  heroVisual.addEventListener('mouseleave', () => {
    heroVisual.style.setProperty('--mx', 0);
    heroVisual.style.setProperty('--my', 0);
  });
}

/* ── Nome do hero segue o mouse (cada letra por conta própria) ── */
const heroNameWrap = document.querySelector('.hero-name-wrap');
const heroTextArea = document.querySelector('.hero-text');
const heroLetters = document.querySelectorAll('.hero-name .letter');
if (heroNameWrap && heroTextArea && heroLetters.length && window.matchMedia('(hover: hover)').matches) {
  const clamp = (v) => Math.max(-1, Math.min(1, v));
  const REACH = 260; // px a partir do centro do nome (cobre SAMUEL + LOUVERA vazado embaixo)
  heroTextArea.addEventListener('mousemove', (e) => {
    const rect = heroNameWrap.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const falloff = Math.max(0, 1 - dist / REACH);
    const nx = clamp(dx / (rect.width / 2)) * falloff;
    const ny = clamp(dy / (rect.height / 2)) * falloff;
    heroLetters.forEach((letter) => {
      const i = parseFloat(letter.style.getPropertyValue('--i')) || 0;
      const factor = (i - 6) / 6;
      const lx = (nx * factor * 4).toFixed(1);
      const ly = (ny * factor * 4).toFixed(1);
      letter.style.transform = `translate(${lx}px, ${ly}px)`;
    });
  });
  heroTextArea.addEventListener('mouseleave', () => {
    heroLetters.forEach((letter) => { letter.style.transform = ''; });
  });
}

/* ── Flicker aleatório (letreiro com defeito) nas letras vazadas ── */
function randomizeFlicker(el, cls) {
  el.classList.add(cls || 'glitch-flicker');
  el.style.animationDuration = (4 + Math.random() * 6).toFixed(2) + 's';
  el.style.animationDelay = (-Math.random() * 10).toFixed(2) + 's';
}

document.querySelectorAll('.hero-name-line2 .letter').forEach(randomizeFlicker);

document.querySelectorAll('.section-watermark').forEach((word) => {
  const text = word.textContent;
  word.setAttribute('aria-label', text);
  word.innerHTML = '';
  [...text].forEach((ch) => {
    const span = document.createElement('span');
    span.textContent = ch;
    span.setAttribute('aria-hidden', 'true');
    span.style.display = 'inline-block';
    randomizeFlicker(span);
    word.appendChild(span);
  });
});

/* ── mesmo flicker nas estrelas vazias (contorno) ── */
document.querySelectorAll('.deco-star--outline:not(.star-sobre):not(.star-experiencia) use, .hero-blob .star-a, .contato-star path')
  .forEach((el) => randomizeFlicker(el, 'glitch-flicker-svg'));

/* estrelas que ficam acesas por padrão e piscam pra apagar (em vez de acender) */
document.querySelectorAll('.hero-blob .star-b, .star-sobre use, .star-experiencia use')
  .forEach((el) => randomizeFlicker(el, 'glitch-flicker-svg-invert'));

/* ── Cursor customizado: estrela vazia que cresce enquanto o mouse se move ── */
const cursorStar = document.getElementById('cursor-star');
if (cursorStar && window.matchMedia('(hover: hover)').matches) {
  document.documentElement.classList.add('custom-cursor-active');
  let moveStopTimer;

  document.addEventListener('mousemove', (e) => {
    cursorStar.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    cursorStar.classList.add('active', 'is-moving');
    clearTimeout(moveStopTimer);
    moveStopTimer = setTimeout(() => cursorStar.classList.remove('is-moving'), 150);
  });

  document.addEventListener('mouseleave', () => cursorStar.classList.remove('active'));
  document.addEventListener('mouseenter', () => cursorStar.classList.add('active'));
}
