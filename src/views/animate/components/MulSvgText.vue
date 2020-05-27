<template>
  <svg xmlns="http://www.w3.org/2000/svg" class="subtitle" viewBox="0 0 229.2 69.6">
    <g
      fill="none" stroke="#000" stroke-linejoin="round"
      stroke-width="5"
      font-size="40" font-weight="400">
      <path stroke-linecap="round" d="M14.63 26.47c7.28-.5 14.63-.12 21.94-.26 4.1-.4 2.9 3.73 3.06 6.26-.12 5.12-1.93 10.16-4.38 14.63-2.59.24-8.21 1.26-8.63-2 .05-1.13.01-2.25-.5-3.25" />
      <path stroke-linecap="round" d="M26.25 19.6a41.85 41.85 0 01-7.74 23.57 9.5 9.5 0 01-2.39 1.93" />
      <path stroke-linecap="round" d="M45.75 27.85c-.67 4.9-.31 9.92-1.63 14.75v1.12L44 44.97" />
      <path stroke-linecap="round" d="M45.75 27.85c3.87-.56 7.93-.1 11.88-.25 7.2-.23 1.78 9.1 2.62 13.25.19 1.12-.34 2.05-.75 3" />
      <path stroke-linecap="round" d="M44 44.97c3.9-.71 7.84-1.36 11.9-1.12 1.38.15 2.6-.32 3.6 0" />
      <path stroke-linecap="round" d="M96.88 21.85c6.54.21 13.07.68 19.63.5 1.09-.07 2.22.26 3.24-.25" />
      <path stroke-linecap="round" d="M95.63 28.35c.73.42.8 1.26.75 2" />
      <path stroke-linecap="round" d="M97.25 27.6c3.79-1.2 8.09-1.4 12.13-1.5 4.3.11 8.49 1.12 12.66 2.44 1.73-1.41 1.1 5.45-2.29 4.93" />
      <path stroke-linecap="round" d="M97.63 32.47c4.87-.05 9.73-.08 14.54.82 3.52.26 7.14-.3 10.58.43" />
      <path stroke-linecap="round" d="M111 16.72c-.1 6.94.46 13.93-1.08 20.75-.55 2.9.38 6.2-.67 8.75" />
      <path stroke-linecap="round" d="M109.63 35.85c-5.1 1.38-9.37 4.75-14.25 6.75" />
      <path stroke-linecap="round" d="M112.38 34.97c3.72 1.45 8.03 3.94 10 7.5.6.77.82 1.8 1.5 2.5" />
      <path stroke-linecap="round" d="M81 20.85a6.34 6.34 0 012.5 4" />
      <path stroke-linecap="round" d="M80.38 28.72c2.85.74 9.06 2.61 2.94 4.1-7.19.86 7.92 3.61.43 5.28-3.68 2.01-8.04 3.91-11.13 5.37-2.37-.1-6.1.42-1.37.38 4.5-.36 8.8.85 13 2.25 5.41 1.51 10.1 5.03 15.75 6a93.5 93.5 0 0017.07 2.12c4.52.17 9.2 0 12.56-3.5" />
      <path d="M159.8 11.8c-.93 4.95-.75 10.02-1.45 15.02-.4 3.86-1.31 7.67-1.73 11.5" />
      <path d="M154.33 51.4c-2.19-.36-4.42 2.78-2.13 4.06 1.61-.44 5.12 1.04 5.13-1.16.35-1.94-1.16-3.08-3-2.9z" />
    </g>
  </svg>
</template>

<script>
import anime from '../animate'

export default {
  name: 'MulSvgText',
  mounted() {
    this.$nextTick(() => {
      // this.useAnime()
      this.justNative()
    })
  },
  methods: {
    justNative() {
      const pathList = this.$el.querySelectorAll('path')
      let durationList = []
      let delayList = []
      let t = 0
      let lastT = 0
      for (let i = 0; i < pathList.length; i++) {
        let len = pathList[i].getTotalLength()
        pathList[i].setAttribute('stroke-dasharray', len)
        pathList[i].setAttribute('stroke-dashoffset', len)
        len = Math.max(len * 20, 300)
        durationList.push(len)
        delayList.push(t += lastT)
        lastT = len
      }
      console.log(durationList, delayList)
      for (let i = 0; i < pathList.length; i++) {
        pathList[i].setAttribute('style', `animation: dash ${durationList[i]}ms ${delayList[i]}ms forwards;`)
      }
    },
    useAnime() {
      // case 1 手动赋值 if (i === 14) t += 2000
      // case 2 getTotalLength
      function durationTime(el, i) {
        // if (i === 13) return 2000
        // else return 500
        return Math.max(el.getTotalLength() * 20, 300)
      }
      function delayTime(el, i) {
        let t = 0
        let lastT = 0
        return function(el, i) {
          // if (i === 14) {
          //   t += 2000
          // } else t += 500
          t += lastT
          lastT = Math.max(el.getTotalLength() * 20, 300)
          return t
        }
      }
      anime({
        targets: this.$el.querySelectorAll('path'),
        easing: 'easeInOutQuad',
        loop: true,
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: durationTime,
        delay: delayTime()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  // path {
  //   animation: dash 2s infinite;
  // }

  @keyframes dash {
    to {
      stroke-dashoffset: 0;
    }
  }
</style>
