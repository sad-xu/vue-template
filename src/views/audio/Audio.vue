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
      frequency: 440,
      // 音量 百分比
      volume: 20
    }
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
      } else {
        this.sound.play({
          wave: this.wave,
          frequency: this.frequency,
          volume: this.volume / 100
        })
      }
      this.isPlaying = !this.isPlaying
    },
    fourier() {
      var audioContext = new AudioContext()
      var osc = audioContext.createOscillator()

      var real = new Float32Array([0, 0.4, 0.4, 1, 1, 1, 0.3, 0.7, 0.6, 0.5, 0.9, 0.8])

      var imag = new Float32Array(real.length)
      var hornTable = audioContext.createPeriodicWave(real, imag)

      osc = audioContext.createOscillator()
      osc.setPeriodicWave(hornTable)
      osc.frequency.value = 160
      osc.connect(audioContext.destination)
      osc.start(0)
    }

  }
}
</script>
