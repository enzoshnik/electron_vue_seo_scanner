<template>
  <div class="ui">

    <div class="ui error message" v-if="error">
      <i v-on:click="error = false" class="close icon"></i>
      <div class="header">{{ $t('website.form.error.content') }}</div>
    </div>

    <div class="ui grid" v-if="this.$store.state.Website.$ == null">
      <div class="one wide column bottom aligned content">
        <router-link to="/config">
          <button class="ui icon button"><i class="setting icon"></i></button>
        </router-link>
      </div>
      <div class="fifteen wide column">
        <div class="ui form">
          <div class="field">
            <label>{{ $t('website.form.input.label') }} :</label>
            <input v-model="url" class="prompt" type="url" :placeholder="$t('website.form.input')">
          </div>
        </div>
      </div>
    </div>
{{ urlsCount }} - {{ urlsCountTrue }}
    <div class="column" v-if="urls.length > 0">
      <h4 class="ui top attached inverted header">{{ $t('keywords.panel.title') }}</h4>
      <div class="ui bottom attached segment">
        <table class="ui fixed single line very basic table">
          <thead>
            <tr>
              <th>{{ $t('keywords.array.word') }}</th>
              <th>{{ $t('keywords.array.word') }}</th>
              <th>{{ $t('keywords.array.word') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in urls">
              <td>{{ item.url }}</td>
              <td>{{ item.title }}</td>
              <td :class="{error: !item.quote, positive: item.quote}">{{ item.quote }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="ui form" v-if="this.$store.state.Website.$ == null">
      <div class="field centered">
        <button v-on:click="update()" class="ui right labeled icon teal button"><i class="right arrow icon"></i> {{ $t('website.form.button') }} </button>
      </div>
    </div>

    <div class="ui form" v-if="this.$store.state.Website.$ != null">
      <div class="field centered">
        <button v-on:click="this.document.location.reload(true)" class="ui left labeled icon red button"><i class="undo icon"></i> {{ $t('website.form.button.reload') }} </button>
      </div>
    </div>
  </div>
</template>

<script>
  import WebSpider from '../../libs/webspider'
  // const recrawler = require('recrawler')
  export default {
    data () {
      return {
        url: 'https://enzolab.ru',
        error: false
      }
    },
    computed: {
      isLoading: function () {
        return this.$store.state.Website.isLoading
      },
      urls: function () {
        return this.$store.state.Website.urls
      },
      urlsCount: function () {
        return this.$store.state.Website.urls.length
      },
      urlsCountTrue: function () {
        const l = this.$store.state.Website.urls.filter(x => {
          return x.quote === true
        })
        return l.length
      }
    },
    methods: {
      update () {
        let isValide = true
        // Todo : Use regex

        if (isValide) {
          this.error = false
          // this.$store.commit('UPDATE_LOADING', {
          //   show: true
          // })

          // this.$store.commit('UPDATE_WEBSITE', this.url)
          WebSpider(this.url)
          // recrawler(this.url).then($ => {
          //   this.$store.commit('UPDATE_QUERY', $)
          //   this.$store.commit('UPDATE_LOADING', {
          //     show: false
          //   })
          // }).catch(err => {
          //   console.log(err)
          //   this.$store.commit('UPDATE_LOADING', {
          //     show: false
          //   })
          //   this.$store.commit('UPDATE_ERROR', {
          //     show: true,
          //     title: err.message,
          //     text: err.code
          //   })
          // })
        } else {
          this.error = true
        }
      }
    }
  }
</script>

<style scoped>
.centered {
  text-align: center!important
}
.ui.grid{
  padding-top: 10px;
  padding-bottom: 10px;
  vertical-align: top;
}
</style>
