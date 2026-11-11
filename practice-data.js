(() => {
  'use strict';
  const lesson = window.LESSON;
  const analysis = window.FULL_ANALYSIS;
  if (!lesson || !analysis) throw new Error('PracticeData needs LESSON and FULL_ANALYSIS first.');
  const clone = value => JSON.parse(JSON.stringify(value));
  const sections = clone(analysis.sections || []);
  const voicings = [...(lesson.segments || []), ...(lesson.catalog || [])]
    .filter(v => v.quality && v.notes?.length)
    .map(clone);
  const byId = new Map(voicings.map(v => [v.id, v]));

  // All times refer to the full performance, never the 29.55-second excerpt offset.
  function indexAt(items, value) {
    if (value === null || value === undefined || value === '' || !Number.isFinite(Number(value)) || !items.length) return -1;
    const t = Number(value);
    if (t <= items[0].start) return 0;
    if (t >= items[items.length - 1].end) return items.length - 1;
    return items.findIndex(item => t >= item.start && t < item.end);
  }
  const sectionAt = t => indexAt(sections, t);
  function emptyVoicing(kind, event) {
    const text = kind === 'solo'
      ? '这一处以Solo旋律为主，完整和弦与原版逐音指法尚未核准。请使用下方独立的简化旋律练习；空指板不表示原演奏没有声音。'
      : kind === 'decay'
        ? '这里是尾音与静默，不从衰减噪声补写新按法。'
        : '这一处根音或完整和弦尚未可靠分离，暂不指定按位。空指板表示未定，不表示演奏者把六根弦都静音。';
    return {
      kind, quality: null, rootPc: null, frets: [-1,-1,-1,-1,-1,-1],
      tab: 'x x x x x x', notes: [], expectedNoteNames: [], chordTones: [],
      omittedTones: [], fingerNumbers: [null,null,null,null,null,null],
      barres: [], fingerAlternatives: [], explanation: event.evidence || text,
      leftHand: text, fingerGuide: text, fingeringStatus: 'unresolved'
    };
  }
  const events = (analysis.chords || []).map((event, index) => {
    const shape = byId.get(event.fingeringId);
    const kind = shape ? 'chord' : /solo/i.test(event.chord || '') ? 'solo' : /余音|静默|decay/.test(event.chord || '') ? 'decay' : 'unresolved';
    const sectionIndex = sectionAt(event.start);
    const section = sections[sectionIndex];
    const voicing = shape ? clone(shape) : emptyVoicing(kind, event);
    const contextText = `${section?.title || '全曲'} · ${event.functionText || '局部和声作用待核对。'}`;
    return {
      ...voicing,
      id: `event-${index}`,
      eventIndex: index,
      voicingId: shape?.id || null,
      fingeringId: shape?.id || null,
      name: event.chord || '和声待定',
      kind,
      rootPc: shape ? event.rootPc : null,
      start: event.start, end: event.end,
      clipStart: event.start, clipEnd: event.end,
      sectionIndex,
      sectionId: section?.id || null,
      sectionTitle: section?.title || '全曲',
      analysisEvent: clone(event),
      confidence: event.confidence || 'low',
      evidence: event.evidence || '',
      sourceStatus: 'audio_algorithm_candidate',
      auditoryVerified: false,
      fingeringStatus: shape ? 'teaching_arrangement' : 'unresolved',
      timingStatus: 'approximate_boundary',
      fingers: [...voicing.fingerNumbers],
      transition: event.functionText || '结合前后乐句观察去向，暂不补写未确定的解决。',
      contextText,
      sourceContext: {
        sectionId: section?.id || null,
        sectionTitle: section?.title || '全曲',
        videoId: lesson.source.videoId,
        timeBase: 'full-performance',
        evidence: event.evidence || '',
        timingToleranceSeconds: event.timeToleranceSeconds ?? .5,
        note: '原视频时点与和声候选对应；展示的是可行教学配音，不是原演奏者逐指动作确认。'
      }
    };
  });

  // These are new exercises derived from the contour, not a synchronized transcription.
  // Note positions stay within this application's 0–12 fret board.
  const exercisePlans = [
    {
      description: '原创简化练习：先逐个弹C4–E♭4–F4，再用E♭3–D3低音回答。中间留一拍空白；保留高低音区的问答，不照搬原片时值。',
      octaveAdaptation: null,
      positions: [[3,5,2,'C'],[2,4,1,'E♭'],[2,6,3,'F'],[5,6,3,'E♭'],[5,5,2,'D']]
    },
    {
      description: '原创简化练习：C♯4–F4–B♭4上行，再回到D♭4–C4。C♯与D♭是同一按位，用不同写法提示A7三音与半音回落的不同语境。每次只弹一个音。',
      octaveAdaptation: null,
      positions: [[3,6,2,'C♯'],[2,6,2,'F'],[1,6,2,'B♭'],[3,6,2,'D♭'],[3,5,1,'C']]
    },
    {
      description: '原创简化练习：C4–E♭4–F4–G4–B♭4–C5，再沿B♭4–G4–F4回落。5至8品完成；先听组成音骨架，熟悉后可自己在F与G之间加入G♭色彩。',
      octaveAdaptation: null,
      positions: [[3,5,1,'C'],[3,8,4,'E♭'],[2,6,2,'F'],[2,8,4,'G'],[1,6,2,'B♭'],[1,8,4,'C'],[1,6,2,'B♭'],[2,8,4,'G'],[2,6,2,'F']]
    },
    {
      description: '原创简化练习：把高音下降轮廓整体降低一个八度，弹F4–C4–B♭3–G3–E♭3–C3，在第一个音后稍作停留。这样全部落在5至8品；本练习没有声称复现原片F5的音区或时值。',
      octaveAdaptation: '相对F5–C5–B♭4–G4–E♭4–C4的示例轮廓，整体降低12个半音。',
      positions: [[2,6,2,'F'],[3,5,1,'C'],[4,8,4,'B♭'],[4,5,1,'G'],[5,6,2,'E♭'],[6,8,4,'C']]
    }
  ];
  const openMidi = lesson.tuning.openMidi;
  function teachingNote([string, fret, finger, name], index) {
    const midi = openMidi[6-string] + fret;
    const octave = Math.floor(midi / 12) - 1;
    return {
      index, name, label: name + octave, octave, midi, pc: midi % 12,
      string, fret, finger, degree: '·', role: '旋律音',
      frequencyHz: 440 * Math.pow(2, (midi - 69) / 12),
      sourceStatus: 'original_teaching_exercise',
      timeSynchronized: false
    };
  }
  const soloSource = sections.find(section => section.type === 'solo')?.soloPhrases || [];
  const soloPhrases = soloSource.map((phrase, index) => {
    const plan = exercisePlans[index];
    return {
      ...clone(phrase),
      id: `solo-exercise-${index}`,
      sourceExercise: phrase.exercise,
      exercise: plan?.description || phrase.exercise,
      teachingDescription: plan?.description || '独立简化练习，原版逐音指法尚未核准。',
      teachingLabel: '原创简化练习 · 非原版逐音谱',
      teachingDisclaimer: '以下按位为顺序旋律练习，每次只弹一个音；不与原视频逐音自动同步，不代表原演奏的确切把位、指序或节奏。',
      octaveAdaptation: plan?.octaveAdaptation || null,
      teachingNotes: plan ? plan.positions.map(teachingNote) : [],
      timeSynchronized: false,
      fingeringStatus: 'teaching_arrangement',
      sectionIndex: sectionAt(phrase.start)
    };
  });
  window.PracticeData = {
    events, sections, soloPhrases, voicings,
    atTime: t => indexAt(events, t),
    sectionAt
  };
})();
