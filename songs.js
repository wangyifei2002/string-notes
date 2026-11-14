(() => {
  'use strict';
  window.SONGS = Object.freeze([
    Object.freeze({
      id: 'currently',
      title: 'Currently',
      artist: 'Keaton Simons',
      performanceLabel: 'Fractured Fridays 现场演奏',
      lessonSrc: 'lesson-data.js',
      analysisSrc: 'full-analysis-data.js',
      poster: 'assets/poster.jpg',
      description: '从半音根音连接到变化属和弦，听懂弹唱、吉他 Solo 与回到主和弦的过程。',
      tags: ['Soul / Blues', '爵士化和声', '弹唱 + Solo'],
      level: '进阶 · 和弦与声部连接'
    }),
    Object.freeze({
      id: 'sunshine',
      title: 'Ain’t No Sunshine',
      artist: 'Andy Guitar',
      performanceLabel: 'Bill Withers 作品 · 吉他弹唱跟练',
      lessonSrc: 'songs/sunshine-lesson.js',
      analysisSrc: 'songs/sunshine-analysis.js',
      poster: 'https://i.ytimg.com/vi/7RRblNpN_7A/hqdefault.jpg',
      description: '用 Am、Em、G、Dm 练习小调的根音走向、指弹与留白。选取原片最后一遍约 1 分 58 秒的完整指弹弹唱。',
      tags: ['Soul / 流行', '小调', '开放和弦'],
      level: '入门 · 四个开放和弦'
    })
  ]);
})();
