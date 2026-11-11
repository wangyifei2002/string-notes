(() => {
  'use strict';
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const asArray = value => value == null ? [] : Array.isArray(value) ? value : [value];
  const plain = value => typeof value === 'string' || typeof value === 'number' ? String(value) : Array.isArray(value) ? value.map(plain).filter(Boolean).join('；') : value && typeof value === 'object' ? plain(value.text ?? value.summary ?? value.description ?? value.value ?? value.chord ?? value.label ?? value.name ?? '') : '';
  const clock = (seconds, precise = false) => { const n = Math.max(0, Number(seconds) || 0); return `${String(Math.floor(n / 60)).padStart(2,'0')}:${precise ? (n % 60).toFixed(2).padStart(5,'0') : String(Math.floor(n % 60)).padStart(2,'0')}`; };
  const pcNames = ['C','D♭','D','E♭','E','F','G♭','G','A♭','A','B♭','B'];
  const typeInfo = type => ({voice:['伴唱','voice'],vocal:['伴唱','voice'],verse:['伴唱','voice'],chorus:['伴唱','voice'],solo:['Solo','solo'],instrumental:['器乐','solo'],talk:['谈话＋吉他','talk'],intro:['前奏','talk'],outro:['收束','outro'],ending:['收束','outro']})[type] || ['段落','other'];
  const confidence = value => ({confirmed:'已核对',verified:'已核对',high:'较一致候选',medium:'候选',low:'需复核',unknown:'待分析'})[value] || '候选';
  const safeHref = value => /^https?:\/\//i.test(String(value || '')) ? String(value) : '';
  const knownLabels = {approach:'演奏思路',summary:'整体观察',phrasing:'乐句与呼吸',motifs:'动机',motif:'动机',development:'动机发展',melody:'旋律',melodicMaterials:'旋律材料',harmony:'旋律与和弦',chordTones:'和弦音',noteTargets:'落点音',targets:'落点音',techniques:'演奏手法',rhythm:'节奏',rhythmicFeatures:'节奏特征',texture:'声部织体',register:'音区',interaction:'声部互动',contrast:'与伴唱段的对比',exercise:'练习方法',exercises:'练习方法',listening:'听的时候注意',evidence:'依据',limitations:'仍需核对',warning:'需要区分',meter:'拍号',tempo:'速度',feel:'节奏感觉',pulse:'稳定脉搏',syncopation:'切分',groove:'律动',status:'分析状态',bpm:'拍速候选'};
  let host = null, data = null, player = null, sectionIndex = 0, notation = 'degree', follow = true, loop = false, chordIndex = -1, ready = false, pendingSeek = null, boundVisibility = false;
  const $ = selector => host?.querySelector(selector);
  const sections = () => data?.sections || [];
  const chords = () => data?.chords || [];
  const selectedSection = () => sections()[sectionIndex];
  const duration = () => Math.max(Number(data?.meta?.duration) || 0, Number(player?.duration) || 0, ...sections().map(s => Number(s.end) || 0), 1);
  const sectionChords = section => section ? chords().map((chord, index) => ({chord,index})).filter(({chord}) => Number(chord.start) < Number(section.end) && Number(chord.end) > Number(section.start)) : [];
  const list = (value, className = '') => asArray(value).map(plain).filter(Boolean).length ? `<ul class="${className}">${asArray(value).map(plain).filter(Boolean).map(v => `<li>${esc(v)}</li>`).join('')}</ul>` : '';
  const textBlock = (value, fallback = '') => esc(plain(value) || fallback);
  function structured(value, fallback = '') {
    if (value == null || value === '') return `<p>${esc(fallback)}</p>`;
    if (typeof value !== 'object') return `<p>${esc(value)}</p>`;
    if (Array.isArray(value)) return list(value) || `<p>${esc(fallback)}</p>`;
    const entries = Object.entries(value).filter(([key,v]) => !['confidence','source','start','end','method','raw','algorithm'].includes(key) && plain(v));
    if (!entries.length) return `<p>${esc(fallback)}</p>`;
    return entries.map(([key, v], i) => `<div class="fa-explain-line"><b>${esc(knownLabels[key] || (/[^\x00-\x7F]/.test(key) ? key : `观察 ${i + 1}`))}</b><p>${esc(plain(v))}</p></div>`).join('');
  }
  function rootName(chord) {
    if (chord.rootName) return chord.rootName;
    return Number.isInteger(chord.rootPc) ? pcNames[((chord.rootPc % 12) + 12) % 12] : '待定';
  }
  function rootDegree(chord) { return plain(chord.rootDegree) || '待定'; }
  function roman(chord) { return plain(chord.roman) || '待定'; }
  function soloPhrasesMarkup(section) {
    const phrases = asArray(section.soloPhrases).map((phrase,index)=>({phrase,index})).filter(({phrase})=>phrase && Number.isFinite(Number(phrase.start)) && Number(phrase.end)>Number(phrase.start));
    if (!phrases.length) return '';
    return `<div class="fa-solo-phrases"><h5>把 Solo 拆成几句来听</h5><p class="fa-solo-phrase-note">下面的音高与和声是频谱分析候选，用来帮助找旋律方向和落点，不是原版逐音谱。先听完整一句，再试着用自己的手指重现。</p><div class="fa-solo-phrase-grid">${phrases.map(({phrase:p,index},order)=>`<article class="fa-solo-phrase"><div class="fa-phrase-top"><span>乐句 ${order+1}</span><small>${clock(p.start,true)}—${clock(p.end,true)}</small></div><h6>${esc(p.title || `Solo 乐句 ${order+1}`)}</h6>${[['旋律怎样走',p.contour],['和声与落点',p.harmony],['简化练习',p.exercise]].filter(([,value])=>plain(value)).map(([label,value])=>`<div class="fa-phrase-line"><b>${label}</b><p>${esc(plain(value))}</p></div>`).join('')}${plain(p.evidence)?`<details><summary>音高候选与判断依据</summary><p>${esc(plain(p.evidence))}</p></details>`:''}<button class="fa-phrase-play" data-fa-phrase="${index}" aria-label="从${clock(p.start,true)}播放${esc(p.title || `Solo 乐句 ${order+1}`)}">▶ 从这一句听</button></article>`).join('')}</div></div>`;
  }
  function pauseOthers() {
    document.querySelectorAll('audio,video').forEach(media => { if (media !== player) media.pause(); });
    window.dispatchEvent(new CustomEvent('full-song-play'));
  }
  function inform(message) { const out = $('[data-fa="message"]'); if (out) { out.textContent = message; out.hidden = !message; } }
  function applyPendingSeek() {
    if (!player || !pendingSeek || pendingSeek.applied || player.readyState < 1) return;
    const request = pendingSeek;
    try {
      request.applied = true;
      if (Math.abs(player.currentTime - request.time) > .001) player.currentTime = request.time;
      if (request.play) {
        request.play = false;
        player.play().catch(() => inform('暂时无法播放。可以先阅读分析，或打开原视频对照。'));
      }
      if (!player.seeking && Math.abs(player.currentTime - request.time) < .05) pendingSeek = null;
    } catch {
      request.applied = false;
      // Keep the latest selection until the media can accept its seek.
    }
  }
  function seek(time, play = false) {
    if (!player) return;
    const t = Math.max(0, Math.min(Number(time) || 0, duration() - .001));
    pendingSeek = {time:t, play, applied:false};
    updateTime(t);
    applyPendingSeek();
  }
  function selectSection(idOrIndex, options = {}) {
    const next = typeof idOrIndex === 'number' ? idOrIndex : sections().findIndex(s => s.id === idOrIndex);
    if (next < 0 || next >= sections().length) return false;
    sectionIndex = next;
    renderSection();
    renderSectionSelection();
    if (options.seek !== false) seek(selectedSection().start, Boolean(options.play));
    if (options.scroll) $('[data-fa="detail"]')?.scrollIntoView({behavior:'smooth',block:'start'});
    return true;
  }
  function findSection(time) { return sections().findIndex(s => time + .001 >= Number(s.start) && time < Number(s.end) - .001); }
  function findChord(time) { return chords().findIndex(c => time + .001 >= Number(c.start) && time < Number(c.end) - .001); }
  function renderSectionSelection() {
    host.querySelectorAll('[data-fa-section]').forEach(button => {
      const active = Number(button.dataset.faSection) === sectionIndex;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
  }
  function updateTime(forcedTime) {
    if (!player) return;
    const time = Number.isFinite(forcedTime) ? forcedTime : pendingSeek?.time ?? player.currentTime;
    const section = selectedSection();
    if (!pendingSeek && loop && section && !player.paused && time >= Number(section.end) - .045) {
      seek(section.start); return;
    }
    $('[data-fa="clock"]').textContent = clock(time, true);
    const progress = $('[data-fa="playhead"]');
    if (progress) progress.style.left = `${Math.max(0,Math.min(100,time / duration() * 100))}%`;
    if (follow && !loop) {
      const next = findSection(time);
      if (next >= 0 && next !== sectionIndex) selectSection(next,{seek:false});
    }
    const nextChord = findChord(time);
    if (nextChord !== chordIndex) { chordIndex = nextChord; renderNowPlaying(); }
    host.querySelectorAll('[data-fa-chord]').forEach(el => el.classList.toggle('playing', Number(el.dataset.faChord) === chordIndex));
  }
  function renderNowPlaying() {
    const chord = chords()[chordIndex];
    const box = $('[data-fa="now"]');
    if (!box) return;
    box.innerHTML = chord ? `<div class="fa-now-degree"><span>此刻的根音</span><strong>${esc(rootDegree(chord))}</strong><small>${esc(rootName(chord))}</small></div><div class="fa-now-chord"><span>和弦候选</span><strong>${esc(chord.chord || '未定音组')}</strong><p>${esc(chord.functionText || '这一处的具体和声作用仍需结合前后句核对。')}</p></div>` : `<div class="fa-now-empty"><span>此刻的和声</span><p>这里还没有可靠的和弦标注。可以先观察当前段落的演奏方式。</p></div>`;
  }
  function renderOverview() {
    const o = data.overview || {}, meta = data.meta || {};
    $('[data-fa="title"]').textContent = meta.title || '全曲演奏分析';
    $('[data-fa="artist"]').textContent = `${meta.artist || ''}${meta.artist ? ' · ' : ''}${clock(meta.duration || 0)} 完整演奏`;
    $('[data-fa="summary"]').textContent = plain(o.summary) || '先建立全曲地图，再回到每个和弦与每一句旋律。';
    $('[data-fa="stats"]').innerHTML = [
      ['调性中心',o.tonic || '待核对',o.keyStatus || '工作假设'],
      ['大小调与色彩',o.mode || '待核对','按整段归宿判断，不只看单个和弦'],
      ['音乐风格',o.style || '待描述','演奏风格描述'],
      ['拍号与速度',plain(o.meter) || '待核对',plain(o.tempo) || '现场速度仍需校订']
    ].map(([label,value,note],i) => `<article class="fa-stat ${i===0?'tonic':''}"><span>${esc(label)}</span><strong>${esc(plain(value))}</strong><p>${esc(plain(note))}</p></article>`).join('');
    $('[data-fa="key-evidence"]').innerHTML = list(o.keyEvidence) || '<p>尚未填入足够的调性证据。</p>';
    $('[data-fa="modulation"]').innerHTML = structured(o.modulationSummary, '暂未作出转调结论。调外和弦不自动等于转调。');
    $('[data-fa="coverage"]').textContent = plain(data.status?.coverage) || '全曲结构已整理；具体音符与和弦以标注状态为准。';
    $('[data-fa="limits"]').innerHTML = list(data.status?.limitations) || '<p>这是一份持续修订的学习分析，不能替代原谱。</p>';
    $('[data-fa="sources"]').innerHTML = asArray(data.status?.sources).filter(source=>safeHref(source.url)).map(source=>`<div class="fa-source-row"><a href="${esc(safeHref(source.url))}" target="_blank" rel="noopener">${esc(source.label || '查看来源')} ↗</a>${source.note?`<p>${esc(source.note)}</p>`:''}</div>`).join('');
    $('[data-fa="definitions"]').innerHTML = asArray(data.definitions).map(item => `<details><summary>${esc(item.term || '术语')}</summary><p>${esc(item.text || '')}</p></details>`).join('');
    const href = safeHref(meta.sourceUrl);
    const source = $('[data-fa="source"]');
    source.hidden = !href; if (href) source.href = href;
    const timeline = $('[data-fa="timeline"]');
    timeline.innerHTML = sections().map((s,index) => { const type = typeInfo(s.type);return `<button class="fa-timeline-part ${type[1]}" style="flex:${Math.max(.2,Number(s.end)-Number(s.start))}" type="button" aria-controls="fa-section-detail" data-fa-section="${index}" aria-label="${esc(s.title)}，${clock(s.start)}到${clock(s.end)}"><span>${index+1}</span></button>`; }).join('') + '<span class="fa-playhead" data-fa="playhead" aria-hidden="true"></span>';
    $('[data-fa="chapters"]').innerHTML = sections().map((s,index) => { const type = typeInfo(s.type);return `<button class="fa-chapter ${type[1]}" type="button" aria-controls="fa-section-detail" data-fa-section="${index}"><span class="fa-chapter-no">${String(index+1).padStart(2,'0')}</span><span><strong>${esc(s.title || '未命名段落')}</strong><small>${clock(s.start)}–${clock(s.end)} · ${type[0]}</small></span></button>`; }).join('');
    $('[data-fa="duration"]').textContent = clock(meta.duration || 0);
    renderSectionSelection();
  }
  function renderSection() {
    const s = selectedSection(), details = $('[data-fa="detail"]');
    if (!s) { details.innerHTML = '<div class="fa-empty">还没有分段分析。可以先播放完整演奏。</div>';return; }
    const type = typeInfo(s.type), events = sectionChords(s), isSolo = type[1] === 'solo';
    details.innerHTML = `<header class="fa-section-heading"><div><div class="fa-kicker">第 ${sectionIndex + 1} 段 · ${clock(s.start)}—${clock(s.end)}</div><h3>${esc(s.title || '演奏段落')}</h3><div class="fa-section-tags"><span class="fa-type ${type[1]}">${type[0]}</span><span class="fa-confidence ${esc(s.confidence || 'medium')}">${confidence(s.confidence)}</span></div></div><button class="primary" data-fa-action="play-section">▶ 从这里听</button></header>
    <p class="fa-section-summary">${esc(s.summary || '这一段的详细分析仍在整理。')}</p>
    <div class="fa-listen"><span>听的时候，抓住这些</span>${list(s.listenFor) || '<p>留意低音、旋律落点和乐句停顿。</p>'}</div>
    <div class="fa-progression-head"><div><div class="fa-kicker">先看根音，再看完整和弦</div><h4>这一段怎样走？</h4></div><div class="fa-notation" aria-label="级数显示方式"><button data-fa-notation="degree" class="${notation==='degree'?'active':''}">根音级数</button><button data-fa-notation="roman" class="${notation==='roman'?'active':''}">和弦级数</button></div></div>
    <p class="fa-progression-summary">${esc(s.progressionSummary || (isSolo?'Solo 中有些时刻只呈现旋律，未必能独立确定完整和弦。':'这些标记描述候选和声，作用要放回前后连接中理解。'))}</p>
    <div class="fa-degree-flow" data-fa="degree-flow">${flowMarkup(events)}</div>
    <p class="fa-degree-foot">根音级数以 ${esc(plain(data.overview?.tonic)||'本曲暂定调性中心')} 为参照；罗马数字保留和弦性质。标为「待定」的地方不强行补写。</p>
    <div class="fa-harmony-rows" data-fa="harmony-rows">${rowsMarkup(events,isSolo)}</div>
    ${isSolo ? `<section class="fa-solo"><div class="fa-card-icon">♪</div><div class="fa-kicker">把它作为旋律演奏来理解</div><h4>Solo：音怎样落在和声里</h4>${structured(s.soloAnalysis,'当前先定位器乐段与乐句边界；逐音、技巧与原版指法仍需复核，暂不补写完整独奏谱。')}${soloPhrasesMarkup(s)}</section>` : ''}
    <section class="fa-rhythm"><div class="fa-kicker">节奏也属于音乐的表达</div><h4>${isSolo?'Solo 的节奏与呼吸':'这一段的节奏与演奏模式'}</h4>${structured(s.rhythm,'先找反复出现的稳定脉搏，再观察旋律或和弦是否提前、延后进入。这里尚未确认精确拍速。')}</section>
    <div class="fa-section-nav"><button class="secondary" data-fa-action="previous" ${sectionIndex===0?'disabled':''}>← 上一段</button><span>${sectionIndex+1} / ${sections().length}</span><button class="primary" data-fa-action="next" ${sectionIndex===sections().length-1?'disabled':''}>下一段 →</button></div>`;
    host.querySelectorAll('[data-fa-chord]').forEach(el=>el.classList.toggle('playing',Number(el.dataset.faChord)===chordIndex));
  }
  function flowMarkup(events) {
    if (!events.length) return '<div class="fa-empty">这一段暂无可靠的根音走向标注。请先阅读段落分析。</div>';
    return events.map(({chord:c,index},i) => `<button class="fa-degree-step ${c.confidence==='low'?'uncertain':''}" data-fa-chord="${index}" aria-label="跳到${clock(c.start,true)}，${esc(c.chord||'和弦未定')}"><small>${clock(c.start,true)}</small><strong>${esc(notation==='degree'?rootDegree(c):roman(c))}</strong><span>${esc(rootName(c))}</span><b>${esc(c.chord || '未定')}</b>${c.confidence==='low'?'<em>需复核</em>':''}</button>${i<events.length-1?'<span class="fa-flow-arrow" aria-hidden="true">→</span>':''}`).join('');
  }
  function rowsMarkup(events,isSolo) {
    if (!events.length) return '';
    return events.map(({chord:c,index}) => `<article class="fa-harmony-row" data-fa-chord="${index}"><button class="fa-harmony-main" data-fa-jump="${index}" aria-label="跳到${clock(c.start,true)}，${esc(c.chord||'和弦未定')}"><span class="fa-row-time">${clock(c.start,true)}<small>— ${clock(c.end,true)}</small></span><span class="fa-row-degree"><strong>${esc(rootDegree(c))}</strong><small>${esc(rootName(c))}</small></span><span class="fa-row-chord"><strong>${esc(c.chord||'和弦未定')}</strong><small>${esc(roman(c))}</small></span><span class="fa-confidence ${esc(c.confidence||'medium')}">${confidence(c.confidence)}</span><span class="fa-jump-icon" aria-hidden="true">↗</span></button><div class="fa-row-explanation"><p>${esc(c.functionText || (isSolo?'此处以旋律活动为主，不能只凭单个旋律音给完整和弦定名。':'这一个和弦的局部作用仍需结合前后落点核对。'))}</p><details><summary>看判断依据${asArray(c.alternatives).length?'与其他解释':''}</summary><p>${esc(plain(c.evidence)||'尚未补充可复核的依据。')}</p>${asArray(c.alternatives).length?`<p>其他候选：${esc(asArray(c.alternatives).map(plain).filter(Boolean).join('、'))}</p>`:''}</details>${c.fingeringId?`<button class="fa-learn-link" data-fa-learn="${esc(c.fingeringId)}" data-fa-learn-index="${index}">到指板看按法与组成音 →</button>`:''}</div></article>`).join('');
  }
  function init(overrideData) {
    const nextHost = document.getElementById('analysisView');
    const nextData = overrideData || window.FULL_ANALYSIS;
    if (!nextHost || !nextData) return false;
    if (ready && nextHost===host && nextData===data) return true;
    if (player) player.pause();
    if (host) {host.removeEventListener('click',handleClick);host.removeEventListener('change',handleChange);}
    host=nextHost;data=nextData;
    data.sections=asArray(data.sections).filter(s=>Number.isFinite(Number(s.start))&&Number(s.end)>Number(s.start));
    data.chords=asArray(data.chords).filter(c=>Number.isFinite(Number(c.start))&&Number(c.end)>Number(c.start));
    sectionIndex=Math.min(sectionIndex,Math.max(0,sections().length-1));chordIndex=-1;pendingSeek=null;loop=false;follow=true;
    host.classList.add('fa-shell');
    host.innerHTML = `<div class="fa-heading"><div><div class="fa-kicker">先听见全貌，再走进每一小句</div><h2>一首歌的音乐地图<span>。</span></h2><p>调性 · 根音走向 · 和弦作用 · 伴唱与 Solo · 节奏</p></div><span class="fa-draft"><i></i> 全曲分析工作稿</span></div>
    <section class="fa-overview" aria-label="全曲音乐概览"><div class="fa-overview-intro"><div><h3 data-fa="title"></h3><p data-fa="artist"></p></div><a data-fa="source" target="_blank" rel="noopener">查看原视频 ↗</a></div><p class="fa-overview-summary" data-fa="summary"></p><div class="fa-stats" data-fa="stats"></div><div class="fa-overview-evidence"><details><summary>为什么这样判断调性？</summary><div data-fa="key-evidence"></div></details><details><summary>有没有离调或转调？</summary><div data-fa="modulation"></div></details></div></section>
    <section class="fa-map" aria-label="完整演奏段落地图"><div class="fa-map-title"><h3>整首歌，现在走到哪里？</h3><div class="fa-map-legend"><span><i class="voice"></i>伴唱</span><span><i class="solo"></i>Solo / 器乐</span><span><i class="talk"></i>谈话 / 前奏</span><span><i class="outro"></i>收束</span></div></div><p class="fa-map-hint">点击色块或段落卡片，视频与下方和弦分析一起跳转。</p><div class="fa-timeline" data-fa="timeline"></div><div class="fa-timeline-labels"><span>00:00</span><span data-fa="duration"></span></div><div class="fa-chapters" data-fa="chapters"></div></section>
    <div class="fa-workspace"><aside class="fa-player-panel"><video id="fullSongVideo" data-fa="video" controls playsinline preload="metadata" aria-label="Currently 完整演奏视频"></video><div class="fa-player-content"><div class="fa-player-top"><span>原视频时间</span><strong data-fa="clock">00:00.00</strong></div><button class="primary fa-play-button" data-fa-action="play">▶ 播放完整演奏</button><div class="fa-player-settings"><label>播放速度<select data-fa="speed" aria-label="完整演奏播放速度"><option value="0.5">0.5 ×</option><option value="0.75">0.75 ×</option><option value="1" selected>1.0 ×</option></select></label><label><input type="checkbox" data-fa="loop"> 循环选中段落</label><label><input type="checkbox" data-fa="follow" checked> 播放时自动跟随段落</label></div><div class="fa-player-message" data-fa="message" role="status" hidden></div><div class="fa-now" data-fa="now"></div><p class="fa-player-note">根音是和弦命名的参照，不一定等于最低音。和弦作用要连着前后乐句一起判断。</p></div></aside><section id="fa-section-detail" class="fa-section-detail" data-fa="detail" aria-label="当前段落分析"></section></div>
    <section class="fa-terms"><div><div class="fa-kicker">遇到术语，随时回来看看</div><h3>先把这些概念分清。</h3><p>同一个和弦，放在不同的前后关系里，可以承担不同的作用。</p></div><div data-fa="definitions"></div></section>
    <details class="fa-status"><summary><span>分析覆盖与仍需复核的内容</span><span>＋</span></summary><p data-fa="coverage"></p><div data-fa="limits"></div><div data-fa="sources" class="fa-sources"></div></details>`;
    player=$('[data-fa="video"]');
    const src=String(data.meta?.videoSrc || '');if(src)player.src=src;
    player.preservesPitch=true;
    renderOverview();renderSection();renderNowPlaying();
    host.addEventListener('click',handleClick);
    host.addEventListener('change',handleChange);
    player.addEventListener('timeupdate',()=>updateTime());
    player.addEventListener('seeking',()=>{
      // Native scrubbing takes over from a pending chapter jump.
      if (pendingSeek?.applied && Math.abs(player.currentTime - pendingSeek.time) > .05) pendingSeek = null;
      updateTime();
    });
    player.addEventListener('seeked',()=>{if(pendingSeek?.applied&&!player.seeking)pendingSeek=null;updateTime();});
    player.addEventListener('loadedmetadata',()=>{applyPendingSeek();updateTime();});
    player.addEventListener('canplay',()=>{applyPendingSeek();updateTime();});
    player.addEventListener('play',()=>{pauseOthers();$('[data-fa-action="play"]').textContent='Ⅱ 暂停演奏';inform('');});
    player.addEventListener('pause',()=>{$('[data-fa-action="play"]').textContent='▶ 播放完整演奏';});
    player.addEventListener('ended',()=>{if(loop&&selectedSection())seek(selectedSection().start,true);});
    player.addEventListener('error',()=>inform('完整视频暂未加载成功。可以先阅读各段分析，再通过原视频链接对照。'));
    if(!boundVisibility){window.addEventListener('pagehide',pause);boundVisibility=true;}
    ready=true;return true;
  }
  function handleClick(event) {
    const button=event.target.closest('button');if(!button||!host.contains(button))return;
    if(button.dataset.faSection!==undefined){selectSection(Number(button.dataset.faSection));return;}
    if(button.dataset.faNotation){notation=button.dataset.faNotation;renderSection();return;}
    if(button.dataset.faLearn){pause();window.dispatchEvent(new CustomEvent('learn-chord',{detail:{id:button.dataset.faLearn,chord:chords()[Number(button.dataset.faLearnIndex)]}}));return;}
    if(button.dataset.faPhrase!==undefined){const section=selectedSection(),phrase=asArray(section?.soloPhrases)[Number(button.dataset.faPhrase)];if(phrase && Number.isFinite(Number(phrase.start)) && Number(phrase.start)>=Number(section.start) && Number(phrase.start)<Number(section.end))seek(phrase.start,true);return;}
    const chordId=button.dataset.faJump??button.dataset.faChord;
    if(chordId!==undefined){const chord=chords()[Number(chordId)];if(chord)seek(chord.start);return;}
    switch(button.dataset.faAction){
      case 'play':if(!player.paused)player.pause();else{if(player.ended)seek(selectedSection()?.start||0);player.play().catch(()=>inform('请确认视频已经加载，或使用原视频链接。'));}break;
      case 'play-section':if(selectedSection())seek(selectedSection().start,true);break;
      case 'previous':selectSection(sectionIndex-1);break;
      case 'next':selectSection(sectionIndex+1);break;
    }
  }
  function handleChange(event){
    const type=event.target.dataset.fa;
    if(type==='speed')player.playbackRate=Number(event.target.value)||1;
    if(type==='follow'){follow=event.target.checked;if(follow&&!loop)updateTime();}
    if(type==='loop'){loop=event.target.checked;if(loop&&selectedSection()&&(player.currentTime<selectedSection().start||player.currentTime>=selectedSection().end))seek(selectedSection().start);}
  }
  function pause(){player?.pause();}
  function show(){if(!ready)init();if(host)host.hidden=false;}
  function refresh(newData){if(host){host.removeEventListener('click',handleClick);host.removeEventListener('change',handleChange);}ready=false;return init(newData);}
  window.FullSongAnalysis={init,show,pause,selectSection,refresh,getState:()=>({ready,sectionIndex,sectionId:selectedSection()?.id,chordIndex,notation,follow,loop,currentTime:player?.currentTime||0})};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>init());else init();
})();
