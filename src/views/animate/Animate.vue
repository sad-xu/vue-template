<template>
  <div class="animate-wrapper">
    <sphere class="animate-item"></sphere>
    <svg-text class="animate-item"></svg-text>
    <mul-svg-text class="animate-item"></mul-svg-text>
    <el-button @click="uploadImg">
      Upload Local Img
    </el-button>
  </div>
</template>

<script>
import Sphere from './components/Sphere'
import SvgText from './components/SvgText'
import MulSvgText from './components/MulSvgText'

import request from '@/utils/request'
// 优化SVG代码 https://jakearchibald.github.io/svgomg/

export default {
  name: 'Animate',
  components: {
    Sphere,
    SvgText,
    MulSvgText
  },
  mounted() {
    this.$nextTick(() => {

    })
  },
  methods: {
    uploadImg() {
      const img = new Image()
      img.onload = function() {
        let imgData
        if (this.src.slice(0, 4) === 'data') {
          imgData = this.src
        } else {
          let canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')
          canvas.height = this.height
          canvas.width = this.width
          ctx.drawImage(this, 0, 0)
          imgData = canvas.toDataURL('image/png')
          canvas = null
        }
        // base64 --> blob
        let arr = imgData.split(',')
        let mime = arr[0].match(/:(.*?);/)[1]
        let bstr = atob(arr[1])
        let n = bstr.length
        let u8arr = new Uint8Array(n)
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n)
        }
        const blob = new Blob([u8arr], {
          type: mime
        })
        console.log(blob)
        request({
          url: '',
          method: 'post',
          data: blob
        })
      }
      img.src = require('@/assets/avatar.png')
      // img.src = require('@/assets/test.png')
    }
  }
}
</script>

<style lang="scss" scoped>
.animate-wrapper {
  display: flex;
  .animate-item {
    width: 45%;
  }
}
</style>
