# 弦上 · String Notes

选择一首喜欢的吉他演奏，结合音乐分析与六弦指板学习调性、根音走向、和弦作用、节奏及创作变化。

- **Currently · Keaton Simons**：完整演奏约 4 分 7 秒，11 段、130 处事件；包含伴唱、Solo 与收束。
- **Ain’t No Sunshine · Andy Guitar**：Bill Withers 作品翻唱，选取作者示范视频中 04:20.5–06:18.5 的完整指弹演唱，共 1 分 58 秒；9 段、52 处事件，包含人声弱起与吉他留白。Am、Em、G、Dm 对应同一作者的配套教学。
- 支持按段落选择、视频与和弦分析联动、速度调整、单和弦及段落循环。六弦指板同时显示音名、含升降号的和弦音级与建议指号。
- 两首歌各自保存练习进度；教学音频、调性与练习材料按歌曲独立加载。
- 左手按法与右手拨弦分开显示：实心音点参与本次试音，虚线音点保留按位或空弦但不拨。右手卡片列出弦号、音名并提供分步合成试听；完整手形和慢练顺序分别注明教学依据。
- 页面区分音轨与来源核验、谱面信息、算法候选和教学改写。完整覆盖不等于逐音听写定稿；候选时间点与建议指法的限制在各课列明。

## 运行与托管

这是纯静态网站，无需安装依赖或构建。`index.html` 为曲库，`study.html?song=currently` 与 `study.html?song=sunshine` 共用学习界面。资源使用相对路径，适合 GitHub Pages 项目站点。本地预览请使用 HTTP 静态服务器。

在仓库 Settings → Pages 中选择 Deploy from a branch，分支选择 `main`，目录选择 `/(root)`。`.nojekyll` 用于直接发布静态文件。

## 曲目与媒体

- [Currently 原演奏](https://www.youtube.com/watch?v=p9AJpi3jRWc)。沿用已有本地视频资源。
- [Ain’t No Sunshine 完整示范原视频](https://www.youtube.com/watch?v=7RRblNpN_7A&t=260s)，以及 [Andy Guitar Day 6 配套课程](https://www.andyguitar.co.uk/videos/day-6-10-day-guitar-starter-course)。网站通过 YouTube 嵌入作者视频；原始下载与分析音轨未放入公开仓库。观看需要可访问 YouTube，无法嵌入时提供带当前时间的原视频链接。
- `assets/sunshine-practice.wav` 和 `assets/sunshine-variation.wav` 是独立创作的合成教学音频，不含原录音。基础版：Am｜Em 两拍 + G 两拍｜Am｜Am；变化版：Am｜Dm｜E7｜Am。均为 60 BPM、4/4，四拍预备后四小节。

演奏与歌曲权利归原权利人所有；本网站不提供原版完整逐音谱。

## 继续添加歌曲

在 `songs.js` 注册标题、演奏者、来源和两个数据文件。每首歌分别提供 `window.LESSON`（音轨依据、和弦音组、建议指号、教学练习）和 `window.FULL_ANALYSIS`（概览、连续段落、和弦事件、功能解释、来源与限制）。`study-loader.js` 依次加载所选曲目及共享界面；切歌整页加载，避免不同歌曲状态混用。

和弦的 `handPlan.gripFrets` 表示左手建议手形（六弦到一弦，null 为未指定、0 为空弦），`pluckStrings` 表示本次拨响的弦，`steps` 为带依据的分步练习。旧 `frets` / `notes` 始终只表示发声音组；增加按住但不拨的位置不能改变试音或和弦识别。没有原演奏证据时，不补写逐拍右手动作。

视频可以使用本地媒体，或在分析的 `meta.media` 中指定 YouTube 视频及演奏的起止时间。时间线统一使用本次演奏内时间；必须明确原片范围，并保持所有段落与事件连续覆盖。没有吉他新起音或和声依据不足的位置要显式留空，不虚构按位或 Solo。
