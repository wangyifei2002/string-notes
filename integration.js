(()=>{
 'use strict';
 const $=id=>document.getElementById(id),pauseMedia=()=>document.querySelectorAll('audio,video').forEach(m=>m.pause());
 function show(mode){pauseMedia();window.StringNotes?.stopSynth();$('analysisView').hidden=mode!=='analysis';$('practiceView').hidden=mode==='analysis';$('analysisMode').classList.toggle('active',mode==='analysis');$('lessonMode').classList.toggle('active',mode==='practice');$('freeMode').classList.toggle('active',mode==='free');if(mode==='analysis')window.FullSongAnalysis?.show();}
 window.FullSongAnalysis?.init();
 $('analysisMode').addEventListener('click',()=>show('analysis'));
 $('lessonMode').addEventListener('click',()=>{show('practice');window.StringNotes?.openPractice();});
 $('freeMode').addEventListener('click',()=>{show('free');window.StringNotes?.enterFree();});
 window.addEventListener('learn-chord',e=>{const {id,chord}=e.detail||{};if(!id||!chord)return;show('practice');if(!window.StringNotes.showAt(id,chord))return;$('practiceView').scrollIntoView({behavior:'smooth',block:'start'});});
 document.addEventListener('play',e=>{if(e.target instanceof HTMLMediaElement)window.StringNotes?.stopSynth();},true);
 show('analysis');
})();
