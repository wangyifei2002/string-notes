(() => {
  'use strict';
  const mounted = new Set();
  let apiPromise;
  function youtubeAPI() {
    if (window.YT?.Player) return Promise.resolve(window.YT);
    if (!apiPromise) apiPromise = new Promise((resolve, reject) => {
      const previous = window.onYouTubeIframeAPIReady;
      const timer = setTimeout(() => reject(new Error('YouTube 视频连接超时，请使用原视频链接。')), 20000);
      window.onYouTubeIframeAPIReady = () => { clearTimeout(timer); previous?.(); resolve(window.YT); };
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.onerror = () => { clearTimeout(timer); reject(new Error('暂时无法连接 YouTube，请使用原视频链接。')); };
      document.head.append(script);
    });
    return apiPromise;
  }
  class YouTubeMedia extends EventTarget {
    constructor(video, meta) {
      super();
      this.meta = meta;
      this.offset = Number(meta.media.start) || 0;
      this.duration = Number(meta.duration);
      this.readyState = 0;
      this.paused = true;
      this.ended = false;
      this.seeking = false;
      this.preservesPitch = true;
      this._time = 0;
      this._rate = 1;
      this._wantPlay = false;
      this._target = null;
      this._cued = false;
      this._cueRate = null;
      this._seekAt = 0;
      this._lastPoll = performance.now();
      const wrapper = document.createElement('div');
      wrapper.id = video.id;
      wrapper.className = 'embedded-media';
      wrapper.setAttribute('aria-label', video.getAttribute('aria-label') || '演奏视频');
      const surface = document.createElement('div');
      surface.className = 'embedded-media-screen';
      const slot = document.createElement('div');
      slot.id = video.id + '-youtube';
      surface.append(slot);
      this.message = document.createElement('p');
      this.message.className = 'embedded-media-message';
      this.message.setAttribute('role', 'status');
      this.message.textContent = '正在连接原演奏视频…';
      this.link = document.createElement('a');
      this.link.className = 'embedded-media-link';
      this.link.target = '_blank';
      this.link.rel = 'noopener';
      this.link.textContent = '在 YouTube 从当前乐句打开 ↗';
      wrapper.append(surface, this.message, this.link);
      video.removeAttribute('src');
      video.replaceWith(wrapper);
      this.element = wrapper;
      this._updateLink();
      mounted.add(this);
      youtubeAPI().then(YT => {
        this.yt = new YT.Player(slot.id, {
          videoId: meta.media.videoId,
          width: '100%', height: '100%',
          playerVars: {playsinline: 1, rel: 0, start: Math.floor(this.offset), origin: location.origin},
          events: {
            onReady: () => {
              this.readyState = 1;
              this.message.textContent = '原片内嵌播放 · 分析时间从本次完整演奏起算';
              this._seekAt = performance.now();
              this._position(this.currentTime);
              this.yt.setPlaybackRate(this._rate);
              this._emit('loadedmetadata');
              this._emit('canplay');
              if (this._wantPlay) this.yt.playVideo();
              this._pollTimer = setInterval(() => this._poll(), 100);
            },
            onStateChange: event => this._state(event.data),
            onPlaybackRateChange: event => { if (this._cueRate !== null) return; this._rate = event.data; this._emit('ratechange'); },
            onAutoplayBlocked: () => {
              this.paused = true; this._wantPlay = false;
              this.message.textContent = '请先在视频画面中点一次播放，再使用段落跳转。';
              this._emit('pause');
            },
            onError: event => this._fail(new Error(`YouTube 暂不能播放此视频（${event.data}）。可从下方原视频链接对照学习。`))
          }
        });
      }).catch(error => this._fail(error));
    }
    _emit(name) { this.dispatchEvent(new Event(name)); }
    _fail(error) { this._error = error; this.paused = true; this._wantPlay = false; this.message.textContent = error.message; this._emit('error'); }
    _updateLink() { this.link.href = `https://www.youtube.com/watch?v=${encodeURIComponent(this.meta.media.videoId)}&t=${Math.floor(this.offset + this.currentTime)}s`; }
    _position(time) {
      // seekTo starts a cued/unstarted video. Cue it without playing instead;
      // only the real YouTube paused state guarantees a non-playing seek.
      if (this.paused && !this._wantPlay && this.yt.getPlayerState() !== 2) {
        this._cued = true;
        this._cueRate = this._rate;
        this.yt.cueVideoById({videoId: this.meta.media.videoId, startSeconds: this.offset + time});
      } else {
        this._cued = false;
        this.yt.seekTo(this.offset + time, true);
      }
    }
    get currentTime() { return this._target ?? this._time; }
    set currentTime(value) {
      const time = Math.max(0, Math.min(Number(value) || 0, this.duration - .001));
      this._target = time; this._time = time; this.ended = false; this.seeking = true;
      this._seekAt = performance.now();
      this._updateLink(); this._emit('seeking'); this._emit('timeupdate');
      if (this.readyState) this._position(time);
    }
    get playbackRate() { return this._rate; }
    set playbackRate(value) { this._rate = Number(value) || 1; if (this._cueRate !== null) this._cueRate = this._rate; if (this.readyState) this.yt.setPlaybackRate(this._rate); }
    play() {
      if (this._error) return Promise.reject(this._error);
      this._wantPlay = true;
      if (this.ended) this.currentTime = 0;
      if (this.readyState) this.yt.playVideo();
      return Promise.resolve();
    }
    pause() {
      this._wantPlay = false;
      if (this.readyState) this.yt.pauseVideo();
      if (!this.paused) { this.paused = true; this._emit('pause'); }
    }
    _state(state) {
      if (state === 1) {
        if (this._cued) this._seekAt = performance.now();
        this._cued = false; this._wantPlay = true;
        if (this._cueRate !== null) { this._rate = this._cueRate; this._cueRate = null; this.yt.setPlaybackRate(this._rate); }
        this.paused = false; this.ended = false;
        this._emit('play');
        pauseAll(this);
        window.StringNotes?.stopSynth();
      } else if (state === 2) {
        const wasPlaying = !this.paused;
        this.paused = true; this._wantPlay = false;
        if (wasPlaying) this._emit('pause');
      } else if (state === 5) {
        // Cue/load commands reset the rate. Reapply the selected practice rate
        // after cue completion rather than treating that reset as a user choice.
        if (this._cueRate !== null) { this._rate = this._cueRate; this._cueRate = null; this.yt.setPlaybackRate(this._rate); }
      } else if (state === 0 && !this.ended) {
        this.paused = true; this._wantPlay = false; this.ended = true; this._emit('ended');
      }
    }
    _poll() {
      if (!this.readyState || !this.yt?.getCurrentTime) return;
      // A cued iframe may report 0 until the learner starts it. Its requested
      // music position remains meaningful even while no media is playing.
      if (this._cued && this.paused) return;
      const now = performance.now(), elapsed = (now - this._lastPoll) / 1000;
      this._lastPoll = now;
      const sourceTime = this.yt.getCurrentTime(), time = Math.max(0, Math.min(this.duration, sourceTime - this.offset));
      if (this._target !== null) {
        if (Math.abs(time - this._target) > .35 && now - this._seekAt < 3500) return;
        this._target = null; this._time = time; this.seeking = false;
        this._emit('seeked'); this._emit('timeupdate'); this._updateLink();
      } else if (Math.abs(time - this._time) > .015) {
        const jumped = Math.abs(time - this._time) > Math.max(1, elapsed * this._rate + .5);
        this._time = time;
        if (jumped) { this.seeking = true; this._emit('seeking'); this.seeking = false; this._emit('seeked'); }
        this._emit('timeupdate'); this._updateLink();
      }
      if (!this.paused && sourceTime < this.offset - .3) this.currentTime = 0;
      if (!this.paused && !this.ended && this._target === null && time >= this.duration - .06) {
        this.pause(); this.ended = true; this._time = this.duration; this._emit('ended');
      }
    }
    destroy() { clearInterval(this._pollTimer); this.yt?.destroy(); mounted.delete(this); }
  }
  function pauseAll(except) {
    document.querySelectorAll('audio,video').forEach(media => { if (media !== except) media.pause(); });
    mounted.forEach(media => { if (media !== except) media.pause(); });
  }
  function mount(video, meta) {
    if (meta?.media?.provider === 'youtube') return new YouTubeMedia(video, meta);
    if (meta?.videoSrc) video.src = meta.videoSrc;
    return video;
  }
  window.addEventListener('pagehide', () => { pauseAll(); mounted.forEach(media => media.destroy()); });
  window.MediaPlayers = {mount, pauseAll};
})();
