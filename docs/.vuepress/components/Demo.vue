<template>
  <span v-for="i in 3" :key="i">{{ i }} </span>
  <span>{{ name }}</span>
</template>
<script>
export default {
  data() {
    return {
      name: 'lyq'
    }
  },
  mounted () {
    // import('./lib-that-access-window-on-import').then(module => {
    //   this.dynamicComponent = module.default
    // })
  }
}
</script>