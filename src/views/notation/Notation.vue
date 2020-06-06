<template>
  <div>
    <h2 class="title">
      notation
    </h2>
  </div>
</template>

<script>
import Annotate from './annotate'

export default {
  name: 'Notation',
  data() {
    return {

    }
  },
  mounted() {
    this.$nextTick(() => {
      let a = new Annotate(this.$el.querySelector('.title'))
      console.log(a)
      a.show()
    })
  }
  // methods: {

  // }
}
</script>
