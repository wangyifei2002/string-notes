(() => {
 'use strict';
 const $=id=>document.getElementById(id), data=window.LESSON, practice=window.PracticeData, events=practice.events, sections=practice.sections, core=window.GuitarCore, video=$('songVideo');
 const flat=['C','D♭','D','E♭','E','F','G♭','G','A♭','A','B♭','B'];
 const colors={root:'#c6754e',third:'#8b76b6',fifth:'#538ca1',seventh:'#4f927e',color:'#b58c3d'};
 const titles={'7':'属七和弦','m7':'小七和弦','m7b5':'半减七和弦','dim7':'减七和弦','7#5':'升五音属七和弦','9':'属九和弦','9(no5)':'省略五音的属九和弦','major':'大三和弦','minor':'小三和弦','maj7':'大七和弦','sus2':'挂二和弦','sus4':'挂四和弦','5':'五度和弦'};
 let selected=0, frets=[...events[0].frets], scope='all', sectionFilter=-1, custom=false,labelMode='note',showAll=false,melodyNote=null,activePhrase=0,pendingSeek=null,loopAnchor=null;
 let practiced=new Set(), audioCtx=null, liveOsc=[], toastTimer=0, scheduledVisual=[];
 try{practiced=new Set(JSON.parse(localStorage.getItem('string-notes-practiced')||'[]'));}catch{}
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const clock=t=>`${String(Math.floor(t/60)).padStart(2,'0')}:${(t%60).toFixed(2).padStart(5,'0')}`;
 const current=()=>events[selected];
 const timeBase=()=>0;
 const visibleIndices=()=>events.map((_,i)=>i).filter(i=>scope==='tail'?[41.6,43.1,44.2].some(t=>Math.abs(events[i].start-t)<.02):scope==='section'?events[i].start<sections[sectionFilter].end&&events[i].end>sections[sectionFilter].start:true);
 function roleOf(degree){if(degree==='1')return'root';if(['3','♭3'].includes(degree))return'third';if(['5','♭5','♯5'].includes(degree))return'fifth';if(degree.includes('7'))return'seventh';return'color';}
 function intervalInfo(delta,quality){let deg={0:'1',1:'♭9',2:'9',3:'♭3',4:'3',5:'4',6:'♭5',7:'5',8:'♯5',9:'6',10:'♭7',11:'7'}[delta];if(quality==='dim7'&&delta===9)deg='♭♭7';if(quality==='sus2'&&delta===2)deg='2';const role=roleOf(deg);return{degree:deg,role:({'root':'根音','third':'三音','fifth':'五音','seventh':'七音','color':'色彩音'})[role],color:colors[role]};}
 function spellTone(rootPc,degree,midi){const letters=['C','D','E','F','G','A','B'],naturals=[0,2,4,5,7,9,11],step=Number(degree.match(/\d+/)?.[0]||1),idx=(letters.indexOf(flat[rootPc][0])+step-1)%7,pc=midi%12,delta=((pc-naturals[idx]+18)%12)-6;const name=letters[idx]+(delta>0?'♯'.repeat(delta):'♭'.repeat(-delta));return{name,octave:(midi-naturals[idx]-delta)/12-1};}
 function getView(){
  if(melodyNote&&!custom)return {name:melodyNote.label+' · 旋律练习',quality:null,rootPc:null,tones:[{name:melodyNote.name,degree:'·',present:true}],notes:[melodyNote],candidates:[]};
  if(!custom)return {name:current().name,quality:current().quality,rootPc:current().rootPc,tones:current().chordTones,notes:current().notes,candidates:[]};
  const notes=core.notesFor(frets), sounding=notes.filter(Boolean), candidates=core.recognize(frets), candidate=candidates[0];
  let rootPc=candidate?.rootPc??[...sounding].sort((a,b)=>a.midi-b.midi)[0]?.pc??0, quality=candidate?.quality??null;
  const known=[...data.segments,...(data.catalog||[])].find(s=>s.rootPc===rootPc&&(s.quality===quality||(quality==='9(no5)'&&s.quality==='9')));
  const expanded=notes.map((n,i)=>{if(!n)return null;let delta=(n.pc-rootPc+12)%12, info=intervalInfo(delta,quality), canonical=known?.chordTones.find(t=>t.pc===n.pc);if(!candidate)return{...n,string:6-i,fret:frets[i],name:n.flatName,label:n.flatName+n.octave,degree:'·',role:'功能未定'};const spelling=spellTone(rootPc,canonical?.degree??info.degree,n.midi);return{...n,string:6-i,fret:frets[i],name:spelling.name,label:spelling.name+spelling.octave,...info,degree:canonical?.degree??info.degree};}).filter(Boolean);
  const tones=[...new Set(expanded.map(n=>n.pc))].map(pc=>{const n=expanded.find(n=>n.pc===pc);return{name:n.name,pc,degree:n.degree,role:n.role,present:true};});
  const unique=new Set(sounding.map(n=>n.pc)).size;
  let name=candidate?.label||(sounding.length===0?'空白指板':unique===1?`${flat[rootPc]} · 单音`:'未命名音组');
  return{name,quality,rootPc,tones,notes:expanded,candidates};
 }
 function notify(message){$('toast').textContent=message;$('toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('show'),2600);}
 function pauseOtherMedia(except){document.querySelectorAll('audio,video').forEach(el=>{if(el!==except)el.pause();});}
 function stopSynth(){scheduledVisual.forEach(clearTimeout);scheduledVisual=[];liveOsc.forEach(n=>{try{n.stop();}catch{}});liveOsc=[];}
 async function ensureAudio(){if(!audioCtx){const C=window.AudioContext||window.webkitAudioContext;if(!C)throw new Error('no_audio');audioCtx=new C();}if(audioCtx.state==='suspended')await audioCtx.resume();return audioCtx;}
 function tone(midi,start,duration=1.4,volume=.1){const gain=audioCtx.createGain(), filter=audioCtx.createBiquadFilter(), oscillator=audioCtx.createOscillator();const f=440*Math.pow(2,(midi-69)/12);oscillator.type='triangle';oscillator.frequency.value=f;filter.type='lowpass';filter.frequency.setValueAtTime(Math.min(5000,f*9),start);filter.frequency.exponentialRampToValueAtTime(Math.max(300,f*2),start+duration);gain.gain.setValueAtTime(0,start);gain.gain.linearRampToValueAtTime(volume,start+.006);gain.gain.exponentialRampToValueAtTime(.0001,start+duration);oscillator.connect(filter).connect(gain).connect(audioCtx.destination);oscillator.start(start);oscillator.stop(start+duration+.03);liveOsc.push(oscillator);oscillator.onended=()=>{oscillator.disconnect();filter.disconnect();gain.disconnect();liveOsc=liveOsc.filter(o=>o!==oscillator);};}
 async function playNotes(midis,step=.04){if(!midis.length){notify('先在指板上选择一个音。');return;}pauseOtherMedia();stopSynth();try{await ensureAudio();const now=audioCtx.currentTime+.025;midis.forEach((m,i)=>tone(m,now+i*step,1.5,step>.2?.13:.09));}catch{notify('暂时无法试音，请检查浏览器声音设置。');}}
 function renderSteps(){
  const ids=visibleIndices(),list=$('lessonSteps'),previousScroll=list.scrollTop;
  list.innerHTML=ids.map(idx=>{const e=events[idx],active=selected===idx&&!custom;return `<button class="step-item ${active?'active':''} ${e.notes.length?'':'unresolved'}" data-step="${idx}" ${active?'aria-current="step"':''}><span class="step-num">${esc(e.analysisEvent.rootDegree||'·')}</span><span><strong>${esc(e.name)}</strong><small>${clock(e.start)}–${clock(e.end)}</small></span><span class="step-check">${practiced.has(e.id)?'✓':e.notes.length?'›':'待定'}</span></button>`;}).join('');
  list.scrollTop=previousScroll;const active=list.querySelector('[aria-current="step"]');if(active&&(active.offsetTop<list.scrollTop||active.offsetTop+active.offsetHeight>list.scrollTop+list.clientHeight)){list.scrollTop=active.offsetTop-list.clientHeight/2+active.offsetHeight/2;}
  $('tailScope').classList.toggle('selected',scope==='tail');$('allScope').classList.toggle('selected',scope==='all');$('practiceSection').value=scope==='section'?String(sectionFilter):'all';
  const known=events.filter(e=>e.notes.length),done=known.filter(e=>practiced.has(e.id)).length;
  $('practiceCoverage').textContent=`全曲 ${clock(data.source.duration)} · ${known.length} 处和弦教学按法 · ${events.length-known.length} 处旋律 / 待定 / 余音`;
  $('practiceProgress').textContent=`已练 ${done} / ${known.length} 处和弦 · 点击时点可跳播`;
 }
 function seek(time){pendingSeek=time;if(video.readyState>0){video.currentTime=Math.min(time,Math.max(0,video.duration-.001));pendingSeek=null;}$('absoluteTime').textContent=clock(time);}
 function selectedSection(){return sections[scope==='section'?sectionFilter:practice.sectionAt(Math.max(current().start,Math.min(video.currentTime,current().end-.001)))];}
 function refreshLoop(){const mode=$('loopMode').value;loopAnchor=mode==='chord'?{start:current().start,end:current().end}:mode==='section'?{start:selectedSection().start,end:selectedSection().end}:null;}
 function renderSolo(){
  const section=selectedSection(),show=section?.type==='solo';$('soloPractice').hidden=!show;if(!show)return;
  const phrases=practice.soloPhrases;if(activePhrase<0||activePhrase>=phrases.length)activePhrase=0;const phrase=phrases[activePhrase];
  $('soloPractice').innerHTML=`<div class="eyebrow">Solo · 逐音练习按位</div><h3>先练一句旋律，再听原片。</h3><p>下面是依据分析材料设计的简化练习，音序、节奏和把位均为教学改写。原片播放时只跟随和声候选，不把这些练习音伪装成逐音转录。</p><div class="solo-phrase-tabs">${phrases.map((p,i)=>`<button data-solo-phrase="${i}" class="${i===activePhrase?'selected':''}">${i+1} · ${esc(p.title)}</button>`).join('')}</div><p><strong>${clock(phrase.start)}–${clock(phrase.end)}</strong> · ${esc(phrase.exercise)}</p><div class="solo-note-buttons">${phrase.teachingNotes.map((n,i)=>`<button data-solo-note="${i}" class="${melodyNote?.practiceIndex===i?'selected':''}"><strong>${esc(n.name)}</strong><span>${n.string}弦 ${n.fret}品 · ${n.finger}指</span></button>`).join('')}</div><div class="solo-practice-actions"><button class="secondary" data-solo-action="sequence">♪ 听简化练习</button><button class="primary" data-solo-action="original">▶ 对照这一句原片</button><button class="text-button" data-solo-action="restore">回到全曲跟随</button></div><small>${esc(phrase.teachingLabel||'教学音序 · 不按原演奏时间逐音同步')}</small>`;
 }

 function renderBoard(view){let html='<div class="fret-head"><span>弦号</span>'+Array.from({length:13},(_,f)=>`<span>${f===0?'空弦':f}</span>`).join('')+'</div>';
  for(let i=5;i>=0;i--){const string=6-i, note=view.notes.find(n=>n.string===string);html+=`<div class="fret-row" style="--string-width:${1+(5-i)*.32}px"><div class="string-label"><b>${string}</b><span>${['E','A','D','G','B','E'][i]}</span><button class="mute-button ${frets[i]<0?'active':''}" data-mute="${i}" aria-label="${string}弦${frets[i]<0?'开启空弦':'静音'}">${frets[i]<0?'×':'○'}</button></div>`;
   for(let f=0;f<=12;f++){const n=core.noteAt(i,f),active=frets[i]===f, role=note?roleOf(note.degree):'root', finger=custom?'':(melodyNote?(melodyNote.string===string?melodyNote.finger:''):(current().fingerNumbers?.[i]??''));let text=note?.name??n.flatName;
    if(labelMode==='degree')text=note?.degree??'·';if(labelMode==='finger')text=custom?'·':finger||'0';
    let content=active?`<span class="note-dot" data-finger="${labelMode==='finger'?'':finger}" style="--role-color:${colors[role]}">${esc(text)}</span>`:showAll?`<span class="ghost-note">${esc(n.flatName)}</span>`:([3,5,7,9,12].includes(f)&&i===3?'<span class="position-dot"></span>':'');
    html+=`<button class="fret-cell ${f===0?'open':''} ${active?'is-active':''}" data-string="${i}" data-fret="${f}" aria-pressed="${active}" aria-label="${string}弦${f===0?'空弦':f+'品'}，${active&&note?note.label:n.flatName+n.octave}${active?'，已选择':''}">${content}</button>`;
   }html+='</div>';
  }const scroller=document.querySelector('.board-scroll'),previousScroll=scroller.scrollLeft;$('fretboard').innerHTML=html;
  if(custom){scroller.scrollLeft=previousScroll;}else if(scroller.scrollWidth>scroller.clientWidth){const active=[...$('fretboard').querySelectorAll('.is-active')];if(active.length){const left=Math.min(...active.map(el=>el.offsetLeft)),right=Math.max(...active.map(el=>el.offsetLeft+el.offsetWidth));scroller.scrollLeft=Math.max(0,(left+right)/2-scroller.clientWidth/2);}}
 }
 function render(){const view=getView(),s=current(),pos=visibleIndices().indexOf(selected);renderSteps();renderBoard(view);renderSolo();
  const section=selectedSection();$('songContext').hidden=false;$('songContext').innerHTML=`<strong>${esc(section.title)} · ${clock(s.start)}–${clock(s.end)}</strong><span>${melodyNote?'正在查看独立的Solo教学音；点击“回到全曲跟随”恢复原片时间轴。':s.notes.length?'全曲连续跟随 · 此处显示可弹的教学配音；不是原演奏逐指复原。':'此处未确定完整和弦。空指板表示尚未标注，不表示原演奏静音。'}</span>`;
  $('followSong').disabled=false;document.querySelector('.cover-label').textContent='完整原演奏 · 4分7秒';
  const harmony=s.analysisEvent;
  $('harmonicContext').hidden=custom||!!melodyNote||!harmony;$('harmonicContext').innerHTML=harmony?`<div><small>E♭ 大调参照 · 根音级数</small><strong>${esc(harmony.rootDegree)} <span>${esc(harmony.roman)}</span></strong></div><p>${esc(harmony.functionText)}</p>`:'';
  if(!$('practiceView').hidden){$('lessonMode').classList.toggle('active',!custom);$('freeMode').classList.toggle('active',custom);}$('customBanner').hidden=!custom;
  $('stepKicker').textContent=custom?'自由探索 · 每根弦选择一个按位':melodyNote?'Solo简化练习 · 当前单音按位':`全曲第 ${selected+1} / ${events.length} 处 · ${section.title}`;
  $('chordName').textContent=view.name;$('modeTag').textContent=custom?'音组识别':melodyNote?'旋律教学改写':s.notes.length?'教学按法':'待核对';
  $('chordSubtitle').textContent=custom?(view.candidates.length?`按实际音组识别${view.candidates.length>1?' · 其他解释：'+view.candidates.slice(1).map(c=>c.label).join('、'):''}`:view.notes.length?'只显示实际音高；尚未确定和弦。':'点击指板开始选音。'):melodyNote?`${melodyNote.string}弦 ${melodyNote.fret}品 · 左手${melodyNote.finger}指 · 独立教学音序`:s.quality?`${titles[s.quality]||s.quality} · 原视频约 ${clock(s.start)}`:s.kind==='solo'?'Solo旋律区域 · 完整和弦与原指法待核对':s.kind==='decay'?'余音与静默 · 不新增和弦':'连接音型 · 根音与原指法待核对';
  $('practiceEvidence').textContent=melodyNote?'教学改写：该按位可以发出所示音高，但不代表原演奏者当时的动作。':`${({high:'较一致候选',medium:'分析候选',low:'需复核'})[harmony.confidence]||'待核对'}：${harmony.evidence||'暂无可靠原音指法。'}`;
  $('toneChips').innerHTML=view.tones.map(t=>`<div class="tone-chip ${t.present===false?'omitted':''}" style="--role-color:${colors[roleOf(t.degree)]}"><i></i><b>${esc(t.name)}</b><span>${esc(t.degree)}${t.present===false?' · 省略':''}</span></div>`).join('')||'<span class="omission-note">还没有发声音</span>';
  $('omissionNote').textContent=view.tones.some(t=>t.present===false)?'虚线音未在此指法中弹出。':'';
  $('stringNotes').innerHTML=frets.map((f,i)=>{const n=view.notes.find(n=>n.string===6-i);const role=n?(custom&&!view.candidates.length&&n.degree==='1'?'参照音':n.role):'';return`<button class="string-note ${f<0?'muted':''}" data-play-string="${i}" style="--role-color:${n?colors[roleOf(n.degree)]:'#aaa'}"><small>${6-i} 弦 · ${f<0?'不弹':f===0?'空弦':f+' 品'}</small><b>${n?esc(n.label):'×'}</b><span>${n?esc(n.degree+' · '+role):(!custom&&!melodyNote&&!s.notes.length?'未标注':'轻触止音')}</span></button>`;}).join('');
  $('tabText').textContent=frets.map(f=>f<0?'x':f).join(' ');
  $('fingerGuide').textContent=custom?'这是你选择的按位。自由指板不自动指定左手指号；先让每个音清楚发声。':melodyNote?`左手${melodyNote.finger}指按第${melodyNote.string}弦第${melodyNote.fret}品，只拨这一根弦。建议指号可按手型调整，这是教学按位。`:s.leftHand||s.fingerGuide;
  $('alternateWrap').hidden=custom||!!melodyNote||!s.fingerAlternatives?.length;$('alternateText').textContent=(s.fingerAlternatives||[]).join(' ');
  $('whyTitle').textContent=melodyNote?'一个按位，对应一个音高':view.notes.length===0?'这里保留不确定性':view.quality?`${view.tones.filter(t=>t.present!==false).map(t=>t.name).join(' · ')} → ${view.name}`:'从实际发声音开始';
  $('whyText').textContent=custom?(view.candidates.length?'和弦名称来自实际音高组合。同一个音可出现在不同弦上；把位与音色可能改变。':'一个或少数音高不能唯一决定完整和弦，继续添加音来比较。'):melodyNote?'点击上方的下一个练习音，观察手指怎样移动。旋律练习的音序由教学设计，不声称与原音逐个对应。':s.explanation;
  $('movementText').textContent=custom?'小实验：保留其他按位，只把一根弦移动一品。先听变化，再看音名。':melodyNote?'先把音弹清楚，再用原视频对照旋律的方向和句间留白。':s.transition;
  $('practiced').checked=practiced.has(s.id);$('practiced').disabled=custom||!!melodyNote||!s.notes.length;
  $('prevChord').disabled=custom||selected<=0;$('nextChord').disabled=custom||selected===events.length-1;
  $('playChord').disabled=!view.notes.length;$('playArpeggio').disabled=!view.notes.length;
 }
 function selectChord(index,{seek:shouldSeek=true,fromPlayback=false}={}){
  if(!events[index])return;if(!fromPlayback)stopSynth();selected=index;custom=false;melodyNote=null;frets=[...current().frets];
  if(!visibleIndices().includes(index)){if(scope==='section')sectionFilter=practice.sectionAt(current().start);else scope='all';}
  if(shouldSeek)seek(current().start);if(!fromPlayback){$('followSong').checked=true;refreshLoop();}
  const phraseIndex=practice.soloPhrases.findIndex(p=>current().start>=p.start&&current().start<p.end);if(phraseIndex>=0)activePhrase=phraseIndex;
  render();
 }
 function goToTime(time){const index=practice.atTime(time);if(index<0)return false;selectChord(index,{seek:false});seek(time);return true;}
 function selectSection(value){video.pause();stopSynth();$('followSong').checked=true;if(value==='all'){scope='all';sectionFilter=-1;render();return;}scope='section';sectionFilter=Number(value);const section=sections[sectionFilter];selected=practice.atTime(section.start);custom=false;melodyNote=null;frets=[...current().frets];seek(section.start);refreshLoop();render();}

 function enterCustom(){video.pause();stopSynth();custom=true;melodyNote=null;$('followSong').checked=false;}
 function restore({seek:shouldSeek=true}={}){custom=false;melodyNote=null;frets=[...current().frets];$('followSong').checked=true;if(shouldSeek)seek(current().start);render();}
 $('lessonSteps').addEventListener('click',e=>{let el=e.target.closest('[data-step]');if(el)selectChord(Number(el.dataset.step));});
 $('fretboard').addEventListener('click',e=>{let cell=e.target.closest('[data-string]'),mute=e.target.closest('[data-mute]');if(!cell&&!mute)return;enterCustom();if(mute){let i=Number(mute.dataset.mute);frets[i]=frets[i]<0?0:-1;if(frets[i]>=0)playNotes([core.noteAt(i,0).midi]);}else{let i=Number(cell.dataset.string),f=Number(cell.dataset.fret);frets[i]=frets[i]===f?-1:f;if(frets[i]>=0)playNotes([core.noteAt(i,f).midi]);}render();});
 $('stringNotes').addEventListener('click',e=>{const b=e.target.closest('[data-play-string]');if(!b)return;let i=Number(b.dataset.playString),n=core.noteAt(i,frets[i]);if(n)playNotes([n.midi]);else notify(`${6-i} 弦不弹，保持静音。`);});
 $('playChord').addEventListener('click',()=>{playNotes(core.notesFor(frets).filter(Boolean).map(n=>n.midi));notify('合成试音 · 实际发声的和弦音');});
 $('playArpeggio').addEventListener('click',()=>playNotes(core.notesFor(frets).filter(Boolean).map(n=>n.midi),.48));
 $('playMelody').addEventListener('click',()=>playNotes([65,66,67],.85));
 document.querySelectorAll('[data-melody]').forEach(b=>b.addEventListener('click',()=>playNotes([Number(b.dataset.melody)])));
 $('prevChord').onclick=()=>selectChord(selected-1);
 $('nextChord').onclick=()=>selectChord(selected+1);
 $('tailScope').onclick=()=>{scope='tail';selectChord(events.findIndex(e=>Math.abs(e.start-41.6)<.02));};$('allScope').onclick=()=>{scope='all';render();};
 $('restoreChord').onclick=()=>restore();
 document.querySelectorAll('[data-label]').forEach(b=>b.onclick=()=>{labelMode=b.dataset.label;document.querySelectorAll('[data-label]').forEach(x=>x.classList.toggle('selected',x===b));renderBoard(getView());});
 $('showAllNotes').onchange=e=>{showAll=e.target.checked;renderBoard(getView());};
 $('speedSelect').onchange=e=>{video.playbackRate=Number(e.target.value);};video.preservesPitch=true;
 $('playSong').onclick=()=>{if(!video.paused){video.pause();return;}if(melodyNote)restore({seek:false});if(video.ended)seek(loopAnchor?.start||0);if(loopAnchor&&(video.currentTime<loopAnchor.start||video.currentTime>=loopAnchor.end-.04))seek(loopAnchor.start);video.play().catch(()=>notify('原视频暂不能播放，可先用指板合成试音。'));};
 video.addEventListener('play',()=>{$('playSong').textContent='Ⅱ 暂停完整演奏';});video.addEventListener('pause',()=>{$('playSong').textContent='▶ 播放完整演奏';});
 $('followSong').onchange=e=>{if(e.target.checked){custom=false;melodyNote=null;selected=practice.atTime(video.currentTime);frets=[...current().frets];if(scope==='section')sectionFilter=practice.sectionAt(video.currentTime);refreshLoop();render();}};
 $('loopMode').onchange=()=>{if(custom||melodyNote)restore({seek:false});refreshLoop();if(loopAnchor&&(video.currentTime<loopAnchor.start||video.currentTime>=loopAnchor.end))seek(loopAnchor.start);};
 function updateFromTime(){
  const t=video.currentTime;$('absoluteTime').textContent=clock(t);
  if(!custom&&!video.paused&&loopAnchor&&(t>=Math.min(loopAnchor.end,video.duration)-.035||t<loopAnchor.start-.05)){seek(loopAnchor.start);return;}
  if($('followSong').checked&&!custom&&!melodyNote){const index=practice.atTime(t);if(index>=0&&index!==selected){if(scope==='section'&&!loopAnchor)sectionFilter=practice.sectionAt(t);selectChord(index,{seek:false,fromPlayback:true});}}
 }

 video.addEventListener('timeupdate',updateFromTime);video.addEventListener('seeked',updateFromTime);video.addEventListener('play',()=>{pauseOtherMedia(video);stopSynth();if(custom&&$('followSong').checked)restore();});
 video.addEventListener('ended',()=>{if(loopAnchor&&!custom){seek(loopAnchor.start);video.play().catch(()=>notify('请点播放继续循环。'));}});
 video.addEventListener('error',()=>notify('原片段暂未加载，可先用指板合成试音。'));
 document.querySelectorAll('audio').forEach(a=>a.addEventListener('play',()=>{pauseOtherMedia(a);stopSynth();}));
 $('practiced').onchange=e=>{if(e.target.checked)practiced.add(current().id);else practiced.delete(current().id);try{localStorage.setItem('string-notes-practiced',JSON.stringify([...practiced]));}catch{}renderSteps();};
 for(const [trigger,dialog] of [['helpButton','helpDialog'],['evidenceButton','evidenceDialog']]){$(trigger).onclick=()=>$(dialog).showModal();$(dialog).querySelectorAll('.dialog-close').forEach(b=>b.onclick=()=>$(dialog).close());$(dialog).addEventListener('click',e=>{if(e.target===$(dialog)){const r=$(dialog).getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)$(dialog).close();}});}
 video.addEventListener('loadedmetadata',()=>{if(pendingSeek!==null)seek(pendingSeek);});
 function showAt(id,event){const index=events.findIndex(e=>Math.abs(e.start-event.start)<.01&&e.voicingId===id);if(index<0)return false;video.pause();scope='section';sectionFilter=practice.sectionAt(event.start);selectChord(index);return true;}
 $('practiceSection').innerHTML='<option value="all">整首演奏 · 00:00–04:07</option>'+sections.map((s,i)=>`<option value="${i}">${String(i+1).padStart(2,'0')} · ${esc(s.title)} · ${clock(s.start)}</option>`).join('');
 $('practiceSection').onchange=e=>selectSection(e.target.value);
 $('soloPractice').addEventListener('click',e=>{
  const phraseButton=e.target.closest('[data-solo-phrase]'),noteButton=e.target.closest('[data-solo-note]'),action=e.target.closest('[data-solo-action]');
  if(phraseButton){video.pause();const index=Number(phraseButton.dataset.soloPhrase),p=practice.soloPhrases[index];goToTime(p.start);activePhrase=index;render();return;}
  const phrase=practice.soloPhrases[activePhrase];
  if(noteButton){showMelodyNote(Number(noteButton.dataset.soloNote),true);return;}
  if(!action)return;
  if(action.dataset.soloAction==='sequence')playSoloExercise();
  if(action.dataset.soloAction==='original'){goToTime(phrase.start);$('loopMode').value='none';loopAnchor=null;video.play().catch(()=>notify('请再点播放原片。'));}
  if(action.dataset.soloAction==='restore'){restore({seek:false});updateFromTime();}
 });
 function showMelodyNote(index,audition=false){const n=practice.soloPhrases[activePhrase].teachingNotes[index];if(!n)return;custom=false;melodyNote={...n,practiceIndex:index};frets=[-1,-1,-1,-1,-1,-1];frets[6-n.string]=n.fret;$('followSong').checked=false;if(audition)playNotes([n.midi]);render();}
 async function playSoloExercise(){pauseOtherMedia();stopSynth();const phrase=practice.soloPhrases[activePhrase];try{await ensureAudio();const now=audioCtx.currentTime+.025;phrase.teachingNotes.forEach((n,i)=>{tone(n.midi,now+i*.6,.8,.12);scheduledVisual.push(setTimeout(()=>showMelodyNote(i),25+i*600));});notify('合成简化练习 · 指板按教学音序移动');}catch{notify('暂时无法试音，仍可逐个点击音名查看按位。');}}
 video.src=window.FULL_ANALYSIS.meta.videoSrc;render();

 window.StringNotes={getState:()=>({selected,total:events.length,scope,sectionFilter,custom,melodyNote:melodyNote?.name||null,frets:[...frets],view:getView(),sourceTime:video.currentTime,loopAnchor}),selectChord,showAt,goToTime,selectSection,openPractice:()=>restore({seek:false}),enterFree:()=>{enterCustom();render();},stopSynth};
})();
