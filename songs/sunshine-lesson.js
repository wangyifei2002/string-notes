window.LESSON = {
  "schemaVersion": 1,
  "id": "sunshine",
  "title": "Ain't No Sunshine · 从根音听懂小调回应",
  "source": {
    "videoId": "7RRblNpN_7A",
    "url": "https://www.youtube.com/watch?v=7RRblNpN_7A&t=260s",
    "title": "Guitar Day 6 - Song Demo/ Play a long 'Ain't No Sunshine' Cover",
    "artist": "Andy Guitar",
    "songTitle": "Ain't No Sunshine",
    "composer": "Bill Withers",
    "duration": 118,
    "sourceStart": 260.5,
    "clip": {
      "start": 0,
      "end": 118,
      "duration": 118
    },
    "clipContainsSpeech": false,
    "timingStatus": "performance_window_aligned_to_frames_and_audio",
    "lessonUrl": "https://www.andyguitar.co.uk/videos/day-6-10-day-guitar-starter-course",
    "sourceEnd": 378.5,
    "sourceFileDuration": 446.53301587301587
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
    "originalTuningVerified": false,
    "capoVerifiedFromFrames": true,
    "note": "画面可见没有变调夹；本页用标准调弦重建作者讲解的选弦，尚未逐根测定原演奏六根空弦。"
  },
  "evidence": {
    "verified": "已取得并解码 Andy Guitar 原视频 7RRblNpN_7A：文件约446.53秒，音轨48 kHz立体声，分析副本22.05 kHz单声道。选取原片04:20.5–06:18.5的完整指弹弹唱，共118秒；前后的讲解和另一遍扫弦示范不计入本课时间轴。画面显示没有变调夹。",
    "score": "同一作者的配套课程提供小和弦图并明确讲解Am、Em、G、Dm的选弦，与此完整演奏相对应。没有取得本次演出的逐音六线谱；作者链接的第三方和弦表未能读取，不用它证明时点或原指法。",
    "analysis": "作者教程给出四个和弦，局部低音/频谱与画面对照支持A小调中心及Am–Em–G–Am、Em–Dm–Am连接。时点仍是约±0.25秒的分析候选；慢拍约66–73 BPM随演奏变化。人声弱起及中段吉他留白不补写正在发声的和弦。未进行人工逐音听写，音轨可解码不等于每个音已听辨确认。",
    "teaching": "将左手建议手形与右手选弦分开：Em 可保持022000、G可保持320003的完整开放手形，同时按作者讲解仅拨指定四根弦。未拨的按位仍可留住；完整手形与指号为教学建议，未逐帧核实每次原演奏动作。慢练拨弦顺序另行标注，试音只包含指定发声音。"
  },
  "uiRules": [
    "指法数组从六弦到一弦，-1 表示本次不发声，0 表示空弦。",
    "Am、Em、G 采用根音加4/3/2弦，Dm 改为4/3/2/1弦；不要把没有拨的弦加入试音。",
    "小调中的根音级数统一以 A 大调音程为标尺：G 标为♭7；罗马数字为 i、v、♭VII、iv。",
    "指板音级相对当前和弦根音；整曲根音级数相对 A，两者不能混淆。",
    "Am、Em、G、Dm 为三和弦，没有七音；Am7 或 E7 只出现在明确标注的创作变化中。",
    "原视频时点等于本页音乐时点加 sourceStart；视频中的讲解与其他演示不算这首完整指弹演奏。",
    "入门旋律 C→B→C 与60 BPM练习是教学改写，不是原唱旋律或原片逐音转录。",
    "左手完整按法与右手发声独立：handPlan.gripFrets 为六弦到一弦的建议手形，null 为不指定按位，0 为空弦；handPlan.pluckStrings 指定本次拨响的弦。",
    "按住但未拨的音可以显示在指板上，但不加入本次和弦试音或实际发声音列表。handPlan.steps 是慢练顺序，不是原视频逐拍拨弦定稿。"
  ],
  "segments": [],
  "catalog": [
    {
      "id": "am",
      "name": "Am",
      "quality": "minor",
      "rootPc": 9,
      "frets": [
        -1,
        0,
        2,
        2,
        1,
        -1
      ],
      "fingerNumbers": [
        null,
        null,
        2,
        3,
        1,
        null
      ],
      "notes": [
        {
          "string": 5,
          "fret": 0,
          "name": "A",
          "label": "A2",
          "midi": 45,
          "pc": 9,
          "degree": "1",
          "role": "根音"
        },
        {
          "string": 4,
          "fret": 2,
          "name": "E",
          "label": "E3",
          "midi": 52,
          "pc": 4,
          "degree": "5",
          "role": "五音"
        },
        {
          "string": 3,
          "fret": 2,
          "name": "A",
          "label": "A3",
          "midi": 57,
          "pc": 9,
          "degree": "1",
          "role": "根音"
        },
        {
          "string": 2,
          "fret": 1,
          "name": "C",
          "label": "C4",
          "midi": 60,
          "pc": 0,
          "degree": "♭3",
          "role": "三音"
        }
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
          "role": "三音",
          "present": true
        },
        {
          "name": "E",
          "pc": 4,
          "degree": "5",
          "role": "五音",
          "present": true
        }
      ],
      "fingerGuide": "食指按2弦1品，中指按4弦2品，无名指按3弦2品。拇指弹5弦空弦 A，另外三指一起拨4、3、2弦。",
      "fingeringStatus": "teaching_arrangement_matched_to_author_lesson",
      "kind": "chord",
      "tab": "x0221x",
      "expectedNoteNames": [
        "A",
        "E",
        "A",
        "C"
      ],
      "omittedTones": [],
      "explanation": "A–C–E 构成 Am：A 是根音，C 是♭3，E 是5。C 让和弦具有小三和弦性质；两个 A 是同一根音在不同八度的重复，不是多出一种和弦音。整段以 Am 为反复返回的归宿。",
      "transition": "去 Em 时可保留4弦2品 E；3弦 A→G、2弦 C→B 下行。先听根音 A→E，再听高音怎样移动。这里描述对应的教学配音，不声称每次原片都逐音一致。",
      "leftHand": "食指按2弦1品，中指按4弦2品，无名指按3弦2品。拇指弹5弦空弦 A，另外三指一起拨4、3、2弦。",
      "barres": [],
      "fingerAlternatives": [
        "完整开放和弦 x02210（6弦→1弦）：扫弦练习可加入1弦空弦 E；该音是五音，和弦性质不变。"
      ],
      "fullOpenAlternative": {
        "tab": "x02210",
        "frets": [
          -1,
          0,
          2,
          2,
          1,
          0
        ],
        "fingerNumbers": [
          null,
          null,
          2,
          3,
          1,
          null
        ],
        "difference": "扫弦练习可加入1弦空弦 E；该音是五音，和弦性质不变。"
      },
      "sourceStatus": "matched_author_lesson",
      "timingStatus": "assigned_by_full_performance_analysis",
      "handPlan": {
        "gripFrets": [
          null,
          0,
          2,
          2,
          1,
          0
        ],
        "fingerNumbers": [
          null,
          null,
          2,
          3,
          1,
          null
        ],
        "leftText": "食指按2弦1品，中指按4弦2品，无名指按3弦2品；5弦与1弦保持空弦。完整开放 Am 的手形为 x02210。",
        "pluckStrings": [
          5,
          4,
          3,
          2
        ],
        "rightText": "本次只弹5弦 A2、4弦 E3、3弦 A3、2弦 C4。慢练可先用拇指拨5弦低音，再把4、3、2弦作为一组拨响。6、1弦均跳过；不拨弦不等于必须松开左手。",
        "steps": [
          {
            "label": "先拨低音 · 5弦 A2",
            "strings": [
              5
            ]
          },
          {
            "label": "再拨上方音组 · 4弦 E3、3弦 A3、2弦 C4",
            "strings": [
              4,
              3,
              2
            ]
          }
        ],
        "status": "teaching_full_grip_with_author_lesson_string_selection",
        "evidence": "本次拨弦集合对应同一作者的配套教学；完整开放手形和左手指号是明确给出的练习建议，未逐帧确认每次原演奏是否保留所有未拨弦的手指。下面两步是慢练分解，不标为原片逐拍拨弦谱。"
      }
    },
    {
      "id": "em",
      "name": "Em",
      "quality": "minor",
      "rootPc": 4,
      "frets": [
        0,
        -1,
        2,
        0,
        0,
        -1
      ],
      "fingerNumbers": [
        null,
        null,
        2,
        null,
        null,
        null
      ],
      "notes": [
        {
          "string": 6,
          "fret": 0,
          "name": "E",
          "label": "E2",
          "midi": 40,
          "pc": 4,
          "degree": "1",
          "role": "根音"
        },
        {
          "string": 4,
          "fret": 2,
          "name": "E",
          "label": "E3",
          "midi": 52,
          "pc": 4,
          "degree": "1",
          "role": "根音"
        },
        {
          "string": 3,
          "fret": 0,
          "name": "G",
          "label": "G3",
          "midi": 55,
          "pc": 7,
          "degree": "♭3",
          "role": "三音"
        },
        {
          "string": 2,
          "fret": 0,
          "name": "B",
          "label": "B3",
          "midi": 59,
          "pc": 11,
          "degree": "5",
          "role": "五音"
        }
      ],
      "chordTones": [
        {
          "name": "E",
          "pc": 4,
          "degree": "1",
          "role": "根音",
          "present": true
        },
        {
          "name": "G",
          "pc": 7,
          "degree": "♭3",
          "role": "三音",
          "present": true
        },
        {
          "name": "B",
          "pc": 11,
          "degree": "5",
          "role": "五音",
          "present": true
        }
      ],
      "fingerGuide": "保留中指4弦2品，其余本次发声弦为空弦。拇指弹6弦 E，另外三指拨4、3、2弦。若握完整 Em，食指可以同时按5弦2品，但本次不拨5弦。",
      "fingeringStatus": "teaching_arrangement_matched_to_author_lesson",
      "kind": "chord",
      "tab": "0x200x",
      "expectedNoteNames": [
        "E",
        "E",
        "G",
        "B"
      ],
      "omittedTones": [],
      "explanation": "E–G–B 构成 Em：E 根音、G 小三音、B 五音。相对全曲 A 小调，Em 的根音是5级，但相对 Em 自己，E 始终是根音1。这是小五级 v，不是含 G♯ 的 E7；具体作用要看它接 G 还是接 Dm。",
      "transition": "去 G 时保留3弦 G 与2弦 B，把中指从4弦2品移到6弦3品；若这一句去 Dm，则右手从6/4/3/2弦组改为4/3/2/1弦组。按当前段落决定走向。",
      "leftHand": "保留中指4弦2品，其余本次发声弦为空弦。拇指弹6弦 E，另外三指拨4、3、2弦。若握完整 Em，食指可以同时按5弦2品，但本次不拨5弦。",
      "barres": [],
      "fingerAlternatives": [
        "完整开放和弦 022000（6弦→1弦）：完整扫弦加入5弦 B 和1弦 E，仍为 E–G–B。"
      ],
      "fullOpenAlternative": {
        "tab": "022000",
        "frets": [
          0,
          2,
          2,
          0,
          0,
          0
        ],
        "fingerNumbers": [
          null,
          1,
          2,
          null,
          null,
          null
        ],
        "difference": "完整扫弦加入5弦 B 和1弦 E，仍为 E–G–B。"
      },
      "sourceStatus": "matched_author_lesson",
      "timingStatus": "assigned_by_full_performance_analysis",
      "handPlan": {
        "gripFrets": [
          0,
          2,
          2,
          0,
          0,
          0
        ],
        "fingerNumbers": [
          null,
          1,
          2,
          null,
          null,
          null
        ],
        "leftText": "食指按5弦2品，中指按4弦2品；6、3、2、1弦保持空弦。这里建议保持完整开放 Em（022000）的手形，5弦的食指仍留在原位。",
        "pluckStrings": [
          6,
          4,
          3,
          2
        ],
        "rightText": "本次只弹6弦 E2、4弦 E3、3弦 G3、2弦 B3。慢练可先用拇指拨6弦低音，再把4、3、2弦作为一组拨响。5弦虽然按住，本次不拨。5、1弦均跳过；不拨弦不等于必须松开左手。",
        "steps": [
          {
            "label": "先拨低音 · 6弦 E2",
            "strings": [
              6
            ]
          },
          {
            "label": "再拨上方音组 · 4弦 E3、3弦 G3、2弦 B3",
            "strings": [
              4,
              3,
              2
            ]
          }
        ],
        "status": "teaching_full_grip_with_author_lesson_string_selection",
        "evidence": "本次拨弦集合对应同一作者的配套教学；完整开放手形和左手指号是明确给出的练习建议，未逐帧确认每次原演奏是否保留所有未拨弦的手指。下面两步是慢练分解，不标为原片逐拍拨弦谱。"
      }
    },
    {
      "id": "g",
      "name": "G",
      "quality": "major",
      "rootPc": 7,
      "frets": [
        3,
        -1,
        0,
        0,
        0,
        -1
      ],
      "fingerNumbers": [
        2,
        null,
        null,
        null,
        null,
        null
      ],
      "notes": [
        {
          "string": 6,
          "fret": 3,
          "name": "G",
          "label": "G2",
          "midi": 43,
          "pc": 7,
          "degree": "1",
          "role": "根音"
        },
        {
          "string": 4,
          "fret": 0,
          "name": "D",
          "label": "D3",
          "midi": 50,
          "pc": 2,
          "degree": "5",
          "role": "五音"
        },
        {
          "string": 3,
          "fret": 0,
          "name": "G",
          "label": "G3",
          "midi": 55,
          "pc": 7,
          "degree": "1",
          "role": "根音"
        },
        {
          "string": 2,
          "fret": 0,
          "name": "B",
          "label": "B3",
          "midi": 59,
          "pc": 11,
          "degree": "3",
          "role": "三音"
        }
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
        }
      ],
      "fingerGuide": "中指移到6弦3品，4、3、2弦均为空弦。拇指弹低音 G，三指拨 D–G–B；5弦与1弦不拨。",
      "fingeringStatus": "teaching_arrangement_matched_to_author_lesson",
      "kind": "chord",
      "tab": "3x000x",
      "expectedNoteNames": [
        "G",
        "D",
        "G",
        "B"
      ],
      "omittedTones": [],
      "explanation": "G–B–D 构成大三和弦 G。B 是 G 的大三音，即使全曲是 A 小调，局部仍可出现大三和弦。它的根音相对 A 写成♭7，回到 Am 时形成 G→A 的上行；和弦内部 G 则标为根音1。",
      "transition": "G→Am 时低音 G→A，上方 D→E、G→A、B→C 都向上移动。特别听2弦空弦 B 到1品 C；这个半音来自声部连接，不能把它误叫换调。",
      "leftHand": "中指移到6弦3品，4、3、2弦均为空弦。拇指弹低音 G，三指拨 D–G–B；5弦与1弦不拨。",
      "barres": [],
      "fingerAlternatives": [
        "完整开放和弦 320003（6弦→1弦）：改扫弦时同时按5弦2品 B 与1弦3品 G。不要只按低音 G 就扫六根弦：那会额外带入 A、E，改变音组。"
      ],
      "fullOpenAlternative": {
        "tab": "320003",
        "frets": [
          3,
          2,
          0,
          0,
          0,
          3
        ],
        "fingerNumbers": [
          2,
          1,
          null,
          null,
          null,
          3
        ],
        "difference": "改扫弦时同时按5弦2品 B 与1弦3品 G。不要只按低音 G 就扫六根弦：那会额外带入 A、E，改变音组。"
      },
      "sourceStatus": "matched_author_lesson",
      "timingStatus": "assigned_by_full_performance_analysis",
      "handPlan": {
        "gripFrets": [
          3,
          2,
          0,
          0,
          0,
          3
        ],
        "fingerNumbers": [
          2,
          1,
          null,
          null,
          null,
          3
        ],
        "leftText": "中指按6弦3品，食指按5弦2品，无名指按1弦3品；4、3、2弦保持空弦。这里建议保持完整开放 G（320003）的手形。",
        "pluckStrings": [
          6,
          4,
          3,
          2
        ],
        "rightText": "本次只弹6弦 G2、4弦 D3、3弦 G3、2弦 B3。慢练可先用拇指拨6弦低音，再把4、3、2弦作为一组拨响。5、1弦虽然按住，本次不拨。5、1弦均跳过；不拨弦不等于必须松开左手。",
        "steps": [
          {
            "label": "先拨低音 · 6弦 G2",
            "strings": [
              6
            ]
          },
          {
            "label": "再拨上方音组 · 4弦 D3、3弦 G3、2弦 B3",
            "strings": [
              4,
              3,
              2
            ]
          }
        ],
        "status": "teaching_full_grip_with_author_lesson_string_selection",
        "evidence": "本次拨弦集合对应同一作者的配套教学；完整开放手形和左手指号是明确给出的练习建议，未逐帧确认每次原演奏是否保留所有未拨弦的手指。下面两步是慢练分解，不标为原片逐拍拨弦谱。"
      }
    },
    {
      "id": "dm",
      "name": "Dm",
      "quality": "minor",
      "rootPc": 2,
      "frets": [
        -1,
        -1,
        0,
        2,
        3,
        1
      ],
      "fingerNumbers": [
        null,
        null,
        null,
        2,
        3,
        1
      ],
      "notes": [
        {
          "string": 4,
          "fret": 0,
          "name": "D",
          "label": "D3",
          "midi": 50,
          "pc": 2,
          "degree": "1",
          "role": "根音"
        },
        {
          "string": 3,
          "fret": 2,
          "name": "A",
          "label": "A3",
          "midi": 57,
          "pc": 9,
          "degree": "5",
          "role": "五音"
        },
        {
          "string": 2,
          "fret": 3,
          "name": "D",
          "label": "D4",
          "midi": 62,
          "pc": 2,
          "degree": "1",
          "role": "根音"
        },
        {
          "string": 1,
          "fret": 1,
          "name": "F",
          "label": "F4",
          "midi": 65,
          "pc": 5,
          "degree": "♭3",
          "role": "三音"
        }
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
          "role": "三音",
          "present": true
        },
        {
          "name": "A",
          "pc": 9,
          "degree": "5",
          "role": "五音",
          "present": true
        }
      ],
      "fingerGuide": "食指1弦1品，中指3弦2品，无名指2弦3品。拇指改弹4弦空弦 D，另外三指改拨3、2、1弦；注意整组右手向细弦方向移动。",
      "fingeringStatus": "teaching_arrangement_matched_to_author_lesson",
      "kind": "chord",
      "tab": "xx0231",
      "expectedNoteNames": [
        "D",
        "A",
        "D",
        "F"
      ],
      "omittedTones": [],
      "explanation": "D–F–A 构成 Dm：D 根音、F 小三音、A 五音。它在 Em→Dm→Am 中位于中间，根音先 E→D 再回 A，形成小调下属区域向主和弦的返回。F 的出现不代表转调。",
      "transition": "回 Am 时先把根音 D→A 弹稳，再听 F、D 的色彩如何回到 E、C。共同音 A 可以作为听觉参照；这里换了拨弦组，不一定由同一根弦保持 A。",
      "leftHand": "食指1弦1品，中指3弦2品，无名指2弦3品。拇指改弹4弦空弦 D，另外三指改拨3、2、1弦；注意整组右手向细弦方向移动。",
      "barres": [],
      "fingerAlternatives": [
        "完整开放和弦 xx0231（6弦→1弦）：此四声部已经是常用开放 Dm，从4弦起扫即可。"
      ],
      "fullOpenAlternative": {
        "tab": "xx0231",
        "frets": [
          -1,
          -1,
          0,
          2,
          3,
          1
        ],
        "fingerNumbers": [
          null,
          null,
          null,
          2,
          3,
          1
        ],
        "difference": "此四声部已经是常用开放 Dm，从4弦起扫即可。"
      },
      "sourceStatus": "matched_author_lesson",
      "timingStatus": "assigned_by_full_performance_analysis",
      "handPlan": {
        "gripFrets": [
          null,
          null,
          0,
          2,
          3,
          1
        ],
        "fingerNumbers": [
          null,
          null,
          null,
          2,
          3,
          1
        ],
        "leftText": "食指按1弦1品，中指按3弦2品，无名指按2弦3品；4弦保持空弦。5、6弦无需新增按位，手形为 xx0231。",
        "pluckStrings": [
          4,
          3,
          2,
          1
        ],
        "rightText": "本次只弹4弦 D3、3弦 A3、2弦 D4、1弦 F4。慢练可先用拇指拨4弦低音，再把3、2、1弦作为一组拨响。6、5弦均跳过；不拨弦不等于必须松开左手。",
        "steps": [
          {
            "label": "先拨低音 · 4弦 D3",
            "strings": [
              4
            ]
          },
          {
            "label": "再拨上方音组 · 3弦 A3、2弦 D4、1弦 F4",
            "strings": [
              3,
              2,
              1
            ]
          }
        ],
        "status": "teaching_full_grip_with_author_lesson_string_selection",
        "evidence": "本次拨弦集合对应同一作者的配套教学；完整开放手形和左手指号是明确给出的练习建议，未逐帧确认每次原演奏是否保留所有未拨弦的手指。下面两步是慢练分解，不标为原片逐拍拨弦谱。"
      }
    }
  ],
  "ui": {
    "miniPractice": {
      "title": "只动一条声部：C → B → C",
      "description": "在2弦练 1品→空弦→1品：C 是 Am 的♭3，B 是 Em 的5，回到 C 又成为 Am 的♭3。先慢弹单音，再分别加上 Am、Em、Am；这是独立教学变化，不是原唱旋律。",
      "notes": [
        {
          "midi": 60,
          "string": 2,
          "fret": 1,
          "name": "C",
          "role": "Am 的 ♭3"
        },
        {
          "midi": 59,
          "string": 2,
          "fret": 0,
          "name": "B",
          "role": "Em 的 5"
        },
        {
          "midi": 60,
          "string": 2,
          "fret": 1,
          "name": "C",
          "role": "Am 的 ♭3"
        }
      ]
    },
    "practiceParagraphs": [
      "先只拨根音 A→E→G→A，唱出1→5→♭7→1。再加三音 C→G→B→C，比较小、小、大、小；这些是三和弦，不必一开始就加七音。",
      "教学慢练设为60 BPM、4/4：Am一小节，Em两拍接G两拍，Am一小节，再留白或轻弹Am一小节，共16秒。原片的时长、停顿与轻重以视频为准。",
      "创作时先改高音和弦落拍的位置；再试 Am7 的 G 小七音，或把一次 Em→Am 改成 E7→Am，听 G♯→A 的半音解决。它们是新写的变化，不反写成原片事实。"
    ],
    "introLabel": "入门4和弦",
    "introStartTimes": [
      2.752,
      4.609,
      5.55,
      20.004
    ],
    "practiceAudioTitle": "继续练：60 BPM 的四小节练习与创作变化",
    "practiceAudioDescription": "原创合成示范：先听4拍预备，再练4小节（16秒），最后留1秒余响；4/4、60 BPM是教学设定，不是原视频速度。基础版练根音与高声部应答；变化版改用Dm和E7，比较G♯→A的解决。",
    "practiceAudioProgression": "基础：Am ｜ Em · G ｜ Am ｜ Am留白；创作变化：Am ｜ Dm ｜ E7 ｜ Am",
    "practiceAudio": [
      {
        "label": "基础：1→5→♭7→1，低音与和弦应答",
        "src": "assets/sunshine-practice.wav"
      },
      {
        "label": "原创变化：Am→Dm→E7→Am（E7不是原版和弦）",
        "src": "assets/sunshine-variation.wav"
      }
    ]
  },
  "references": [
    {
      "id": "andy-day6",
      "url": "https://www.andyguitar.co.uk/videos/day-6-10-day-guitar-starter-course",
      "title": "Day 6 - Fingerstyle introduction, minor chords and 'Ain't No Sunshine' by Bill Withers",
      "type": "performer_lesson_and_transcript",
      "matchedVideoId": "7RRblNpN_7A",
      "shortQuote": "watch Andy demonstrate the full song",
      "verified": [
        "同一作者课程页链接完整弹唱视频。",
        "正文列出 Am、Em、Dm 三种小和弦；讲解字幕另有简化 G，因此并非全曲仅有三个和弦。",
        "讲解先示范 Am→Em→G→Am，再讲 Em→Dm 的对比句。",
        "Am、Em、G 的高音拨弦组合为第4、3、2弦，Dm 改为第3、2、1弦。",
        "原页面提供开放小和弦图，并将完整歌词和弦表链接到 Ultimate Guitar。"
      ],
      "limit": "以上是同一作者课程的对应关系，不自动证明其完整示范视频每次重复都完全相同；时点和例外须由音轨/画面核对。"
    },
    {
      "id": "andy-minor-shapes",
      "url": "https://d1ma7tzlswibx6.cloudfront.net/images-general/10-day-6-minor-chords.png",
      "title": "课程原页的开放小和弦图",
      "type": "author_chord_diagram",
      "limit": "仅指向原图，不把作者图片或完整谱重新托管。"
    },
    {
      "id": "linked-ug-chart",
      "url": "https://tabs.ultimate-guitar.com/tab/bill-withers/aint-no-sunshine-chords-468744",
      "title": "作者课程页链接的完整和弦表",
      "type": "third_party_chord_chart_linked_by_performer",
      "contentRead": false,
      "limit": "未取得逐音原谱；不要用该表替代实际示范视频的时点或声部核对，不复制歌词。"
    }
  ],
  "analysisGuide": {
    "overview": {
      "tonalCenter": "A",
      "keyLabel": "A 小调中心",
      "keyStatus": "作者配套教学、A 主音归宿及实音频峰相互支持；未做逐音听写定稿",
      "mode": "以自然小调的 i、iv、v、♭VII 为主要和声材料",
      "style": "Soul / R&B 歌曲的原声吉他指弹弹唱改编，带 Blues 表达色彩",
      "styleLimit": "不是标准十二小节 Blues；不能因风格带 Blues 就套用 I7–IV7–V7。",
      "meter": "4/4 主拍理解与教学记法；音轨主拍约 66–73 BPM 候选，随演唱推进并在结尾放慢",
      "tempoBpm": null,
      "performanceMode": "吉他以根音和高音和弦回应人声；重复吟唱区、停顿和结尾分别划段。本次完整演唱没有独立器乐 Solo。",
      "modulation": "本组 Am、Em、G、Dm 均属于 A 自然小调；换和弦不是转调。若音轨没有持续的新主音归宿，不标为转调。",
      "referenceDegreeConvention": "根音级数统一相对 A 大调刻度写作 1、5、♭7、4，调式名称仍为 A 小调。G 是自然小调的第七个音，但该网站的半音关系标记采用 ♭7，须在页面说明参照。"
    },
    "progressions": [
      {
        "id": "response",
        "name": "人声句尾的吉他回应",
        "chords": [
          "Am",
          "Em",
          "G",
          "Am"
        ],
        "rootNotes": [
          "A",
          "E",
          "G",
          "A"
        ],
        "rootDegrees": [
          "1",
          "5",
          "♭7",
          "1"
        ],
        "roman": [
          "i",
          "v",
          "♭VII",
          "i"
        ],
        "functionText": "Am 建立小调归宿；Em 暂时离开主和弦，G 让低音走 G→A 回到主音。这里的 Em 是小五级，不含 G♯，不可照搬 E7 的导音强解决。G 在这个实际连接中承担回 Am 前的上行台阶；不是每遇到 G 就必须解释成同一种功能。",
        "voiceLeading": "按教学四声部，Am→Em 可保留4弦2品 E，3弦 A→G、2弦 C→B 各下行一步；Em→G 保留 G 与 B，低音 E→G、4弦 E→D；G→Am 时低音 G→A、上方 D→E、G→A、B→C。",
        "sourceStatus": "author_lesson_structure_not_timestamp_transcription"
      },
      {
        "id": "contrast",
        "name": "Em–Dm–Am 的对比与返回",
        "chords": [
          "Em",
          "Dm",
          "Am"
        ],
        "rootNotes": [
          "E",
          "D",
          "A"
        ],
        "rootDegrees": [
          "5",
          "4",
          "1"
        ],
        "roman": [
          "v",
          "iv",
          "i"
        ],
        "functionText": "根音先 E→D 下行，再到 A。Dm 的 F 为旋律与和声加入小调下属色彩；Dm→Am 可让共同音 A 留住，其余音朝 E、C 靠拢。按前后句听，是从展开返回主和弦的过程，不是给三个和弦分别贴永远固定的情绪标签。",
        "voicingCaution": "老师的 Dm 高音组与前面的 Am/Em/G 使用不同弦组；和声层面的共同音不等于原视频同一根弦或同一根手指保持不动。",
        "sourceStatus": "author_lesson_structure_not_timestamp_transcription"
      }
    ],
    "phrasePractice": {
      "sourceWindow": {
        "start": 2.752,
        "end": 16.742,
        "sourceStart": 263.252,
        "sourceEnd": 277.242
      },
      "sourceWindowStatus": "首段两次回应构成约14秒的完整乐句；边界为音轨/画面对照的近似标注。",
      "exerciseLengthSeconds": 16,
      "exerciseTempoBpm": 60,
      "exerciseMeter": "4/4",
      "exerciseIsOriginalTiming": false,
      "plan": "教学练习做4小节：Am 1小节；Em 2拍、G 2拍；Am 1小节；留白或轻弹 Am 1小节。60 BPM 时共16秒，这只是独立慢练，不当作原片时长。",
      "steps": [
        "先只拨 A→E→G→A 根音，唱出 1→5→♭7→1；每个低音弹后留白。",
        "加上各和弦三音 C、G、B、C，听出小、小、大、小；此处原本为三和弦，不强加七音。",
        "加入五音并按作者的选弦做低音—高音和弦的应答，先维持四拍，再模仿视频的留白与轻重。",
        "单独练 Dm 的右手换弦组，慢练 Em→Dm→Am；保持根音稳定，手指不要为赶速度紧绷。"
      ],
      "melodyConnection": "先用自编音 E–G–B–C 观察它们分别在 Am、Em、G、Am 中成为五音、小三音、大三音、小三音。和弦角色会改变，即便附近几个音或某根弦并未大幅移动。这是教学旋律，不冒充原唱旋律。"
    },
    "creationVariations": [
      {
        "title": "先改节奏，保留根音路线",
        "instruction": "保持 Am→Em→G→Am，让第一次的高音和弦落在正拍，第二次晚半拍；每句末尾留一拍空白，听同一组和弦怎样产生不同呼吸。",
        "status": "original_teaching_variation"
      },
      {
        "title": "比较自然小调与强属解决",
        "instruction": "把一个 Em→Am 单独改成 E7→Am：E7 的 G♯ 是大三音，向 Am 的 A 上行半音，D 七音可下行到 C。与 Em 的 G 自然音对照，听张力怎样改变。",
        "caution": "这是新写的和声变化，不是原示范的已确认和弦，也不代表必然转调；单次 E7 可理解为 A 小调中的属和弦。",
        "teachingFrets": {
          "e7": [
            0,
            2,
            0,
            1,
            0,
            0
          ],
          "am": [
            -1,
            0,
            2,
            2,
            1,
            0
          ]
        },
        "status": "original_teaching_variation"
      },
      {
        "title": "最后才试七音",
        "instruction": "把 Am 改成 Am7：开放 Am 的3弦2品 A 可改为空弦 G，得到 x02010。G 是 Am7 的♭7；比较加入它后更松、更有延伸感的音响。不要把这种改写反写成原演奏事实。",
        "status": "original_teaching_variation"
      }
    ]
  }
};
