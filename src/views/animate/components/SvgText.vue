<template>
  <svg xmlns="http://www.w3.org/2000/svg" class="subtitle" viewBox="0 0 229.2 69.6">
    <path
      fill="none" stroke="#000"
      stroke-linecap="round" stroke-linejoin="round"
      stroke-width="3" d="M40.73 29.5c1.03-4.41-3.06-8.03-7.35-7.82-5.53.72-9.28 6.8-11.79 11.4-1.43 3.75-4.28 12.36 2.05 12.67 3.9-2.91 6.58-7.3 8.9-11.52.96-1.29 3.1-8.45 3.33-5.77.16 4.5-.35 9.1.37 13.51.9 5.59 8.68 9.88 12.93 5.05 4.19-3.09 6.13-9.67 7.24-13.44.99-5.3 3.52-10.28 3.42-15.79.26-3.02.03-6.55.1-1.83-.02 7.11.04 14.24 0 21.35-1.01 3.34-1.65 11.79-2.1 12.45.78-7.26 7.3-11.85 9.91-18.36 1.6-5.62 7.04-4.37 8.77.46 6 5.74.12 12.73-5.32 15.96-2.48 1.45-5.49 5.31-9.02 2.47-2.8-1.4-6.47-3.8-1.6-1.16 6.96 2.89 13.55 6.84 21.1 8.02 5.77 1.42 12.92 2.25 18.32-.58 4.13-2 4.42-6.46 4.05-10.44.42-5.27-.88-10.81-4.4-14.85-5.21-.38-7.28 7.92-9.32 11.94-1.74 5.82 2.06 10.46 6.63 13.46 4.65 2.97 13.35 4.45 15.95-1.85 3.1-3.56 6.93-7.27 8.04-10.4-2.77-.03-8.8 4.71-5.86 8.61 1.47 4.8 1.9 14.7 9.58 10.68a42.65 42.65 0 0016.8-18.9c1.79-6.52 2.13-13.46 1.62-20.17-3.24-4.5-4.3 5.95-4.65 8.44.23 4.1-.9 8.53 1.74 12.12 3.1 5.98 9.38 10.33 16.22 10.34 3.78.25 7.59.07 11.38.12.46-.9-.03-1.65 1.26-1.9" />
  </svg>
</template>

<script>
// import anime from '../animate'

export default {
  name: 'SvgText',
  data() {
    return {

    }
  },
  mounted() {
    this.$nextTick(() => {
      let path = this.$el.querySelector('path')
      let len = path.getTotalLength()
      path.setAttribute('stroke-dasharray', len)
      path.setAttribute('stroke-dashoffset', len)
      // anime({
      //   targets: this.$el.querySelectorAll('path'),
      //   loop: true,
      //   strokeDashoffset: [anime.setDashoffset, 0],
      //   duration: 3000,
      //   delay: (el, i) => { return i * 500 }
      // })
    })
  }
}
</script>

<style lang="scss" scoped>
  path {
    animation: dash 3s infinite;
  }

  @keyframes dash {
    to {
      stroke-dashoffset: 0;
    }
  }
</style>
