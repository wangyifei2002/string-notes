window.LESSON = {
  "schemaVersion": 1,
  "title": "Currently · 从按位听懂和弦",
  "source": {
    "videoId": "p9AJpi3jRWc",
    "url": "https://www.youtube.com/watch?v=p9AJpi3jRWc",
    "title": "Keaton Simons - Currently - LIVE on Fractured Fridays, 2.18.11",
    "artist": "Keaton Simons",
    "duration": 247.381,
    "clip": {
      "start": 29.55,
      "end": 46.8,
      "duration": 17.25
    },
    "clipContainsSpeech": true
  },
  "tuning": {
    "mode": "teaching",
    "name": "标准调弦 · 无变调夹",
    "stringOrder": [
      6,
      5,
      4,
      3,
      2,
      1
    ],
    "openMidi": [
      40,
      45,
      50,
      55,
      59,
      64
    ],
    "openNames": [
      "E2",
      "A2",
      "D3",
      "G3",
      "B3",
      "E4"
    ],
    "capo": 0,
    "originalTuningVerified": false
  },
  "evidence": {
    "verified": "已核实来源编号、标题、完整音轨解码、时长与采样信息。",
    "score": "未取得作者原谱或权威六线谱。",
    "analysis": "和弦名与时点来自局部频谱、音高候选和画面对照，尚未完成人工逐音听写校订。",
    "teaching": "按标准调弦重新配音的教学按法，分别列出左手怎么按和右手拨哪些弦。右手先低音、再上方音组是慢练设计，原演奏逐指动作与逐拍拨弦顺序尚未定稿；未拨弦不自动等于左手必须松开。"
  },
  "uiRules": [
    "指法数组从六弦到一弦；-1 表示不发声，0 表示空弦。",
    "根音可能出现不止一次；识别和弦须按不同音高类判断，不能用点的数量判断和弦种类。",
    "点击自由指板改变按位后，应显示新组成音与识别候选，不继续沿用歌曲原候选和弦名。",
    "原片段用原视频绝对时间标注；播放器内时点必须减去 29.55 秒。",
    "简化练习的 60 BPM 和 4/4 是教学设定，不是原演奏节奏确认结果。",
    "fingerNumbers 与 frets 同顺序，1食指、2中指、3无名指、4小指；null 表示本教学指法不按该弦。barres 仅为小横按辅助线，更高品位的按指优先决定实际发声音。",
    "明确标注第1弦最细、第6弦最粗；品位、弦号与左手指号是三种不同的数字，不能混作同一种标记。",
    "左手完整按法与右手发声独立：handPlan.gripFrets 为六弦到一弦的建议手形，null 为不指定按位，0 为空弦；handPlan.pluckStrings 指定本次拨响的弦。",
    "按住但未拨的音可以显示在指板上，但不加入本次和弦试音或实际发声音列表。handPlan.steps 是慢练顺序，不是原视频逐拍拨弦定稿。"
  ],
  "segments": [
    {
      "id": "unresolved-connection",
      "start": 29.55,
      "end": 32.5,
      "clipStart": 0,
      "clipEnd": 2.95,
      "name": "连接音型 · 待核对",
      "kind": "unresolved",
      "quality": null,
      "rootPc": null,
      "frets": [
        -1,
        -1,
        -1,
        -1,
        -1,
        -1
      ],
      "tab": "xxxxxx",
      "notes": [],
      "expectedNoteNames": [],
      "chordTones": [],
      "omittedTones": [],
      "explanation": "复查后，29.55秒附近的低频瞬态没有稳定支持F。此前F低音候选已撤回；30.25–31秒有E♭区域证据，连接处仍不指定完整和弦。",
      "transition": "先观察连接如何引入D半减七；暂不把噪声峰或经过音命名为新和弦。",
      "fingerGuide": "这里暂不提供按法。请从下一步的D半减七开始练习。",
      "sourceStatus": "unresolved",
      "fingeringStatus": "teaching_arrangement",
      "timingStatus": "approximate_boundary",
      "fingerNumbers": [
        null,
        null,
        null,
        null,
        null,
        null
      ],
      "leftHand": "这里暂不提供按法。请从下一步的D半减七开始练习。",
      "barres": [],
      "fingerAlternatives": []
    },
    {
      "id": "dm7b5",
      "start": 32.5,
      "end": 34.4,
      "clipStart": 2.95,
      "clipEnd": 4.85,
      "name": "Dm7♭5",
      "kind": "chord",
      "quality": "m7b5",
      "rootPc": 2,
      "frets": [
        -1,
        5,
        6,
        5,
        6,
        -1
      ],
      "tab": "x5656x",
      "notes": [
        {
          "string": 5,
          "fret": 5,
          "midi": 50,
          "pc": 2,
          "name": "D",
          "octave": 3,
          "label": "D3",
          "degree": "1",
          "role": "根音",
          "frequencyHz": 146.832,
          "finger": 1
        },
        {
          "string": 4,
          "fret": 6,
          "midi": 56,
          "pc": 8,
          "name": "A♭",
          "octave": 3,
          "label": "A♭3",
          "degree": "♭5",
          "role": "减五度",
          "frequencyHz": 207.652,
          "finger": 3
        },
        {
          "string": 3,
          "fret": 5,
          "midi": 60,
          "pc": 0,
          "name": "C",
          "octave": 4,
          "label": "C4",
          "degree": "♭7",
          "role": "小七度",
          "frequencyHz": 261.626,
          "finger": 2
        },
        {
          "string": 2,
          "fret": 6,
          "midi": 65,
          "pc": 5,
          "name": "F",
          "octave": 4,
          "label": "F4",
          "degree": "♭3",
          "role": "小三度",
          "frequencyHz": 349.228,
          "finger": 4
        }
      ],
      "expectedNoteNames": [
        "D3",
        "A♭3",
        "C4",
        "F4"
      ],
      "chordTones": [
        {
          "name": "D",
          "pc": 2,
          "degree": "1",
          "role": "根音",
          "present": true
        },
        {
          "name": "F",
          "pc": 5,
          "degree": "♭3",
          "role": "小三度",
          "present": true
        },
        {
          "name": "A♭",
          "pc": 8,
          "degree": "♭5",
          "role": "减五度",
          "present": true
        },
        {
          "name": "C",
          "pc": 0,
          "degree": "♭7",
          "role": "小七度",
          "present": true
        }
      ],
      "omittedTones": [],
      "explanation": "五弦五品给出 D。F 把三度变成小三度，A♭把五度降低，再加上 C 这个小七度，合起来就是 Dm7♭5（D 半减七和弦）。",
      "transition": "从前面的 F 低音移到五弦五品 D；这是教学选择的可弹位置，不表示原演奏者的逐指位置已确认。",
      "fingerGuide": "教学建议：食指按五弦五品，中指按三弦五品，无名指按四弦六品，小指按二弦六品。只拨五、四、三、二弦。",
      "sourceStatus": "algorithm_candidate",
      "fingeringStatus": "teaching_arrangement",
      "timingStatus": "approximate_boundary",
      "fingerNumbers": [
        null,
        1,
        3,
        2,
        4,
        null
      ],
      "leftHand": "教学建议：食指按五弦五品，中指按三弦五品，无名指按四弦六品，小指按二弦六品。只拨五、四、三、二弦。",
      "barres": [],
      "fingerAlternatives": [],
      "handPlan": {
        "gripFrets": [
          null,
          5,
          6,
          5,
          6,
          null
        ],
        "fingerNumbers": [
          null,
          1,
          3,
          2,
          4,
          null
        ],
        "leftText": "食指按5弦5品，中指按3弦5品，无名指按4弦6品，小指按2弦6品。",
        "pluckStrings": [
          5,
          4,
          3,
          2
        ],
        "rightText": "本次只弹5弦 D3、4弦 A♭3、3弦 C4、2弦 F4。慢练可先用拇指拨5弦低音，再把4、3、2弦作为一组拨响。6、1弦均跳过；不拨弦不等于必须松开左手。",
        "steps": [
          {
            "label": "先拨低音 · 5弦 D3",
            "strings": [
              5
            ]
          },
          {
            "label": "再拨上方音组 · 4弦 A♭3、3弦 C4、2弦 F4",
            "strings": [
              4,
              3,
              2
            ]
          }
        ],
        "status": "teaching_grip_and_plucking_exercise",
        "evidence": "沿用可行教学配音的左手按法；原演奏逐指动作与右手拨弦顺序尚未定稿。只列已有依据的按位，不为未拨的弦猜测额外按指。下面两步是独立的慢练分解。"
      }
    },
    {
      "id": "cm7",
      "start": 34.4,
      "end": 36.7,
      "clipStart": 4.85,
      "clipEnd": 7.15,
      "name": "Cm7",
      "kind": "chord",
      "quality": "m7",
      "rootPc": 0,
      "frets": [
        -1,
        3,
        5,
        3,
        4,
        -1
      ],
      "tab": "x3534x",
      "notes": [
        {
          "string": 5,
          "fret": 3,
          "midi": 48,
          "pc": 0,
          "name": "C",
          "octave": 3,
          "label": "C3",
          "degree": "1",
          "role": "根音",
          "frequencyHz": 130.813,
          "finger": 1
        },
        {
          "string": 4,
          "fret": 5,
          "midi": 55,
          "pc": 7,
          "name": "G",
          "octave": 3,
          "label": "G3",
          "degree": "5",
          "role": "纯五度",
          "frequencyHz": 195.998,
          "finger": 3
        },
        {
          "string": 3,
          "fret": 3,
          "midi": 58,
          "pc": 10,
          "name": "B♭",
          "octave": 3,
          "label": "B♭3",
          "degree": "♭7",
          "role": "小七度",
          "frequencyHz": 233.082,
          "finger": 1
        },
        {
          "string": 2,
          "fret": 4,
          "midi": 63,
          "pc": 3,
          "name": "E♭",
          "octave": 4,
          "label": "E♭4",
          "degree": "♭3",
          "role": "小三度",
          "frequencyHz": 311.127,
          "finger": 2
        }
      ],
      "expectedNoteNames": [
        "C3",
        "G3",
        "B♭3",
        "E♭4"
      ],
      "chordTones": [
        {
          "name": "C",
          "pc": 0,
          "degree": "1",
          "role": "根音",
          "present": true
        },
        {
          "name": "E♭",
          "pc": 3,
          "degree": "♭3",
          "role": "小三度",
          "present": true
        },
        {
          "name": "G",
          "pc": 7,
          "degree": "5",
          "role": "纯五度",
          "present": true
        },
        {
          "name": "B♭",
          "pc": 10,
          "degree": "♭7",
          "role": "小七度",
          "present": true
        }
      ],
      "omittedTones": [],
      "explanation": "五弦三品是 C，二弦四品是决定小和弦色彩的 E♭。加上 G 和 B♭，组成 Cm7。图上的上下排列是吉他实际发声顺序，不是和弦名称里按三度排列的顺序。",
      "transition": "低音 D→C 下降全音。用教学指法比较上声部：A♭→G、C→B♭、F→E♭，这些音也一起下移。",
      "fingerGuide": "教学建议：食指在三品从五弦到三弦作小横按，无名指按四弦五品，中指按二弦四品；只拨五、四、三、二弦。横按经过的四弦由更高的五品发声。",
      "sourceStatus": "algorithm_candidate",
      "fingeringStatus": "teaching_arrangement",
      "timingStatus": "approximate_boundary",
      "fingerNumbers": [
        null,
        1,
        3,
        1,
        2,
        null
      ],
      "leftHand": "教学建议：食指在三品从五弦到三弦作小横按，无名指按四弦五品，中指按二弦四品；只拨五、四、三、二弦。横按经过的四弦由更高的五品发声。",
      "barres": [
        {
          "finger": 1,
          "fret": 3,
          "fromString": 5,
          "toString": 3
        }
      ],
      "fingerAlternatives": [],
      "handPlan": {
        "gripFrets": [
          null,
          3,
          5,
          3,
          4,
          null
        ],
        "fingerNumbers": [
          null,
          1,
          3,
          1,
          2,
          null
        ],
        "leftText": "食指在3品从5弦到3弦作小横按，无名指按4弦5品，中指按2弦4品。横按仍经过4弦，4弦音高由更靠近琴桥的5品决定。",
        "pluckStrings": [
          5,
          4,
          3,
          2
        ],
        "rightText": "本次只弹5弦 C3、4弦 G3、3弦 B♭3、2弦 E♭4。慢练可先用拇指拨5弦低音，再把4、3、2弦作为一组拨响。6、1弦均跳过；不拨弦不等于必须松开左手。",
        "steps": [
          {
            "label": "先拨低音 · 5弦 C3",
            "strings": [
              5
            ]
          },
          {
            "label": "再拨上方音组 · 4弦 G3、3弦 B♭3、2弦 E♭4",
            "strings": [
              4,
              3,
              2
            ]
          }
        ],
        "status": "teaching_grip_and_plucking_exercise",
        "evidence": "沿用可行教学配音的左手按法；原演奏逐指动作与右手拨弦顺序尚未定稿。只列已有依据的按位，不为未拨的弦猜测额外按指。下面两步是独立的慢练分解。"
      }
    },
    {
      "id": "bbm7",
      "start": 36.7,
      "end": 37.5,
      "clipStart": 7.15,
      "clipEnd": 7.95,
      "name": "B♭m7",
      "kind": "chord",
      "quality": "m7",
      "rootPc": 10,
      "frets": [
        6,
        -1,
        6,
        6,
        6,
        -1
      ],
      "tab": "6x666x",
      "notes": [
        {
          "string": 6,
          "fret": 6,
          "midi": 46,
          "pc": 10,
          "name": "B♭",
          "octave": 2,
          "label": "B♭2",
          "degree": "1",
          "role": "根音",
          "frequencyHz": 116.541,
          "finger": 2
        },
        {
          "string": 4,
          "fret": 6,
          "midi": 56,
          "pc": 8,
          "name": "A♭",
          "octave": 3,
          "label": "A♭3",
          "degree": "♭7",
          "role": "小七度",
          "frequencyHz": 207.652,
          "finger": 1
        },
        {
          "string": 3,
          "fret": 6,
          "midi": 61,
          "pc": 1,
          "name": "D♭",
          "octave": 4,
          "label": "D♭4",
          "degree": "♭3",
          "role": "小三度",
          "frequencyHz": 277.183,
          "finger": 1
        },
        {
          "string": 2,
          "fret": 6,
          "midi": 65,
          "pc": 5,
          "name": "F",
          "octave": 4,
          "label": "F4",
          "degree": "5",
          "role": "纯五度",
          "frequencyHz": 349.228,
          "finger": 1
        }
      ],
      "expectedNoteNames": [
        "B♭2",
        "A♭3",
        "D♭4",
        "F4"
      ],
      "chordTones": [
        {
          "name": "B♭",
          "pc": 10,
          "degree": "1",
          "role": "根音",
          "present": true
        },
        {
          "name": "D♭",
          "pc": 1,
          "degree": "♭3",
          "role": "小三度",
          "present": true
        },
        {
          "name": "F",
          "pc": 5,
          "degree": "5",
          "role": "纯五度",
          "present": true
        },
        {
          "name": "A♭",
          "pc": 8,
          "degree": "♭7",
          "role": "小七度",
          "present": true
        }
      ],
      "omittedTones": [],
      "explanation": "六弦六品是 B♭。D♭是小三度，F 是五度，A♭是小七度。先拨六弦听低音，再拨四、三、二弦听上面的和弦色彩。",
      "transition": "低音 C→B♭继续下降全音。先分别练 Cm7 和 B♭m7，不要为了整齐移动手形而误弹应静音的弦。",
      "fingerGuide": "教学建议：食指在六品横按四、三、二弦，中指按六弦六品。只拨六、四、三、二弦，五弦与一弦不发声。",
      "sourceStatus": "algorithm_candidate",
      "fingeringStatus": "teaching_arrangement",
      "timingStatus": "approximate_boundary",
      "fingerNumbers": [
        2,
        null,
        1,
        1,
        1,
        null
      ],
      "leftHand": "教学建议：食指在六品横按四、三、二弦，中指按六弦六品。只拨六、四、三、二弦，五弦与一弦不发声。",
      "barres": [
        {
          "finger": 1,
          "fret": 6,
          "fromString": 4,
          "toString": 2
        }
      ],
      "fingerAlternatives": [],
      "handPlan": {
        "gripFrets": [
          6,
          null,
          6,
          6,
          6,
          null
        ],
        "fingerNumbers": [
          2,
          null,
          1,
          1,
          1,
          null
        ],
        "leftText": "食指在6品小横按4、3、2弦，中指按6弦6品。",
        "pluckStrings": [
          6,
          4,
          3,
          2
        ],
        "rightText": "本次只弹6弦 B♭2、4弦 A♭3、3弦 D♭4、2弦 F4。慢练可先用拇指拨6弦低音，再把4、3、2弦作为一组拨响。5、1弦均跳过；不拨弦不等于必须松开左手。",
        "steps": [
          {
            "label": "先拨低音 · 6弦 B♭2",
            "strings": [
              6
            ]
          },
          {
            "label": "再拨上方音组 · 4弦 A♭3、3弦 D♭4、2弦 F4",
            "strings": [
              4,
              3,
              2
            ]
          }
        ],
        "status": "teaching_grip_and_plucking_exercise",
        "evidence": "沿用可行教学配音的左手按法；原演奏逐指动作与右手拨弦顺序尚未定稿。只列已有依据的按位，不为未拨的弦猜测额外按指。下面两步是独立的慢练分解。"
      }
    },
    {
      "id": "a7",
      "start": 37.5,
      "end": 38.4,
      "clipStart": 7.95,
      "clipEnd": 8.85,
      "name": "A7",
      "kind": "chord",
      "quality": "7",
      "rootPc": 9,
      "frets": [
        5,
        -1,
        5,
        6,
        5,
        -1
      ],
      "tab": "5x565x",
      "notes": [
        {
          "string": 6,
          "fret": 5,
          "midi": 45,
          "pc": 9,
          "name": "A",
          "octave": 2,
          "label": "A2",
          "degree": "1",
          "role": "根音",
          "frequencyHz": 110,
          "finger": 2
        },
        {
          "string": 4,
          "fret": 5,
          "midi": 55,
          "pc": 7,
          "name": "G",
          "octave": 3,
          "label": "G3",
          "degree": "♭7",
          "role": "小七度",
          "frequencyHz": 195.998,
          "finger": 1
        },
        {
          "string": 3,
          "fret": 6,
          "midi": 61,
          "pc": 1,
          "name": "C♯",
          "octave": 4,
          "label": "C♯4",
          "degree": "3",
          "role": "大三度",
          "frequencyHz": 277.183,
          "finger": 3
        },
        {
          "string": 2,
          "fret": 5,
          "midi": 64,
          "pc": 4,
          "name": "E",
          "octave": 4,
          "label": "E4",
          "degree": "5",
          "role": "纯五度",
          "frequencyHz": 329.628,
          "finger": 1
        }
      ],
      "expectedNoteNames": [
        "A2",
        "G3",
        "C♯4",
        "E4"
      ],
      "chordTones": [
        {
          "name": "A",
          "pc": 9,
          "degree": "1",
          "role": "根音",
          "present": true
        },
        {
          "name": "C♯",
          "pc": 1,
          "degree": "3",
          "role": "大三度",
          "present": true
        },
        {
          "name": "E",
          "pc": 4,
          "degree": "5",
          "role": "纯五度",
          "present": true
        },
        {
          "name": "G",
          "pc": 7,
          "degree": "♭7",
          "role": "小七度",
          "present": true
        }
      ],
      "omittedTones": [],
      "explanation": "六弦五品 A 与三弦六品 C♯形成大三度；G 是小七度，所以这是 A7。这里的 C♯和上一和弦的 D♭是同一个品位、同一个音高，但在各自和弦中的作用不同。",
      "transition": "B♭→A、A♭→G、F→E 都降半音；三弦六品保持不动，D♭换名称为 C♯。不要把这一步直接解释成整首歌转到了 D 调。",
      "fingerGuide": "教学建议：食指在五品从四弦到二弦作小横按，中指按六弦五品，无名指按三弦六品。只拨六、四、三、二弦。",
      "sourceStatus": "algorithm_candidate",
      "fingeringStatus": "teaching_arrangement",
      "timingStatus": "approximate_boundary",
      "fingerNumbers": [
        2,
        null,
        1,
        3,
        1,
        null
      ],
      "leftHand": "教学建议：食指在五品从四弦到二弦作小横按，中指按六弦五品，无名指按三弦六品。只拨六、四、三、二弦。",
      "barres": [
        {
          "finger": 1,
          "fret": 5,
          "fromString": 4,
          "toString": 2
        }
      ],
      "fingerAlternatives": [],
      "handPlan": {
        "gripFrets": [
          5,
          null,
          5,
          6,
          5,
          null
        ],
        "fingerNumbers": [
          2,
          null,
          1,
          3,
          1,
          null
        ],
        "leftText": "食指在5品从4弦到2弦作小横按，中指按6弦5品，无名指按3弦6品。3弦由无名指的6品决定音高。",
        "pluckStrings": [
          6,
          4,
          3,
          2
        ],
        "rightText": "本次只弹6弦 A2、4弦 G3、3弦 C♯4、2弦 E4。慢练可先用拇指拨6弦低音，再把4、3、2弦作为一组拨响。5、1弦均跳过；不拨弦不等于必须松开左手。",
        "steps": [
          {
            "label": "先拨低音 · 6弦 A2",
            "strings": [
              6
            ]
          },
          {
            "label": "再拨上方音组 · 4弦 G3、3弦 C♯4、2弦 E4",
            "strings": [
              4,
              3,
              2
            ]
          }
        ],
        "status": "teaching_grip_and_plucking_exercise",
        "evidence": "沿用可行教学配音的左手按法；原演奏逐指动作与右手拨弦顺序尚未定稿。只列已有依据的按位，不为未拨的弦猜测额外按指。下面两步是独立的慢练分解。"
      }
    },
    {
      "id": "ab9",
      "start": 38.4,
      "end": 40.1,
      "clipStart": 8.85,
      "clipEnd": 10.55,
      "name": "A♭9",
      "kind": "chord",
      "quality": "9",
      "rootPc": 8,
      "frets": [
        4,
        -1,
        4,
        3,
        1,
        -1
      ],
      "tab": "4x431x",
      "notes": [
        {
          "string": 6,
          "fret": 4,
          "midi": 44,
          "pc": 8,
          "name": "A♭",
          "octave": 2,
          "label": "A♭2",
          "degree": "1",
          "role": "根音",
          "frequencyHz": 103.826,
          "finger": 3
        },
        {
          "string": 4,
          "fret": 4,
          "midi": 54,
          "pc": 6,
          "name": "G♭",
          "octave": 3,
          "label": "G♭3",
          "degree": "♭7",
          "role": "小七度",
          "frequencyHz": 184.997,
          "finger": 4
        },
        {
          "string": 3,
          "fret": 3,
          "midi": 58,
          "pc": 10,
          "name": "B♭",
          "octave": 3,
          "label": "B♭3",
          "degree": "9",
          "role": "大九度",
          "frequencyHz": 233.082,
          "finger": 2
        },
        {
          "string": 2,
          "fret": 1,
          "midi": 60,
          "pc": 0,
          "name": "C",
          "octave": 4,
          "label": "C4",
          "degree": "3",
          "role": "大三度",
          "frequencyHz": 261.626,
          "finger": 1
        }
      ],
      "expectedNoteNames": [
        "A♭2",
        "G♭3",
        "B♭3",
        "C4"
      ],
      "chordTones": [
        {
          "name": "A♭",
          "pc": 8,
          "degree": "1",
          "role": "根音",
          "present": true
        },
        {
          "name": "C",
          "pc": 0,
          "degree": "3",
          "role": "大三度",
          "present": true
        },
        {
          "name": "E♭",
          "pc": 3,
          "degree": "5",
          "role": "纯五度",
          "present": false
        },
        {
          "name": "G♭",
          "pc": 6,
          "degree": "♭7",
          "role": "小七度",
          "present": true
        },
        {
          "name": "B♭",
          "pc": 10,
          "degree": "9",
          "role": "大九度",
          "present": true
        }
      ],
      "omittedTones": [
        "E♭"
      ],
      "explanation": "A♭9 的完整组成是 A♭、C、E♭、G♭、B♭。这一个教学配音省略五音 E♭，保留根音、三音、七音和九音。指板上只显示真正按出的四个音。",
      "transition": "低音 A→A♭又降半音，G→G♭也降半音，C♯→C 降半音；这里换用了含九音 B♭的配音。这个手形横跨四品，可先只弹低音和上方两个音。",
      "fingerGuide": "教学建议：食指按二弦一品，中指按三弦三品，无名指按六弦四品，小指按四弦四品。这个配音跨四个品位，先分别把每个音按清楚，再合起来；若目前跨度不适合，先只练六弦四品低音。",
      "sourceStatus": "algorithm_candidate",
      "fingeringStatus": "teaching_arrangement",
      "timingStatus": "approximate_boundary",
      "fingerNumbers": [
        3,
        null,
        4,
        2,
        1,
        null
      ],
      "leftHand": "教学建议：食指按二弦一品，中指按三弦三品，无名指按六弦四品，小指按四弦四品。这个配音跨四个品位，先分别把每个音按清楚，再合起来；若目前跨度不适合，先只练六弦四品低音。",
      "barres": [],
      "fingerAlternatives": [],
      "handPlan": {
        "gripFrets": [
          4,
          null,
          4,
          3,
          1,
          null
        ],
        "fingerNumbers": [
          3,
          null,
          4,
          2,
          1,
          null
        ],
        "leftText": "食指按2弦1品，中指按3弦3品，无名指按6弦4品，小指按4弦4品。跨度较大，可先逐个摆好再合拢，不必勉强拉伸。",
        "pluckStrings": [
          6,
          4,
          3,
          2
        ],
        "rightText": "本次只弹6弦 A♭2、4弦 G♭3、3弦 B♭3、2弦 C4。慢练可先用拇指拨6弦低音，再把4、3、2弦作为一组拨响。5、1弦均跳过；不拨弦不等于必须松开左手。",
        "steps": [
          {
            "label": "先拨低音 · 6弦 A♭2",
            "strings": [
              6
            ]
          },
          {
            "label": "再拨上方音组 · 4弦 G♭3、3弦 B♭3、2弦 C4",
            "strings": [
              4,
              3,
              2
            ]
          }
        ],
        "status": "teaching_grip_and_plucking_exercise",
        "evidence": "沿用可行教学配音的左手按法；原演奏逐指动作与右手拨弦顺序尚未定稿。只列已有依据的按位，不为未拨的弦猜测额外按指。下面两步是独立的慢练分解。"
      }
    },
    {
      "id": "adim7",
      "start": 40.1,
      "end": 41.6,
      "clipStart": 10.55,
      "clipEnd": 12.05,
      "name": "A°7",
      "kind": "chord",
      "quality": "dim7",
      "rootPc": 9,
      "frets": [
        5,
        -1,
        4,
        5,
        4,
        -1
      ],
      "tab": "5x454x",
      "notes": [
        {
          "string": 6,
          "fret": 5,
          "midi": 45,
          "pc": 9,
          "name": "A",
          "octave": 2,
          "label": "A2",
          "degree": "1",
          "role": "根音",
          "frequencyHz": 110,
          "finger": 2
        },
        {
          "string": 4,
          "fret": 4,
          "midi": 54,
          "pc": 6,
          "name": "G♭",
          "octave": 3,
          "label": "G♭3",
          "degree": "♭♭7",
          "role": "减七度",
          "frequencyHz": 184.997,
          "finger": 1
        },
        {
          "string": 3,
          "fret": 5,
          "midi": 60,
          "pc": 0,
          "name": "C",
          "octave": 4,
          "label": "C4",
          "degree": "♭3",
          "role": "小三度",
          "frequencyHz": 261.626,
          "finger": 3
        },
        {
          "string": 2,
          "fret": 4,
          "midi": 63,
          "pc": 3,
          "name": "E♭",
          "octave": 4,
          "label": "E♭4",
          "degree": "♭5",
          "role": "减五度",
          "frequencyHz": 311.127,
          "finger": 1
        }
      ],
      "expectedNoteNames": [
        "A2",
        "G♭3",
        "C4",
        "E♭4"
      ],
      "chordTones": [
        {
          "name": "A",
          "pc": 9,
          "degree": "1",
          "role": "根音",
          "present": true
        },
        {
          "name": "C",
          "pc": 0,
          "degree": "♭3",
          "role": "小三度",
          "present": true
        },
        {
          "name": "E♭",
          "pc": 3,
          "degree": "♭5",
          "role": "减五度",
          "present": true
        },
        {
          "name": "G♭",
          "pc": 6,
          "degree": "♭♭7",
          "role": "减七度",
          "present": true
        }
      ],
      "omittedTones": [],
      "explanation": "A、C、E♭、G♭组成减七和弦。G♭在这里是减七度，不写成 F♯六度：虽然钢琴键或吉他品位相同，和声作用不同。",
      "transition": "A♭低音升半音到 A。C 与 G♭可以在音高上保留，加入 E♭；由于选用的教学配音不同，保留同一个音高不一定意味着同一根手指完全不动。",
      "fingerGuide": "教学建议：食指在四品从四弦到二弦作小横按，中指按六弦五品，无名指按三弦五品。只拨六、四、三、二弦。",
      "sourceStatus": "algorithm_candidate",
      "fingeringStatus": "teaching_arrangement",
      "timingStatus": "approximate_boundary",
      "fingerNumbers": [
        2,
        null,
        1,
        3,
        1,
        null
      ],
      "leftHand": "教学建议：食指在四品从四弦到二弦作小横按，中指按六弦五品，无名指按三弦五品。只拨六、四、三、二弦。",
      "barres": [
        {
          "finger": 1,
          "fret": 4,
          "fromString": 4,
          "toString": 2
        }
      ],
      "fingerAlternatives": [],
      "handPlan": {
        "gripFrets": [
          5,
          null,
          4,
          5,
          4,
          null
        ],
        "fingerNumbers": [
          2,
          null,
          1,
          3,
          1,
          null
        ],
        "leftText": "食指在4品从4弦到2弦作小横按，中指按6弦5品，无名指按3弦5品。3弦由无名指的5品决定音高。",
        "pluckStrings": [
          6,
          4,
          3,
          2
        ],
        "rightText": "本次只弹6弦 A2、4弦 G♭3、3弦 C4、2弦 E♭4。慢练可先用拇指拨6弦低音，再把4、3、2弦作为一组拨响。5、1弦均跳过；不拨弦不等于必须松开左手。",
        "steps": [
          {
            "label": "先拨低音 · 6弦 A2",
            "strings": [
              6
            ]
          },
          {
            "label": "再拨上方音组 · 4弦 G♭3、3弦 C4、2弦 E♭4",
            "strings": [
              4,
              3,
              2
            ]
          }
        ],
        "status": "teaching_grip_and_plucking_exercise",
        "evidence": "沿用可行教学配音的左手按法；原演奏逐指动作与右手拨弦顺序尚未定稿。只列已有依据的按位，不为未拨的弦猜测额外按指。下面两步是独立的慢练分解。"
      }
    },
    {
      "id": "bb7",
      "start": 41.6,
      "end": 43.1,
      "clipStart": 12.05,
      "clipEnd": 13.55,
      "name": "B♭7",
      "kind": "chord",
      "quality": "7",
      "rootPc": 10,
      "frets": [
        6,
        -1,
        6,
        7,
        6,
        -1
      ],
      "tab": "6x676x",
      "notes": [
        {
          "string": 6,
          "fret": 6,
          "midi": 46,
          "pc": 10,
          "name": "B♭",
          "octave": 2,
          "label": "B♭2",
          "degree": "1",
          "role": "根音",
          "frequencyHz": 116.541,
          "finger": 2
        },
        {
          "string": 4,
          "fret": 6,
          "midi": 56,
          "pc": 8,
          "name": "A♭",
          "octave": 3,
          "label": "A♭3",
          "degree": "♭7",
          "role": "小七度",
          "frequencyHz": 207.652,
          "finger": 1
        },
        {
          "string": 3,
          "fret": 7,
          "midi": 62,
          "pc": 2,
          "name": "D",
          "octave": 4,
          "label": "D4",
          "degree": "3",
          "role": "大三度",
          "frequencyHz": 293.665,
          "finger": 3
        },
        {
          "string": 2,
          "fret": 6,
          "midi": 65,
          "pc": 5,
          "name": "F",
          "octave": 4,
          "label": "F4",
          "degree": "5",
          "role": "纯五度",
          "frequencyHz": 349.228,
          "finger": 1
        }
      ],
      "expectedNoteNames": [
        "B♭2",
        "A♭3",
        "D4",
        "F4"
      ],
      "chordTones": [
        {
          "name": "B♭",
          "pc": 10,
          "degree": "1",
          "role": "根音",
          "present": true
        },
        {
          "name": "D",
          "pc": 2,
          "degree": "3",
          "role": "大三度",
          "present": true
        },
        {
          "name": "F",
          "pc": 5,
          "degree": "5",
          "role": "纯五度",
          "present": true
        },
        {
          "name": "A♭",
          "pc": 8,
          "degree": "♭7",
          "role": "小七度",
          "present": true
        }
      ],
      "omittedTones": [],
      "explanation": "六弦六品 B♭是根音；三弦七品 D 是大三度；二弦六品 F 是五度；四弦六品 A♭是小七度。这四个按位一一对应 B♭7 的四个组成音。",
      "transition": "低音 A→B♭升半音。准备把二弦六品 F 当作接下来可移动的旋律音，其他声部保持。",
      "fingerGuide": "教学建议：食指在六品从四弦到二弦作小横按，中指按六弦六品，无名指按三弦七品。二弦六品的 F 由食指负责。只拨六、四、三、二弦，五弦与一弦不发声。",
      "sourceStatus": "algorithm_candidate",
      "fingeringStatus": "teaching_arrangement",
      "timingStatus": "approximate_boundary",
      "fingerNumbers": [
        2,
        null,
        1,
        3,
        1,
        null
      ],
      "leftHand": "教学建议：食指在六品从四弦到二弦作小横按，中指按六弦六品，无名指按三弦七品。二弦六品的 F 由食指负责。只拨六、四、三、二弦，五弦与一弦不发声。",
      "barres": [
        {
          "finger": 1,
          "fret": 6,
          "fromString": 4,
          "toString": 2
        }
      ],
      "fingerAlternatives": [
        {
          "fingerNumbers": [
            1,
            null,
            2,
            4,
            3,
            null
          ],
          "description": "不用横按的替代：食指六弦六品，中指四弦六品，无名指二弦六品，小指三弦七品。按手型舒适度选择。"
        }
      ],
      "handPlan": {
        "gripFrets": [
          6,
          null,
          6,
          7,
          6,
          null
        ],
        "fingerNumbers": [
          2,
          null,
          1,
          3,
          1,
          null
        ],
        "leftText": "食指在6品从4弦到2弦作小横按，中指按6弦6品，无名指按3弦7品；2弦6品的 F 由食指负责。",
        "pluckStrings": [
          6,
          4,
          3,
          2
        ],
        "rightText": "本次只弹6弦 B♭2、4弦 A♭3、3弦 D4、2弦 F4。慢练可先用拇指拨6弦低音，再把4、3、2弦作为一组拨响。5、1弦均跳过；不拨弦不等于必须松开左手。",
        "steps": [
          {
            "label": "先拨低音 · 6弦 B♭2",
            "strings": [
              6
            ]
          },
          {
            "label": "再拨上方音组 · 4弦 A♭3、3弦 D4、2弦 F4",
            "strings": [
              4,
              3,
              2
            ]
          }
        ],
        "status": "teaching_grip_and_plucking_exercise",
        "evidence": "沿用可行教学配音的左手按法；原演奏逐指动作与右手拨弦顺序尚未定稿。只列已有依据的按位，不为未拨的弦猜测额外按指。下面两步是独立的慢练分解。"
      }
    },
    {
      "id": "bb7sharp5",
      "start": 43.1,
      "end": 44.2,
      "clipStart": 13.55,
      "clipEnd": 14.65,
      "name": "B♭7♯5",
      "kind": "chord",
      "quality": "7#5",
      "rootPc": 10,
      "frets": [
        6,
        -1,
        6,
        7,
        7,
        -1
      ],
      "tab": "6x677x",
      "notes": [
        {
          "string": 6,
          "fret": 6,
          "midi": 46,
          "pc": 10,
          "name": "B♭",
          "octave": 2,
          "label": "B♭2",
          "degree": "1",
          "role": "根音",
          "frequencyHz": 116.541,
          "finger": 2
        },
        {
          "string": 4,
          "fret": 6,
          "midi": 56,
          "pc": 8,
          "name": "A♭",
          "octave": 3,
          "label": "A♭3",
          "degree": "♭7",
          "role": "小七度",
          "frequencyHz": 207.652,
          "finger": 1
        },
        {
          "string": 3,
          "fret": 7,
          "midi": 62,
          "pc": 2,
          "name": "D",
          "octave": 4,
          "label": "D4",
          "degree": "3",
          "role": "大三度",
          "frequencyHz": 293.665,
          "finger": 3
        },
        {
          "string": 2,
          "fret": 7,
          "midi": 66,
          "pc": 6,
          "name": "F♯",
          "octave": 4,
          "label": "F♯4",
          "degree": "♯5",
          "role": "增五度",
          "frequencyHz": 369.994,
          "finger": 4
        }
      ],
      "expectedNoteNames": [
        "B♭2",
        "A♭3",
        "D4",
        "F♯4"
      ],
      "chordTones": [
        {
          "name": "B♭",
          "pc": 10,
          "degree": "1",
          "role": "根音",
          "present": true
        },
        {
          "name": "D",
          "pc": 2,
          "degree": "3",
          "role": "大三度",
          "present": true
        },
        {
          "name": "F♯",
          "pc": 6,
          "degree": "♯5",
          "role": "增五度",
          "present": true
        },
        {
          "name": "A♭",
          "pc": 8,
          "degree": "♭7",
          "role": "小七度",
          "present": true
        }
      ],
      "omittedTones": [],
      "explanation": "与 B♭7 相比，只有二弦从六品挪到七品：F→F♯。根音、大三度、小七度都保留；因此和弦名只增加 ♯5。",
      "transition": "保持六弦六品、四弦六品、三弦七品；只把二弦六品移到七品。听这一点半音变化怎样增加想继续走的感觉。",
      "fingerGuide": "教学建议：保留 B♭7 的食指小横按、中指六弦六品和无名指三弦七品，只增加小指按二弦七品。二弦由 F 升为 F♯，其余三个实际发声音不变。",
      "sourceStatus": "algorithm_candidate",
      "fingeringStatus": "teaching_arrangement",
      "timingStatus": "approximate_boundary",
      "fingerNumbers": [
        2,
        null,
        1,
        3,
        4,
        null
      ],
      "leftHand": "教学建议：保留 B♭7 的食指小横按、中指六弦六品和无名指三弦七品，只增加小指按二弦七品。二弦由 F 升为 F♯，其余三个实际发声音不变。",
      "barres": [
        {
          "finger": 1,
          "fret": 6,
          "fromString": 4,
          "toString": 2
        }
      ],
      "fingerAlternatives": [
        {
          "fingerNumbers": [
            2,
            null,
            1,
            3,
            4,
            null
          ],
          "description": "不横按也可以：食指只按四弦六品，中指六弦六品，无名指三弦七品，小指二弦七品。"
        }
      ],
      "handPlan": {
        "gripFrets": [
          6,
          null,
          6,
          7,
          7,
          null
        ],
        "fingerNumbers": [
          2,
          null,
          1,
          3,
          4,
          null
        ],
        "leftText": "保留食指在6品从4弦到2弦的小横按、中指6弦6品和无名指3弦7品，增加小指按2弦7品。食指仍保持原来的手形，2弦的音高由小指7品决定。",
        "pluckStrings": [
          6,
          4,
          3,
          2
        ],
        "rightText": "本次只弹6弦 B♭2、4弦 A♭3、3弦 D4、2弦 F♯4。慢练可先用拇指拨6弦低音，再把4、3、2弦作为一组拨响。5、1弦均跳过；不拨弦不等于必须松开左手。",
        "steps": [
          {
            "label": "先拨低音 · 6弦 B♭2",
            "strings": [
              6
            ]
          },
          {
            "label": "再拨上方音组 · 4弦 A♭3、3弦 D4、2弦 F♯4",
            "strings": [
              4,
              3,
              2
            ]
          }
        ],
        "status": "teaching_grip_and_plucking_exercise",
        "evidence": "沿用可行教学配音的左手按法；原演奏逐指动作与右手拨弦顺序尚未定稿。只列已有依据的按位，不为未拨的弦猜测额外按指。下面两步是独立的慢练分解。"
      }
    },
    {
      "id": "eb",
      "start": 44.2,
      "end": 46.8,
      "clipStart": 14.65,
      "clipEnd": 17.25,
      "name": "E♭",
      "kind": "chord",
      "quality": "major",
      "rootPc": 3,
      "frets": [
        -1,
        6,
        8,
        8,
        8,
        -1
      ],
      "tab": "x6888x",
      "notes": [
        {
          "string": 5,
          "fret": 6,
          "midi": 51,
          "pc": 3,
          "name": "E♭",
          "octave": 3,
          "label": "E♭3",
          "degree": "1",
          "role": "根音",
          "frequencyHz": 155.563,
          "finger": 1
        },
        {
          "string": 4,
          "fret": 8,
          "midi": 58,
          "pc": 10,
          "name": "B♭",
          "octave": 3,
          "label": "B♭3",
          "degree": "5",
          "role": "纯五度",
          "frequencyHz": 233.082,
          "finger": 3
        },
        {
          "string": 3,
          "fret": 8,
          "midi": 63,
          "pc": 3,
          "name": "E♭",
          "octave": 4,
          "label": "E♭4",
          "degree": "1",
          "role": "根音",
          "frequencyHz": 311.127,
          "finger": 3
        },
        {
          "string": 2,
          "fret": 8,
          "midi": 67,
          "pc": 7,
          "name": "G",
          "octave": 4,
          "label": "G4",
          "degree": "3",
          "role": "大三度",
          "frequencyHz": 391.995,
          "finger": 3
        }
      ],
      "expectedNoteNames": [
        "E♭3",
        "B♭3",
        "E♭4",
        "G4"
      ],
      "chordTones": [
        {
          "name": "E♭",
          "pc": 3,
          "degree": "1",
          "role": "根音",
          "present": true
        },
        {
          "name": "G",
          "pc": 7,
          "degree": "3",
          "role": "大三度",
          "present": true
        },
        {
          "name": "B♭",
          "pc": 10,
          "degree": "5",
          "role": "纯五度",
          "present": true
        }
      ],
      "omittedTones": [],
      "explanation": "五弦六品 E♭、四弦八品 B♭、三弦八品 E♭、二弦八品 G 组成 E♭大三和弦。根音 E♭出现两次，但和弦仍只有三种不同音名。",
      "transition": "二弦继续七品→八品，F♯→G。G 是 E♭的大三度；低音同时从 B♭移到 E♭，完成这次局部落点。这个连接支持局部以 E♭为归宿，不能单独证明全曲调性。",
      "fingerGuide": "教学建议：食指按五弦六品，无名指在八品小横按四、三、二弦；只拨五、四、三、二弦。二弦八品 G 是这一和弦的大三音。",
      "sourceStatus": "algorithm_candidate",
      "fingeringStatus": "teaching_arrangement",
      "timingStatus": "approximate_boundary",
      "fingerNumbers": [
        null,
        1,
        3,
        3,
        3,
        null
      ],
      "leftHand": "教学建议：食指按五弦六品，无名指在八品小横按四、三、二弦；只拨五、四、三、二弦。二弦八品 G 是这一和弦的大三音。",
      "barres": [
        {
          "finger": 3,
          "fret": 8,
          "fromString": 4,
          "toString": 2
        }
      ],
      "fingerAlternatives": [
        {
          "fingerNumbers": [
            null,
            1,
            2,
            3,
            4,
            null
          ],
          "description": "不用横按：食指五弦六品，中指四弦八品，无名指三弦八品，小指二弦八品。"
        }
      ],
      "handPlan": {
        "gripFrets": [
          null,
          6,
          8,
          8,
          8,
          null
        ],
        "fingerNumbers": [
          null,
          1,
          3,
          3,
          3,
          null
        ],
        "leftText": "食指按5弦6品，无名指在8品小横按4、3、2弦。无名指靠近品丝，手指关节按个人手型调整。",
        "pluckStrings": [
          5,
          4,
          3,
          2
        ],
        "rightText": "本次只弹5弦 E♭3、4弦 B♭3、3弦 E♭4、2弦 G4。慢练可先用拇指拨5弦低音，再把4、3、2弦作为一组拨响。6、1弦均跳过；不拨弦不等于必须松开左手。",
        "steps": [
          {
            "label": "先拨低音 · 5弦 E♭3",
            "strings": [
              5
            ]
          },
          {
            "label": "再拨上方音组 · 4弦 B♭3、3弦 E♭4、2弦 G4",
            "strings": [
              4,
              3,
              2
            ]
          }
        ],
        "status": "teaching_grip_and_plucking_exercise",
        "evidence": "沿用可行教学配音的左手按法；原演奏逐指动作与右手拨弦顺序尚未定稿。只列已有依据的按位，不为未拨的弦猜测额外按指。下面两步是独立的慢练分解。"
      }
    }
  ],
  "exercises": [
    {
      "id": "three-fret-melody",
      "title": "先只动二弦：6 → 7 → 8 品",
      "description": "先只弹一根弦，听 F→F♯→G 两个连续半音。再打开下面的完整和弦，听相同旋律如何嵌入和声。",
      "tempo": 60,
      "beatsPerBar": 4,
      "teachingOnly": true,
      "steps": [
        {
          "segmentId": "bb7",
          "beats": 2,
          "string": 2,
          "fret": 6,
          "midi": 65,
          "note": "F4",
          "role": "B♭7 的五音"
        },
        {
          "segmentId": "bb7sharp5",
          "beats": 2,
          "string": 2,
          "fret": 7,
          "midi": 66,
          "note": "F♯4",
          "role": "B♭7♯5 的升五音"
        },
        {
          "segmentId": "eb",
          "beats": 4,
          "string": 2,
          "fret": 8,
          "midi": 67,
          "note": "G4",
          "role": "E♭的大三音"
        }
      ]
    },
    {
      "id": "tail-cadence",
      "title": "把三个音放回和弦",
      "description": "先弹根音，再轻拨四、三、二弦。让二弦旋律稍突出，其他音轻一些。最后一和弦根音改在五弦。",
      "tempo": 60,
      "beatsPerBar": 4,
      "teachingOnly": true,
      "steps": [
        {
          "segmentId": "bb7",
          "beats": 2
        },
        {
          "segmentId": "bb7sharp5",
          "beats": 2
        },
        {
          "segmentId": "eb",
          "beats": 4
        }
      ]
    },
    {
      "id": "four-bar",
      "title": "四小节教学改写",
      "description": "节奏经过简化，只用于掌握连接。原片段里的 F 低音连接音型与 B♭7♯5 装饰暂时省略。",
      "tempo": 60,
      "beatsPerBar": 4,
      "teachingOnly": true,
      "steps": [
        {
          "segmentId": "dm7b5",
          "beats": 2
        },
        {
          "segmentId": "cm7",
          "beats": 2
        },
        {
          "segmentId": "bbm7",
          "beats": 1
        },
        {
          "segmentId": "a7",
          "beats": 1
        },
        {
          "segmentId": "ab9",
          "beats": 2
        },
        {
          "segmentId": "adim7",
          "beats": 2
        },
        {
          "segmentId": "bb7",
          "beats": 2
        },
        {
          "segmentId": "eb",
          "beats": 4
        }
      ]
    }
  ],
  "audit": {
    "voicingPitchCheck": "所有九个完整教学指法及单音 F 均已按标准调弦逐弦计算，音高相符。",
    "corrections": [
      "A°7 的 G♭标成减七度（♭♭7），不是六度。",
      "A♭9 的教学按法 4x431x 实际发出 A♭2、G♭3、B♭3、C4，省略 E♭。",
      "E♭的 x6888x 实际发出 E♭3、B♭3、E♭4、G4，含重复根音。",
      "第一段只有 F 低音教学位置，不应自动称 F 大和弦。",
      "原谱未取得、原演奏调弦未核实、时间边界近似；避免把软件演示当成原版定稿。"
    ],
    "validationCount": 37
  },
  "fingerLegend": {
    "order": "六弦到一弦",
    "one": "1 食指",
    "two": "2 中指",
    "three": "3 无名指",
    "four": "4 小指",
    "nullMeaning": "不按/不发声",
    "status": "教学建议，不是原演奏者指法确认结果"
  },
  "beginnerGuide": {
    "title": "先认识弦号、品位和手指",
    "stringOrientation": "第1弦最细，第6弦最粗。这个文件的按位数组按六弦到一弦排列；界面若用六线谱视角，最上面通常画第1弦，最下面画第6弦。",
    "fretExplanation": "从琴枕往琴身方向数：第一个品格是1品，第二个是2品。品位数字告诉你按哪里，手指数字告诉你用哪根手指。",
    "fingerExplanation": "左手1＝食指，2＝中指，3＝无名指，4＝小指。例如「二弦6品，1指」就是用食指按最细弦旁边那根弦的第6品。",
    "muteExplanation": "x 表示这一根弦不要发声；不是空弦。0 才表示不按品位、直接拨响空弦。",
    "barreExplanation": "一根手指同时压住几根弦，叫横按。小横按只压其中几根。若另一根手指按在同一弦的更高品位，实际发声以更高品位为准。",
    "firstStep": "先选尾部练习，只弹二弦的6、7、8品，听 F、F♯、G。熟悉后，再加入其他弦，听它们怎样组成三个和弦。",
    "rootExplanation": "根音是给和弦起名字的那个音；它可能出现不止一次，也不一定永远是实际最低音。本教学配音都把根音放在最低的发声弦。",
    "toneExplanation": "指板上的音是实际按出来的声音；和弦组成栏解释这些音在和弦里做什么。有些配音会省略某个组成音，也可能把同一个音重复在不同八度。"
  },
  "catalog": [
    {
      "id": "g7",
      "start": 37.5,
      "end": 38.4,
      "clipStart": 7.95,
      "clipEnd": 8.85,
      "name": "G7",
      "kind": "chord",
      "quality": "7",
      "rootPc": 7,
      "frets": [
        3,
        -1,
        3,
        4,
        3,
        -1
      ],
      "tab": "3x343x",
      "notes": [
        {
          "string": 6,
          "fret": 3,
          "midi": 43,
          "pc": 7,
          "name": "G",
          "octave": 2,
          "label": "G2",
          "degree": "1",
          "role": "根音",
          "finger": 2,
          "frequencyHz": 97.999
        },
        {
          "string": 4,
          "fret": 3,
          "midi": 53,
          "pc": 5,
          "name": "F",
          "octave": 3,
          "label": "F3",
          "degree": "♭7",
          "role": "七音",
          "finger": 1,
          "frequencyHz": 174.614
        },
        {
          "string": 3,
          "fret": 4,
          "midi": 59,
          "pc": 11,
          "name": "B",
          "octave": 3,
          "label": "B3",
          "degree": "3",
          "role": "三音",
          "finger": 3,
          "frequencyHz": 246.942
        },
        {
          "string": 2,
          "fret": 3,
          "midi": 62,
          "pc": 2,
          "name": "D",
          "octave": 4,
          "label": "D4",
          "degree": "5",
          "role": "五音",
          "finger": 1,
          "frequencyHz": 293.665
        }
      ],
      "expectedNoteNames": [
        "G2",
        "F3",
        "B3",
        "D4"
      ],
      "chordTones": [
        {
          "name": "G",
          "pc": 7,
          "degree": "1",
          "role": "根音",
          "present": true
        },
        {
          "name": "B",
          "pc": 11,
          "degree": "3",
          "role": "三音",
          "present": true
        },
        {
          "name": "D",
          "pc": 2,
          "degree": "5",
          "role": "五音",
          "present": true
        },
        {
          "name": "F",
          "pc": 5,
          "degree": "♭7",
          "role": "七音",
          "present": true
        }
      ],
      "omittedTones": [],
      "explanation": "G–B–D–F是G属七和弦。三音B与七音F最能说明属七性质；指向Cm时，B→C，F→E♭形成解决。这里只展示教学配音，音轨对应时刻的G7仍是候选。",
      "transition": "在Dø→G7?→Cm7中，G是相对E♭的3级根音；若完整G7成立，可解释为六级Cm的属和弦。",
      "fingerGuide": "3x343x：中指低音，小横按3品，无名指三弦4品。",
      "sourceStatus": "algorithm_candidate",
      "fingeringStatus": "teaching_arrangement",
      "timingStatus": "approximate_boundary",
      "fingerNumbers": [
        2,
        null,
        1,
        3,
        1,
        null
      ],
      "leftHand": "中指按六弦3品G；食指在3品小横按四至二弦，无名指按三弦4品B。五弦用中指边缘轻触止音，一弦不弹。食指实际发声在四弦与二弦。",
      "barres": [
        {
          "finger": 1,
          "fret": 3,
          "fromString": 4,
          "toString": 2
        }
      ],
      "fingerAlternatives": [],
      "handPlan": {
        "gripFrets": [
          3,
          null,
          3,
          4,
          3,
          null
        ],
        "fingerNumbers": [
          2,
          null,
          1,
          3,
          1,
          null
        ],
        "leftText": "中指按6弦3品；食指在3品从4弦到2弦作小横按，无名指按3弦4品。中指边缘可轻触5弦止音，1弦无需新增按位。",
        "pluckStrings": [
          6,
          4,
          3,
          2
        ],
        "rightText": "本次只弹6弦 G2、4弦 F3、3弦 B3、2弦 D4。慢练可先用拇指拨6弦低音，再把4、3、2弦作为一组拨响。5、1弦均跳过；不拨弦不等于必须松开左手。",
        "steps": [
          {
            "label": "先拨低音 · 6弦 G2",
            "strings": [
              6
            ]
          },
          {
            "label": "再拨上方音组 · 4弦 F3、3弦 B3、2弦 D4",
            "strings": [
              4,
              3,
              2
            ]
          }
        ],
        "status": "teaching_grip_and_plucking_exercise",
        "evidence": "沿用可行教学配音的左手按法；原演奏逐指动作与右手拨弦顺序尚未定稿。只列已有依据的按位，不为未拨的弦猜测额外按指。下面两步是独立的慢练分解。"
      }
    }
  ]
};
