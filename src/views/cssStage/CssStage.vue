<template>
  <div class="stage">
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
</template>

<script>
export default {
  mounted() {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    init() {
      let animationList = this.getAnimationList(this.$el)
      console.log(animationList)
    },
    getAnimationList(el) {
      let stack = [el]
      let animationList = []
      while (stack.length) {
        let node = stack.pop()
        let animation = this.getAnimation(node)
        let beforeAnimation = this.getAnimation(node, ':before')
        let afterAnimation = this.getAnimation(node, ':after')
        if (animation) animationList.push(animation)
        if (beforeAnimation) animationList.push(beforeAnimation)
        if (afterAnimation) animationList.push(afterAnimation)
        for (let i = 0; i < node.children.length; i++) {
          stack.push(node.children[i])
        }
      }
      return animationList
    },
    getAnimation(element, pseudoElt = null) {
      let animation = window.getComputedStyle(element, pseudoElt).getPropertyValue('animation')
      return animation === 'none 0s ease 0s 1 normal none running' ? '' : animation
    }
  }
}
</script>

<style lang="scss" scoped>
  .stage {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #D3C7C0;
    &:before {
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
    &:after {
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
      &:after {
        content: '';
        position: absolute;
        opacity: 0;
      }
    }
    div:nth-child(1) { transform: rotate(0deg); }
    div:nth-child(2) { transform: rotate(45deg); }
    div:nth-child(3) { transform: rotate(90deg); }
    div:nth-child(4) { transform: rotate(135deg); }
    div:nth-child(5) { transform: rotate(180deg); }
    div:nth-child(6) { transform: rotate(225deg); }
    div:nth-child(7) { transform: rotate(270deg); }
    div:nth-child(8) { transform: rotate(315deg); }
  }
  .effect-type-1 {
    top: calc(50% - 200px);
    left: calc(50% - 200px);
    div:after {
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
    div:after {
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
    div:after {
      top: 0;
      left: calc(50% - 20px);
      width: 40px;
      height: 40px;
      background-color: #9994a6;
      transform: translateY(150px);
    }
  }

  /* animation */
  .stage:after {
    animation: hidden-ball 0.6s ease 0s forwards;
  }
  .effect-type-1 div:after {
    animation:
      fade-in 0.3s ease 0.5s forwards,
      show-type-1 0.6s ease 0.5s forwards;
  }
  .effect-type-2 {
    animation: rotate-360 4s ease 0.6s forwards;
    div:after {
      animation:
        fade-in 0.3s ease 1.1s forwards,
        show-type-2 0.6s ease 1.1s forwards;
    }
  }
  .effect-type-3 div:after {
    animation:
      fade-in 0.3s ease 1.7s forwards,
      show-type-1 0.6s ease 1.7s forwards;
  }

  /* keyframes */
  @keyframes hidden-ball {
    0%   { transform: scale(1); }
    50%  { transform: scale(1.4); }
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
