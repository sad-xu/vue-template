<template>
  <div>
    <h1>Audio</h1>
    <!--  -->
    <span>波形</span>
    <el-select v-model="wave" @change="changeWave">
      <el-option
        v-for="item in waveOptions" :key="item"
        :label="item" :value="item">
      </el-option>
    </el-select>
    <!--  -->
    <span>频率</span>
    <el-slider v-model="frequency" :min="0" :max="8000" @input="changeFrequency"></el-slider>
    <!--  -->
    <span>音量</span>
    <el-slider v-model="volume" :min="0" :max="100" @input="changeVolumn"></el-slider>
    <!--  -->
    <el-button @click="togglePlay">
      {{ isPlaying ? 'STOP' : 'PLAY' }}
    </el-button>
    <!--  -->
    <input id="thefile" type="file" accept="audio/*">
    <canvas id="canvas"></canvas>
    <audio id="audio" controls></audio>
  </div>
</template>

<script>
import { Select, Option, Slider } from 'element-ui'
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
  components: {
    ElSelect: Select,
    ElOption: Option,
    ElSlider: Slider
  },
  data() {
    return {
      sound: new Sound(),
      isPlaying: false,
      // 波形
      wave: 'sine',
      waveOptions: ['sine', 'square', 'triangle', 'sawtooth'],
      // 频率
      frequency: 400,
      // 音量 百分比
      volume: 20,
      //
      ctx: null,
      // requestAnimationFrame id
      frameId: null,
      newSound: new Sound()
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
    changeWave(wave) {
      this.sound.setWave(wave)
    },
    changeFrequency(v) {
      this.sound.setFrequency(v)
    },
    changeVolumn(v) {
      this.sound.setVolume(v / 100)
    },
    togglePlay() {
      if (this.isPlaying) {
        this.sound.stop()
        cancelAnimationFrame(this.frameId)
      } else {
        this.sound.play({
          wave: this.wave,
          frequency: this.frequency,
          volume: this.volume / 100
        })
        let dataArray = new Uint8Array(this.sound.analyser.frequencyBinCount)
        this.draw(this.sound.analyser, dataArray)
      }
      this.isPlaying = !this.isPlaying
    },
    // fourier() {
    //   var audioContext = new AudioContext()
    //   var osc = audioContext.createOscillator()

    //   var real = new Float32Array([0, 0.4, 0.4, 1, 1, 1, 0.3, 0.7, 0.6, 0.5, 0.9, 0.8])

    //   var imag = new Float32Array(real.length)
    //   var hornTable = audioContext.createPeriodicWave(real, imag)

    //   osc.setPeriodicWave(hornTable)
    //   osc.frequency.value = 160
    //   osc.connect(audioContext.destination)
    //   osc.start(0)
    // }
    init() {
      const that = this
      var file = this.$el.querySelector('#thefile')
      var audio = this.$el.querySelector('#audio')

      file.onchange = function() {
        var files = this.files
        audio.src = URL.createObjectURL(files[0])
        audio.load()
        audio.play()

        var context = new AudioContext()
        var src = context.createMediaElementSource(audio)
        const gainNode = context.createGain()
        var analyser = context.createAnalyser()
        gainNode.gain.setValueAtTime(0.1, context.currentTime)
        // var biquadFilter = context.createBiquadFilter()
        // biquadFilter.type = 'lowpass'
        // biquadFilter.frequency.value = 1000
        // biquadFilter.gain.value = 25

        src.connect(gainNode)
        gainNode.connect(analyser)
        analyser.connect(context.destination)

        analyser.fftSize = 256

        var bufferLength = analyser.frequencyBinCount

        var dataArray = new Uint8Array(bufferLength)

        audio.play()
        that.draw(analyser, dataArray)
      }
    },
    draw(analyser, dataArray) {
      const that = this
      this.frameId = requestAnimationFrame(function() {
        that.draw(analyser, dataArray)
      })
      let ctx = this.ctx
      let x = 0
      const WIDTH = 600
      const HEIGHT = 300
      let bufferLength = dataArray.length
      let barWidth = (WIDTH / bufferLength) * 2.5
      let barHeight
      analyser.getByteFrequencyData(dataArray)

      let max = Math.max.apply(Math, dataArray)
      if (max > 10) {
        let indexNum = 0
        for (let i = 0; i < dataArray.length; i++) {
          if (dataArray[i] === max) {
            indexNum = i + 1
            break
          }
        }
        let freq = indexNum * this.sound.context.sampleRate / dataArray.length / 2
        console.log(freq)
        // 声源2
        this.newSound.setFrequency(freq)
      }

      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, WIDTH, HEIGHT)

      for (var i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i]

        var r = barHeight + (25 * (i / bufferLength))
        var g = 250 * (i / bufferLength)
        var b = 50

        ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')'
        ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight)

        x += barWidth + 1
      }
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
