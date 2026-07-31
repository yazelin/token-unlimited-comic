(async () => {
  const res = await fetch('./data.json');
  const book = await res.json();
  const stage = document.getElementById('stage');
  const toc = document.getElementById('toc');
  const KEY = 'comic-progress:' + book.title;

  book.chapters.forEach((ch, ci) => {
    const a = document.createElement('a');
    a.href = '#ch' + ci;
    a.textContent = ch.title;
    a.onclick = () => { toc.hidden = true; };
    toc.appendChild(a);

    const h = document.createElement('div');
    h.className = 'chapter-title';
    h.id = 'ch' + ci;
    h.textContent = ch.title;
    stage.appendChild(h);

    ch.panels.forEach((p, pi) => {
      const wrap = document.createElement('div');
      wrap.className = 'panel';
      wrap.dataset.pos = ci + ':' + pi;
      const img = document.createElement('img');
      img.src = './' + p.image;
      img.loading = 'lazy';
      img.alt = '';
      wrap.appendChild(img);
      for (const f of (p.effects || [])) {
        const fx = document.createElement('img');
        fx.className = 'fx';
        fx.src = './' + f.image;
        fx.loading = 'lazy';
        fx.alt = '';
        fx.style.left = f.x + '%';
        fx.style.top = f.y + '%';
        fx.style.width = (f.w || 60) + '%';
        fx.style.transform = 'translate(-50%,-50%) rotate(' + (f.rot || 0) + 'deg)';
        fx.style.opacity = String((f.op == null ? 100 : f.op) / 100);
        fx.style.mixBlendMode = f.blend === 'normal' ? 'normal' : (f.blend || 'multiply');
        wrap.appendChild(fx);
      }
      for (const b of p.bubbles) {
        const el = document.createElement('div');
        el.className = 'bubble ' + (b.type || 'speech');
        el.style.left = b.x + '%';
        el.style.top = b.y + '%';
        if (b.w) el.style.maxWidth = b.w + '%';
        if (b.fs) el.style.fontSize = b.fs + 'cqw';
        if (b.speaker && (b.type || 'speech') !== 'narration') {
          const s = document.createElement('span');
          s.className = 'spk';
          s.textContent = b.speaker;
          el.appendChild(s);
        }
        el.appendChild(document.createTextNode(b.text));
        wrap.appendChild(el);
      }
      stage.appendChild(wrap);
    });
  });

  const hint = document.createElement('div');
  hint.id = 'progress-hint';
  hint.textContent = '— 完 —';
  stage.appendChild(hint);

  document.getElementById('menu-btn').onclick = () => { toc.hidden = !toc.hidden; };

  // 進度記憶:回到上次看到的格
  const saved = localStorage.getItem(KEY);
  if (saved) {
    const el = document.querySelector('[data-pos="' + saved + '"]');
    if (el) requestAnimationFrame(() => el.scrollIntoView());
  }
  const io = new IntersectionObserver(entries => {
    for (const e of entries) if (e.isIntersecting) localStorage.setItem(KEY, e.target.dataset.pos);
  }, { threshold: 0.4 });
  document.querySelectorAll('.panel').forEach(el => io.observe(el));
})();
