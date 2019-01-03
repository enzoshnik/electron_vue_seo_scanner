const state = {
  url: '',
  $: null,
  links: [],
  quote: [],
  urls: []
}

const defaultPageParams = {
  visited: false,
  title: ''
}

const mutations = {
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
    state.quote.push(quote)
    state.urls.push({ url: quote, quote: false })
  },
  UPDATE_QUOTE (state, params) {
    const $ = params.$
    const foundIndex = state.urls.findIndex(x => x.url === params.url)
    let el = state.urls[foundIndex]
    el.quote = true
    el.title = $('title').text()
    state.urls[foundIndex] = el
  }
}

const actions = {
}

const getters = {
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
