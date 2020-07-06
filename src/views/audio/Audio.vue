<template>
  <div>
    <h1>Audio</h1>
    <input id="audioInput" type="file" accept="audio/*">
    <div class="content">
      <div class="otamatone">
        <canvas id="pressMap"></canvas>
        <svg class="otamatone-body" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 310">
          <g transform="translate(0 13)">
            <path d="M72.39-9.36C65.33-9.42 64 .19 56.2.47c-.1 11.65-.08 9.71-.06 19.39v201.27a36.95 36.95 0 00-30.74 36.43 36.95 36.95 0 0036.96 36.95 36.95 36.95 0 0036.95-36.95 36.95 36.95 0 00-31-36.43V19.86c-.14-11.1 13.06-11.4 19.75-8.55 8.38 4.99 14.7 13.99 25.01 15.73 7.14 1.78 24.09-8.33 16.95-12.81-9.6 8.72-21.33-1.06-26-10.19C98.32-7.2 84.82-9.3 73.46-9.28a8.43 8.43 0 00-1.08-.08z" />
            <ellipse
              cx="48.26" cy="245.53" fill="#fffeff"
              rx="4.44" ry="4.63" />
            <ellipse
              cx="75.37" cy="245.81" fill="#fffeff"
              rx="4.44" ry="4.63" />
            <path
              fill="none" stroke="#fffef3" stroke-linecap="round"
              stroke-linejoin="round" stroke-width=".95" d="M31.14 265.5c14.5 8.88 45.94 9.08 63.26.54" />
          </g>
        </svg>
      </div>
      <canvas id="freqDomain"></canvas>
    </div>
    <audio id="audio" controls @pause="handlePauseAudio" @play="handlePlayAudio"></audio>
  </div>
</template>

<script>
import Sound from './Sound'

/**
 * TODO:
 *  获取外部音频，拿到频率数据 ✌
 *  根据时序频率数据，播放声音 ✌
 *  模拟电影蝌蚪音色，滤波？   ✌
 *  做出电音蝌蚪SVG
 *
 */

let pressMapDom = null
let freqDomainDom = null
let audioAnalyser = null

