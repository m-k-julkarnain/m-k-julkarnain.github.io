(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  // year
  $('#year').textContent = new Date().getFullYear();

  // theme
  const root = document.documentElement;
  try { const t = localStorage.getItem('theme'); if (t) root.dataset.theme = t; } catch (e) {}
  $('#theme').addEventListener('click', () => {
    const next = root.dataset.theme === 'light' ? 'dark' : 'light';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  // typing effect
  const roles = ['Java Developer', 'Spring Boot Engineer', 'CSE Undergraduate', 'Aspiring Researcher'];
  const el = $('#typed');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) { el.textContent = roles[0]; }
  else {
    let r = 0, i = 0, del = false;
    const tick = () => {
      const word = roles[r];
      el.textContent = word.slice(0, i);
      if (!del && i === word.length) { del = true; return setTimeout(tick, 1600); }
      if (del && i === 0) { del = false; r = (r + 1) % roles.length; }
      i += del ? -1 : 1;
      setTimeout(tick, del ? 35 : 75);
    };
    tick();
  }

  // reveal on scroll (staggered)
  $$('.reveal-group').forEach(g => $$('.reveal', g).forEach((n, i) => n.style.setProperty('--d', `${Math.min(i, 5) * 0.08}s`)));
  $$('.hero .reveal').forEach((n, i) => n.style.setProperty('--d', `${i * 0.12}s`));
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: 0.12 });
  $$('.reveal').forEach(n => io.observe(n));

  // active nav section
  const links = $$('#nav a');
  const secs = links.map(a => $(a.getAttribute('href')));
  const so = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
      const act = $('#nav a.active'); if (act) act.scrollIntoView({ block: 'nearest', inline: 'center' });
    }
  }), { rootMargin: '-45% 0px -50% 0px' });
  secs.forEach(s => s && so.observe(s));

  // scroll progress
  const bar = $('#progress');
  addEventListener('scroll', () => {
    const h = document.documentElement;
    bar.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 + '%';
  }, { passive: true });
})();
