const express = require('express');
const router = express.Router();
const Fetch = require('../fetch');

router.get('/', async (req, res) => {
  try {
    const { term, location } = req.query;
    const data = await Fetch.yelp(term, location);
    const places = data.businesses.map( place => {
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
  } catch (e) {
    console.log(e);
    res.sendStatus(404);
  }
})

module.exports = router;