export default {
  name: 'Audio',
  data() {
    return {
      ctx: null,
      pressMapContext: null,
      frameId: null,
      newSound: null,
      frequencyBinCount: 0,
      sampleRate: 0
    }
  },
  mounted() {
    this.$nextTick(() => {
      const freqDomain = this.$el.querySelector('#freqDomain')
      freqDomainDom = freqDomain
      this.ctx = freqDomain.getContext('2d')

      const pressMap = this.$el.querySelector('#pressMap')
      pressMapDom = pressMap
      this.pressMapContext = pressMap.getContext('2d')
      this.init()
    })
  },
  methods: {
    // x(t)=∑k=1L−1[a[k]cos2πkt+b[k]sin2πkt]
    // https://github.com/GoogleChromeLabs/web-audio-samples/tree/gh-pages/samples/audio/wave-tables
    // https://www.g200kg.com/jp/docs/webaudio/samples/test-osccustom.html
    // https://webaudio.github.io/web-audio-api/#periodicwave
    // https://venerons.github.io/Comet/

    init() {
      const that = this
      const file = this.$el.querySelector('#audioInput')
      const audio = this.$el.querySelector('#audio')

      file.onchange = function() {
        if (!that.newSound) {
          that.newSound = new Sound()
          const audioContext = new AudioContext()
          const src = audioContext.createMediaElementSource(audio)
          const gainNode = audioContext.createGain()

          // let filter = audioContext.createBiquadFilter()
          // filter.type = 'lowpass'
          // filter.detune.value = 0
          // filter.frequency.value = 540 // 746
          // filter.Q.value = 0
          // filter.gain.value = 0

          const analyser = audioContext.createAnalyser()
          gainNode.gain.setValueAtTime(0.2, audioContext.currentTime)
          src.connect(gainNode)
          gainNode.connect(analyser)
          // filter.connect(analyser)
          analyser.connect(audioContext.destination)
          audioAnalyser = analyser
          // analyser.fftSize = 256
          that.frequencyBinCount = analyser.frequencyBinCount
          that.sampleRate = audioContext.sampleRate
        }

        const files = this.files
        audio.src = URL.createObjectURL(files[0])
        audio.load()
        audio.play()
      }
    },
    // play
    handlePlayAudio() {
      this.newSound.play({
        wave: 'sawtooth',
        volume: 5 / 100
      })
      const dataArray = new Uint8Array(this.frequencyBinCount)
      const draw = () => {
        const ctx = this.ctx
        const WIDTH = freqDomainDom.width
        const HEIGHT = freqDomainDom.height
        const bufferLength = dataArray.length
        const barWidth = WIDTH / bufferLength * 2
        audioAnalyser.getByteFrequencyData(dataArray)
        // do, re, mi, fa, so, la, ti, do  261.6, 293.7, 329.6, 349.2, 392.0, 440.0, 493.9, 523.2
        ctx.fillStyle = '#000'
        ctx.fillRect(0, 0, WIDTH, HEIGHT)

        let x = 0
        let max = 0
        let f = 0
        // let arr = []

        for (let i = 0; i < bufferLength; i++) {
          const barHeight = dataArray[i] / 255 * HEIGHT
          // ctx.fillStyle = `rgb(${barHeight + (25 * (i / bufferLength))}, ${250 * (i / bufferLength)}, 50)`
          ctx.fillStyle = '#fff'
          ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight)
          x += barWidth
          // 获取基频频率
          // ["11.16", "12.53", "14.06", "14.90", "16.73", "18.77", "21.07", "22.32"]
          // [11, 12, 14, 15, 17, 18, 21, 22]
          if (i > 10 && i < 44) {
            if (barHeight > max) {
              max = barHeight
              f = i
            } else {
              // arr.push([max, i])
              // max = 0
            }
          }
        }
        // (function() {
        //   // find max
        //   let m = 0
        //   arr.forEach(item => {
        //     if (item[0] > m) {
        //       m = item[0]
        //     }
        //   })
        //   // 归一
        //   if (m > 0) {
        //     for (let i = 0; i < arr.length; i++) {
        //       if (arr[i][0] / m > 0.8) {
        //         f = arr[i][1]
        //         break
        //       }
        //     }
        //   }
        // })()
        f = f ? f % 11 + 11 : 0
        // f * 48000 / 1024c / 2 --> f * 23.4375
        const freq = f * this.sampleRate / bufferLength / 2
        // if (freq < 262) freq = 262
        // if (freq > 524) freq = 524
        console.log(f, freq)
        this.drawPressMap(freq)
        this.newSound.setFrequency(freq)
        this.frameId = requestAnimationFrame(draw)
      }
      draw()
    },
    // 暂停 audio
    handlePauseAudio() {
      cancelAnimationFrame(this.frameId)
      this.newSound.stop()
    },
    drawPressMap(freq) {
      // https://codepen.io/jackrugile/pen/Gving
      const ctx = this.pressMapContext
      const WIDTH = pressMapDom.width
      const HEIGHT = pressMapDom.height
      ctx.fillStyle = '#5f5757'
      ctx.fillRect(0, 0, WIDTH, HEIGHT)
      ctx.fillStyle = '#fff'
      // 200 - 600
      ctx.fillRect(0, (freq - 200) / 400 * HEIGHT, WIDTH, 5)
    }
  }
}
</script>

<style lang="scss" scoped>
#audioInput {
}

.content {
  display: flex;
  height: 400px;
}

.otamatone {
  display: flex;
  position: relative;
  width: 200px;
  flex-shrink: 0;
  #pressMap {
    position: absolute;
    width: 5%;
    height: 55%;
    top: 13%;
    left: 39.5%;
    background-color: #5f5757;
    border-radius: 50px;
  }
  .otamatone-body {
    width: 100%;
  }
}

#freqDomain {
  width: 600px;
  height: 300px;
}

audio {
}
</style>
