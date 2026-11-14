(() => {
  'use strict';
  const version = '20261114-shapes';
  const songs = window.SONGS || [];
  const selectedId = new URLSearchParams(location.search).get('song') || 'currently';
  const song = songs.find(item => item.id === selectedId);
  const $ = selector => document.querySelector(selector);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const clock = seconds => `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
  const navigation = [...document.querySelectorAll('.topbar button')];
  navigation.forEach(button => { button.disabled = true; });
  $('#songSelect').innerHTML = (song ? '' : '<option value="" selected disabled>请选择一首歌</option>') + songs.map(item => `<option value="${esc(item.id)}" ${item.id === selectedId ? 'selected' : ''}>${esc(item.title)} · ${esc(item.artist)}</option>`).join('');
  $('#songSelect').addEventListener('change', event => {
    if (songs.some(item => item.id === event.target.value)) location.assign(`study.html?song=${encodeURIComponent(event.target.value)}`);
  });

  function fail(title, message) {
    document.body.dataset.studyState = 'error';
    $('#studyStatusTitle').textContent = title;
    $('#studyStatusMessage').textContent = message;
    $('#studyStatus').setAttribute('role', 'alert');
    return false;
  }
  function loadScript(path) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `${path}${path.includes('?') ? '&' : '?'}v=${version}`;
      script.async = false;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Could not load lesson asset: ${path}`));
      document.body.appendChild(script);
    });
  }
  function legacyCurrentlyUi() {
    return {
      introLabel: '入门3和弦',
      introStartTimes: [41.6, 43.1, 44.2],
      miniPractice: {
        title: '只移动一格，听见变化。',
        description: '先只弹二弦：6 品 F → 7 品 F♯ → 8 品 G。再放回三个和弦的教学配音里，听紧张怎样走向稳定。',
        notes: [
          {midi:65,string:2,fret:6,name:'F',role:'B♭7 的五音'},
          {midi:66,string:2,fret:7,name:'F♯',role:'B♭7♯5 的升五音'},
          {midi:67,string:2,fret:8,name:'G',role:'E♭ 的三音'}
        ]
      },
      practiceAudioTitle: '继续练：60 BPM 简化练习与创作变化',
      practiceAudioDescription: '下面是四小节教学改写的合成示范，不是原演奏。节拍采用 4/4、60 BPM。',
      practiceAudioProgression: 'Dm7♭5 · Cm7 ｜ B♭m7 · A7 · A♭9 ｜ A°7 · B♭7 ｜ E♭',
      practiceAudio: [
        {label:'基础练习',src:'assets/practice.wav'},
        {label:'创作变化：用 F♯ → G 收束',src:'assets/variation.wav'}
      ]
    };
  }
  function hydrateLesson() {
    const lesson = window.LESSON, analysis = window.FULL_ANALYSIS;
    if (!lesson?.source || !Array.isArray(analysis?.sections) || !analysis.sections.length || !Array.isArray(analysis.chords) || !analysis.chords.length) throw new Error('Incomplete lesson data');
    lesson.id = song.id;
    lesson.ui = {...(song.id === 'currently' ? legacyCurrentlyUi() : {}), ...(lesson.ui || {})};
    const ui = lesson.ui, evidence = lesson.evidence || {};
    const duration = Number(analysis.meta?.duration || lesson.source.duration) || 0;
    document.title = `弦上 · ${song.title} 全曲分析与吉他练习`;
    $('meta[name="description"]').content = `${song.title}：${song.description}`;
    $('.song-info h2').textContent = song.title;
    $('.song-info p').innerHTML = `${esc(song.artist)} <span>· ${esc(song.performanceLabel)}</span>`;
    const sourceLink = $('.source-link');
    sourceLink.href = lesson.source.url || analysis.meta?.sourceUrl || 'index.html';
    sourceLink.textContent = '查看这次演奏的原视频 ↗';
    $('#songVideo').poster = song.poster;
    $('#songVideo').setAttribute('aria-label', `${song.title} 完整演奏与指板跟随`);
    $('.cover-label').textContent = `完整原演奏 · ${clock(duration)}`;
    $('.page-heading .version').innerHTML = `<span class="green-dot"></span> ${esc(song.title)} · 全曲练习`;
    $('.board-toolbar>div>span').textContent = lesson.tuning?.name || '标准调弦 · 教学按法';
    $('#practiceMapDuration').textContent = clock(duration);
    if(analysis.meta.timeLabel) $('.time-row>span').textContent=analysis.meta.timeLabel;
    $('#practiceCoverage').textContent = `00:00–${clock(duration)} · 全曲分段练习`;
    $('#chordName').textContent = song.title;
    $('#tailScope').textContent = ui.introLabel || '入门和弦';
    $('.song-footnote p').textContent = evidence.teaching || '按法及指号以页面注明的依据为准；请结合当前演奏与对应谱面学习。';
    if(analysis.meta.performanceNote) {
      const note=document.createElement('p'); note.className='performance-window-note';
      note.textContent=analysis.meta.performanceNote;
      $('.study-selection').after(note);
    }
    $('#helpDialog .dialog-tip').textContent = '先选择一处和弦，点“逐弦听音”，再逐一看看指板上的音名、和弦音级与左手指号。';
    $('#evidenceDialog dl').innerHTML = [
      ['音轨与来源核实', 'verified'], ['谱面信息', 'score'], ['音乐分析与候选', 'analysis'], ['教学改写', 'teaching']
    ].map(([label, key]) => `<dt>${label}</dt><dd>${esc(evidence[key] || '这一层依据尚未补充；不作为已确认结论。')}</dd>`).join('');
    const mini = ui.miniPractice, miniHost = $('.mini-practice');
    miniHost.hidden = !mini?.notes?.length;
    if (mini?.notes?.length) {
      miniHost.innerHTML = `<div><div class="eyebrow">可选入门练习 · 听见音与和弦的关系</div><h3>${esc(mini.title || '先练一条小旋律。')}</h3><p>${esc(mini.description || '')}</p><button id="playMelody" class="text-button">♪ 听这组音</button></div><div class="melody-path">${mini.notes.map((note, index) => `${index ? '<b aria-hidden="true">→</b>' : ''}<button data-melody="${esc(note.midi)}"><small>${esc(note.string)} 弦 · ${esc(note.fret)} 品</small><strong>${esc(note.name)}</strong><span>${esc(note.role || '教学练习音')}</span></button>`).join('')}</div>`;
    }
    const audioHost = $('.practice-audio'), audio = Array.isArray(ui.practiceAudio) ? ui.practiceAudio : [];
    audioHost.hidden = !audio.length;
    if (audio.length) audioHost.innerHTML = `<summary>${esc(ui.practiceAudioTitle || '继续练：简化练习与创作变化')}</summary><div><p>${esc(ui.practiceAudioDescription || '以下为独立的教学示范。')}</p>${ui.practiceAudioProgression ? `<p class="practice-chords">${esc(ui.practiceAudioProgression)}</p>` : ''}${audio.map(item => `<label>${esc(item.label)}<audio controls preload="none" src="${esc(item.src)}"></audio></label>`).join('')}</div>`;
  }
  async function boot() {
    if (!song) return fail('没有找到这首歌。', '这条学习链接没有对应的曲目。请选择上方的歌曲，或返回曲库重新开始。');
    window.SONG = song;
    $('#studyStatusMessage').textContent = `正在准备 ${song.title} 的视频、音乐分析与指板练习。`;
    try {
      for (const path of [song.lessonSrc, 'music-core.js', 'chord-shapes.js', song.analysisSrc]) await loadScript(path);
      hydrateLesson();
      for (const path of ['media-player.js', 'practice-data.js', 'app.js', 'full-analysis.js', 'integration.js']) await loadScript(path);
      if (!window.StringNotes || !window.FullSongAnalysis) throw new Error('Lesson interface did not initialize');
      document.body.dataset.studyState = 'ready';
      navigation.forEach(button => { button.disabled = false; });
      window.dispatchEvent(new CustomEvent('study-ready', {detail:{songId:song.id}}));
      return true;
    } catch (error) {
      console.error(error);
      return fail('这首歌暂时没有加载完整。', '可以刷新此页重试，或返回曲库选择另一首。已保存的练习进度不会因此丢失。');
    }
  }
  window.studyReady = boot();
})();
