/* ===== main.js — rendering + effects (vanilla ES6) ===== */
(() => {
const D = window.TEAM, $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const ini = n => n.split(' ').map(w => w[0]).join('').slice(0, 2);
const av = (m, c = '') => `<div class="av ${c}"><span>${ini(m.name)}</span><img src="${m.photo}" alt="Portrait of ${m.name}" loading="lazy" onerror="this.remove()"></div>`;
const socials = m => [['github', 'fa-github'], ['linkedin', 'fa-linkedin'], ['facebook', 'fa-facebook']].filter(([k]) => m.contact[k])
  .map(([k, i]) => `<a href="${m.contact[k]}" target="_blank" rel="noopener" aria-label="${m.name} on ${k}"><i class="fa-brands ${i}"></i></a>`).join('');
const chips = t => t.split(/,\s*/).map(x => `<span class="chip">${x}</span>`).join('');

/* ---------- render from data ---------- */
$('#features').innerHTML = D.features.map((f, i) => `<div class="fcard reveal" style="--d:${i * .08}s"><i class="fa-solid ${f.i}"></i><h3>${f.t}</h3><p>${f.d}</p></div>`).join('');
$('#builtGrid').innerHTML = D.built.map((b, i) => `<article class="bcard reveal" style="--d:${i * .08}s"><span class="ic"><i class="fa-solid ${b[0]}"></i></span><h3>${b[1]}</h3><p>${b[2]}</p></article>`).join('');
$('#teamGrid').innerHTML = D.members.map((m, i) => `<article class="tilt reveal" style="--d:${i * .1}s" id="member-card-${m.id}"><div class="mcard">${av(m)}<h3>${m.name}</h3><div class="role">${m.role}</div><p>${m.tagline}</p><div class="icons">${socials(m)}</div><button class="btn gold sm" data-open="${m.id}">View Profile</button><div class="glare"></div></div></article>`).join('');
$('#gallery').innerHTML = D.gallery.map((g, i) => `<div class="gal reveal" style="--d:${i * .08}s"><span><i class="fa-regular fa-image"></i><br>${g}</span></div>`).join('');
$('#career').innerHTML = D.career.map((c, i) => `<article class="bcard reveal" style="--d:${i * .1}s"><span class="ic"><i class="fa-solid ${c[0]}"></i></span><h3>${c[1]}</h3><p>${c[2]}</p></article>`).join('');
$('#contactCards').innerHTML = D.members.map(m => `<div class="card cc reveal"><h3>${m.name}</h3><p><a href="mailto:${m.contact.email}">${m.contact.email}</a>${m.contact.phone ? '<br>' + m.contact.phone : ''}<br>${m.contact.loc}</p></div>`).join('');

/* projects with filter */
const projs = D.members.flatMap(m => m.projects.map(p => ({ t: p[0], d: p[1], tag: p[2], by: m.name })));
const seen = new Set(), uniq = projs.filter(p => !seen.has(p.t) && seen.add(p.t));
$('#projGrid').innerHTML = uniq.map(p => `<article class="pcard" data-tag="${p.tag}"><span class="tag">${p.tag}</span><h3>${p.t}</h3><p>${p.d}</p><small>By ${p.by}</small></article>`).join('');
$('#filters').innerHTML = ['All', 'Networking', 'Servers', 'Security', 'Web'].map((t, i) => `<button class="${i ? '' : 'on'}" data-f="${t}">${t}</button>`).join('');
$('#filters').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  $$('#filters button').forEach(x => x.classList.toggle('on', x === b));
  $$('.pcard').forEach(c => { const ok = b.dataset.f === 'All' || c.dataset.tag === b.dataset.f; c.classList.toggle('hide', !ok); if (ok) { c.classList.remove('pop'); void c.offsetWidth; c.classList.add('pop'); } });
});

/* skills tabs + bars */
$('#skillTabs').innerHTML = D.skillGroups.map((g, i) => `<button class="${i ? '' : 'on'}" data-g="${i}" role="tab">${g[0]}</button>`).join('');
const showBars = i => {
  $('#skillBars').innerHTML = D.skillGroups[i][1].map(s => `<div><div class="sk"><span>${s[0]}</span><span>${s[1]}%</span></div><div class="track"><i data-w="${s[1]}"></i></div></div>`).join('');
  requestAnimationFrame(() => setTimeout(() => $$('.track i').forEach(b => b.style.width = b.dataset.w + '%'), 50));
};
showBars(0);
$('#skillTabs').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; $$('#skillTabs button').forEach(x => x.classList.toggle('on', x === b)); showBars(b.dataset.g); });

