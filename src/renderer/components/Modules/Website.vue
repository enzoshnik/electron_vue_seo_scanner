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
            <input v-model="url" class="prompt" type="url" :aria-labelledby="url" :placeholder="$t('website.form.input')">
          </div>
        </div>
      </div>
    </div>

    <div class="ui active progress" v-if="progress">
      <div class="bar" :style="{ width: progress + '%' }" v-if="(progress<100)">
        <div class="progress">{{ progress }}%</div>
      </div>
      <div class="label">Найдено ссылок - {{ urlsCount }}; Обработано - {{ urlsCountTrue }}; С ошибками - {{ urlsCountError }}</div>
    </div>
    {{ domains }}
    <div class="column" v-if="urls.length > 0">
      <h4 class="ui top attached inverted header">{{ $t('keywords.panel.title') }}</h4>
      <div class="ui bottom attached segment">
        <table class="ui fixed single line very basic table">
          <thead>
            <tr>
              <th>{{ $t('keywords.array.word') }}</th>
              <th>{{ $t('keywords.array.word') }}</th>
              <th>{{ $t('keywords.array.word') }}</th>
              <th>{{ $t('keywords.array.word') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in urls" :key="index" :class="{error: (item.statusCode == 404)}">
              <td>{{ item.url }}</td>
              <td>{{ item.title }}</td>
              <td>{{ item.statusCode }}</td>
              <td>
                <i class="icon x red" v-if="item.error"></i>
                <i class="icon" v-else :class="{'notched circle loading red':!item.quote, 'check green': item.quote }"></i>
              </td>
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
      isLoading () {
        return this.$store.state.Website.isLoading
      },
      urls () {
        return this.$store.state.Website.urls
      },
      urlsCount () {
        return this.$store.state.Website.urls.length
      },
      urlsCountTrue () {
        const l = this.$store.state.Website.urls.filter(x => {
          return (x.quote === true && x.error === false)
        })
        return l.length
      },
      urlsCountError () {
        const l = this.$store.state.Website.urls.filter(x => {
          return x.error !== false
        })
        return l.length
      },
      progress () {
        return Math.round(this.urlsCountTrue / this.urlsCount * 100) + this.urlsCountError
      },
      domains () {
        return this.$store.state.Website.domains
      }
    },
    methods: {
      update () {
        let isValide = true
        // Todo : Use regex

        if (isValide) {
          this.error = false
          this.$store.commit('UPDATE_LOADING', {
            show: true
          })
          this.$store.commit('ADD_DOMAIN', this.url)
          WebSpider(this.url)
        } else {
          this.error = true
        }
      }
    },
    mounted () {
      this.$store.dispatch('init')
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
