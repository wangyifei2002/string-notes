(() => {
  'use strict';
  const shapes = Array.isArray(window.CHORD_SHAPES) ? window.CHORD_SHAPES : [];
  const core = window.GuitarCore;
  const $ = id => document.getElementById(id);
  const esc = value => String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const roles={1:'根音',2:'二音',3:'三音',4:'四音',5:'五音',6:'六音',7:'七音',9:'九音',11:'十一音',13:'十三音'};
  const colors={1:'#c6754e',3:'#8b76b6',5:'#538ca1',7:'#4f927e'};
  const names=['C','D♭','D','E♭','E','F','G♭','G','A♭','A','B♭','B'];
  let selected=null,audioContext=null,nodes=[],timers=[],audioEpoch=0;
  const notice = message => {$('shapeStatus').textContent=message;};
  function degreeParts(degree){
    const value=String(degree).replace(/b/g,'♭').replace(/#/g,'♯'),number=Number(value.match(/\d+/)?.[0]||1);
    return {value,number,alteration:(value.match(/♯/g)||[]).length-(value.match(/♭/g)||[]).length};
  }
  function semitones(degree){const p=degreeParts(degree);return(([0,2,4,5,7,9,11][(p.number-1)%7]+12*Math.floor((p.number-1)/7)+p.alteration)%12+12)%12;}
  function degreeFor(shape,pc){return (shape.formula||[]).find(degree=>semitones(degree)===(pc-shape.rootPc+12)%12)||'';}
  function noteFor(shape,index,fret){
    const raw=core.noteAt(index,fret);if(!raw)return null;
    const degree=degreeFor(shape,raw.pc),p=degreeParts(degree),letters=['C','D','E','F','G','A','B'],natural=[0,2,4,5,7,9,11];
    const rootLetter=shape.name?.match(/[A-G]/)?.[0]||names[shape.rootPc][0];
    const letterIndex=(letters.indexOf(rootLetter)+p.number-1)%7;
    const delta=((raw.pc-natural[letterIndex]+18)%12)-6;
    const name=degree?letters[letterIndex]+(delta<0?'♭'.repeat(-delta):'♯'.repeat(delta)):names[raw.pc];
    const octave=degree?(raw.midi-natural[letterIndex]-delta)/12-1:raw.octave;
    return {...raw,name,octave,degree:degreeParts(degree).value,role:degree?roles[p.number]||'延伸音':'音级待定',roleNumber:p.number,string:6-index,fret,finger:shape.fingers?.[index]??null};
  }
  function shapeNotes(shape){return shape.frets.map((f,i)=>f<0?null:noteFor(shape,i,f)).filter(Boolean);}
  function stopAudio(){
    audioEpoch++;
    timers.forEach(clearTimeout);timers=[];
    nodes.forEach(item=>{try{item.oscillator.stop();}catch{}try{item.oscillator.disconnect();item.gain.disconnect();}catch{}});nodes=[];
    document.querySelectorAll('#shapeBoard .is-playing').forEach(el=>el.classList.remove('is-playing'));
  }
  async function playNotes(notes,arpeggio=false){
    stopAudio();if(!notes.length)return;const epoch=audioEpoch;
    try{
      if(!audioContext){const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)throw new Error('Audio unavailable');audioContext=new Audio();}
      if(audioContext.state==='suspended')await audioContext.resume();
      if(epoch!==audioEpoch)return;
      const now=audioContext.currentTime+.025,step=arpeggio?.48:.035;
      notes.forEach((note,index)=>{
        const oscillator=audioContext.createOscillator(),gain=audioContext.createGain(),start=now+index*step;
        oscillator.type='triangle';oscillator.frequency.value=440*Math.pow(2,(note.midi-69)/12);
        gain.gain.setValueAtTime(0,start);gain.gain.linearRampToValueAtTime(arpeggio?.12:.075,start+.008);gain.gain.exponentialRampToValueAtTime(.0001,start+1.45);
        oscillator.connect(gain).connect(audioContext.destination);oscillator.start(start);oscillator.stop(start+1.5);
        const item={oscillator,gain};nodes.push(item);oscillator.onended=()=>{oscillator.disconnect();gain.disconnect();nodes=nodes.filter(entry=>entry!==item);};
        const selector=`#shapeBoard [data-string="${note.string}"][data-fret="${note.fret}"]`;
        timers.push(setTimeout(()=>document.querySelector(selector)?.classList.add('is-playing'),25+index*step*1000));
        timers.push(setTimeout(()=>document.querySelector(selector)?.classList.remove('is-playing'),1000+index*step*1000));
      });
      notice(`合成试听 · ${selected.name} · ${notes.map(n=>`${n.string}弦 ${n.name}`).join(' → ')}。这些是完整手形的发声音，不是原视频录音。`);
    }catch{notice('暂时无法合成声音，仍可查看每根弦的音名、按位和指号。');}
  }
  function filteredShapes(){const family=$('shapeFamily').value,query=$('shapeSearch').value.trim().toLowerCase();return shapes.filter(s=>(family==='all'||s.family===family)&&(!query||[s.name,s.family,s.description,s.leftText].join(' ').toLowerCase().includes(query)));}
  function renderChoices(items){
    $('shapeCount').textContent=`${items.length} 个手形`;
    $('shapeList').innerHTML=items.map(shape=>`<button class="shape-choice" type="button" data-shape-id="${esc(shape.id)}" aria-pressed="${selected?.id===shape.id}" aria-controls="shapeDetails" aria-label="学习 ${esc(shape.name)}，${esc(shape.family)}"><strong>${esc(shape.name)}</strong><span>${esc(shape.family)}</span></button>`).join('');
    $('shapeEmpty').hidden=items.length>0;
  }
  function renderBoard(shape,notes){
    const highest=Math.max(5,...shape.frets.filter(f=>f>=0));
    const end=Math.min(12,highest+1),columns=end+1;
    let html=`<div class="shape-fret-head" style="--shape-columns:${columns}"><span>弦号</span>${Array.from({length:columns},(_,i)=>`<span>${i===0?'空弦':i}</span>`).join('')}</div>`;
    for(let index=5;index>=0;index--){
      const string=6-index,note=notes.find(n=>n.string===string),fret=shape.frets[index];
      html+=`<div class="shape-string-row" style="--shape-columns:${columns};--shape-string-width:${1+(5-index)*.3}px"><div class="shape-string-label"><b>${string}</b><span>${['E','A','D','G','B','E'][index]}</span><em>${fret<0?'×':fret===0?'0':'●'}</em></div>`;
      for(let f=0;f<columns;f++){
        const active=fret===f,role=note?.roleNumber||1;
        const label=active?`${string}弦${f===0?'空弦':f+'品'}，${note.name}${note.octave}，${note.degree} ${note.role}${note.finger?'，左手'+note.finger+'指':''}；点击试听`:`${string}弦${f===0?'空弦':f+'品'}，未使用`;
        html+=`<button type="button" class="shape-fret ${f===0?'open':''} ${active?'is-active':''}" data-string="${string}" data-fret="${f}" aria-label="${esc(label)}" ${active?'':'disabled'}>${active?`<span class="shape-dot" style="--shape-tone-color:${colors[role]||'#b58c3d'}">${esc(note.name)}${note.finger?`<span class="shape-finger">${note.finger}</span>`:''}</span><span class="shape-degree">${esc(note.degree)} ${esc(note.role)}</span>`:[3,5,7,9,12].includes(f)&&index===3?'<span class="shape-position-dot"></span>':''}</button>`;
      }
      html+='</div>';
    }
    $('shapeBoard').innerHTML=html;
  }
  function renderDetail(shape){
    const notes=shapeNotes(shape),formula=shape.formula.map(degree=>degreeParts(degree).value);
    const tones=[...new Map(notes.map(n=>[n.pc,n])).values()].sort((a,b)=>formula.indexOf(a.degree)-formula.indexOf(b.degree));
    $('shapeDetails').hidden=false;$('shapeDetails').dataset.shapeId=shape.id;
    $('shapeName').textContent=shape.name;$('shapeFamilyLabel').textContent=shape.family;
    $('shapeDescription').textContent=shape.description;
    $('shapeSourceLabel').textContent=shape.sourceLabel||'经典常用按法';
    $('shapeFormula').textContent=shape.formula.join(' · ');
    $('shapeTones').textContent=tones.map(n=>n.name).join(' · ');
    const omitted=formula.filter(degree=>!notes.some(note=>note.degree===degree));
    $('shapeOmissions').textContent=omitted.length?`此按法省略 ${omitted.join('、')} 音；上方“和弦构成”仍显示完整的结构公式。`:'';
    $('shapeOmissions').hidden=!omitted.length;
    const roots=notes.filter(n=>n.degree==='1');
    $('shapeRoots').textContent=roots.length?roots.map(n=>`${n.string}弦${n.fret===0?'空弦':n.fret+'品'}`).join(' / '):'本配音省略根音，请先单独补听根音';
    $('shapeTab').textContent=shape.frets.map(f=>f<0?'x':f).join(' ');
    $('shapeLeftText').textContent=shape.leftText;
    $('shapePractice').textContent=shape.practice;
    $('shapeTransfer').textContent=shape.transfer;
    $('shapeBarres').textContent=(shape.barres||[]).map(b=>`${b.finger} 指在 ${b.fret} 品横按第 ${b.fromString} 至 ${b.toString} 弦；其中被其他手指按在更高品的弦，以较高品为实际发声音。`).join(' ');
    $('shapeBarres').hidden=!shape.barres?.length;
    renderBoard(shape,notes);
    const labels={currently:'Currently · Keaton Simons',sunshine:'Ain’t No Sunshine · Andy Guitar'};
    const songs=[...new Set((shape.matches||[]).map(m=>m.songId))].filter(id=>labels[id]);
    $('shapeLessonLinks').innerHTML=songs.map(id=>`<a href="study.html?song=${encodeURIComponent(id)}">在 ${esc(labels[id])} 中对照练习 ↗</a>`).join('');
    $('shapeNoSong').hidden=!!songs.length;
    $('shapeSources').innerHTML=(shape.sources||[]).filter(s=>/^https:\/\//.test(s.url)).map(s=>`<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)} ↗</a>`).join('');
    $('shapeSourceNote').textContent=shape.sourceNote||'';
    document.title=`弦上 · ${shape.name} 常用和弦手形`;
  }
  function selectShape(shape,{announce=true}={}){
    if(!shape)return;stopAudio();selected=shape;renderChoices(filteredShapes());renderDetail(shape);
    const url=new URL(location.href);url.searchParams.set('shape',shape.id);history.replaceState(null,'',url);
    if(announce)notice(`已选择 ${shape.name} · ${shape.family}。常用按法之一，指号可随手型与前后连接调整。`);
  }
  function filterChanged(){
    stopAudio();const items=filteredShapes();
    if(!items.length){selected=null;$('shapeDetails').hidden=true;renderChoices(items);notice('没有匹配的手形。请清空查找或选择其他类别。');return;}
    selectShape(items.find(s=>s.id===selected?.id)||items[0]);
  }
  if(!shapes.length||!core){notice('和弦手形资料暂未加载完整，请刷新重试或返回歌曲曲库。');$('shapeFamily').disabled=true;$('shapeSearch').disabled=true;return;}
  $('shapeFamily').innerHTML='<option value="all">全部类别</option>'+[...new Set(shapes.map(s=>s.family))].map(f=>`<option value="${esc(f)}">${esc(f)}</option>`).join('');
  $('shapeFamily').addEventListener('change',filterChanged);$('shapeSearch').addEventListener('input',filterChanged);
  $('shapeList').addEventListener('click',event=>{const button=event.target.closest('[data-shape-id]');if(button)selectShape(shapes.find(s=>s.id===button.dataset.shapeId));});
  $('shapePlay').addEventListener('click',()=>selected&&playNotes(shapeNotes(selected)));
  $('shapeArpeggio').addEventListener('click',()=>selected&&playNotes(shapeNotes(selected),true));
  $('shapeStop').addEventListener('click',()=>{stopAudio();notice('声音已停止。');});
  $('shapeBoard').addEventListener('click',event=>{const button=event.target.closest('.shape-fret.is-active');if(!selected||!button)return;const note=shapeNotes(selected).find(n=>n.string===Number(button.dataset.string));if(note)playNotes([note]);});
  window.addEventListener('pagehide',stopAudio);
  const requested=new URLSearchParams(location.search).get('shape'),initial=shapes.find(s=>s.id===requested)||shapes[0];
  selectShape(initial,{announce:false});
  notice(requested&&!shapes.some(s=>s.id===requested)?`没有找到链接中的手形，已显示 ${initial.name}。可以从左侧重新选择。`:'常用按法之一，指号可随手型与前后连接调整。选择手形不会自动播放声音。');
})();
