const axios = require('axios');

const Fetch = {
  zomato(term="restaurant", location){
    const apiKey = process.env.RESTAURANTS_KEY;
    const urlCity = `https://developers.zomato.com/api/v2.1/cities?q=${location}`;
  
    return axios({
      method: 'get',
      url: urlCity,
      headers: {
        'user-key': apiKey
      }
    })
      .then( resp => {
        return resp.data.location_suggestions[0].id;
      })
      .then( id => {
        const urlRestaurants = `https://developers.zomato.com/api/v2.1/search?entity_id=${id}&entity_type=city&sort=rating&q=${term}`;
        return axios({
          method: 'get',
          url: urlRestaurants,
          headers: {
            'user-key': apiKey
          }
        })
      })
      .then( resp => {
        return resp.data.restaurants;
      })
      .catch( e => undefined)
  },

  yelp(term, location){
    const apiKey = process.env.API_KEY;
    const url = `https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}`;
    return axios({
      method: 'get',
      url: url,
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    })
      .then( resp => {
        return resp.data;
      })
      .catch( e => undefined );
    },

  accountId: process.env.ACCOUNT_ID,
  triposoKey: process.env.TRIPOSO_KEY,

  info(location){
    const url = `https://www.triposo.com/api/20200405/location.json?id=${location}&fields=all&account=${this.accountId}&token=${this.triposoKey}`;

    return axios.get(url)
      .then( resp => {
        return resp.data;
      })
  },

  poi(location){
    const url = `https://www.triposo.com/api/20180206/poi.json?location_id=${location}&account=${this.accountId}&token=${this.triposoKey}`;

    return axios.get(url)
      .then( resp => {
        return resp.data;
      })
  },

  tour(location){
    const url = `https://www.triposo.com/api/20180206/tour.json?location_ids=${location}&account=${this.accountId}&token=${this.triposoKey}`;

    return axios.get(url)
      .then( resp => {
        return resp.data;
      })
  },

  article(location){
    const url = `https://www.triposo.com/api/20180206/article.json?location_ids=${location}&account=${this.accountId}&token=${this.triposoKey}`;

    return axios.get(url)
      .then( resp => {
        return resp.data;
      })
  }
}
module.exports = Fetch;