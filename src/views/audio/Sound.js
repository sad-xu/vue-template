class Sound {
  constructor() {
    this.context = new (window.AudioContext || window.webkitAudioContext)()
    this.oscillator = null
    this.gainNode = null
    this.analyser = null
    this.init()
  }
  init() {
    const context = this.context
    const oscillator = context.createOscillator()
    const gainNode = context.createGain()
    const analyser = context.createAnalyser()

    analyser.fftSize = 2048 // FFT 窗口大小

    oscillator.connect(gainNode)
    gainNode.connect(analyser)
    analyser.connect(context.destination)

    this.oscillator = oscillator
    this.gainNode = gainNode
    this.analyser = analyser
  }
  play({ wave = 'sine', frequency = 0, volume = 0 } = {}) {
    this.init()

    this.setFrequency(frequency)
    this.setWave(wave)
    this.setVolume(volume)
    this.oscillator.start()
  }
  setWave(wave) {
    this.oscillator.type = wave
  }
  setFrequency(v) {
    this.oscillator.frequency.value = v
  }
  setVolume(percentage) {
    // 音量范围 [3.4, -3.4]
    this.gainNode.gain.setValueAtTime(3.4 * percentage, this.context.currentTime)
  }
  stop() {
    this.oscillator.stop(this.context.currentTime)
  }
}

export default Sound
