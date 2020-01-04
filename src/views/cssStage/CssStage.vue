<template>
  <div class="stage">
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
  </div>
</template>

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
</style>
