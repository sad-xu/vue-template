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

    analyser.fftSize = 1024 // 2048 // FFT 窗口大小

    // 自定义音色
    // let diyWave = context.createPeriodicWave(
    //   // real 实部 cos [直流偏移, 基频, 泛音...] a
    //   new Float32Array([
    //     0, 0, -0.2, 0.5, -0.4, 0.137, -0.104, 0.115965, -0.004413, 0.067884,
    //     -0.008880, 0.079300, -0.038756, 0.011882, -0.030883, 0.027608, -0.013429, 0.003930, -0.014029, 0.009720
    //   ]),
    //   // imag 虚部 sin [0, 基频, 泛音...] b
    //   new Float32Array([
    //     0, 0.147621, 0, 0, 0, 0, 0, 0, 0, 0,
    //     0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    //   ])
    // )
    // oscillator.setPeriodicWave(diyWave)

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
