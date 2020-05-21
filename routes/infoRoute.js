const express = require('express');
const router = express.Router();
const Fetch = require('../fetch');

router.get('/', async (req, res) => {
  try {
    const { location } = req.query;
    const data = await Fetch.info(location);
    res.json(data);
  } catch (e) {
    res.sendStatus(404);
  }
});

router.get('/poi', async (req,res) => {
  try {
    const { location } = req.query;
    const data = await Fetch.poi(location);
    res.json(data);
  } catch(e) {
    res.sendStatus(404);
  }
})

router.get('/tour', async (req,res) => {
  try {
    const { location } = req.query;
    const data = await Fetch.tour(location);
    res.json(data);
  } catch(e) {
    res.sendStatus(404);
  }
})

router.get('/article', async (req,res) => {
  try {
    const { location } = req.query;
    const data = await Fetch.article(location);
    res.json(data);
  } catch(e) {
    res.sendStatus(404);
  }
})

module.exports = router;