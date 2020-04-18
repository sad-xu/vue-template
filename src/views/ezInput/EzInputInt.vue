<template>
  <label class="ez-input-label">
    <span class="ez-text">{{ value | formatNum }}</span>
    <input
      :value="value" type="number"
      class="ez-input" :class="hideInput ? 'ez-input_hide' : ''"
      @keypress="handlePress" @input="handleInput"
      @focus="handleFocus" @blur="handleBlur">
  </label>
</template>

<script>
export default {
  name: 'EzInputInt',
  filters: {
    formatNum(val) {
      return Number(val).toLocaleString('en-Us')
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
    // 数字位数的最大长度限制
    maxLength: {
      type: Number,
      default: 9
    }
  },
  data() {
    return {
      hideInput: true
    }
  },
  methods: {
    handlePress(e) {
      // 剔除非法输入
      let key = e.key
      if (
        key === 'e' || key === '.' ||
        key === '-' || key === '+' ||
        e.target.value.length >= this.maxLength
      ) {
        e.preventDefault()
      }
    },
    handleInput(e) {
      this.$emit('input', Number(e.target.value))
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
