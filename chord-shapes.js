(() => {
  'use strict';

  // Strings run from low 6 to high 1. These are reusable teaching grips,
  // not claims that a performer used these fingers in the linked recording.
  const fender = (slug, label) => ({ label: `Fender · ${label}`, url: `https://www.fender.com/articles/chords/${slug}` });
  const inversions = { label: 'JazzGuitar.be · 四声部按法与转位', url: 'https://www.jazzguitar.be/blog/chord-inversions/' };
  const dominant = { label: 'JazzGuitar.be · 属七、属九和弦家族', url: 'https://www.jazzguitar.be/blog/dominant-chords/' };
  const diminished = { label: 'JazzGuitar.be · 半减与减七和弦', url: 'https://www.jazzguitar.be/blog/diminished-chords/' };
  const barre = (fret, fromString, toString, finger = 1) => ({ fret, fromString, toString, finger });
  const match = (songId, voicingId) => ({ songId, voicingId });
  const degrees = {
    major: ['1', '3', '5'], minor: ['1', '♭3', '5'],
    '7': ['1', '3', '5', '♭7'], maj7: ['1', '3', '5', '7'],
    m7: ['1', '♭3', '5', '♭7'], m7b5: ['1', '♭3', '♭5', '♭7'],
    dim7: ['1', '♭3', '♭5', '♭♭7'], '9': ['1', '3', '5', '♭7', '9'],
    '7#5': ['1', '3', '♯5', '♭7']
  };
  const shape = (entry) => ({
    sourceLabel: '经典常用按法', videoVerified: false,
    sourceNote: '按法参考公开吉他教学；练习顺序由本站编写。歌曲关联表示可用于同名和弦的练习，不代表原视频的逐帧指法核验。',
    barres: [], matches: [], ...entry, formula: degrees[entry.quality]
  });

  window.CHORD_SHAPES = [
    shape({
      id: 'c-open', name: 'C', rootPc: 0, quality: 'major', family: '开放大三和弦',
      frets: [-1, 3, 2, 0, 1, 0], fingers: [null, 3, 2, null, 1, null],
      description: '五弦的 C 作低音，开放的 G、E 与按下的 C、E 组成大三和弦。先认根音，再找同音在不同弦上的重复。',
      leftText: '无名指按五弦3品，中指按四弦2品，食指按二弦1品；三、一弦开放。六弦不弹。',
      practice: '保持整组按法，先只弹五弦 C，再弹四弦 E 与三弦 G；最后从五弦开始扫弦。',
      transfer: '与 Am 共用二弦1品、四弦2品。先保持这两个接触点，再把无名指移到三弦2品。',
      sources: [fender('learn-how-to-play-c-guitar-chord', 'C 开放按法')]
    }),
    shape({
      id: 'a-open', name: 'A', rootPc: 9, quality: 'major', family: '开放大三和弦',
      frets: [-1, 0, 2, 2, 2, 0], fingers: [null, null, 1, 2, 3, null],
      description: '三个手指排在2品，五弦开放 A 是根音。二弦的 C♯ 是决定大三和弦性质的三音。',
      leftText: '食指、中指、无名指分别按四、三、二弦2品；五、一弦开放。六弦不弹。也可使用适合手型的替代指序。',
      practice: '先保持按法弹五弦，再弹二弦 C♯；最后交替弹5弦与4、3、2、1弦。',
      transfer: '把二弦 C♯ 降到1品 C 就得到 Am。封闭开放弦后，A 型可发展为五弦根音横按。',
      sources: [fender('learn-to-play-the-a-chord-on-guitar', 'A 开放按法')]
    }),
    shape({
      id: 'g-open', name: 'G', rootPc: 7, quality: 'major', family: '开放大三和弦',
      frets: [3, 2, 0, 0, 0, 3], fingers: [2, 1, null, null, null, 3],
      description: '六弦3品提供根音 G，五弦2品与二弦开放都给出三音 B；这是三手指的开放 G。',
      leftText: '中指按六弦3品，食指按五弦2品，无名指按一弦3品；四、三、二弦开放。六弦都可发声。',
      practice: '保持按法，先听6弦根音，再弹2弦三音；接着只拨6、4、3、2弦，体会完整按住与选择发声的区别。',
      transfer: '四指 G（320033）也是常见版本，二弦从 B 换成 D 后三音仍留在五弦；按法的选择要服务后续换和弦。',
      sources: [fender('learn-how-to-play-the-g-major-chord-on-guitar', 'G 的三指与四指版本')],
      matches: [match('sunshine', 'g')]
    }),
    shape({
      id: 'e-open', name: 'E', rootPc: 4, quality: 'major', family: '开放大三和弦',
      frets: [0, 2, 2, 1, 0, 0], fingers: [null, 2, 3, 1, null, null],
      description: '三弦1品的 G♯ 是大三音；六弦、四弦和一弦分别在不同音区重复根音 E。',
      leftText: '中指按五弦2品，无名指按四弦2品，食指按三弦1品；六、二、一弦开放。',
      practice: '固定五、四弦手指，比较三弦1品与开放弦，听 E 与 Em 的三音相差半音。',
      transfer: '改用中、无名、小指按原形，把食指留作横按，就能学习可移动的 E 型大三和弦。',
      sources: [fender('learn-how-to-play-the-e-major-chord-on-guitar', 'E 开放按法')]
    }),
    shape({
      id: 'd-open', name: 'D', rootPc: 2, quality: 'major', family: '开放大三和弦',
      frets: [-1, -1, 0, 2, 3, 2], fingers: [null, null, null, 1, 3, 2],
      description: '四弦开放 D 是根音；一弦2品 F♯ 是大三音。只用高四根弦也能得到完整三和弦。',
      leftText: '食指按三弦2品，无名指按二弦3品，中指按一弦2品；四弦开放，六、五弦不弹。',
      practice: '每次先弹四弦确认 D 低音，再分别检查3、2、1弦。避免扫到比根音更低的五、六弦。',
      transfer: '保持三、二弦音高，把一弦 F♯ 降为 F 得到 Dm；改为开放 E 则是 Dsus2。',
      sources: [fender('learn-how-to-play-the-d-chord-on-guitar', 'D 开放按法')]
    }),
    shape({
      id: 'am-open', name: 'Am', rootPc: 9, quality: 'minor', family: '开放小三和弦',
      frets: [-1, 0, 2, 2, 1, 0], fingers: [null, null, 2, 3, 1, null],
      description: '五弦 A 是根音，二弦1品 C 是小三音；同一个手型可以完整保持，右手只选择需要的音。',
      leftText: '中指按四弦2品，无名指按三弦2品，食指按二弦1品；五、一弦开放，六弦不弹。',
      practice: '左手保持 Am；右手先只拨5弦，再拨4、3、2弦。要练视频的节奏时，再跟随歌曲中该段的发声选择。',
      transfer: '与 C 共用二弦1品和四弦2品；与 E 的形状相近，但根音、各弦音级与不弹的弦不同。',
      sources: [fender('learn-how-to-play-a-minor-guitar-chord', 'Am 开放按法')],
      matches: [match('sunshine', 'am')]
    }),
    shape({
      id: 'em-open', name: 'Em', rootPc: 4, quality: 'minor', family: '开放小三和弦',
      frets: [0, 2, 2, 0, 0, 0], fingers: [null, 2, 3, null, null, null],
      description: '三弦开放 G 是小三音，六弦开放 E 是低音根音。仅按两处就能让六根弦发出和弦内音。',
      leftText: '中指按五弦2品，无名指按四弦2品，其余弦开放；也可依相邻和弦选用食指、中指。',
      practice: '保持两个按位，先拨6弦，再拨4、3、2弦；确认手指没有碰哑开放的三弦 G。',
      transfer: '再加三弦1品 G♯ 变为 E；松开四弦手指得到 Em7，新增的开放 D 是小七音。',
      sources: [fender('learn-how-to-play-e-minor-chord', 'Em 开放按法')],
      matches: [match('sunshine', 'em')]
    }),
    shape({
      id: 'dm-open', name: 'Dm', rootPc: 2, quality: 'minor', family: '开放小三和弦',
      frets: [-1, -1, 0, 2, 3, 1], fingers: [null, null, null, 2, 3, 1],
      description: '四弦 D、三弦 A、二弦 D、一弦 F 构成 Dm；最高音 F 是小三音。',
      leftText: '中指按三弦2品，无名指按二弦3品，食指按一弦1品；四弦开放，六、五弦不弹。',
      practice: '完整保持 Dm，先拨4弦，再拨3、2、1弦。只弹中间三根弦时没有三音 F，要能区别完整手型与当次发声。',
      transfer: '一弦的 F 升到 F♯ 后就是 D 大三和弦；按位改变一品，和弦性质也随三音改变。',
      sources: [fender('learn-how-to-play-dm-guitar-chord', 'Dm 开放按法')],
      matches: [match('sunshine', 'dm')]
    }),
    shape({
      id: 'f-barre', name: 'F', rootPc: 5, quality: 'major', family: '可移动横按三和弦',
      frets: [1, 3, 3, 2, 1, 1], fingers: [1, 3, 4, 2, 1, 1], barres: [barre(1, 6, 1)],
      description: 'E 型大三和弦移高半音；食指代替原来的开放弦，根音位于六弦1品。',
      leftText: '食指横按1品六弦到一弦；无名指按五弦3品，小指按四弦3品，中指按三弦2品。',
      practice: '先检查横按负责的6、2、1弦，再加入其余手指。按住全部弦，也可以先只拨6、4、3、2弦。',
      transfer: '整个形状上移2品成为 G，再移2品成为 A。先找六弦根音，再放其余手指；这是移调按法，不自动表示歌曲转调。',
      sources: [{ label: 'JustinGuitar · F 大横按', url: 'https://www.justinguitar.com/chords/f' }, fender('learn-how-to-play-the-g-major-chord-on-guitar', '同一 E 型的 G 横按')]
    }),
    shape({
      id: 'bm-barre', name: 'Bm', rootPc: 11, quality: 'minor', family: '可移动横按三和弦',
      frets: [-1, 2, 4, 4, 3, 2], fingers: [null, 1, 3, 4, 2, 1], barres: [barre(2, 5, 1)],
      description: 'Am 型整体升高全音，五弦2品 B 是根音；横按把开放 A、E 一并升高。',
      leftText: '食指横按2品五弦到一弦；无名指按四弦4品，小指按三弦4品，中指按二弦3品。六弦不弹。',
      practice: '先拨五弦 B，再拨二弦 D 找小三音；最后检查一弦2品是否清晰。',
      transfer: '同形移到3品成为 Cm，5品成为 Dm。记五弦根音比死记每一个和弦图更容易迁移。',
      sources: [{ label: 'Fender Play · Bm 第二把位', url: 'https://www.fender.com/play/lessons/bm-2nd-position-v2' }]
    }),
    shape({
      id: 'a7-open', name: 'A7', rootPc: 9, quality: '7', family: '开放属七和弦',
      frets: [-1, 0, 2, 0, 2, 0], fingers: [null, null, 1, null, 2, null],
      description: '三弦开放 G 是小七音；二弦 C♯ 是大三音。两者共同把 A 大三和弦变成 A7。',
      leftText: '食指按四弦2品，中指按二弦2品；五、三、一弦开放。六弦不弹。',
      practice: '先弹5弦根音，再只弹3、2弦的 G 与 C♯；最后接 D，听这两个声部怎样解决。',
      transfer: '在 D 调中可作 V7；在 A 的 blues 中也可作 I7。和弦类型相同，具体功能要看前后走向。',
      sources: [fender('learn-how-to-play-a7-guitar-chord', 'A7 开放按法')]
    }),
    shape({
      id: 'e7-open', name: 'E7', rootPc: 4, quality: '7', family: '开放属七和弦',
      frets: [0, 2, 0, 1, 0, 0], fingers: [null, 2, null, 1, null, null],
      description: 'E 大三和弦松开四弦手指，让 D 成为小七音；三弦 G♯ 保留大三音。',
      leftText: '中指按五弦2品，食指按三弦1品；六、四、二、一弦开放。',
      practice: '先保持 E7 弹6弦，再弹4、3弦的 D 与 G♯；接 Am，听 G♯ 上行到 A。',
      transfer: '可与 A7、B7 组成 E blues 的 I7–IV7–V7，也可用 E7→Am 体验小调属和弦。',
      sources: [fender('learn-how-to-play-e7-guitar-chord', 'E7 开放按法')]
    }),
    shape({
      id: 'd7-open', name: 'D7', rootPc: 2, quality: '7', family: '开放属七和弦',
      frets: [-1, -1, 0, 2, 1, 2], fingers: [null, null, null, 2, 1, 3],
      description: '二弦1品 C 是小七音，一弦2品 F♯ 是大三音。根音仍是四弦开放 D。',
      leftText: '中指按三弦2品，食指按二弦1品，无名指按一弦2品；四弦开放，六、五弦不弹。',
      practice: '分别听4弦根音与2、1弦的 C、F♯；再接 G，跟踪 F♯→G 的半音运动。',
      transfer: '与 D 比较：二弦 D 降到 C 引入小七音。练 G–C–D7–G 时，先唱出根音再换完整和弦。',
      sources: [{ label: 'Andy Jones Music · 开放和弦图表（D7）', url: 'https://www.andyjmusic.co.uk/resources/open_chords.pdf' }]
    }),
    shape({
      id: 'g7-open', name: 'G7', rootPc: 7, quality: '7', family: '开放属七和弦',
      frets: [3, 2, 0, 0, 0, 1], fingers: [3, 2, null, null, null, 1],
      description: '一弦1品 F 是小七音，二弦开放 B 是大三音。与开放 G 相比，最高音从根音换成了小七音。',
      leftText: '无名指按六弦3品，中指按五弦2品，食指按一弦1品；四、三、二弦开放。',
      practice: '先弹6弦 G，再弹2、1弦的 B、F；接 C 时听 B→C、F→E 的走向。',
      transfer: '在 C 调中常用作 V7；放进 G blues 时可以是 I7。先辨所在调与前后和弦，再判断功能。',
      sources: [fender('how-to-play-a-g7-chord-on-guitar', 'G7 开放按法')]
    }),
    shape({
      id: 'b7-open', name: 'B7', rootPc: 11, quality: '7', family: '开放属七和弦',
      frets: [-1, 2, 1, 2, 0, 2], fingers: [null, 2, 1, 3, null, 4],
      description: '五弦 B 是根音，四弦 D♯ 是大三音，三弦 A 是小七音；开放二弦重复 B。',
      leftText: '中指按五弦2品，食指按四弦1品，无名指按三弦2品，小指按一弦2品；二弦开放，六弦不弹。',
      practice: '先弹5弦，然后分辨4、3弦的三音和七音；接 Em，听 D♯→E。',
      transfer: '常用于 E 大调或 E 小调的属和弦。小调里出现 D♯ 不等于已经转为大调，要看它是否指向 Em。',
      sources: [fender('learn-how-to-play-b7-guitar-chord', 'B7 开放按法')]
    }),
    shape({
      id: 'cmaj7-open', name: 'Cmaj7', rootPc: 0, quality: 'maj7', family: '开放大七与小七和弦',
      frets: [-1, 3, 2, 0, 0, 0], fingers: [null, 3, 2, null, null, null],
      description: 'C 大三和弦松开二弦1品，开放的 B 成为大七音；maj7 的七音与属七和弦的 ♭7 不同。',
      leftText: '无名指按五弦3品，中指按四弦2品；三、二、一弦开放，六弦不弹。',
      practice: '交替 C 与 Cmaj7，只改变二弦 C→B；其余音保持，听半音下行的高声部。',
      transfer: '先学会 C→Cmaj7 的局部改变，再在自己的旋律中选择 C 或 B 作为上声部。开放音使此形不能直接整体平移。',
      sources: [fender('how-to-play-cmaj7-guitar-chord', 'Cmaj7 开放按法')]
    }),
    shape({
      id: 'am7-open', name: 'Am7', rootPc: 9, quality: 'm7', family: '开放大七与小七和弦',
      frets: [-1, 0, 2, 0, 1, 0], fingers: [null, null, 2, null, 1, null],
      description: 'Am 松开三弦2品，A 变为开放 G；G 是小七音，二弦的 C 仍是小三音。',
      leftText: '中指按四弦2品，食指按二弦1品；五、三、一弦开放。六弦不弹。',
      practice: '按住 Am 后只放开三弦手指，交替听三弦 A 与 G，再加入五弦根音。',
      transfer: '先比较 Am 与 Am7，再练 Am7–D7–G，观察同一个 Am7 在新的走向中怎样成为 G 调的 ii7。',
      sources: [fender('learn-how-to-play-am7-chord', 'Am7 开放按法')]
    }),
    shape({
      id: 'em7-open', name: 'Em7', rootPc: 4, quality: 'm7', family: '开放大七与小七和弦',
      frets: [0, 2, 0, 0, 0, 0], fingers: [null, 2, null, null, null, null],
      description: 'Em 松开四弦2品，E 变为开放 D；这个 D 是小七音。只按一处也能形成四种和弦音。',
      leftText: '中指按五弦2品，其他五根弦开放。手指抬高，避免碰到开放四弦。',
      practice: '先弹6弦 E，再交替弹4弦 D 与3弦 G，分清小七音与小三音。',
      transfer: '比较 Em→Em7 的四弦 E→D，再试 Em7–A7–D；同一形状可以进入不同调性的走向。',
      sources: [fender('learn-how-to-play-em7-guitar-chord', 'Em7 开放按法')]
    }),
    shape({
      id: 'dm7-open', name: 'Dm7', rootPc: 2, quality: 'm7', family: '开放大七与小七和弦',
      frets: [-1, -1, 0, 2, 1, 1], fingers: [null, null, null, 2, 1, 1], barres: [barre(1, 2, 1)],
      description: '二弦1品 C 为小七音，一弦1品 F 为小三音；食指一次按住两个相邻弦。',
      leftText: '食指在1品小横按二、一弦，中指按三弦2品；四弦开放，六、五弦不弹。',
      practice: '先检查小横按的2、1弦，再弹4弦 D。比较 Dm 的二弦3品 D 与 Dm7 的二弦1品 C。',
      transfer: '练 Dm7–G7–C 时先弹 D→G→C 根音，再加三音七音，最后弹完整按法。',
      sources: [fender('how-to-play-a-dm7-chord-on-guitar', 'Dm7 开放小横按')]
    }),
    shape({
      id: 'dm7b5-middle', name: 'Dm7♭5', rootPc: 2, quality: 'm7b5', family: '五弦根音四声部',
      frets: [-1, 5, 6, 5, 6, -1], fingers: [null, 1, 3, 2, 4, null],
      description: '五弦根音的半减七常用形，低到高是 D–A♭–C–F：根音、降五音、小七音、小三音。',
      leftText: '食指按五弦5品，无名指按四弦6品，中指按三弦5品，小指按二弦6品。六、一弦不弹。',
      practice: '先只弹五弦 D；再拨3、2弦的 C、F，最后加入四弦 A♭，听降五音带来的变化。',
      transfer: '四个按位一起移动，五弦根音决定和弦名。在小调 iiø7–V7–i 中也会使用这个和弦家族；本曲具体功能另看段落走向。',
      sources: [inversions, diminished], matches: [match('currently', 'dm7b5')],
      sourceNote: '来源支持五弦低音的半减七四声部家族；本条按 D 根音移到5品，手指分配为本站建议。未核验演奏者原指序。'
    }),
    shape({
      id: 'cm7-middle', name: 'Cm7', rootPc: 0, quality: 'm7', family: '五弦根音四声部',
      frets: [-1, 3, 5, 3, 4, -1], fingers: [null, 1, 3, 1, 2, null], barres: [barre(3, 5, 3)],
      description: '五弦根音的小七四声部常用形，低到高 C–G–B♭–E♭；每种和弦音各出现一次。',
      leftText: '食指在3品覆盖五弦到三弦；无名指按四弦5品，中指按二弦4品。六、一弦不弹。',
      practice: '保持整体按法，先弹5弦根音，再弹3、2弦的小七音和小三音，最后加入4弦五音。',
      transfer: '移高2品成为 Dm7。与开放 Dm7 比较同样的和弦音在不同音区、不同排列下的听感。',
      sources: [inversions], matches: [match('currently', 'cm7')],
      sourceNote: '来源支持五弦根音的 drop-2 小七家族；移到 C 根音并采用本站建议指序，不代表原视频按法核验。'
    }),
    shape({
      id: 'bbm7-middle', name: 'B♭m7', rootPc: 10, quality: 'm7', family: '六弦根音四声部',
      frets: [6, -1, 6, 6, 6, -1], fingers: [2, null, 1, 1, 1, null], barres: [barre(6, 4, 2)],
      description: '六弦根音的小七常用形，跳过五弦，低到高 B♭–A♭–D♭–F。低音与上方三音分开排列。',
      leftText: '中指按六弦6品，食指在6品小横按四、三、二弦；五、一弦不弹。右手可以分别拨6弦和4、3、2弦。',
      practice: '保持按法先弹六弦，再只弹3、4弦的小三音与小七音；练习避开五弦。',
      transfer: '同形移到5品是 Am7、3品是 Gm7。只移根音而不移上方音，会改变和弦内容，不能当作整体移调。',
      sources: [inversions], matches: [match('currently', 'bbm7')],
      sourceNote: '来源支持六弦根音的 drop-3 小七家族；本条移到 B♭ 根音，手指分配为本站建议。'
    }),
    shape({
      id: 'a7-middle', name: 'A7', rootPc: 9, quality: '7', family: '六弦根音四声部',
      frets: [5, -1, 5, 6, 5, -1], fingers: [2, null, 1, 3, 1, null], barres: [barre(5, 4, 2)],
      description: '低到高 A–G–C♯–E，是根音、小七音、大三音、五音的排列。与开放 A7 相同和弦、不同音区。',
      leftText: '中指按六弦5品，食指在5品覆盖四弦到二弦，无名指按三弦6品；五、一弦不弹。',
      practice: '先弹六弦 A，再只弹四、三弦 G 与 C♯；完整保持按法，只让所选弦发声。',
      transfer: '整形移到6品是 B♭7，移到3品是 G7；先在六弦找到根音，便能重用同一属七形。',
      sources: [dominant], matches: [match('currently', 'a7')],
      sourceNote: '来源直接给出六弦低音 drop-3 属七家族及 1–♭7–3–5 排列；本条移到 A，手指分配为本站建议。'
    }),
    shape({
      id: 'ab9-middle', name: 'A♭9', rootPc: 8, quality: '9', family: '属九和弦与延伸音',
      frets: [-1, 11, 10, 11, 11, -1], fingers: [null, 2, 1, 3, 3, null], barres: [barre(11, 3, 2, 3)],
      omittedDegrees: ['5'],
      description: '五弦根音的常用属九形：A♭–C–G♭–B♭，保留根音、三音、小七音、九音，省略五音 E♭。',
      leftText: '中指按五弦11品，食指按四弦10品，无名指在11品小横按三、二弦。六、一弦不弹。',
      practice: '先弹5弦根音，再拨4、3弦的三音与七音，最后加2弦 B♭ 九音；观察每一步增加了什么音。',
      transfer: '这组紧凑按法可整体移到其他五弦根音。它与歌曲原教学配置的音区和排列不同，可比较学习，不能据此声称视频演奏者用了11品。',
      sources: [dominant], matches: [match('currently', 'ab9')],
      sourceNote: '采用常见五弦根音属九形并省略五音；这是与歌曲教学配置不同的经典替代按法，未核验原视频使用。'
    }),
    shape({
      id: 'adim7-middle', name: 'A°7', rootPc: 9, quality: 'dim7', family: '减七和弦',
      frets: [5, -1, 4, 5, 4, -1], fingers: [2, null, 1, 3, 1, null], barres: [barre(4, 4, 2)],
      description: '低到高 A–G♭–C–E♭。G♭ 是 A 的减七音（♭♭7），不能因为与 F♯ 同音就把它标成普通六音。',
      leftText: '中指按六弦5品，食指在4品覆盖四弦到二弦，无名指按三弦5品；五、一弦不弹。',
      practice: '先弹六弦 A，再依次听 C、E♭、G♭；从音高上体会相邻和弦音都相隔小三度。',
      transfer: '整形移高3品会得到同一组音级类别的重新排列；和弦名字与拼写仍要由根音和实际走向决定。',
      sources: [diminished], matches: [match('currently', 'adim7')],
      sourceNote: '来源支持六弦低音的减七 drop-3 家族与 1–♭3–♭5–♭♭7 构成；本条移到 A，手指分配为本站建议。'
    }),
    shape({
      id: 'bb7-middle', name: 'B♭7', rootPc: 10, quality: '7', family: '六弦根音四声部',
      frets: [6, -1, 6, 7, 6, -1], fingers: [2, null, 1, 3, 1, null], barres: [barre(6, 4, 2)],
      description: '低到高 B♭–A♭–D–F，是六弦根音的常用属七形。D 与 A♭ 是决定性质的三音和七音。',
      leftText: '中指按六弦6品，食指在6品覆盖四弦到二弦，无名指按三弦7品；五、一弦不弹。',
      practice: '先弹六弦 B♭，再弹4、3弦 A♭ 与 D，最后加2弦 F；随后接 E♭ 比较解决感。',
      transfer: '这一形状与 A7、G7 完全同族。移调时同时移动全部按位；在 E♭ 调中可用它练 V7→I。',
      sources: [dominant], matches: [match('currently', 'bb7')],
      sourceNote: '来源支持六弦根音的 drop-3 属七家族；本条移到 B♭，手指分配为本站建议。'
    }),
    shape({
      id: 'bb7sharp5-variation', name: 'B♭7♯5', rootPc: 10, quality: '7#5', family: '属七和弦的教学变体',
      frets: [6, -1, 6, 7, 7, -1], fingers: [2, null, 1, 3, 4, null],
      sourceLabel: '经典按法的教学变体',
      description: '在 B♭7 常用形中，把二弦 F 升高半音为 F♯（♯5）。B♭、D、A♭ 保持不变，用来单独观察变化五音。',
      leftText: '中指按六弦6品，食指按四弦6品，无名指按三弦7品，小指按二弦7品；五、一弦不弹。无需为了此四音另加横按。',
      practice: '左手先保持 B♭7 的共同音，只用小指把二弦6品 F 改为7品 F♯；接 E♭ 时听它继续到8品 G。',
      transfer: '学习可迁移的原则：在属七手型里找到五音，再升高半音。实际曲目能否这样替换，仍要检查旋律和前后和声。',
      sources: [dominant], matches: [match('currently', 'bb7sharp5')],
      sourceNote: '这是本站从常用 B♭7 手型推导的升五音练习；来源支持属七与变化属和弦理论，并不证明此手型是原视频按法或最常见按法。'
    }),
    shape({
      id: 'eb-a-shape', name: 'E♭', rootPc: 3, quality: 'major', family: '可移动横按三和弦',
      frets: [-1, 6, 8, 8, 8, 6], fingers: [null, 1, 3, 3, 3, 1], barres: [barre(6, 5, 1), barre(8, 4, 2, 3)],
      description: 'A 型大三和弦移到五弦6品的 E♭ 根音。四、三、二弦组成 B♭–E♭–G；一弦6品补上 B♭。',
      leftText: '食指在6品横按五弦到一弦，无名指在8品小横按四、三、二弦；六弦不弹。只拨5、4、3、2弦时，一弦可以不发声。',
      practice: '先完整按好，再只拨五弦根音和二弦三音 G；随后弹5、4、3、2弦，最后才加入一弦。',
      transfer: '同形移低1品成为 D，移高2品成为 F。歌曲里只使用5、4、3、2弦，是这个常用形的局部发声选择。',
      sources: [fender('learn-to-play-the-a-chord-on-guitar', 'A 型及可移动横按')], matches: [match('currently', 'eb')],
      sourceNote: '从 A 型大三和弦整体移到五弦 E♭ 根音；完整五弦形与本曲四弦教学配置的高音发声范围不同，未核验原视频指序。'
    }),
    shape({
      id: 'g7-middle', name: 'G7', rootPc: 7, quality: '7', family: '六弦根音四声部',
      frets: [3, -1, 3, 4, 3, -1], fingers: [2, null, 1, 3, 1, null], barres: [barre(3, 4, 2)],
      description: '低到高 G–F–B–D，与开放 G7 是同一和弦。四声部各取一个音，便于分别听根音、三音与七音。',
      leftText: '中指按六弦3品，食指在3品覆盖四弦到二弦，无名指按三弦4品；五、一弦不弹。',
      practice: '先只弹六弦 G，再拨四、三弦 F 与 B；接 Cm 时听 B 上行到 C，F 下行到 E♭。',
      transfer: '与 A7、B♭7 共用同一可移动手型。也可以和开放 G7 来回比较，学习同名和弦的不同音区。',
      sources: [dominant], matches: [match('currently', 'g7')],
      sourceNote: '来源支持六弦根音的 drop-3 属七家族；本条移到 G，手指分配为本站建议。'
    })
  ];
})();
