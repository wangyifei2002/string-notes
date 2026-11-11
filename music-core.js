(function (root, factory) {
  'use strict';
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.GuitarCore = api;
})(typeof window !== 'undefined' ? window : null, function () {
  'use strict';

  // Arrays follow the guitar from the thick sixth string to the thin first string.
  var TUNING = Object.freeze([40, 45, 50, 55, 59, 64]);
  var SHARPS = Object.freeze(['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B']);
  var FLATS = Object.freeze(['C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G', 'A♭', 'A', 'B♭', 'B']);
  var TEMPLATES = [
    { quality: 'major', suffix: '', intervals: [0, 4, 7] },
    { quality: 'minor', suffix: 'm', intervals: [0, 3, 7] },
    { quality: '7', suffix: '7', intervals: [0, 4, 7, 10] },
    { quality: 'm7', suffix: 'm7', intervals: [0, 3, 7, 10] },
    { quality: 'maj7', suffix: 'maj7', intervals: [0, 4, 7, 11] },
    { quality: 'm7b5', suffix: 'm7♭5', intervals: [0, 3, 6, 10] },
    { quality: 'dim7', suffix: '°7', intervals: [0, 3, 6, 9] },
    { quality: '7#5', suffix: '7♯5', intervals: [0, 4, 8, 10] },
    { quality: '9', suffix: '9', intervals: [0, 2, 4, 7, 10] },
    { quality: '9(no5)', suffix: '9（省略5音）', intervals: [0, 2, 4, 10], omitted: [7] },
    { quality: 'sus2', suffix: 'sus2', intervals: [0, 2, 7] },
    { quality: 'sus4', suffix: 'sus4', intervals: [0, 5, 7] },
    { quality: '5', suffix: '5', intervals: [0, 7] }
  ];

  function noteAt(stringIndex, fret) {
    if (!Number.isInteger(stringIndex) || stringIndex < 0 || stringIndex >= TUNING.length) {
      throw new RangeError('stringIndex must be an integer from 0 (sixth string) to 5 (first string).');
    }
    if (!Number.isInteger(fret) || fret < -1 || fret > 127 - TUNING[stringIndex]) {
      throw new RangeError('fret must be -1 for mute or a nonnegative integer within the MIDI note range.');
    }
    if (fret === -1) return null;
    var midi = TUNING[stringIndex] + fret;
    var pc = midi % 12;
    return {
      midi: midi,
      pc: pc,
      frequency: 440 * Math.pow(2, (midi - 69) / 12),
      sharpName: SHARPS[pc],
      flatName: FLATS[pc],
      octave: Math.floor(midi / 12) - 1
    };
  }

  function notesFor(frets) {
    if (!Array.isArray(frets) || frets.length !== 6) {
      throw new TypeError('frets must contain exactly six integers, ordered from sixth string to first string.');
    }
    return frets.map(function (fret, stringIndex) { return noteAt(stringIndex, fret); });
  }

  // Recognition describes the exact sounding pitch-class set. It does not infer a key,
  // an unheard note, a particular spelling, or the performer's original fingering.
  function recognize(frets) {
    var sounding = notesFor(frets).filter(function (note) { return note !== null; });
    var pitchClasses = Array.from(new Set(sounding.map(function (note) { return note.pc; })));
    if (pitchClasses.length < 2) return [];
    var bassPc = sounding.reduce(function (lowest, note) {
      return note.midi < lowest.midi ? note : lowest;
    }).pc;
    var candidates = [];
    TEMPLATES.forEach(function (template, templateIndex) {
      if (template.intervals.length !== pitchClasses.length) return;
      for (var rootPc = 0; rootPc < 12; rootPc += 1) {
        var matches = template.intervals.every(function (interval) {
          return pitchClasses.indexOf((rootPc + interval) % 12) !== -1;
        });
        if (!matches) continue;
        var candidate = {
          rootPc: rootPc,
          quality: template.quality,
          label: FLATS[rootPc] + template.suffix,
          intervals: template.intervals.slice()
        };
        if (template.omitted) candidate.omitted = template.omitted.slice();
        candidates.push({ value: candidate, templateIndex: templateIndex });
      }
    });
    candidates.sort(function (a, b) {
      var aBass = a.value.rootPc === bassPc ? 0 : 1;
      var bBass = b.value.rootPc === bassPc ? 0 : 1;
      return aBass - bBass || a.templateIndex - b.templateIndex || a.value.rootPc - b.value.rootPc;
    });
    return candidates.map(function (candidate) { return candidate.value; });
  }

  return Object.freeze({ TUNING: TUNING, noteAt: noteAt, notesFor: notesFor, recognize: recognize });
});
