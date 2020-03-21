<template>
  <label class="input-label">
    <p>value: {{ value | formatNum }}</p>
    <p>lastVal: {{ lastVal }}</p>
    <input
      :value="value" type="number"
      class="input"
      @keypress="handlePress"
      @input="handleInput">
  </label>
</template>

<script>
/*
数字校验
number: function(e) {
    return !isNaN(e) && ("number" == typeof e || "string" == typeof e && !!e.match(/\d* /))
},

(u.default.string().matches(/^(([0-9][0-9]*)|(([0]\.\d{1,2}|[0-9][0-9]*\.\d{1,2})))$/, "请输入非负数（可保留两位小数）")),

type: "text",
value: 0 === t.value ? 0 : t.value || "",
onChange: function(e) {
    e = e.replace(/。/g, "."),
    t.onChange(e)
},
size: "medium"
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
    }
  },
  data() {
    return {
      // 最新的有效值
      lastVal: undefined
    }
  },
  methods: {
    handlePress(e) {
      this.lastVal = e.target.value || this.lastVal
      console.log(e)
      // 剔除e
      if (e.key === 'e') {
        e.preventDefault()
      }
    },
    handleInput(e) {
      let val = e.target.value
      let key = e.data
      let finalVal = val
      console.log(e, key, val)

      if (e.inputType === 'deleteContentBackward') {
        // 删除键处理，更新上一个有效值
        this.lastVal = val
      } else if (key !== null && val.length === 0) {
        // 输入实际字符，组合后为非法值，回退为上一个有效值
        // 无数据时，输入 - 怎么处理 ????
        if (key === '-') {

        } else {
          e.target.value = this.lastVal
          finalVal = this.lastVal
        }
      } else if (key === null && val.length === 0) {
        //
        e.target.value = ''
        finalVal = ''
      } else if (key === '.' && /\./.test(val)) {
        // 两个.
        e.target.value = ''
        e.target.value = val
      }
      this.$emit('input', finalVal)
    }
  }
}
</script>

<style lang="scss" scoped>
  // .input-label {
  //   position: relative;
  //   .input {
  //     position: absolute;
  //     top: 0;
  //     left: 0;
  //     width: 100%;
  //     text-align: center;
  //     border: none;
  //     padding: 0;
  //     color: #333;
  //     &:focus {
  //       outline-width: 0;
  //       outline-style: none;
  //     }
  //   }
  // }
</style>