/* ---------- loader, theme, nav ---------- */
addEventListener('load', () => setTimeout(() => $('#loader').classList.add('done'), RM ? 0 : 900));
const root = document.documentElement;
try { root.dataset.theme = localStorage.getItem('theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); } catch (e) { }
$('#theme').onclick = () => { root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark'; try { localStorage.setItem('theme', root.dataset.theme); } catch (e) { } };
const burger = $('#burger'), menu = $('#menu');
burger.onclick = () => { const o = menu.classList.toggle('open'); burger.classList.toggle('open', o); burger.setAttribute('aria-expanded', o); };
$$('#menu a').forEach(a => a.addEventListener('click', () => { menu.classList.remove('open'); burger.classList.remove('open'); burger.setAttribute('aria-expanded', false); }));

/* scroll: progress, shrink, back-to-top, scrollspy, parallax */
const links = $$('#menu a[href^="#"]:not(.btn)'), secs = links.map(a => $(a.getAttribute('href')));
addEventListener('scroll', () => {
  const y = scrollY, h = document.body.scrollHeight - innerHeight;
  $('#progress').style.width = (y / h * 100) + '%';
  $('#nav').classList.toggle('small', y > 60); $('#top').classList.toggle('show', y > 500);
  let cur = 0; secs.forEach((s, i) => { if (s && s.getBoundingClientRect().top < 140) cur = i; });
  links.forEach((a, i) => a.classList.toggle('act', i === cur && y > 200));
  if (!RM && y < innerHeight) $('.hero-bg').style.transform = `translateY(${y * .25}px)`;
}, { passive: true });
$('#top').onclick = () => scrollTo({ top: 0, behavior: RM ? 'auto' : 'smooth' });

/* reveal + counters */
const count = el => {
  const to = +el.dataset.count, suf = el.dataset.suf || '', t0 = performance.now();
  const step = t => { const p = Math.min((t - t0) / 1400, 1); el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + suf; if (p < 1) requestAnimationFrame(step); };
  RM ? el.textContent = to + suf : requestAnimationFrame(step);
};
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); $$('[data-count]', e.target).forEach(count); io.unobserve(e.target); } }), { threshold: .15 });
$$('.reveal').forEach(el => io.observe(el));

/* ---------- typing + terminal ---------- */
const type = (el, words, spd = 80) => {
  let w = 0, c = 0, del = false;
  (function tick() {
    const s = words[w]; c += del ? -1 : 1; el.textContent = s.slice(0, c);
    let t = del ? 40 : spd;
    if (!del && c === s.length) { del = true; t = 1400; } else if (del && c === 0) { del = false; w = (w + 1) % words.length; t = 400; }
    setTimeout(tick, t);
  })();
};
RM ? $('#typed').textContent = D.roles[0] : type($('#typed'), D.roles);
const lines = ['$ ssh team@pnc', 'Welcome to the SNAC private cloud', '$ whoami', 'snac-team (5 members)', '$ systemctl status apache2', '● apache2.service - active (running)'];
const term = $('#term');
if (RM) term.textContent = lines.join('\n'); else (function run(i = 0, c = 0) {
  if (i === 0 && c === 0) term.textContent = '';
  if (i >= lines.length) return setTimeout(() => run(0, 0), 3000);
  const L = lines[i], cmd = L.startsWith('$');
  if (c < L.length) { term.textContent += L[c]; return setTimeout(() => run(i, c + 1), cmd ? 60 : 12); }
  term.textContent += '\n'; setTimeout(() => run(i + 1, 0), 400);
})();

/* ---------- hero slider ---------- */
const slides = $$('.slide'), dots = $('#dots'); let si = 0, timer, hover = false, tx = 0;
slides.forEach((_, i) => { const b = document.createElement('button'); b.setAttribute('aria-label', 'Go to slide ' + (i + 1)); b.onclick = () => go(i); dots.append(b); });
const go = i => { si = (i + slides.length) % slides.length; slides.forEach((s, k) => s.classList.toggle('on', k === si)); $$('#dots button').forEach((b, k) => b.classList.toggle('on', k === si)); };
go(0);
const play = () => { clearInterval(timer); if (!RM) timer = setInterval(() => !hover && go(si + 1), 6000); };
play();
$('#prev').onclick = () => { go(si - 1); play(); }; $('#next').onclick = () => { go(si + 1); play(); };
const hero = $('.hero');
hero.addEventListener('mouseenter', () => hover = true); hero.addEventListener('mouseleave', () => hover = false);
hero.addEventListener('touchstart', e => tx = e.touches[0].clientX, { passive: true });
hero.addEventListener('touchend', e => { const d = e.changedTouches[0].clientX - tx; if (Math.abs(d) > 50) { go(si + (d < 0 ? 1 : -1)); play(); } });

/* ---------- particles ---------- */
const cv = $('#fx'), cx = cv.getContext('2d'); let pts = [];
const size = () => { cv.width = hero.offsetWidth; cv.height = hero.offsetHeight; pts = Array.from({ length: Math.min(50, cv.width / 24) }, () => ({ x: Math.random() * cv.width, y: Math.random() * cv.height, vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4 })); };
size(); addEventListener('resize', size);
if (!RM) (function draw() {
  cx.clearRect(0, 0, cv.width, cv.height);
  pts.forEach((p, i) => {
    p.x = (p.x + p.vx + cv.width) % cv.width; p.y = (p.y + p.vy + cv.height) % cv.height;
    cx.fillStyle = 'rgba(240,180,41,.7)'; cx.fillRect(p.x, p.y, 2.5, 2.5);
    for (let j = i + 1; j < pts.length; j++) { const q = pts[j], d = Math.hypot(p.x - q.x, p.y - q.y); if (d < 110) { cx.strokeStyle = `rgba(19,196,196,${.25 * (1 - d / 110)})`; cx.beginPath(); cx.moveTo(p.x, p.y); cx.lineTo(q.x, q.y); cx.stroke(); } }
  });
  requestAnimationFrame(draw);
})();

