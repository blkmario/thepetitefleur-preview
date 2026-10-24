const PHONE = '+13059045754';
const form = document.getElementById('builder');
const bubble = document.getElementById('bubble');
const send = document.getElementById('send');
const copy = document.getElementById('copy');

const PLAN_LABEL = { weekly: 'a weekly', biweekly: 'a biweekly', monthly: 'a monthly' };

// Dates can't be in the past.
const today = new Date();
today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
form.querySelectorAll('input[type="date"]').forEach((el) => { el.min = today.toISOString().slice(0, 10); });

function niceDate(value) {
  if (!value) return '';
  const [y, m, d] = value.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}

function compose() {
  const f = new FormData(form);
  const v = (k) => (f.get(k) || '').toString().trim();
  const lines = [];
  const name = v('name');
  lines.push(name ? `Hi! This is ${name}.` : 'Hi!');

  const palette = v('palette');
  const colors = palette === "florist's choice" ? "I'll leave the colors to you." : `I'd love ${palette} flowers.`;

  if (v('kind') === 'event') {
    let ask = "I'm planning an event and would love a quote";
    if (v('eventDate')) ask += ` for ${niceDate(v('eventDate'))}`;
    lines.push(ask + '.');
    if (v('guests')) lines.push(`Guests: ${v('guests').toLowerCase()}.`);
    if (v('venue')) lines.push(`Location: ${v('venue')}.`);
    lines.push(colors);
  } else {
    let ask = `I'd like to start ${PLAN_LABEL[v('plan')]} flower subscription`;
    if (v('start')) ask += ` beginning ${niceDate(v('start'))}`;
    lines.push(ask + '.');
    lines.push(colors);
    if (v('where') === 'ship') {
      lines.push(v('zip') ? `Please ship to ZIP ${v('zip')}.` : "I'd like it shipped outside Miami.");
    } else {
      lines.push('Delivery in Miami, please.');
    }
  }

  if (v('notes')) lines.push(v('notes').replace(/[.!?]*$/, '.'));
  return lines.join(' ');
}

function update() {
  const kind = form.elements.kind.value;
  form.dataset.kind = kind;
  form.querySelectorAll('[data-panel]').forEach((p) => { p.hidden = p.dataset.panel !== kind; });
  document.querySelector('[data-ship]').hidden = !(kind === 'subscription' && form.elements.where.value === 'ship');

  const message = compose();
  if (message !== bubble.textContent) {
    bubble.textContent = message;
    // Feedback that the message heard the change: a quick settle, not a show.
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && bubble.animate) {
      bubble.animate([{ transform: 'scale(0.97)', opacity: 0.6 }, { transform: 'none', opacity: 1 }],
        { duration: 180, easing: 'cubic-bezier(0.23, 1, 0.32, 1)' });
    }
  }
  send.href = `sms:${PHONE}?&body=${encodeURIComponent(message)}`;
  if (typeof syncDock === 'function') syncDock();
}

// On phones the preview sits below the form, so the dock carries the send action while the builder is on screen.
const dockPrimary = document.querySelector('.dock-primary');
const dockLabel = dockPrimary.querySelector('span');
let inBuilder = false;
function syncDock() {
  dockPrimary.href = inBuilder ? send.href : '#order';
  dockLabel.textContent = inBuilder ? 'Send this text' : 'Text to order';
}
new IntersectionObserver(([e]) => { inBuilder = e.isIntersecting; syncDock(); }, { rootMargin: '-30% 0px -30% 0px' })
  .observe(document.getElementById('order'));

form.addEventListener('input', update);
form.addEventListener('change', update);
form.addEventListener('submit', (e) => e.preventDefault());
form.elements.zip.addEventListener('input', (e) => { e.target.value = e.target.value.replace(/\D/g, ''); });
update();

let copyTimer;
copy.addEventListener('click', async () => {
  const label = copy.querySelector('span');
  try {
    await navigator.clipboard.writeText(bubble.textContent);
    copy.classList.add('is-done');
    label.textContent = 'Copied';
  } catch {
    label.textContent = 'Select the text above to copy';
  }
  clearTimeout(copyTimer);
  copyTimer = setTimeout(() => { copy.classList.remove('is-done'); label.textContent = 'Copy message'; }, 2000);
});

document.getElementById('year').textContent = new Date().getFullYear();

// Video: play only while on screen, never when the visitor asked for less motion.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const hero = document.querySelector('.hero-video');
hero.src = window.innerWidth >= 700 ? hero.dataset.srcLarge : hero.dataset.srcSmall;

const userPaused = new WeakSet();
document.querySelectorAll('.video-toggle').forEach((toggle) => {
  const video = toggle.parentElement.querySelector('video');
  if (reduceMotion.matches) userPaused.add(video);
  const sync = () => {
    toggle.classList.toggle('is-paused', video.paused);
    toggle.setAttribute('aria-label', video.paused ? 'Play video' : 'Pause video');
  };
  toggle.addEventListener('click', () => {
    if (video.paused) { userPaused.delete(video); video.play(); }
    else { userPaused.add(video); video.pause(); }
  });
  video.addEventListener('play', sync);
  video.addEventListener('pause', sync);
  sync();
});

const io = new IntersectionObserver((entries) => {
  entries.forEach(({ target, isIntersecting }) => {
    if (isIntersecting && !userPaused.has(target) && !reduceMotion.matches) target.play().catch(() => {});
    else target.pause();
  });
}, { threshold: 0.25 });
document.querySelectorAll('video').forEach((v) => io.observe(v));
