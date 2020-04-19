<template>
  <div>
    <h1>Input Test</h1>
    <div class="input-wrapper">
      <div class="input-item">
        <p class="title">
          ez-input-int
        </p>
        <p class="tip">
          只允许输入正整数，移动端弹出数字键盘
        </p>
        <p class="tip">
          v-model: Number 绑定值
        </p>
        <p class="tip">
          maxLength: Number 值的最大位数，默认9，即亿
        </p>
        <div class="input">
          <ez-input-int v-model="intVal"></ez-input-int>
        </div>
      </div>
      <div class="input-item">
        <p class="title">
          ez-input-float
        </p>
        <p class="tip">
          允许输入正负整数、小数，移动端弹出普通键盘
        </p>
        <p class="tip">
          v-model: Number 绑定值
        </p>
        <p class="tip">
          digits: Number 小数部分最大位数 默认 2
        </p>
        <p class="tip">
          intLength: Number 整数部分最大位数 默认 9
        </p>
        <div class="input">
          <ez-input-float v-model="floatVal" :digits="3"></ez-input-float>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EzInputInt from './EzInputInt'
import EzInputFloat from './EzInputFloat'

export default {
  name: 'InputTest',
  components: {
    EzInputInt,
    EzInputFloat
  },
  data() {
    return {
      intVal: 3,
      floatVal: 2.3
    }
  }
}
</script>

<style lang="scss" scoped>
.input-wrapper {
  display: flex;
}
.input-item {
  width: 100%;
  margin: 30px;
  border-right: 2px dashed #bdbdbd;
  &:last-of-type {
    border-right: 0;
  }
  .title {
    font-size: 18px;
    font-weight: bold;
  }
  .tip {
    font-family: cursive;
    font-size: 15px;
    margin: 10px;
    color: #666;
  }
  .input {
    margin-top: 20px;
    margin-left: 20%;
  }
}
</style>
