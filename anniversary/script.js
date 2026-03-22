/* =========================================================
   ANNIVERSARY — OPTIMIZED SCRIPT (no lag)
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {

  /* ---- 1. Scroll reveal (lightweight IntersectionObserver) ---- */
  const fadeEls = document.querySelectorAll(
    '.section-header, .mosaic-item, .letter-photos, .letter-text, ' +
    '.tl-card, .reason-card, .promise-card, .cnt-card, .final-content'
  );
  fadeEls.forEach(el => el.classList.add('fade-in'));

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('vis');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  fadeEls.forEach(el => obs.observe(el));

  // Stagger siblings in grids
  const grids = ['.photo-mosaic', '.reasons-grid', '.promises-grid', '.counter-grid'];
  grids.forEach(sel => {
    const container = document.querySelector(sel);
    if (!container) return;
    const gridObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const kids = e.target.querySelectorAll('.fade-in');
          kids.forEach((k, i) => setTimeout(() => k.classList.add('vis'), i * 60));
          gridObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    gridObs.observe(container);
  });


  /* ---- 2. Lightbox ---- */
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbCaption = document.getElementById('lbCaption');
  const items = document.querySelectorAll('.mosaic-item');
  let curIdx = 0;

  const photoList = [];
  items.forEach((item, i) => {
    const img = item.querySelector('img');
    const cap = item.querySelector('.photo-hover span');
    photoList.push({ src: img.src, cap: cap ? cap.textContent : '' });
    item.addEventListener('click', () => openLB(i));
  });

  function openLB(i) {
    curIdx = i;
    lbImg.src = photoList[i].src;
    lbCaption.textContent = photoList[i].cap;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLB() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.getElementById('lbClose').addEventListener('click', closeLB);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLB(); });

  document.getElementById('lbPrev').addEventListener('click', e => {
    e.stopPropagation();
    curIdx = (curIdx - 1 + photoList.length) % photoList.length;
    lbImg.src = photoList[curIdx].src;
    lbCaption.textContent = photoList[curIdx].cap;
  });

  document.getElementById('lbNext').addEventListener('click', e => {
    e.stopPropagation();
    curIdx = (curIdx + 1) % photoList.length;
    lbImg.src = photoList[curIdx].src;
    lbCaption.textContent = photoList[curIdx].cap;
  });

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLB();
    if (e.key === 'ArrowLeft') document.getElementById('lbPrev').click();
    if (e.key === 'ArrowRight') document.getElementById('lbNext').click();
  });


  /* ---- 3. Live counter ---- */
  const start = new Date('2022-03-23T00:00:00');

  function tick() {
    const d = Date.now() - start.getTime();
    document.getElementById('cDays').textContent = Math.floor(d / 86400000).toLocaleString();
    document.getElementById('cHours').textContent = Math.floor((d / 3600000) % 24);
    document.getElementById('cMins').textContent = Math.floor((d / 60000) % 60);
    document.getElementById('cSecs').textContent = Math.floor((d / 1000) % 60);
  }
  tick();
  setInterval(tick, 1000);


  /* ---- 4. Music toggle ---- */
  const btn = document.getElementById('musicBtn');
  const audio = document.getElementById('bgMusic');
  let playing = false;
  audio.volume = 0.25;

  btn.addEventListener('click', () => {
    if (playing) {
      audio.pause();
      btn.classList.remove('on');
      btn.textContent = '🎵';
    } else {
      audio.play().catch(() => {});
      btn.classList.add('on');
      btn.textContent = '🎶';
    }
    playing = !playing;
  });

});
