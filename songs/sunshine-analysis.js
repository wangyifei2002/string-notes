(() => {
  'use strict';
  const sections = [
    {
      id:'sunshine-pickup',start:0,end:2.752,title:'人声弱起 · 先唱，再进入',type:'intro',confidence:'high',
      summary:'这是完整指弹演唱的开头。人声先进入，吉他还没有打出第一处清楚的 Am。先感受一句话怎样把伴奏带进来，空指板表示此刻没有需要跟弹的新和弦。',
      listenFor:['注意人声的起句与第一下吉他不是同时开始。','手已经摆好 Am，不等于琴弦已经发声。'],
      progressionSummary:'弱起的人声先建立方向；约 00:02.75 才进入 Am（i，根音 1）。',
      rhythm:{texture:'无新吉他起音的人声弱起；不是吉他 Solo。',exercise:'先默数到伴奏落点，只在第一下 Am 加入。不要为了填满画面提前扫弦。',limitations:'弱起边界来自自动字幕字级时间与音轨起音对照，仍是近似边界。'},
      evidence:'原片 04:20.5 起保留人声弱起；词级字幕把首个演唱词定位于约 260.72 秒，第一组稳定 A–C–E 音高约 263.25 秒。'
    },
    {
      id:'sunshine-focus',start:2.752,end:16.742,title:'焦点乐句 · 14 秒听懂 1→5→♭7→1',type:'voice',confidence:'high',
      summary:'把约 14 秒作为第一个完整练习单元。Am→Em→G→Am 的根音是 A→E→G→A；两次回环都以 Am 为归宿。Em 的三音是 G，不含 G♯，所以这里是小五级 v，不能套成大小调教材里的大属和弦 V。G 与 Em 共享 G、B，接回 Am 时上声部 B 可以走向 C。',
      listenFor:['先只听最低层的 A→E→G→A，分清根音和人声旋律。','二弦的 C→B→B→C 是教学按法中的内声部：Em→G 虽换根音，B 可以保留。','人声是旋律前景；吉他用低音与上方和弦音伴唱，句中留出呼吸。','本段约 14 秒，包含两次回环；练习用的四小节 16 秒版本另行标注为教学改写。'],
      progressionSummary:'1→5→♭7→1→5→♭7→1；和弦级数 i→v→♭VII→i。G 的“♭7”以 A 同主音大调为比较尺，不是把 G 再降低半音。',
      rhythm:{texture:'原声吉他指弹伴唱，拇指负责低音区域，其余手指负责上声部；此处没有独立器乐 Solo。',pulse:'相邻 Em、G 短时距约 0.87–0.94 秒，四分音符主拍约 66–69 BPM 的候选更合适。',exercise:'60 BPM 四小节教学练习：Am｜Em 两拍 + G 两拍｜Am｜Am。先在每次换和弦时只弹根音，再加三音和五音。主干是三和弦，不需要硬加七音。',techniques:'根音可用五弦空弦 A、六弦空弦 E、六弦 3 品 G、五弦空弦 A；上方二弦 1→0→0→1 品对应 C→B→B→C。',development:'原创变化：保持四小节根音与节奏，第二遍让二弦 C 延后到第 3 拍出现；第三遍减少一次拨弦，把留白也当作编曲材料。',limitations:'具体逐弦拨弦顺序未逐拍转录；四小节、60 BPM 与延后旋律都是教学设定。'},
      evidence:'同一作者的 Day 6 讲解给出 Am、Em、G 的路线；原音局部模板、低频峰及可见换手形相互支持。时间点估计误差约 ±0.25 秒，不是逐音谱定稿。'
    },
    {
      id:'sunshine-verse1-return',start:16.742,end:26.9,title:'第一段展开 · 5→4→1 回归',type:'voice',confidence:'high',
      summary:'这里的 Em 不再只是 Am 回环中的短经过，而是延长一句的背景，然后走到 Dm，再回 Am。根音 5→4→1 对应 v→iv→i。Dm 的 F、A 给出小下属色彩，接到 Am 时 D→C、F→E 都能作平滑的内声部移动。',
      listenFor:['比较这次 Em 的停留与上一段短促的 Em。','听 Dm 的 F 与 Am 的 E 之间的半音距离。','Am 回来后再出现 Em→G 的短连接，为下一段继续流动。'],
      progressionSummary:'5→4→1→5→♭7→1；先 Em→Dm→Am 收句，再准备下一次主歌。',
      rhythm:{texture:'持续伴唱，和弦停留变长，功能应结合一句如何收束来判断。',exercise:'用 Em 0x200x→Dm xx0231→Am x0221x 各四拍练习，先比较 E→D→A 根音；再单独弹 F→E，最后合回和弦。',limitations:'F→E 是可供练习的声部连接，不声称原演奏逐次都以同一声部突出它。'},
      evidence:'原片约 277.24、280.50、284.02 秒的持续音组分别支持 Em、Dm、Am；Dm 样本可见 D3、A3、D4、F4 附近频峰。'
    },
    {
      id:'sunshine-verse2',start:26.9,end:53.557,title:'第二段主歌 · 同一骨架，不同句子',type:'voice',confidence:'high',
      summary:'第二段保留 Am 的回环与 Em→Dm→Am 的收句路线。重点不是再背一遍和弦名称，而是比较人声的起句、停顿怎样改变同一组和弦的节奏表面。',
      listenFor:['两次 1→5→♭7→1 回环与后面的 5→4→1。','有些 Am 持续较久，期间轻重与留白变化不等于换和弦。','歌词、人声经过音和低音的起音应分开观察。'],
      progressionSummary:'回环 i→v→♭VII→i，随后 v→iv→i；根音依次抓 1、5、♭7、1 与 5、4、1。',
      rhythm:{texture:'人声领旋律、吉他指弹支撑；没有新增器乐 Solo。',pulse:'速度随演唱略向前推进，练习可先用 68 BPM，随后跟视频的呼吸。',exercise:'第一次只弹根音，第二次加入三音，第三次加入五音与原有停顿；在同一条路线里听清三音如何决定大小性质。'},
      evidence:'相同根音频谱序列在原片约 287.4–314.06 秒再现；人工筛除讲话/人声导致的零碎假换和弦。'
    },
    {
      id:'sunshine-vocal-break',start:53.557,end:65.898,title:'人声反复 · 吉他留白也是编曲',type:'voice',confidence:'medium',
      summary:'Am 响起后，人声以短动机反复推进，吉他逐渐停弹。后半段右手离弦、随后贴弦止音，靠人声与节奏记忆维持张力。这里不是吉他 Solo，也不应把人声频谱识别成 Dm、Em 的连串变化。',
      listenFor:['开头 Am 的余响与后来没有新起音的空白。','旋律/语句反复建立紧张，而不是不断更换和弦。','约 00:57.3 后指板清空：表示没有新的吉他按法跟弹，背景仍可理解为 Am 主音区。'],
      progressionSummary:'Am 主音区持续作为背景；前半是起音与衰减，后半为人声独唱。空白不等于换调，也不是六弦静音按法教学。',
      rhythm:{texture:'指弹伴唱→人声主导→吉他止音，靠织体变化形成段落对比。',exercise:'原创留白练习：Am 弹一次并让它衰减，接着两小节只拍手或哼一个短动机，最后才接 Em→G→Am。',limitations:'00:57.3 是结合低音衰减及邻近手部画面取的近似教学边界，约 ±0.5 秒；没有逐帧确定完全停音的一瞬。'},
      evidence:'原片 320 秒画面显示右手抬离琴弦，324 秒贴弦止音。低幅度人声段的和弦模板输出已撤除，不作为实际换和弦。'
    },
    {
      id:'sunshine-reentry',start:65.898,end:69.265,title:'吉他重新进入 · 一次短回应',type:'voice',confidence:'high',
      summary:'吉他用熟悉的 Am→Em→G 回应前面的人声留白，并在下一段回到 Am。根音 1→5→♭7 的轮廓重新出现，听者因此认出伴奏重新开始。',
      listenFor:['同样三个和弦，从留白之后出现，会有更明显的段落作用。','G 没有成为新主音，它继续指向紧接着的 Am。'],
      progressionSummary:'1→5→♭7，下一段落在 1；i→v→♭VII→i 是同一回环的重新启动。',
      rhythm:{texture:'短伴奏回应，人声仍参与；没有扩展成独立吉他独奏段。',exercise:'先练两拍 Am、一拍 Em、一拍 G，下一小节回 Am；再把前面加两拍空白，比较进入感。'},
      evidence:'原片约 326.40 秒恢复稳定 Am 音组，328.13 秒 Em、328.95 秒 G；低音与近景手形支持该回归。'
    },
    {
      id:'sunshine-verse3',start:69.265,end:94.912,title:'第三段主歌 · 回归与推进',type:'voice',confidence:'high',
      summary:'从留白回到主歌后，熟悉的和声重新获得连续的伴奏。再听 Am 回环与 Em→Dm→Am 收句的区别：前者维持主音区域的流动，后者把较长的人声句子带回归宿。',
      listenFor:['保留相同的四个和弦，演奏强弱与句间停顿已经足以塑造发展。','Dm 的 F 仍是小下属三音，Em 仍没有 G♯，不把它误写成 E7。'],
      progressionSummary:'i→v→♭VII→i 的回环，再经 v→iv→i；调性仍以 A 为中心。',
      rhythm:{texture:'完整指弹伴唱恢复；主要旋律由人声承担。',pulse:'后段 Em→G 短时距约 0.81–0.84 秒，主拍约 72–74 BPM 候选。',exercise:'保持低音稳定、上声部稍轻，先把人声位置留出来。用录音检查自己是否在每次换弦时无意加速。'},
      evidence:'原片约 329.77–355.41 秒，四个和弦候选的基本频率与前两段一致；节奏存在自然推进。'
    },
    {
      id:'sunshine-ending-repeat',start:94.912,end:115.426,title:'尾句反复 · 保持走向，逐渐收束',type:'voice',confidence:'high',
      summary:'最后连续重复 Am→Em→G→Am。和弦没有越来越复杂，反复的次数、留白与最后一轮的放慢让结尾成立。G 仍是回到 Am 之前的一站，不是新调性的终止点。',
      listenFor:['每次都从 A 出发，经 E、G 回 A；跟住根音而不是只记品位。','最后一轮 Em、G 的停留较前面拉长。','人声结束前仍保留最后回 Am 的方向。'],
      progressionSummary:'反复 1→5→♭7→1；末轮 5→♭7 延长后落入最后的 1。',
      rhythm:{texture:'人声尾句与指弹回环配合，没有新增吉他 Solo。',phrasing:'最后一轮逐渐放慢，不把视频强行对齐同一格速度。',exercise:'原创结尾练习：把最后 G 延长一拍，再回 Am 并让余音自然衰减；比较按时终止与延迟终止的感觉。'},
      evidence:'最后 Em、G 的时间间隔拉长，最终 Am 约在原片 375.93 秒进入。'
    },
    {
      id:'sunshine-final-am',start:115.426,end:118,title:'最后 Am · 主音与余音',type:'outro',confidence:'high',
      summary:'最后落在 Am，A–C–E 的小三和弦与主音低音提供明确归宿。让余响结束即可，不从声音变弱时跳出的算法候选补写新和弦。',
      listenFor:['最后 A 根音与 C 小三音的稳定关系。','演唱与琴声自然消失，而不是再次出发。'],
      progressionSummary:'1 · i：Am 最后收束。',
      rhythm:{texture:'最后和弦起音与衰减。',exercise:'回到 Am 后放松右手，让琴弦自然振动；练习在余音里结束，而非马上接下一轮。'},
      evidence:'最后 Am 约原片 375.93 秒；本课保留至 378.50 秒，后面的授课总结不计入完整演唱。'
    }
  ];
  const changes = [
    [2.752,'Am'],[4.609,'Em'],[5.55,'G'],[6.444,'Am'],[11.842,'Em'],[12.713,'G'],[13.595,'Am'],
    [16.742,'Em'],[20.004,'Dm'],[23.522,'Am'],[25.101,'Em'],[26.053,'G'],[26.9,'Am'],
    [31.974,'Em'],[32.81,'G'],[33.692,'Am'],[38.708,'Em'],[39.602,'G'],[40.496,'Am'],
    [43.479,'Em'],[46.835,'Dm'],[50.306,'Am'],[51.85,'Em'],[52.779,'G'],[53.557,'Am'],
    [65.898,'Am'],[67.628,'Em'],[68.452,'G'],[69.265,'Am'],[74.107,'Em'],[74.942,'G'],[75.755,'Am'],
    [80.689,'Em'],[81.502,'G'],[82.326,'Am'],[85.206,'Em'],[88.561,'Dm'],[91.765,'Am'],
    [93.251,'Em'],[94.076,'G'],[94.912,'Am'],[99.672,'Em'],[100.6,'G'],[101.402,'Am'],
    [106.185,'Em'],[106.986,'G'],[107.857,'Am'],[113.139,'Em'],[114.161,'G'],[115.426,'Am']
  ];
  const info={Am:{rootPc:9,rootName:'A',rootDegree:'1',roman:'i',fingeringId:'am'},Em:{rootPc:4,rootName:'E',rootDegree:'5',roman:'v',fingeringId:'em'},G:{rootPc:7,rootName:'G',rootDegree:'♭7',roman:'♭VII',fingeringId:'g'},Dm:{rootPc:2,rootName:'D',rootDegree:'4',roman:'iv',fingeringId:'dm'}};
  const sectionAt=t=>sections.find(s=>t>=s.start&&t<s.end);
  const chords=changes.map(([start,chord],i)=>{
    const next=changes[i+1]?.[1],previous=changes[i-1]?.[1],end=changes[i+1]?.[0]??118;
    let functionText='';
    if(chord==='Am')functionText=previous==='Dm'?'前面的 Em→Dm 在这里回到 Am：5→4→1，v→iv→i。Am 是这句的解决点；后面的短回环又让音乐继续。':previous==='G'?'前面的 G 接回 Am，根音 ♭7→1，上声部 B→C 可形成半音连接。这里的 Am 是回环归宿，而不是把 G 当成新主调。':'Am 的 A–C–E 建立小调主音区域，C 是决定小三和弦性质的 ♭3；先听清低音 A 的参照。';
    if(chord==='Em')functionText=next==='Dm'?'这次 Em 停留较长，并走向 Dm→Am。它在 v→iv→i 这句中延展后再回归；含 G 自然音、不含 G♯，所以不能写成大属和弦 E 或 E7。':'Am→Em→G→Am 的短连接中，E 是 5 级根音。Em 与接下来的 G 共享 G、B，低音换位而上声部可以保留；小五级 v 的作用来自这条回环。';
    if(chord==='G')functionText='Em→G 时保留 G、B，把根音从 E 换成 G；下一步回 Am。G 是 ♭VII 大三和弦，B 是它的 3 音。根音 ♭7→1 与内声部 B→C 一起建立回归，不构成转调。';
    if(chord==='Dm')functionText='Em→Dm→Am 的中间一步，根音 5→4→1。Dm 的 D–F–A 是小下属 iv；接 Am 时 A 可保留，D→C、F→E 可用作教学声部连接。不能脱离这条走向只背“Dm 的固定情绪”。';
    if(start===53.557)functionText='Am 在人声反复开始时响起，随后衰减并让出空间。此处表示最后一次明确的伴奏及其背景，不表示整段都在持续拨弦。';
    if(start===65.898)functionText='留白后 Am 恢复发声，接 Em→G 并在下一段回 Am。和弦不新，但重新出现的起音与织体变化清楚地标记了段落进入。';
    if(start===115.426)functionText='最后 Am 收束，A 根音与 C 小三音确认本次演唱的主音归宿。剩下的是衰减，不再补写新的和弦。';
    return{start,end:start===53.557?57.3:end,chord,...info[chord],sectionId:sectionAt(start).id,confidence:'high',functionText,evidence:'作者同曲教学给出该和弦与可见手形；本次完整指弹演唱的低音/音组模板支持。起点为自动频谱与起音对照候选，约 ±0.25 秒，未逐音人工听写定稿。',alternatives:[],sourceLayer:'author_lesson_plus_audio_candidate',sourceStatus:'author_lesson_plus_audio_candidate',auditoryVerified:false,timeToleranceSeconds:.25};
  });
  chords.unshift({start:0,end:2.752,chord:'人声弱起 · 吉他尚未进入',rootPc:null,rootName:'—',rootDegree:'—',roman:'弱起',practiceMessage:'人声先起，吉他尚未进入；空指板提示先听起句，等 Am 落点再加入。',fingeringId:null,sectionId:'sunshine-pickup',confidence:'medium',functionText:'先唱后弹；此时不能把人声中的某一个音推断成新和弦，第一处清楚的吉他落点是随后 Am。',evidence:'词级自动字幕与音轨起音相互对照；手形准备不等于已经拨弦。',sourceLayer:'audio_video_boundary_candidate',sourceStatus:'audio_video_boundary_candidate',auditoryVerified:false,timeToleranceSeconds:.25});
  chords.push({start:57.3,end:65.898,chord:'人声独唱 / Am 背景',rootPc:null,rootName:'—',rootDegree:'—',roman:'Am 背景 · 留白',practiceMessage:'人声继续、吉他没有新的明确和弦起音。此处空指板用来练习留白；等吉他重新进入再跟弹。',fingeringId:null,sectionId:'sunshine-vocal-break',confidence:'low',functionText:'人声重复继续，吉他没有新的明确和弦起音。Am 可作为背景理解，空指板提醒此处练习留白；不要把人声频谱的起伏当作连续换和弦。',evidence:'原片 320 秒右手离弦，324 秒贴弦止音；317.8 秒作为低音衰减后的近似教学分界，误差约 ±0.5 秒。',sourceLayer:'audio_video_boundary_candidate',sourceStatus:'audio_video_boundary_candidate',auditoryVerified:false,timeToleranceSeconds:.5});
  chords.sort((a,b)=>a.start-b.start);
  window.FULL_ANALYSIS={
    meta:{title:"Ain’t No Sunshine · 完整指弹演唱分析",artist:'Andy Guitar · Bill Withers 作品翻唱',duration:118,media:{provider:'youtube',videoId:'7RRblNpN_7A',start:260.5,end:378.5},sourceUrl:'https://www.youtube.com/watch?v=7RRblNpN_7A&t=260s',timeLabel:'演奏内时间 · 原片04:20.5起',performanceNote:'本课使用原视频 04:20.5–06:18.5 的完整指弹演唱（1 分 58 秒）。下方时间从这次演唱起算；原片前面的授课和另一遍示范不计入本课。'},
    overview:{tonic:'A',mode:'A 小调中心 · 自然小调和声',keyStatus:'作者同曲教学、主音归宿与频谱候选相互支持',style:'原声指弹弹唱 · Soul / Pop',meter:'4/4 主拍参考 · 直八分练习记法',tempo:'约 66–73 BPM 主拍候选；末句放慢，不是固定 144 BPM',summary:'本课分析 Andy Guitar 的完整指弹演唱：原片 04:20.5–06:18.5，共 1 分 58 秒。用 Am、Em、G、Dm 四个和弦学会 1→5→♭7→1 的回环和 5→4→1 的回归，再看人声弱起、吉他留白与结尾放慢怎样构成完整演奏。没有独立吉他 Solo，也不是十二小节 Blues。',keyEvidence:['同一作者的配套教学给出 Am、Em、G、Dm；本次演唱反复回到 Am，并以 Am 结束。A–C–E 的小三和弦性质与 A 根音归宿共同支持 A 小调。','精确演奏窗 260.5–378.5 秒的色度模板相关：A minor 约 0.782，E minor 约 0.572；数值只是相对匹配程度，不是置信概率，更不能代替音乐语境。','局部音轨峰：Am 样本可见约 110.36、164.19、220.72、261.09 Hz；与 A2、E3、A3、C4 相符。Em、G、Dm 的相邻窗口也支持对应音组；仍可能包含人声与倍频。','标准调弦、无变调夹的教学按法与画面和绝对音高相符；没有给六根弦做独立校音检查，不声称逐指动作已全部核实。'],modulationSummary:{'整体':'本演奏保持 A 小调中心，没有持续转调的证据。Em 与 G 的出现仍属于这一自然小调材料。','数字读法':'为便于和大小调作品横向比较，根音级数统一用同主音大调作尺：A=1、D=4、E=5、G=♭7。自然小调内部也可把 G 称为第七音；这里的 ♭ 是参照体系，不是把原音 G 再降成 G♭。','v 与 V7':'原演唱分析为 Em（E–G–B，小五级 v）。教学创作可以换成 E7（E–G♯–B–D）加强回 Am 的导向，但 E7 不作为原演奏证据。','移调与把位':'本课用实音 A 小调、标准调弦、无变调夹练习。换把位不一定换调；将所有和弦和旋律同时整体移动才是练习移调。'}},
    sections,chords,
    definitions:[
      {term:'先分开四个数字：弦号、品位、指号、音级',text:'弦号说明弹哪根弦；品位说明按哪一格；小数字指号说明用哪根左手手指；根音级数说明和弦根音相对本曲 A 的位置。指板上的 1、♭3、5 则说明一个音相对当前和弦根音的身份。'},
      {term:'A 小调中的 G，为什么写成 ♭7？',text:'本网站根音级数用同主音大调作比较尺：A 大调第七音是 G♯，本曲 G 比它低半音，所以标 ♭7。若以 A 自然小调自己的音阶内部编号，G 就是第七音。两种说法都指同一个 G；不是弹 G♭。和弦 G 自身由 G–B–D 构成，内部仍是 1–3–5。'},
      {term:'Em 是五级，为什么不是强烈的属和弦？',text:'根音 E 是 5 级，但完整和弦 Em 含小三音 G，写作 v。它没有导音 G♯，本次常用在 Am→Em→G→Am 回环或 Em→Dm→Am 回归中。根音级数与大小性质必须一起读，不能看到 5 就自动补出 E7。'},
      {term:'和弦功能要放在前后句里',text:'短促的 Em 在 Am→Em→G→Am 中是回环的一站；停留较长的 Em 在 Em→Dm→Am 中延展一句再收束。G 与 Em 共享 G、B；Dm 回 Am 可保留 A 并让 F→E、D→C。用实际连接解释作用，比给每个和弦固定贴“悲伤”“紧张”更有用。'},
      {term:'从 14 秒焦点乐句开始练',text:'先看第 2 段：原片约 04:23.25–04:37.24。先只弹 A→E→G→A 根音；再加 C、G、B、C 等决定性质的三音，最后补五音。本曲主干是三和弦，没有必须补入的七音；加七音属于另行设计的变化。'},
      {term:'四小节简化练习：根音，再到完整和弦',text:'原创 60 BPM、4/4 四小节练习：Am｜Em 两拍 + G 两拍｜Am｜Am，共 16 秒。每组和弦先根音、再上方和弦音，末小节最后一拍留白。指板练习页的基础合成音频采用这一版，播放前有四拍预备。可用 x0221x、0x200x、3x000x、x0221x（六弦→一弦，x 不弹）。这是均匀化的教学版本，不能把这 16 秒当作原片精确节奏。'},
      {term:'把内声部变成小旋律：C→B→B→C',text:'在 Am→Em→G→Am 的连接里，二弦 1→0→0→1 品形成 C→B→B→C。C 是 Am 的 ♭3；第一个 B 是 Em 的 5，第二个 B 是 G 的 3。保持同一个 B、只换低音，音的和弦身份就改变了。这是用现有按法写旋律的教学观察，不是声称人声恰好唱了这些音。'},
      {term:'创作变化：Am→Dm→E7→Am',text:'原创四小节变化，每小节四拍、60 BPM：先把第二小节换成 Dm，再把第三小节改成 E7。根音变成 1→4→5→1，和弦是 i→iv→V7→i。E7 的 G♯→A、D→C 提供更强的解决；可用 020100 的 E7 按法练习。这是新写的和声，原演唱没有因此被改标成 E7。'},
      {term:'进阶加七音：改变颜色，不改证据',text:'把原创四小节中的 Am 改 Am7、Dm 改 Dm7，可以比较新加入的 G 或 C。先只加一个音，并观察指板上的 ♭7；再决定是否保留它。新颜色属于教学编配，视频里的 Am、Dm 三和弦候选不随之更名。'},
      {term:'为什么人声反复段不是吉他 Solo？',text:'Solo 分析看是谁承担前景旋律。这里人声反复时吉他逐渐停弹，随后才用短和弦回环接回；并没有一段连续的器乐独奏。学习这一段的关键是保留脉搏、控制止音与重新进入，而非凭空补一套吉他旋律谱。'},
      {term:'四层依据：本课哪些已确认，哪些是改写？',text:'音轨层：作者视频、可解码完整音轨与本次 118 秒演奏窗已核实。谱面层：作者同一课程的教学及和弦图可对应；没有取得作者逐音六线谱。算法层：和弦边界、音高峰与速度保持候选标记。教学层：指号、根音练习、均匀四小节节奏与创作变化另行标明。'}
    ],
    status:{coverage:'完整指弹演唱 00:00–01:58（原片 04:20.5–06:18.5）分为 9 段；52 个连续事件覆盖和弦、弱起、留白与最后余音。原片其他授课与先前扫弦演示不计入这次歌曲时间线。',limitations:['视频的作者、完整音轨解码与演奏窗已核实；并未完成人工逐音听写或逐帧手指复原。','和弦名称与作者教学、可见手形及音轨模板相互支持；通常的换和弦时间约 ±0.25 秒，人声留白切分约 ±0.5 秒，仍按近似边界使用。','谱面对应到同一 Day 6 教学及其示范；作者页面链接的 Ultimate Guitar 和弦谱未成功取得，本课没有声称读过该谱或把它当作逐音依据。','4/4 与直八分为主拍理解/教学记法；约 144 BPM 的自动结果是倍速脉冲候选，不能作为固定四分音符速度。','右手逐根拨弦时序尚未逐拍转录；指板给出与作者教学对应的可弹音组及建议指号。','原视频解码时长 446.533 秒（网页元数据四舍五入 447 秒），原始音频 Opus、48 kHz、双声道；分析副本为 22.05 kHz 单声道，网站使用作者 YouTube 嵌入视频。'],sources:[
      {label:'Andy Guitar · 本次完整指弹演唱',url:'https://www.youtube.com/watch?v=7RRblNpN_7A&t=260s',note:'同一作者的 Song Demo / Play along 视频；本课取最后一遍完整 fingerstyle cover 的人声弱起至结尾余音。原视频公开且允许嵌入。'},
      {label:'Andy Guitar · Day 6 官方配套课程',url:'https://www.andyguitar.co.uk/videos/day-6-10-day-guitar-starter-course',note:'官方页面明确把上方教学与下方完整歌曲示范配对，提供小和弦教学、和弦图和外部谱链接。'},
      {label:'官方课程配套小和弦图',url:'https://d1ma7tzlswibx6.cloudfront.net/images-general/10-day-6-minor-chords.png',note:'配套和弦图可供查看基本手形；实际拨哪些弦还需结合同曲教学和演奏。它不是完整演唱的逐音谱。'},
      {label:'作者页面链接的 Ultimate Guitar 和弦谱',url:'https://tabs.ultimate-guitar.com/tab/bill-withers/aint-no-sunshine-chords-468744',note:'链接存在，但本次未成功读取谱面内容；列作延伸来源，不作为本课核实证据。'}
    ]}
  };
})();
