<template>
  <div class="translate">
    <a href="#" v-on:click="updateLocal('en')"><i class="united kingdom flag"></i> English</a> -
    <a href="#" v-on:click="updateLocal('ru')"><i class="russia flag"></i> Русский</a>
  </div>
</template>

<script>
export default {
  name: 'translate',
  data () {
    return {
    }
  },
  methods: {
    updateLocal (local) {
      this.$store.commit('EDIT_LOCAL', local)
      this.$store.state.electronStore.set('local', local)
    }
  }
}
</script>

<style scoped>
.translate {
  padding-top: 10px;
  padding-bottom: 10px
}
</style>
