<template>
  <div class="wrapper">
    <!-- <div
      v-for="item in mergeCommon(activatedList)" :key="item.name"
      class="prompt">
      <span class="name">{{ item.name }}</span>
      <span class="count">{{ item.count }}</span>
    </div> -->
    <div
      v-for="item in animationList" :key="item.name"
      class="prompt">
      <span class="name">{{ item.name }}</span>
      <span class="count">{{ item.count }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnimationPrompt',
  props: {
    animationList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      activatedList: []
    }
  },
  // watch: {
  //   animationList: {
  //     handler(list) {
  //       list.forEach(item => {
  //         setTimeout(() => {
  //           let activatedList = this.activatedList
  //           let o = {
  //             name: item.name.split('-data-v-')[0]
  //           }
  //           this.setPromise(
  //             () => {
  //               activatedList.push(o)
  //             },
  //             item.duration * 1000,
  //             () => {
  //               activatedList.splice(activatedList.findIndex(it => it === o), 1)
  //             }
  //           )
  //         }, item.delay * 1000)
  //       })
  //     },
  //     immediate: true
  //   }
  // },
  methods: {
    setPromise(fn, time, cb) {
      return new Promise((resolve, reject) => {
        fn()
        setTimeout(() => {
          resolve()
        }, time)
      }).then(cb)
    },
    mergeCommon(list) {
      let obj = {}
      let arr = []
      list.forEach(item => {
        let name = item.name
        if (obj[name] >= 0) {
          arr[obj[name]].count++
        } else {
          item.count = 1
          arr.push(item)
          obj[name] = arr.length - 1
        }
      })
      return arr
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  // display: flex;
  // flex-direction: column;
  min-width: 100px;
  top: 0;
  right: 0;
  z-index: 9;
  background-color: rgba(238, 238, 238, 0.3);
  .prompt {
    font-size: 20px;
    margin: 3px;
    text-align: right;
    .name {
      margin-right: 10px;
    }
    .count {
      font-weight: bold;
    }
  }
}

// .prompt-list-enter-active, .prompt-list-leave-active {
//   transition: all 1s;
// }
// .prompt-list-enter, .prompt-list-leave-to {
//   opacity: 0;
//   transform: translateY(10px);
// }
</style>
