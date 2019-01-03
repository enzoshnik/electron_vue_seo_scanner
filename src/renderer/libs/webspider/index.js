import Crawler from 'crawler'
import store from '../../store'

export default function WebSpider(startUrl) {
    var c = new Crawler({
        maxConnections: 10,
        // This will be called for each crawled page
        callback: function (error, res, done) {
            if (error) {
                console.log(error);
            } else {
                var $ = res.$;
                // $ is Cheerio by default
                //a lean implementation of core jQuery designed specifically for the server
                // console.log(res);

                const links = $('a[href^="/"]:not([href^="#"])').map((i, a) => {
                    return startUrl + $(a).attr('href');
                })
                

                links.each((i, el) => {
                    if (store.state.Website.quote.indexOf(el) === -1) {
                        store.commit('ADD_QUOTE', el)
                        c.queue(el)
                    }
                })

                store.commit('UPDATE_QUOTE', {url: res.options.uri, $: $})
            }
            done();
        }
    })

    // Queue just one url, with default callback
    c.queue(startUrl);
}