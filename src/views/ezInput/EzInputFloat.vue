<template>
  <label class="ez-input-label">
    <span class="ez-text">{{ innerValue | formatNum }}</span>
    <input
      :value="innerValue" type="text"
      class="ez-input" :class="hideInput ? 'ez-input_hide' : ''"
      @keypress="handlePress" @input="handleInput"
      @focus="handleFocus" @blur="handleBlur">
  </label>
</template>

<script>
/*
  - + . 0 1-9 backspace
*/
export default {
  name: 'EzInputFloat',
  filters: {
    formatNum(val) {
      return (Number(val) || 0).toLocaleString('en-Us')
    }
  },
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {
      type: Number,
      required: true
    },
    // 小数点位数
    digits: {
      type: Number,
      default: 2
    },
    // 整数最大位数 亿
    intLength: {
      type: Number,
      default: 9
    }
  },
  data() {
    return {
      innerValue: this.value + '',
      lastVal: this.value + '',
      hideInput: true
    }
  },
  methods: {
    handlePress(e) {
      this.lastVal = e.target.value || this.lastVal
      // 只允许输入 0-9 .  -
      if (!/[\d-.]/.exec(e.key)) {
        e.preventDefault()
      }
    },
    handleInput(e) {
      let val = e.target.value
      let finalInput = val
      if (isNaN(Number(val)) && val !== '-') {
        // 若为非法值，回退为上一个有效值
        finalInput = this.lastVal
      } else {
        // 整数位数 小数位数 控制
        let [int, dec] = val.split('.')
        // 负数处理
        if (int && int[0] === '-') int = int.slice(1)
        if (
          (int && int.length > this.intLength) ||
          (dec && dec.length > this.digits)
        ) {
          finalInput = this.lastVal
        }
      }
      this.lastVal = finalInput
      e.target.value = finalInput
      this.innerValue = finalInput
      this.$emit('input', Number(finalInput) || 0)
    },
    handleFocus() {
      this.hideInput = false
    },
    handleBlur() {
      this.hideInput = true
    }
  }
}
</script>

<style lang="scss" scoped>
.ez-input-label {
  position: relative;
  .ez-text {
    font-weight: normal;
    min-width: 60px;
    color: #333;
    padding: 0 13px 2px;
    border-bottom: 1px solid #e0e0e0;
  }
  .ez-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    text-align: center;
    border: none;
    padding: 0;
    color: #333;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none !important;
      margin: 0;
    }
    &:focus {
      outline-width: 0;
      outline-style: none;
    }
  }
  .ez-input_hide {
    opacity: 0;
  }
}
</style>