/* ---------- 3D tilt + ripple ---------- */
if (!RM) $$('.tilt').forEach(w => {
  const c = $('.mcard', w), g = $('.glare', w);
  w.addEventListener('mousemove', e => { const r = w.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    c.style.transform = `rotateY(${(x - .5) * 16}deg) rotateX(${(.5 - y) * 16}deg) translateZ(6px)`;
    g.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%,rgba(255,255,255,.28),transparent 55%)`; });
  w.addEventListener('mouseleave', () => { c.style.transform = ''; g.style.background = ''; });
});
document.addEventListener('click', e => {
  const b = e.target.closest('.btn'); if (!b || RM) return;
  const r = b.getBoundingClientRect(), s = document.createElement('span'), d = Math.max(r.width, r.height);
  s.className = 'rip'; s.style.cssText = `width:${d}px;height:${d}px;left:${e.clientX - r.left - d / 2}px;top:${e.clientY - r.top - d / 2}px`;
  b.append(s); setTimeout(() => s.remove(), 600);
});

/* ---------- member modal (tabs, ESC, outside click, #member-N) ---------- */
const modal = $('#modal'), mBody = $('#mBody'); let lastFocus;
const panes = m => {
  const c = m.contact, row = (i, v, h) => v ? `<p><i class="fa-solid ${i}"></i> ${h ? `<a href="${h}">${v}</a>` : v}</p>` : '';
  return {
    About: `<p>${m.about}</p><h4>Education</h4><p>${m.education}</p>${m.subjects ? `<h4>Main subjects</h4><p>${m.subjects}</p>` : ''}${m.extra ? `<h4>Student experience</h4><p>${m.extra}</p>` : ''}<h4>Career goal</h4><p>${m.goal}</p>`,
    Skills: m.skills.map(s => `<h4>${s[0]}</h4><div>${chips(s[1])}</div>`).join(''),
    Projects: m.projects.map(p => `<h4>${p[0]} <span class="tag">${p[2]}</span></h4><p>${p[1]}</p>`).join(''),
    Contact: `<p>${m.blurb}</p>${row('fa-envelope', c.email, 'mailto:' + c.email)}${row('fa-phone', c.phone)}${row('fa-location-dot', c.loc)}<div class="icons" style="justify-content:flex-start;margin-top:12px">${socials(m)}</div>`
  };
};
const open = (id, push = true) => {
  const m = D.members.find(x => x.id == id); if (!m) return;
  lastFocus = document.activeElement; const P = panes(m), keys = Object.keys(P);
  mBody.innerHTML = `<div class="mhead">${av(m, 'big')}<div><h2 id="mTitle">${m.name}</h2><div class="role">${m.role}</div><p style="color:var(--mut)">${m.intro}</p></div></div>
  <div class="tabs" role="tablist">${keys.map((k, i) => `<button class="${i ? '' : 'on'}" data-p="${k}" role="tab">${k}</button>`).join('')}</div>
  ${keys.map((k, i) => `<div class="pane ${i ? '' : 'on'}" data-p="${k}">${P[k]}</div>`).join('')}`;
  modal.hidden = false; requestAnimationFrame(() => modal.classList.add('show')); document.body.style.overflow = 'hidden';
  $('#mClose').focus(); if (push) history.replaceState(null, '', '#member-' + id);
};
const close = () => { modal.classList.remove('show'); setTimeout(() => modal.hidden = true, 300); document.body.style.overflow = ''; history.replaceState(null, '', location.pathname); lastFocus && lastFocus.focus(); };
mBody.addEventListener('click', e => { const b = e.target.closest('[data-p]'); if (b && b.tagName === 'BUTTON') $$('[data-p]', mBody).forEach(x => x.classList.toggle('on', x.dataset.p === b.dataset.p)); });
$('#teamGrid').addEventListener('click', e => { const b = e.target.closest('[data-open]'); if (b) open(b.dataset.open); });
$('#mClose').onclick = close; modal.addEventListener('click', e => { if (e.target === modal) close(); });
addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) close(); });
const hash = () => { const h = location.hash.match(/^#member-(\d+)$/); if (h) open(h[1], false); };
addEventListener('hashchange', hash); hash();

/* ---------- mailto forms ---------- */
$('#form').addEventListener('submit', e => { e.preventDefault(); const f = e.target;
  location.href = `mailto:${D.meta.email}?subject=${encodeURIComponent('Portfolio message from ' + f.n.value)}&body=${encodeURIComponent(f.m.value + '\n\nReply to: ' + f.e.value)}`; });
$('#fform').addEventListener('submit', e => { e.preventDefault(); location.href = `mailto:${D.meta.email}?subject=${encodeURIComponent('Hello from the portfolio')}&body=${encodeURIComponent('Reply to: ' + e.target.e.value)}`; });
})();
