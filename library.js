(() => {
  'use strict';
  const host = document.getElementById('songLibrary');
  if (!host) return;
  const songs = window.SONGS || [];
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  host.innerHTML = songs.map((song, index) => `<a class="library-card" href="study.html?song=${encodeURIComponent(song.id)}" aria-label="学习 ${esc(song.title)}，${esc(song.artist)}">
    <div class="library-card-media"><img src="${esc(song.poster)}" alt="${esc(song.artist)} 演奏视频画面" loading="${index ? 'lazy' : 'eager'}"><span class="library-card-play" aria-hidden="true">▶</span><span class="library-card-number">${String(index + 1).padStart(2, '0')}</span></div>
    <div class="library-card-body"><div class="library-card-level">${esc(song.level)}</div><h2>${esc(song.title)}</h2><p class="library-card-artist">${esc(song.artist)} <span>· ${esc(song.performanceLabel)}</span></p><p class="library-card-description">${esc(song.description)}</p><div class="library-tags">${song.tags.map(tag => `<span>${esc(tag)}</span>`).join('')}</div><div class="library-card-bottom"><span>完整视频 · 音乐分析 · 指板练习</span><strong>开始学习 <span aria-hidden="true">↗</span></strong></div></div>
  </a>`).join('');
  host.querySelectorAll('img').forEach(image => image.addEventListener('error', () => { image.hidden = true; image.parentElement.classList.add('poster-unavailable'); }));
})();
