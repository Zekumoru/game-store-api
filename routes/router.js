import express from 'express';
import axios from 'axios';
import url from 'url';

const router = express.Router();

const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;

const changeNavigationUrls = (data) => {
  if (data.next != null) {
    data.next = { ...url.parse(data.next, true).query };
    delete data.next.key;
  }

  if (data.previous != null) {
    data.previous = { ...url.parse(data.previous, true).query };
    delete data.previous.key;
  }
};

const devLog = (string) => {
  if (process.env.NODE_ENV === 'production') return;
  console.log(string);
};

router.get('/games', async (req, res) => {
  try {
    const params = new URLSearchParams({
      [API_KEY_NAME]: API_KEY_VALUE,
      ...url.parse(req.url, true).query,
    });

    const apiRes = await axios.get(`${API_BASE_URL}/games`, { params });
    const data = apiRes.data;

    changeNavigationUrls(data);
    devLog(`REQUEST: ${API_BASE_URL}/games?${params}`);

    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/games/:id', async (req, res) => {
  try {
    const gameId = req.params.id;
    const params = new URLSearchParams({
      [API_KEY_NAME]: API_KEY_VALUE,
    });

    const apiRes = await axios.get(`${API_BASE_URL}/games/${gameId}`, {
      params,
    });

    devLog(`REQUEST: ${API_BASE_URL}/games/${gameId}?${params}`);

    res.json(apiRes.data);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/games/:id/screenshots', async (req, res) => {
  try {
    const gameId = req.params.id;
    const params = new URLSearchParams({
      [API_KEY_NAME]: API_KEY_VALUE,
    });

    const apiRes = await axios.get(
      `${API_BASE_URL}/games/${gameId}/screenshots`,
      {
        params,
      }
    );

    devLog(`REQUEST: ${API_BASE_URL}/games/${gameId}/screenshots?${params}`);

    res.json(apiRes.data);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/genres', async (req, res) => {
  try {
    const params = new URLSearchParams({
      [API_KEY_NAME]: API_KEY_VALUE,
      ...url.parse(req.url, true).query,
    });

    const apiRes = await axios.get(`${API_BASE_URL}/genres`, { params });
    const data = apiRes.data;

    changeNavigationUrls(data);
    devLog(`REQUEST: ${API_BASE_URL}/genres?${params}`);

    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default router;
