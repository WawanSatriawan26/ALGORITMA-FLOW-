const AudioManager = {
  ctx: null,
  sfxEnabled: true,
  musicEnabled: true,
  isMuted: false,
  sfxVolume: 0.8,
  musicVolume: 0.5,
  bgmNodeGain: null,

  initOnUserGesture() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) this.ctx = new AudioContext();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  },

  playTone(freq, duration, type = 'sine', vol = 0.1) {
    if (!this.sfxEnabled || this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(vol * this.sfxVolume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch(e) {}
  },

  playClickSound() { this.playTone(600, 0.05, 'triangle', 0.05); },
  playCorrectSound() { 
    this.playTone(523.25, 0.1, 'sine', 0.1); 
    setTimeout(() => this.playTone(659.25, 0.15, 'sine', 0.1), 80); 
  },
  playBotError() { this.playTone(180, 0.2, 'sawtooth', 0.12); },
  playXP() { this.playTone(880, 0.12, 'sine', 0.08); },
  playCoin() { this.playTone(987.77, 0.1, 'sine', 0.1); setTimeout(() => this.playTone(1318.51, 0.15, 'sine', 0.1), 100); },
  playStar() { this.playTone(783.99, 0.12, 'triangle', 0.1); },
  playAchievement() { this.playTone(523.25, 0.1, 'sine', 0.1); setTimeout(() => this.playTone(659.25, 0.1, 'sine', 0.1), 100); setTimeout(() => this.playTone(783.99, 0.25, 'sine', 0.1), 200); },
  playBotMessage() { this.playTone(440, 0.08, 'sine', 0.05); },
  playBotHint() { this.playTone(350, 0.1, 'sine', 0.06); },
  playLevelUnlock() { this.playTone(587.33, 0.15, 'triangle', 0.1); },
  playBossStart() { this.playTone(150, 0.3, 'sawtooth', 0.15); },
  playBossSuccess() { this.playTone(300, 0.4, 'sine', 0.15); },
  playLevelComplete() { this.playTone(523.25, 0.15, 'sine', 0.1); },
  playVictory() { this.playTone(523.25, 0.2, 'sine', 0.1); setTimeout(() => this.playTone(659.25, 0.2, 'sine', 0.15), 150); setTimeout(() => this.playTone(783.99, 0.3, 'sine', 0.2), 300); },

  toggleMasterMute() {
    this.isMuted = !this.isMuted;
    this.updateUI();
    this.savePreferences();
  },

  playBGM(type) {
    if (!this.musicEnabled || this.isMuted) return;
    this.initOnUserGesture();
    // Simplified BGM placeholder to prevent any audio context locking
  },

  stopBGM() {},

  savePreferences() {
    try {
      localStorage.setItem('ALGO_AUDIO_MUTED', this.isMuted);
      localStorage.setItem('ALGO_SFX_ENABLED', this.sfxEnabled);
      localStorage.setItem('ALGO_MUSIC_ENABLED', this.musicEnabled);
    } catch(e){}
  },

  loadPreferences() {
    try {
      if (localStorage.getItem('ALGO_AUDIO_MUTED') === 'true') this.isMuted = true;
      if (localStorage.getItem('ALGO_SFX_ENABLED') === 'false') this.sfxEnabled = false;
      if (localStorage.getItem('ALGO_MUSIC_ENABLED') === 'false') this.musicEnabled = false;
    } catch(e){}
  },

  updateUI() {}
};
