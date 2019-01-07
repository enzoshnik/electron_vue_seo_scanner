import { offlineDatabase } from '../../libs/index'

const state = {
  url: '',
  domains: [],
  $: null,
  links: [],
  quote: [],
  urls: [],
  loading: false
}

const defaultPageParams = {
  visited: false,
  title: ''
}

const mutations = {
  UPDATE_LOADING (state, params) {
    state.loading = params.show
  },
  UPDATE_WEBSITE (state, url) {
    state.url = url
    state.links = {'/': defaultPageParams}
  },
  UPDATE_QUERY (state, $) {
    state.$ = $
    state.links = $('a').map((i, el) => $(el).attr('href'))
      // if (typeof state.links[l] === 'undefined') state.links[l] = false
  },
  ADD_QUOTE (state, quote) {
    offlineDatabase().insert({'quote': quote.url, 'domain': 1, 'visited': 0}).into('quotes').then((updatedRows) => {
      console.log(updatedRows)
    })
    state.quote.push(quote.url)
    state.urls.push({
      url: quote.url,
      quote: false,
      referrer: quote.referrer,
      error: false,
      headers: null,
      statusCode: null
    })
  },
  ADD_DOMAIN (state, url) {
    offlineDatabase().insert({'domain': url}).into('domains').then((updatedRows) => {
      console.log(updatedRows)
    })
    state.domains.push(url)
  },
  REMOVE_QUOTE (state, quote) {
    const foundIndex = state.urls.findIndex(x => x.url === quote)
    state.quote.splice(foundIndex, 1)
  },
  UPDATE_QUOTE (state, params) {
    const $ = params.$
    const foundIndex = state.urls.findIndex(x => x.url === params.url)
    // state.quote.splice(foundIndex, 1)
    let el = state.urls[foundIndex]
    el.quote = true
    if (params.error) {
      el.error = params.error
    } else {
      el.title = $('title').text()
    }
    el.headers = params.data.headers
    el.statusCode = params.data.statusCode
    state.urls[foundIndex] = el
  },
  SET_DEFAULT (state, data) {
    state.domains = data.domains
  }
}

const actions = {
  init ({ commit, state }) {
    offlineDatabase().select('domain').from('domains').then(row => {
      commit('SET_DEFAULT', {
        domains: row.map(x => x.domain)
      })
    })
  }
}

const getters = {
  getDomains: (state) => {
    return state.domains
  },
  getLinkList: (state) => {
    return state.links
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
