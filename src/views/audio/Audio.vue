<template>
  <div>
    <h1>Audio</h1>
    <input id="thefile" type="file" accept="audio/*">
    <canvas id="canvas"></canvas>
    <audio id="audio" controls @pause="pauseAudio"></audio>
  </div>
</template>

<script>
import Sound from './Sound'

/**
 * TODO:
 *  获取外部音频，拿到频率数据
 *  根据时序频率数据，播放声音
 *  模拟电影蝌蚪音色，滤波？
 *  做出电音蝌蚪SVG
 *
 */

export default {
  name: 'Audio',
  data() {
    return {
      ctx: null,
      frameId: null,
      newSound: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      var canvas = this.$el.querySelector('#canvas')
      canvas.width = 600
      canvas.height = 300
      this.ctx = canvas.getContext('2d')
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
      const file = this.$el.querySelector('#thefile')
      const audio = this.$el.querySelector('#audio')

      file.onchange = function() {
        let files = this.files
        audio.src = URL.createObjectURL(files[0])
        audio.load()
        audio.play()

        const context = new AudioContext()
        const src = context.createMediaElementSource(audio)
        const gainNode = context.createGain()
        const analyser = context.createAnalyser()
        gainNode.gain.setValueAtTime(0.01, context.currentTime)

        src.connect(gainNode)
        gainNode.connect(analyser)
        analyser.connect(context.destination)

        // analyser.fftSize = 256
        let dataArray = new Uint8Array(analyser.frequencyBinCount)

        that.newSound = new Sound()
        that.newSound.play({
          wave: 'sawtooth',
          volume: 5 / 100
        })
        audio.play()
        let draw = function() {
          const ctx = that.ctx
          const WIDTH = 600
          const HEIGHT = 300
          let bufferLength = dataArray.length
          let barWidth = (WIDTH / bufferLength) * 2.5
          analyser.getByteFrequencyData(dataArray)
          // do, re, mi, fa, so, la, ti, do  261.6, 293.7, 329.6, 349.2, 392.0, 440.0, 493.9, 523.2
          ctx.fillStyle = '#000'
          ctx.fillRect(0, 0, WIDTH, HEIGHT)

          let x = 0
          let max = 0
          let f = 0
          for (let i = 0; i < bufferLength; i++) {
            let barHeight = dataArray[i]
            ctx.fillStyle = `rgb(${barHeight + (25 * (i / bufferLength))}, ${250 * (i / bufferLength)}, 50`
            ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight)
            x += barWidth + 1
            // 获取基频频率
            if (i >= 10 && i <= 26) {
              if (barHeight > max) {
                max = barHeight
                f = i
              }
            }
          }
          let freq = f * context.sampleRate / bufferLength / 2
          console.log(f, freq)
          that.newSound.setFrequency(freq)
          that.frameId = requestAnimationFrame(draw)
        }
        draw()
      }
    },
    // 暂停 audio
    pauseAudio() {
      cancelAnimationFrame(this.frameId)
      this.newSound.stop()
    }

  }
}
</script>

<style lang="scss" scoped>
#thefile {
}

#canvas {
  width: 600px;
  height: 300px;
}

audio {
}
</style>
