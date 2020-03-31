<template>
  <div>
    <h1>Input Test</h1>
    <div class="input-wrapper">
      <ez-input v-model="val"></ez-input>
    </div>
  </div>
</template>

<script>
import EzInput from './EzInput'

export default {
  name: 'InputTest',
  components: {
    EzInput
  },
  data() {
    return {
      val: 3
    }
  }
}
</script>

<style lang="scss" scoped>
  .input-wrapper {
    margin-left: 30px;
  }
</style>
