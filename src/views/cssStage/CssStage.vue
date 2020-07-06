<template>
  <div class="wrapper">
    <div
      class="stage"
      @animationend="animationEnd"
      @animationstart="animationStart">
      <!--  -->
      <div class="effect effect-type-1">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <!--  -->
      <div class="effect effect-type-2">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <!--  -->
      <div class="effect effect-type-3">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <animation-prompt :animation-list="animationList"></animation-prompt>
  </div>
</template>

<script>
import AnimationPrompt from './AnimationPrompt.vue'

export default {
  components: {
    AnimationPrompt
  },
  data() {
    return {
      animationList: []
    }
  },
  mounted() {
    this.$nextTick(() => {
      // this.init()
    })
  },
  methods: {
    init() {
      const animationList = this.getAnimationList(this.$el)
      animationList.sort((a, b) => a.delay - b.delay)
      console.log(animationList)
      this.animationList = animationList
    },
    // 获取所有有效animation
    getAnimationList(el) {
      const stack = [el]
      const animationList = []
      while (stack.length) {
        const node = stack.pop()
        const arr = [
          ...this.getAnimation(node),
          ...this.getAnimation(node, ':before'),
          ...this.getAnimation(node, ':after')
        ]
        arr.forEach(item => {
          animationList.push(item)
        })
        for (let i = 0; i < node.children.length; i++) {
          stack.push(node.children[i])
        }
      }
      return animationList
    },
    // 获取DOM上的animation样式
    getAnimation(element, pseudoElt = null) {
      const animation = window.getComputedStyle(element, pseudoElt).getPropertyValue('animation')
      // 0.6s           ease          0.5s          1             normal     forwards    running     show-type-1-data-v-695a3185
      // duration | timing-function | delay | iteration-count | direction | fill-mode | play-state | name
      return animation === 'none 0s ease 0s 1 normal none running'
        ? []
        : animation.split(', ').map(str => {
          const arr = str.split(' ')
          return {
            duration: Number(arr[0].slice(0, -1)),
            timingFunction: arr[1],
            delay: Number(arr[2].slice(0, -1)),
            iterationCount: arr[3],
            direction: arr[4],
            fillMode: arr[5],
            playState: arr[6],
            name: arr[7]
          }
        })
    },
    /*  */
    animationStart(e) {
      console.log('start', e)
      const name = e.animationName.split('-data-v-')[0]
      const index = this.animationList.findIndex(item => item.name === name)
      if (index === -1) {
        this.animationList.push({
          name,
          count: 1
        })
      } else {
        this.animationList[index].count++
      }
    },
    animationEnd(e) {
      console.log('end', e)
      const name = e.animationName.split('-data-v-')[0]
      const index = this.animationList.findIndex(item => item.name === name)
      if (--this.animationList[index].count === 0) {
        this.animationList.splice(index, 1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrapper {
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
  .stage {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #d3c7c0;
    &::before {
      content: '';
      position: absolute;
      top: 20px;
      left: 20px;
      width: calc(100% - 40px);
      height: calc(100% - 40px);
      border: dashed 5px #635256;
      border-radius: 30px;
      opacity: 0.3;
    }
    &::after {
      content: '';
      position: absolute;
      width: 400px;
      height: 400px;
      top: calc(50% - 200px);
      left: calc(50% - 200px);
      border-radius: 50%;
      background-color: #635256;
    }
  }
  .effect {
    position: absolute;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    overflow: hidden;
    div {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      &::after {
        content: '';
        position: absolute;
        opacity: 0;
      }
    }
    // div:nth-child(1) { transform: rotate(0deg); }
    // div:nth-child(2) { transform: rotate(45deg); }
    // div:nth-child(3) { transform: rotate(90deg); }
    // div:nth-child(4) { transform: rotate(135deg); }
    // div:nth-child(5) { transform: rotate(180deg); }
    // div:nth-child(6) { transform: rotate(225deg); }
    // div:nth-child(7) { transform: rotate(270deg); }
    // div:nth-child(8) { transform: rotate(315deg); }
    @for $i from 1 through 8 {
      div:nth-child(#{$i}) { transform: rotate(45deg * $i); }
    }
  }
  .effect-type-1 {
    top: calc(50% - 200px);
    left: calc(50% - 200px);
    div::after {
      top: 5px;
      left: calc(50% - 20px);
      border-top: solid 70px #635256;
      border-left: solid 20px transparent;
      border-right: solid 20px transparent;
      transform: translateY(130px);
    }
  }
  .effect-type-2 {
    top: 50%;
    left: calc(50% - 400px);
    div::after {
      top: 0;
      left: calc(50% - 40px);
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #8db3b1;
      transform: translateY(170px);
    }
  }
  .effect-type-3 {
    top: calc(50% - 400px);
    left: 50%;
    div::after {
      top: 0;
      left: calc(50% - 20px);
      width: 40px;
      height: 40px;
      background-color: #9994a6;
      transform: translateY(150px);
    }
  }

  /* animation */
  /* stylelint-disable no-duplicate-selectors */
  .stage::after {
    animation: hidden-ball 0.6s ease 0s forwards;
  }
  .effect-type-1 div::after {
    animation:
      fade-in 0.3s ease 0.5s forwards,
      show-type-1 0.6s ease 0.5s forwards;
  }
  .effect-type-2 {
    animation: rotate360 4s ease 0.6s forwards;
    div::after {
      animation:
        fade-in 0.3s ease 1.1s forwards,
        show-type-2 0.6s ease 1.1s forwards;
    }
  }
  .effect-type-3 div::after {
    animation:
      fade-in 0.3s ease 1.7s forwards,
      show-type-3 0.6s ease 1.7s forwards;
  }
  /* stylelint-enable no-duplicate-selectors */

  /* keyframes */
  @keyframes hidden-ball {
    0% { transform: scale(1); }
    50% { transform: scale(1.4); }
    100% { transform: scale(0); }
  }

  @keyframes show-type-1 {
    from { transform: translateY(130px); }
    to { transform: translateY(-75px); }
  }

  @keyframes show-type-2 {
    from { transform: translateY(170px); }
    to { transform: translateY(-40px); }
  }

  @keyframes show-type-3 {
    from { transform: translateY(150px) rotate(0deg); }
    to { transform: translateY(-40px) rotate(270deg); }
  }

  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes rotate360 {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
</style>
