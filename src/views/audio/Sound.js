class Sound {
  constructor() {
    this.context = new (window.AudioContext || window.webkitAudioContext)()
    this.oscillator = null
    this.gainNode = null
    this.init()
  }
  init() {
    const context = this.context
    const oscillator = context.createOscillator()
    const gainNode = context.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(context.destination)

    this.oscillator = oscillator
    this.gainNode = gainNode
  }
  play({ wave = 'sine', frequency = 440, volume = 0.2 } = {}) {
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