<template>
  <div class="column">
    <h4 class="ui top attached inverted header">{{ $t('config.pagespeed.title') }}</h4>
    <div class="ui bottom attached segment">
      <div class="ui form">
        <div class="field">
          <label>{{ $t('config.pagespeed.label') }}</label>
          <input aria-labelledby="billing Pagespeed key" class="prompt" type="text" autocomplete="off" v-model="Localkey" v-on:keyup="updateKey(Localkey)">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        Localkey: ''
      }
    },
    computed: {
    },
    methods: {
      updateKey: function () {
      },
      open () {
      }
    }
  }
</script>

<style scoped>
.centered {
  text-align: center!important
}
.segment p {
  padding-top: 10px
}
</style>
