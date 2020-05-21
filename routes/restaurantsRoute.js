const express = require('express');
const router = express.Router();
const Fetch = require('../fetch');

router.get('/', async (req, res) => {
  let places;
  try{
    const {term, location} = req.query;
    if(!location) throw new Error("Bad request");

    let data = await Fetch.zomato(term, location);

    if(!data) throw new Error("No data");

    places = data.map( place => {
      const price = Number(place.restaurant.price_range);
      let usd = '';
      for(let i=0; i<price; i++){
        usd += "$";
      }

      const catArr = place.restaurant.cuisines.split(',');

      return {
        id: place.restaurant.id,
        name: place.restaurant.name,
        url: place.restaurant.url,
        imgUrl: place.restaurant.featured_image,
        rating: place.restaurant.user_rating.aggregate_rating,
        price: usd,
        category: catArr[0],
        street: place.restaurant.location.address,
        city: '',
        phone: place.restaurant.phone_numbers,
        lat: place.restaurant.location.latitude,
        lng: place.restaurant.location.longitude
      }
    })
    res.json(places);
  } catch (e) {
    if(e.message==="Bad request") res.sendStatus(400);
    else if(e.message==="No data"){
      try{
        const {term, location} = req.query;
        const data = await Fetch.yelp(term, location);
        if(!data) res.sendStatus(404);
        places = data.businesses.map(place => {
          return {
            id: place.id,
            name: place.name,
            url: place.url,
            imgUrl: place.image_url,
            rating: place.rating,
            price: place.price,
            category: place.categories[0].title,
            street: place.location.address1,
            city: place.location.city,
            phone: place.display_phone,
            lat: place.coordinates.latitude,
            lng: place.coordinates.longitude
          }
        })
        res.json(places);
      } catch(e){
        res.sendStatus(404);
      }
    } else res.sendStatus(404);
  }
});

module.exports = router;