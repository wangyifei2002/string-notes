(() => {
 'use strict';
 const $=id=>document.getElementById(id), data=window.LESSON, practice=window.PracticeData, events=practice.events, sections=practice.sections, core=window.GuitarCore, video=window.MediaPlayers?.mount($('songVideo'),window.FULL_ANALYSIS.meta)||$('songVideo');
 const songId=data.id||window.SONG?.id||'currently', progressKey='string-notes-practiced:'+songId;
 const introStarts=data.ui?.introStartTimes||[41.6,43.1,44.2];
 const flat=['C','D♭','D','E♭','E','F','G♭','G','A♭','A','B♭','B'];
 const colors={root:'#c6754e',third:'#8b76b6',fifth:'#538ca1',seventh:'#4f927e',color:'#b58c3d',unknown:'#7e8789'};
 const titles={'7':'属七和弦','m7':'小七和弦','m7b5':'半减七和弦','dim7':'减七和弦','7#5':'升五音属七和弦','9':'属九和弦','9(no5)':'省略五音的属九和弦','major':'大三和弦','minor':'小三和弦','maj7':'大七和弦','sus2':'挂二和弦','sus4':'挂四和弦','5':'五度和弦'};
 let selected=0, frets=[...events[0].frets], scope='all', sectionFilter=-1, custom=false,labelMode='note',showAll=false,melodyNote=null,activePhrase=0,pendingSeek=null,loopAnchor=null;
 let shapeMode='song';
 let practiced=new Set(), audioCtx=null, liveOsc=[], toastTimer=0, scheduledVisual=[], mapSectionIndex=-1;
 try{practiced=new Set(JSON.parse(localStorage.getItem(progressKey)||(songId==='currently'?localStorage.getItem('string-notes-practiced'):null)||'[]'));}catch{}
 const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const clock=t=>`${String(Math.floor(t/60)).padStart(2,'0')}:${(t%60).toFixed(2).padStart(5,'0')}`;
 const current=()=>events[selected];
 const timeBase=()=>0;
 const playbackTime=()=>pendingSeek?.time??video.currentTime;
 const shortClock=t=>`${String(Math.floor(t/60)).padStart(2,'0')}:${String(Math.floor(t%60)).padStart(2,'0')}`;
 const visibleIndices=()=>events.map((_,i)=>i).filter(i=>scope==='tail'?introStarts.some(t=>Math.abs(events[i].start-t)<.02):scope==='section'?events[i].start<sections[sectionFilter].end&&events[i].end>sections[sectionFilter].start:true);
 function roleOf(degree){const step=Number(String(degree).match(/\d+$/)?.[0]);return({1:'root',3:'third',5:'fifth',7:'seventh'})[step]||(step?'color':'unknown');}
 function chordRole(note){
  if(melodyNote&&!custom)return{degree:'',name:'旋律音'};
  const degree=String(note?.degree||''),match=degree.match(/^[♭♯♮]*(\d+)$/);
  if(!match)return{degree:'',name:'关系待定'};
  const names={1:'根音',2:'二音',3:'三音',4:'四音',5:'五音',6:'六音',7:'七音',8:'八音',9:'九音',11:'十一音',13:'十三音'};
  return{degree,name:names[Number(match[1])]||'和弦音'};
 }
 function intervalInfo(delta,quality){let deg={0:'1',1:'♭9',2:'9',3:'♭3',4:'3',5:'4',6:'♭5',7:'5',8:'♯5',9:'6',10:'♭7',11:'7'}[delta];if(quality==='dim7'&&delta===9)deg='♭♭7';if(quality==='sus2'&&delta===2)deg='2';const role=roleOf(deg);return{degree:deg,role:({'root':'根音','third':'三音','fifth':'五音','seventh':'七音','color':'色彩音'})[role],color:colors[role]};}
 function spellTone(rootPc,degree,midi){const letters=['C','D','E','F','G','A','B'],naturals=[0,2,4,5,7,9,11],step=Number(degree.match(/\d+/)?.[0]||1),idx=(letters.indexOf(flat[rootPc][0])+step-1)%7,pc=midi%12,delta=((pc-naturals[idx]+18)%12)-6;const name=letters[idx]+(delta>0?'♯'.repeat(delta):'♭'.repeat(-delta));return{name,octave:(midi-naturals[idx]-delta)/12-1};}
 function getView(){
  if(melodyNote&&!custom)return {name:melodyNote.label+' · 旋律练习',quality:null,rootPc:null,tones:[{name:melodyNote.name,degree:'·',present:true}],notes:[melodyNote],candidates:[]};
  if(shapeMode==='classic'&&!custom&&classicShape())return classicView(classicShape());
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
 function classicShape(){return(window.CHORD_SHAPES||[]).find(shape=>shape.matches?.some(match=>match.songId===songId&&match.voicingId===current().voicingId));}
 function classicView(shape){
  const notes=core.notesFor(shape.frets).map((note,i)=>{if(!note)return null;const info=intervalInfo((note.pc-shape.rootPc+12)%12,shape.quality),spelling=spellTone(shape.rootPc,info.degree,note.midi);return{...note,...info,name:spelling.name,label:spelling.name+spelling.octave,string:6-i,fret:shape.frets[i]};}).filter(Boolean);
  const tones=[...new Set(notes.map(note=>note.pc))].map(pc=>{const n=notes.find(note=>note.pc===pc);return{name:n.name,pc,degree:n.degree,role:n.role,present:true};});
  return{name:shape.name,quality:shape.quality,rootPc:shape.rootPc,tones,notes,candidates:[]};
 }
 function renderShapeChoice(){
  const shape=classicShape(),available=!custom&&!melodyNote&&!!current().notes.length;
  $('shapeChoice').hidden=!available;
  if(!available)return;
  $('shapeMode').innerHTML='<option value="song">本曲按法与选弦</option>'+(shape?`<option value="classic">${esc(shape.sourceLabel||'经典常用按法')} · ${esc(shape.name)}</option>`:'');
  $('shapeMode').value=shapeMode;$('shapeMode').disabled=!shape;
  $('openShapeLibrary').href=shape?`chords.html?shape=${encodeURIComponent(shape.id)}`:'chords.html';
  $('openShapeLibrary').textContent=shape?`在手形库练 ${shape.name} →`:'打开常用和弦手形库 →';
  const verified=current().handPlan?.videoVerified===true;
  const conventional=shape&&current().frets.every((f,i)=>f<0||f===shape.frets[i]);
  $('shapeSourceNote').textContent=shapeMode==='classic'?`${shape.sourceLabel||'经典常用按法'} · ${shape.family}。这是独立的完整和弦练习，试听按这里显示的选弦发声。`:
   verified?'按法来源：视频中已核实的手形；本次拨弦另行显示。':songId==='sunshine'?'按法来源：同一演奏者的配套教学选弦，结合经典开放和弦手形。视频中的全部指头尚未逐处核实；可切到经典完整按法，学习这套手形在其他歌曲中的用法。':'当前为本曲的教学配音，原演奏逐指按法仍待核对。经典完整按法单独列出，便于学习通用手形与本曲选弦的区别。';
  if(shapeMode==='song'&&!verified&&songId!=='sunshine'&&conventional)$('shapeSourceNote').textContent=`按法来源：${shape.sourceLabel||'经典常用按法'} · ${shape.family}，用于本曲的教学选弦。手形有教材依据，原视频中的逐指动作仍待核对。`;
  $('shapeTransfer').textContent=shape?`可带走的手形：${shape.family} · ${shape.transfer}`:'优先核实原演奏手形；没有可靠画面时，采用有来源的常用按法。';
 }
 function chooseShapeMode(mode){
  if(mode!=='classic'||!classicShape()){restore({seek:false});return;}
  video.pause();stopSynth();custom=false;melodyNote=null;shapeMode='classic';frets=[...classicShape().frets];$('followSong').checked=false;loopAnchor=null;render();
 }
 function currentHandPlan(){
  if(shapeMode==='classic'&&!custom&&!melodyNote){const shape=classicShape();if(shape){const strings=shape.frets.flatMap((f,i)=>f>=0?[6-i]:[]);return{gripFrets:shape.frets.map(f=>f<0?null:f),fingerNumbers:shape.fingers,pluckStrings:strings,steps:strings.map(string=>({label:`拨第 ${string} 弦`,strings:[string]})),leftText:shape.leftText,rightText:`完整和弦练习：拨第 ${strings.join('、')} 弦；先逐弦检查，再合起来弹。回到“本曲按法与选弦”可比较歌曲中省略了哪些弦。`,evidence:`${shape.sourceLabel||'经典常用按法'} · ${shape.family}。完整手形练习独立于原视频；教材来源见手形库。`};}}
  if(!custom&&!melodyNote)return current().handPlan;
  return {gripFrets:frets.map(f=>f<0?null:f),fingerNumbers:frets.map((f,i)=>melodyNote&&6-i===melodyNote.string?melodyNote.finger:null),pluckStrings:frets.flatMap((f,i)=>f>=0?[6-i]:[]),steps:[],rightText:melodyNote?'只拨旋律音所在的一根弦。':'自由指板中，选中的音都参与试音。',evidence:melodyNote?'独立旋律教学练习，不与原片逐音同步。':'当前为自由选音；回到歌曲按法可查看左右手分工。'};
 }
 function gripNote(view,i,f){
  const n=core.noteAt(i,f),canonical=view.tones.find(t=>t.pc===n.pc),info=intervalInfo((n.pc-(view.rootPc??n.pc)+12)%12,view.quality),degree=canonical?.degree||info.degree;
  const spelling=view.quality?spellTone(view.rootPc,degree,n.midi):{name:n.flatName,octave:n.octave};
  return {...n,name:spelling.name,label:spelling.name+spelling.octave,degree:view.quality?degree:'',string:6-i,fret:f};
 }
 function renderHandPlan(view){
  const plan=currentHandPlan(),available=!!plan&&view.notes.length>0;
  $('handPlan').hidden=!available;
  $('boardSelectionHelp').textContent=available?'实心音点：本次拨响。虚线音点：保留按位或空弦，本次不拨。左侧 × 表示不拨；0 表示拨空弦；● 表示拨按住的弦。':'此处没有已指定的左手按法与右手选弦；空指板不补写动作。';
  if(!available){$('pickingSteps').innerHTML='';$('rightHandSummary').textContent='';$('pluckStringSummary').textContent='';$('handPlanEvidence').textContent='';return;}
  $('rightHandSummary').textContent=plan.rightText;
  $('handPlanEvidence').textContent=plan.evidence;
  $('pluckStringSummary').textContent='本次拨弦：'+plan.pluckStrings.map(string=>{const n=view.notes.find(note=>note.string===string);return`${string}弦 ${n?.name||''}`;}).join(' · ');
  $('pickingSteps').innerHTML=plan.steps.map((step,index)=>`<button type="button" class="pick-step" data-pick-step="${index}" aria-label="试听步骤 ${index+1}：${esc(step.label)}"><small>步骤 ${index+1} · 合成示范</small><strong>${esc(step.label)}</strong><span>${step.strings.map(string=>{const n=view.notes.find(note=>note.string===string);return`${string}弦 ${esc(n?.name||'')}`;}).join(' + ')}</span></button>`).join('');
  $('pickingSteps').hidden=!plan.steps.length;
 }
 function notify(message){$('toast').textContent=message;$('toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').classList.remove('show'),2600);}
 function pauseOtherMedia(except){if(window.MediaPlayers)return window.MediaPlayers.pauseAll(except);document.querySelectorAll('audio,video').forEach(el=>{if(el!==except)el.pause();});}
 function stopSynth(){scheduledVisual.forEach(clearTimeout);scheduledVisual=[];liveOsc.forEach(n=>{try{n.stop();}catch{}});liveOsc=[];}
 async function ensureAudio(){if(!audioCtx){const C=window.AudioContext||window.webkitAudioContext;if(!C)throw new Error('no_audio');audioCtx=new C();}if(audioCtx.state==='suspended')await audioCtx.resume();return audioCtx;}
 function tone(midi,start,duration=1.4,volume=.1){const gain=audioCtx.createGain(), filter=audioCtx.createBiquadFilter(), oscillator=audioCtx.createOscillator();const f=440*Math.pow(2,(midi-69)/12);oscillator.type='triangle';oscillator.frequency.value=f;filter.type='lowpass';filter.frequency.setValueAtTime(Math.min(5000,f*9),start);filter.frequency.exponentialRampToValueAtTime(Math.max(300,f*2),start+duration);gain.gain.setValueAtTime(0,start);gain.gain.linearRampToValueAtTime(volume,start+.006);gain.gain.exponentialRampToValueAtTime(.0001,start+duration);oscillator.connect(filter).connect(gain).connect(audioCtx.destination);oscillator.start(start);oscillator.stop(start+duration+.03);liveOsc.push(oscillator);oscillator.onended=()=>{oscillator.disconnect();filter.disconnect();gain.disconnect();liveOsc=liveOsc.filter(o=>o!==oscillator);};}
 async function playNotes(midis,step=.04){if(!midis.length){notify('先在指板上选择一个音。');return;}pauseOtherMedia();stopSynth();try{await ensureAudio();const now=audioCtx.currentTime+.025;midis.forEach((m,i)=>tone(m,now+i*step,1.5,step>.2?.13:.09));}catch{notify('暂时无法试音，请检查浏览器声音设置。');}}
 function renderSteps(){
  const ids=visibleIndices(),list=$('lessonSteps'),previousScroll=list.scrollLeft;
  list.innerHTML=ids.map(idx=>{const e=events[idx],active=selected===idx&&!custom;return `<button class="step-item ${active?'active':''} ${e.notes.length?'':'unresolved'}" data-step="${idx}" ${active?'aria-current="step"':''}><span class="step-num">${esc(e.analysisEvent.rootDegree||'·')}</span><span><strong>${esc(e.name)}</strong><small>${clock(e.start)}–${clock(e.end)}</small></span><span class="step-check">${practiced.has(e.id)?'✓':e.notes.length?'›':'待定'}</span></button>`;}).join('');
  list.scrollLeft=previousScroll;const active=list.querySelector('[aria-current="step"]');if(active&&(active.offsetLeft<list.scrollLeft||active.offsetLeft+active.offsetWidth>list.scrollLeft+list.clientWidth)){list.scrollLeft=Math.max(0,active.offsetLeft-list.clientWidth/2+active.offsetWidth/2);}
  $('tailScope').classList.toggle('selected',scope==='tail');$('allScope').classList.toggle('selected',scope==='all');$('practiceSection').value=scope==='section'?String(sectionFilter):'all';
  const known=events.filter(e=>e.notes.length),done=known.filter(e=>practiced.has(e.id)).length;
  $('practiceCoverage').textContent=`全曲 ${clock(data.source.duration)} · ${known.length} 处和弦教学按法 · ${events.length-known.length} 处旋律 / 待定 / 余音`;
  $('practiceProgress').textContent=`已练 ${done} / ${known.length} 处和弦 · 点击时点可跳播`;
 }
 function renderPracticeMap(){
  const kinds={voice:['伴唱','voice'],solo:['Solo','solo'],talk:['谈话＋吉他','talk'],outro:['收束','outro']};
  $('practiceTimeline').innerHTML=sections.map((s,i)=>`<button type="button" class="fa-timeline-part ${(kinds[s.type]||['段落','other'])[1]}" style="flex:${s.end-s.start}" data-practice-section="${i}" aria-controls="songVideo fretboard lessonSteps" aria-label="${esc(s.title)}，${shortClock(s.start)}到${shortClock(s.end)}"><span>${i+1}</span></button>`).join('')+'<span class="fa-playhead" id="practicePlayhead" aria-hidden="true"></span>';
  $('practiceChapters').innerHTML=sections.map((s,i)=>`<button type="button" class="fa-chapter ${(kinds[s.type]||['段落','other'])[1]}" data-practice-section="${i}" aria-controls="songVideo fretboard lessonSteps"><span class="fa-chapter-no">${String(i+1).padStart(2,'0')}</span><span><strong>${esc(s.title)}</strong><small>${shortClock(s.start)}–${shortClock(s.end)} · ${(kinds[s.type]||['段落'])[0]}</small></span></button>`).join('');
  updatePracticeMap();
 }
 function updatePracticeMap(time=playbackTime()){
  const index=practice.sectionAt(time),map=$('practiceMap');if(!map)return;
  map.querySelectorAll('[data-practice-section]').forEach(button=>{const active=Number(button.dataset.practiceSection)===index;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});
  const playhead=$('practicePlayhead');if(playhead)playhead.style.left=`${Math.max(0,Math.min(100,time/data.source.duration*100))}%`;
  if(mapSectionIndex!==index){
   mapSectionIndex=index;const list=$('practiceChapters'),active=list.querySelector(`[data-practice-section="${index}"]`);
   if(active&&(active.offsetLeft<list.scrollLeft||active.offsetLeft+active.offsetWidth>list.scrollLeft+list.clientWidth))list.scrollLeft=Math.max(0,active.offsetLeft-list.clientWidth/2+active.offsetWidth/2);
  }
 }
 function applyPendingSeek(){
  if(!pendingSeek||pendingSeek.applied||video.readyState<1)return;
  const request=pendingSeek;
  try{request.applied=true;if(Math.abs(video.currentTime-request.time)>.001)video.currentTime=request.time;if(!video.seeking&&Math.abs(video.currentTime-request.time)<.05)pendingSeek=null;}catch{request.applied=false;}
 }
 function seek(time){const end=Number.isFinite(video.duration)?video.duration:data.source.duration,t=Math.max(0,Math.min(Number(time)||0,end-.001));pendingSeek={time:t,applied:false};$('absoluteTime').textContent=clock(t);updatePracticeMap(t);applyPendingSeek();}
 function selectedSection(){return sections[scope==='section'?sectionFilter:practice.sectionAt(Math.max(current().start,Math.min(playbackTime(),current().end-.001)))];}
 function refreshLoop(){const mode=$('loopMode').value,section=selectedSection();loopAnchor=mode==='chord'?{start:scope==='section'?Math.max(current().start,section.start):current().start,end:scope==='section'?Math.min(current().end,section.end):current().end}:mode==='section'?{start:section.start,end:section.end}:null;}
 function renderSolo(){
  const section=selectedSection(),show=section?.type==='solo'&&practice.soloPhrases.length>0;$('soloPractice').hidden=!show;if(!show)return;
  const phrases=practice.soloPhrases;if(activePhrase<0||activePhrase>=phrases.length)activePhrase=0;const phrase=phrases[activePhrase];
  $('soloPractice').innerHTML=`<div class="eyebrow">Solo · 逐音练习按位</div><h3>先练一句旋律，再听原片。</h3><p>下面是依据分析材料设计的简化练习，音序、节奏和把位均为教学改写。原片播放时只跟随和声候选，不把这些练习音伪装成逐音转录。</p><div class="solo-phrase-tabs">${phrases.map((p,i)=>`<button data-solo-phrase="${i}" class="${i===activePhrase?'selected':''}">${i+1} · ${esc(p.title)}</button>`).join('')}</div><p><strong>${clock(phrase.start)}–${clock(phrase.end)}</strong> · ${esc(phrase.exercise)}</p><div class="solo-note-buttons">${phrase.teachingNotes.map((n,i)=>`<button data-solo-note="${i}" class="${melodyNote?.practiceIndex===i?'selected':''}"><strong>${esc(n.name)}</strong><span>${n.string}弦 ${n.fret}品 · ${n.finger}指</span></button>`).join('')}</div><div class="solo-practice-actions"><button class="secondary" data-solo-action="sequence">♪ 听简化练习</button><button class="primary" data-solo-action="original">▶ 对照这一句原片</button><button class="text-button" data-solo-action="restore">回到全曲跟随</button></div><small>${esc(phrase.teachingLabel||'教学音序 · 不按原演奏时间逐音同步')}</small>`;
 }

 function renderBoard(view){
  const plan=currentHandPlan();
  let html='<div class="fret-head"><span>弦号</span>'+Array.from({length:13},(_,f)=>`<span>${f===0?'空弦':f}</span>`).join('')+'</div>';
  for(let i=5;i>=0;i--){
   const string=6-i,soundingNote=view.notes.find(n=>n.string===string),grip=plan?.gripFrets[i],unplayed=frets[i]<0;
   const status=unplayed?'本次不拨':frets[i]===0?'拨空弦':`拨按在${frets[i]}品的弦`;
   html+=`<div class="fret-row" style="--string-width:${1+(5-i)*.32}px"><div class="string-label"><b>${string}</b><span>${['E','A','D','G','B','E'][i]}</span><button class="mute-button ${unplayed?'active':''}" data-mute="${i}" title="${status}" aria-label="${string}弦，${status}；点击${unplayed?'开启空弦':'取消发声'}">${unplayed?'×':frets[i]===0?'0':'●'}</button></div>`;
   for(let f=0;f<=12;f++){
    const n=core.noteAt(i,f),active=frets[i]===f,held=!active&&grip===f,note=active?soundingNote:held?gripNote(view,i,f):null;
    const role=note?roleOf(note.degree):'root',finger=custom?'':(plan?.fingerNumbers[i]??''),identity=chordRole(note),identityText=[identity.degree,identity.name].filter(Boolean).join(' ');
    let text=note?.name??n.flatName;
    if(labelMode==='degree')text=note?.degree??'·';if(labelMode==='finger')text=custom?'·':finger||'0';
    let content='';
    if(active)content=`<span class="note-dot" data-finger="${labelMode==='finger'?'':finger}" style="--role-color:${colors[role]}">${esc(text)}</span><span class="note-role" data-degree="${esc(identity.degree)}">${identity.degree&&labelMode!=='degree'?`<b>${esc(identity.degree)}</b> `:''}${esc(identity.name)}</span>`;
    else if(held)content=`<span class="held-dot" data-finger="${labelMode==='finger'?'':finger}" style="--role-color:${colors[role]}">${esc(text)}</span><span class="held-role" data-degree="${esc(identity.degree)}">${esc(identityText)}<small>${f===0?'空弦':'按住'}·不拨</small></span>`;
    else if(showAll)content=`<span class="ghost-note">${esc(n.flatName)}</span>`;
    else if([3,5,7,9,12].includes(f)&&i===3)content='<span class="position-dot"></span>';
    const aria=`${string}弦${f===0?'空弦':f+'品'}，${note?note.label:n.flatName+n.octave}${active||held?'，'+identityText+(finger?'，左手'+finger+'指':'')+(active?'，本次拨响，已选择':f===0?'，保留空弦，本次不拨':'，按住但本次不拨'):''}`;
    html+=`<button class="fret-cell ${f===0?'open':''} ${active?'is-active':''} ${held?'is-held':''}" data-string="${i}" data-fret="${f}" aria-pressed="${active}" aria-label="${esc(aria)}">${content}</button>`;
   }
   html+='</div>';
  }
  const scroller=document.querySelector('.board-scroll'),previousScroll=scroller.scrollLeft;$('fretboard').innerHTML=html;
  if(custom){scroller.scrollLeft=previousScroll;}else if(scroller.scrollWidth>scroller.clientWidth){const markers=[...$('fretboard').querySelectorAll('.is-active,.is-held')];if(markers.length){const left=Math.min(...markers.map(el=>el.offsetLeft)),right=Math.max(...markers.map(el=>el.offsetLeft+el.offsetWidth));scroller.scrollLeft=Math.max(0,(left+right)/2-scroller.clientWidth/2);}}
 }
 function render(){const view=getView(),s=current(),pos=visibleIndices().indexOf(selected);renderSteps();renderBoard(view);renderHandPlan(view);renderShapeChoice();renderSolo();updatePracticeMap();
  const section=selectedSection();$('songContext').hidden=false;$('songContext').innerHTML=`<strong>${esc(section.title)} · ${clock(s.start)}–${clock(s.end)}</strong><span>${shapeMode==='classic'&&!custom?'正在练经典完整手形；已暂停视频跟随，可随时切回本曲选弦。':melodyNote?'正在查看独立的Solo教学音；点击“回到全曲跟随”恢复原片时间轴。':s.notes.length?'左手按法与右手选弦分别显示 · 教学方案，不代表原演奏逐指复原。':esc(s.analysisEvent?.practiceMessage||'此处未确定完整和弦。空指板表示尚未标注，不表示原演奏静音。')}</span>`;
  $('followSong').disabled=false;document.querySelector('.cover-label').textContent='完整演奏 · '+shortClock(data.source.duration);
  const harmony=s.analysisEvent;
  $('harmonicContext').hidden=custom||!!melodyNote||!harmony;$('harmonicContext').innerHTML=harmony?`<div><small>${esc(window.FULL_ANALYSIS.overview.tonic)} 调性参照 · 根音级数</small><strong>${esc(harmony.rootDegree)} <span>${esc(harmony.roman)}</span></strong></div><p>${esc(harmony.functionText)}</p>`:'';
  if(!$('practiceView').hidden){$('lessonMode').classList.toggle('active',!custom);$('freeMode').classList.toggle('active',custom);}$('customBanner').hidden=!custom;
  $('stepKicker').textContent=custom?'自由探索 · 每根弦选择一个按位':shapeMode==='classic'?'经典手形练习 · 可以用于其他歌曲':melodyNote?'Solo简化练习 · 当前单音按位':`全曲第 ${selected+1} / ${events.length} 处 · ${section.title}`;
  $('chordName').textContent=view.name;$('modeTag').textContent=custom?'音组识别':shapeMode==='classic'?(classicShape().sourceLabel||'经典常用按法'):melodyNote?'旋律教学改写':s.notes.length?'教学按法':s.analysisEvent?.practiceMessage?'留白练习':'待核对';
  $('chordSubtitle').textContent=custom?(view.candidates.length?`按实际音组识别${view.candidates.length>1?' · 其他解释：'+view.candidates.slice(1).map(c=>c.label).join('、'):''}`:view.notes.length?'只显示实际音高；尚未确定和弦。':'点击指板开始选音。'):shapeMode==='classic'?`${classicShape().family} · 完整手形练习`:melodyNote?`${melodyNote.string}弦 ${melodyNote.fret}品 · 左手${melodyNote.finger}指 · 独立教学音序`:s.quality?`${titles[s.quality]||s.quality} · 本次演奏 ${clock(s.start)}`:s.kind==='solo'?'Solo旋律区域 · 完整和弦与原指法待核对':s.kind==='decay'?'余音与静默 · 不新增和弦':'连接音型 · 根音与原指法待核对';
  $('practiceEvidence').textContent=shapeMode==='classic'&&!custom?'当前为手形库中的独立练习，未将其标为原演奏逐指动作；教材来源、教学变体说明与迁移用法见手形库。':melodyNote?'教学改写：该按位可以发出所示音高，但不代表原演奏者当时的动作。':`${({confirmed:'已核对',verified:'已核对',high:'较一致候选',medium:'分析候选',low:'需复核'})[harmony.confidence]||'待核对'}：${harmony.evidence||'暂无可靠原音指法。'}`;
  $('toneChips').innerHTML=view.tones.map(t=>`<div class="tone-chip ${t.present===false?'omitted':''}" style="--role-color:${colors[roleOf(t.degree)]}"><i></i><b>${esc(t.name)}</b><span>${esc(t.degree)}${t.present===false?' · 省略':''}</span></div>`).join('')||'<span class="omission-note">还没有发声音</span>';
  $('omissionNote').textContent=view.tones.some(t=>t.present===false)?'虚线音未在此指法中弹出。':'';
  $('stringNotes').innerHTML=frets.map((f,i)=>{const n=view.notes.find(n=>n.string===6-i);const role=n?(custom&&!view.candidates.length&&n.degree==='1'?'参照音':n.role):'';return`<button class="string-note ${f<0?'muted':''}" data-play-string="${i}" style="--role-color:${n?colors[roleOf(n.degree)]:'#aaa'}"><small>${6-i} 弦 · ${f<0?'不弹':f===0?'空弦':f+' 品'}</small><b>${n?esc(n.label):'×'}</b><span>${n?esc(n.degree+' · '+role):(!custom&&!melodyNote&&!s.notes.length?'未标注':currentHandPlan()?.gripFrets[i]>0?'按住但不拨':currentHandPlan()?.gripFrets[i]===0?'空弦但不拨':'本次不拨')}</span></button>`;}).join('');
  $('tabText').textContent=(currentHandPlan()?.gripFrets||frets).map(f=>f===null||f<0?'—':f).join(' ');
  $('fingerGuide').textContent=custom?'这是你选择的按位。自由指板不自动指定左手指号；先让每个音清楚发声。':melodyNote?`左手${melodyNote.finger}指按第${melodyNote.string}弦第${melodyNote.fret}品，只拨这一根弦。建议指号可按手型调整，这是教学按位。`:currentHandPlan()?.leftText||s.leftHand||s.fingerGuide;
  $('alternateWrap').hidden=custom||shapeMode==='classic'||!!melodyNote||!s.fingerAlternatives?.length;$('alternateText').textContent=(s.fingerAlternatives||[]).join(' ');
  $('whyTitle').textContent=melodyNote?'一个按位，对应一个音高':view.notes.length===0?'这里保留不确定性':view.quality?`${view.tones.filter(t=>t.present!==false).map(t=>t.name).join(' · ')} → ${view.name}`:'从实际发声音开始';
  $('whyText').textContent=custom?(view.candidates.length?'和弦名称来自实际音高组合。同一个音可出现在不同弦上；把位与音色可能改变。':'一个或少数音高不能唯一决定完整和弦，继续添加音来比较。'):shapeMode==='classic'?classicShape().description:melodyNote?'点击上方的下一个练习音，观察手指怎样移动。旋律练习的音序由教学设计，不声称与原音逐个对应。':s.explanation;
  $('movementText').textContent=custom?'小实验：保留其他按位，只把一根弦移动一品。先听变化，再看音名。':shapeMode==='classic'?`${classicShape().practice} ${classicShape().transfer}`:melodyNote?'先把音弹清楚，再用原视频对照旋律的方向和句间留白。':s.transition;
  $('practiced').checked=practiced.has(s.id);$('practiced').disabled=custom||shapeMode==='classic'||!!melodyNote||!s.notes.length;
  $('prevChord').disabled=custom||selected<=0;$('nextChord').disabled=custom||selected===events.length-1;
  $('playChord').disabled=!view.notes.length;$('playArpeggio').disabled=!view.notes.length;
 }
 function selectChord(index,{seek:shouldSeek=true,fromPlayback=false}={}){
  if(!events[index])return;if(!fromPlayback)stopSynth();selected=index;custom=false;shapeMode='song';melodyNote=null;frets=[...current().frets];
  if(!visibleIndices().includes(index)){if(scope==='section')sectionFilter=practice.sectionAt(current().start);else scope='all';}
  if(shouldSeek)seek(current().start);if(!fromPlayback){$('followSong').checked=true;refreshLoop();}
  const phraseIndex=practice.soloPhrases.findIndex(p=>current().start>=p.start&&current().start<p.end);if(phraseIndex>=0)activePhrase=phraseIndex;
  render();
 }
 function goToTime(time){const index=practice.atTime(time);if(index<0)return false;selectChord(index,{seek:false});seek(time);return true;}
 function selectSection(value){
  const index=Number(value);if(value!=='all'&&(!Number.isInteger(index)||!sections[index]))return false;
  stopSynth();$('followSong').checked=true;custom=false;shapeMode='song';melodyNote=null;
  if(value==='all'){scope='all';sectionFilter=-1;selected=practice.atTime(playbackTime());frets=[...current().frets];refreshLoop();render();return true;}
  scope='section';sectionFilter=index;const section=sections[index];selected=practice.atTime(section.start);frets=[...current().frets];
  const phrase=practice.soloPhrases.findIndex(p=>p.start>=section.start&&p.start<section.end);if(phrase>=0)activePhrase=phrase;
  seek(section.start);refreshLoop();render();return true;
 }

 function enterCustom(){video.pause();stopSynth();shapeMode='song';custom=true;melodyNote=null;$('followSong').checked=false;}
 function restore({seek:shouldSeek=true}={}){custom=false;shapeMode='song';melodyNote=null;frets=[...current().frets];$('followSong').checked=true;if(shouldSeek)seek(current().start);render();}
 $('lessonSteps').addEventListener('click',e=>{let el=e.target.closest('[data-step]');if(el)selectChord(Number(el.dataset.step));});
 $('fretboard').addEventListener('click',e=>{let cell=e.target.closest('[data-string]'),mute=e.target.closest('[data-mute]');if(!cell&&!mute)return;enterCustom();if(mute){let i=Number(mute.dataset.mute);frets[i]=frets[i]<0?0:-1;if(frets[i]>=0)playNotes([core.noteAt(i,0).midi]);}else{let i=Number(cell.dataset.string),f=Number(cell.dataset.fret);frets[i]=frets[i]===f?-1:f;if(frets[i]>=0)playNotes([core.noteAt(i,f).midi]);}render();});
 $('stringNotes').addEventListener('click',e=>{const b=e.target.closest('[data-play-string]');if(!b)return;let i=Number(b.dataset.playString),n=core.noteAt(i,frets[i]);if(n)playNotes([n.midi]);else notify(`${6-i} 弦本次不拨；左手状态见按法图。`);});
 $('pickingSteps').addEventListener('click',e=>{const button=e.target.closest('[data-pick-step]');if(!button)return;const step=currentHandPlan()?.steps[Number(button.dataset.pickStep)];if(!step)return;const notes=step.strings.map(string=>core.noteAt(6-string,frets[6-string])).filter(Boolean);playNotes(notes.map(n=>n.midi),.025);notify('教学选弦合成示范 · '+step.label);});
 $('playChord').addEventListener('click',()=>{playNotes(core.notesFor(frets).filter(Boolean).map(n=>n.midi));notify('合成试音 · 实际发声的和弦音');});
 $('playArpeggio').addEventListener('click',()=>playNotes(core.notesFor(frets).filter(Boolean).map(n=>n.midi),.48));
 $('playMelody').addEventListener('click',()=>playNotes([...document.querySelectorAll('[data-melody]')].map(b=>Number(b.dataset.melody)),.85));
 document.querySelectorAll('[data-melody]').forEach(b=>b.addEventListener('click',()=>playNotes([Number(b.dataset.melody)])));
 $('prevChord').onclick=()=>selectChord(selected-1);
 $('nextChord').onclick=()=>selectChord(selected+1);
 $('tailScope').onclick=()=>{const first=events.findIndex(e=>introStarts.some(t=>Math.abs(e.start-t)<.02));if(first<0)return;scope='tail';selectChord(first);};$('allScope').onclick=()=>{scope='all';render();};
 $('restoreChord').onclick=()=>restore();
 $('shapeMode').onchange=e=>chooseShapeMode(e.target.value);
 document.querySelectorAll('[data-label]').forEach(b=>b.onclick=()=>{labelMode=b.dataset.label;document.querySelectorAll('[data-label]').forEach(x=>x.classList.toggle('selected',x===b));renderBoard(getView());});
 $('showAllNotes').onchange=e=>{showAll=e.target.checked;renderBoard(getView());};
 $('speedSelect').onchange=e=>{video.playbackRate=Number(e.target.value);};video.preservesPitch=true;
 $('playSong').onclick=()=>{if(!video.paused){video.pause();return;}if(melodyNote||shapeMode==='classic')restore({seek:false});if(video.ended)seek(loopAnchor?.start||0);if(loopAnchor&&(video.currentTime<loopAnchor.start||video.currentTime>=loopAnchor.end-.04))seek(loopAnchor.start);video.play().catch(()=>notify('原视频暂不能播放，可先用指板合成试音。'));};
 video.addEventListener('play',()=>{$('playSong').textContent='Ⅱ 暂停完整演奏';});video.addEventListener('pause',()=>{$('playSong').textContent='▶ 播放完整演奏';});
 $('followSong').onchange=e=>{if(e.target.checked){custom=false;shapeMode='song';melodyNote=null;selected=practice.atTime(playbackTime());frets=[...current().frets];if(scope==='section')sectionFilter=practice.sectionAt(playbackTime());refreshLoop();render();}};
 $('loopMode').onchange=()=>{if(custom||melodyNote||shapeMode==='classic')restore({seek:false});refreshLoop();if(loopAnchor&&(video.currentTime<loopAnchor.start||video.currentTime>=loopAnchor.end))seek(loopAnchor.start);};
 function updateFromTime(){
  const t=playbackTime();$('absoluteTime').textContent=clock(t);updatePracticeMap(t);
  if(!pendingSeek&&!custom&&!video.paused&&loopAnchor&&(t>=Math.min(loopAnchor.end,video.duration)-.035||t<loopAnchor.start-.05)){seek(loopAnchor.start);return;}
  if($('followSong').checked&&!custom&&!melodyNote){
   const index=practice.atTime(t),nextSection=practice.sectionAt(t),sectionChanged=scope==='section'&&!loopAnchor&&nextSection!==sectionFilter;
   if(sectionChanged)sectionFilter=nextSection;
   if(index>=0&&index!==selected)selectChord(index,{seek:false,fromPlayback:true});else if(sectionChanged)render();
  }
 }

 video.addEventListener('timeupdate',updateFromTime);
 video.addEventListener('seeking',()=>{if(pendingSeek?.applied&&Math.abs(video.currentTime-pendingSeek.time)>.05)pendingSeek=null;updateFromTime();});
 video.addEventListener('seeked',()=>{if(pendingSeek?.applied&&!video.seeking)pendingSeek=null;updateFromTime();});
 video.addEventListener('play',()=>{pauseOtherMedia(video);stopSynth();if(shapeMode==='classic'){restore({seek:false});updateFromTime();}else if(custom&&$('followSong').checked)restore();});
 video.addEventListener('ended',()=>{if(loopAnchor&&!custom){seek(loopAnchor.start);video.play().catch(()=>notify('请点播放继续循环。'));}});
 video.addEventListener('error',()=>notify('完整演奏暂未加载，可先用指板合成试音。'));
 document.querySelectorAll('audio').forEach(a=>a.addEventListener('play',()=>{pauseOtherMedia(a);stopSynth();}));
 $('practiced').onchange=e=>{if(e.target.checked)practiced.add(current().id);else practiced.delete(current().id);try{localStorage.setItem(progressKey,JSON.stringify([...practiced]));}catch{}renderSteps();};
 for(const [trigger,dialog] of [['helpButton','helpDialog'],['evidenceButton','evidenceDialog']]){$(trigger).onclick=()=>$(dialog).showModal();$(dialog).querySelectorAll('.dialog-close').forEach(b=>b.onclick=()=>$(dialog).close());$(dialog).addEventListener('click',e=>{if(e.target===$(dialog)){const r=$(dialog).getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)$(dialog).close();}});}
 video.addEventListener('loadedmetadata',()=>{applyPendingSeek();updateFromTime();});
 video.addEventListener('canplay',()=>{applyPendingSeek();updateFromTime();});
 function showAt(id,event){const index=events.findIndex(e=>Math.abs(e.start-event.start)<.01&&e.voicingId===id);if(index<0)return false;video.pause();scope='section';sectionFilter=practice.sectionAt(event.start);selectChord(index);return true;}
 $('practiceSection').innerHTML=`<option value="all">整首演奏 · 00:00–${shortClock(data.source.duration)}</option>`+sections.map((s,i)=>`<option value="${i}">${String(i+1).padStart(2,'0')} · ${esc(s.title)} · ${clock(s.start)}</option>`).join('');
 $('practiceSection').onchange=e=>selectSection(e.target.value);
 $('practiceMap').addEventListener('click',e=>{const button=e.target.closest('[data-practice-section]');if(button&&$('practiceMap').contains(button))selectSection(button.dataset.practiceSection);});
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
 function showMelodyNote(index,audition=false){const n=practice.soloPhrases[activePhrase].teachingNotes[index];if(!n)return;custom=false;shapeMode='song';melodyNote={...n,practiceIndex:index};frets=[-1,-1,-1,-1,-1,-1];frets[6-n.string]=n.fret;$('followSong').checked=false;if(audition)playNotes([n.midi]);render();}
 async function playSoloExercise(){pauseOtherMedia();stopSynth();const phrase=practice.soloPhrases[activePhrase];try{await ensureAudio();const now=audioCtx.currentTime+.025;phrase.teachingNotes.forEach((n,i)=>{tone(n.midi,now+i*.6,.8,.12);scheduledVisual.push(setTimeout(()=>showMelodyNote(i),25+i*600));});notify('合成简化练习 · 指板按教学音序移动');}catch{notify('暂时无法试音，仍可逐个点击音名查看按位。');}}
 if(!window.MediaPlayers)video.src=window.FULL_ANALYSIS.meta.videoSrc;renderPracticeMap();render();

 window.StringNotes={getState:()=>({selected,total:events.length,scope,sectionFilter,custom,shapeMode,melodyNote:melodyNote?.name||null,frets:[...frets],view:getView(),sourceTime:video.currentTime,loopAnchor}),selectChord,showAt,goToTime,selectSection,openPractice:()=>restore({seek:false}),enterFree:()=>{enterCustom();render();},stopSynth};
})();
