import Crawler from 'crawler'
import store from '../../store'

export default function WebSpider(startUrl) {
    var c = new Crawler({
        maxConnections: 10,
        // This will be called for each crawled page
        callback: function (error, res, done) {
            var $ = res.$;
            if (error) {
                console.error(error);
            } else {
               
                // $ is Cheerio by default
                //a lean implementation of core jQuery designed specifically for the server
                // console.log(res);

                const links = $('a[href^="/"]:not([href^="#"])')
                .map((i, a) => {
                    return startUrl + $(a).attr('href');
                })
                .not( (i, a) => a.match(/\.(pdf|jpg|jpeg|gif|png|doc)$/i))
                .each((i, el) => {
                    if (store.state.Website.quote.indexOf(el) === -1) {
                        store.commit('ADD_QUOTE', {url: el, referrer: res.options.uri})
                        c.queue(el)
                    }
                })
            }
            store.commit(
                'UPDATE_QUOTE',
                {
                    url: res.options.uri,
                    $: $,
                    data: res,
                    error: error
                })
            done();
        }
    })

    // Queue just one url, with default callback
    c.queue(startUrl);
    store.commit('ADD_QUOTE', {url: startUrl, referrer: null})

    c.on('drain',function(){
        store.commit('UPDATE_LOADING', {
            show: false
          })
    });
}