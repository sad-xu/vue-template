<template>
  <label class="input-label">
    <span id="a" class="text" msf="a">{{ value | formatNum }}</span>
    <input
      :value="value" type="number"
      class="input" :class="hideInput ? 'hide-input' : ''"
      @keypress="handlePress" @input="handleInput"
      @focus="handleFocus" @blur="handleBlur">
    <div class>
      <p>value: {{ value | formatNum }}</p>
      <p>lastVal: {{ lastVal }}</p>
    </div>
  </label>
</template>

<script>
/*
数字校验
return !isNaN(e) && ("number" == typeof e || "string" == typeof e && !!e.match(/\d* /))

(u.default.string().matches(/^(([0-9][0-9]*)|(([0]\.\d{1,2}|[0-9][0-9]*\.\d{1,2})))$/, "请输入非负数（可保留两位小数）"))

e = e.replace(/。/g, ".")
*/

export default {
  name: 'EzInput',
  filters: {
    formatNum(val) {
      return typeof val === 'number' ? val.toLocaleString('en-Us') : val
    }
  },
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {
      type: [Number],
      required: true
    },
    // 小数点位数
    digit: {
      type: Number,
      default: 2
    }
  },
  data() {
    return {
      // 最新的有效值
      lastVal: undefined,
      hideInput: true
    }
  },
  methods: {
    handlePress(e) {
      this.lastVal = e.target.value || this.lastVal
      // 剔除e
      if (e.key === 'e') {
        e.preventDefault()
      } else if (e.key === '.' && this.digit === 0) {
        e.preventDefault()
      }
    },
    handleInput(e) {
      let val = e.target.value
      let key = e.data
      let finalVal = val
      if (e.inputType === 'deleteContentBackward') {
        // 删除键处理，更新上一个有效值
        this.lastVal = val
      } else if (key !== null && val.length === 0) {
        // 输入实际字符，组合后为非法值，回退为上一个有效值
        // 无数据时，输入 -
        if (key === '-' && this.lastVal === '') {
          finalVal = e.target.value = '-0'
        } else {
          finalVal = e.target.value = this.lastVal
        }
      } else if (key === null && val.length === 0) {
        finalVal = e.target.value = ''
      } else if (/\./.test(val)) {
        // 现有数据存在 .
        if (key === '.') {
          // 两个.
          e.target.value = ''
          e.target.value = val
        } else {
          let index = val.length - val.indexOf('.') - 1
          // 小数点位数 默认保留两位
          if (index > this.digit) {
            finalVal = e.target.value = val.slice(0, this.digit - index)
          }
        }
      }
      this.$emit('input', Number(finalVal))
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
.input-label {
  position: relative;
  .text {
    font-weight: normal;
    min-width: 60px;
    color: #333;
    padding: 0 13px 2px;
    border-bottom: 1px solid #e0e0e0;
  }
  .input {
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
  .hide-input {
    opacity: 0;
  }
}
</style>
