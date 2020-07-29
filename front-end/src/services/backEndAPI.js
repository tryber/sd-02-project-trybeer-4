const axios = require('axios');

const API_URL_BASE = 'http://localhost:3001';

const requestAPI = (method, route, body, token) => {
  const API_URL = `${API_URL_BASE}${route}`;
  const config = token
    ? { headers: { authorization: token } }
    : {};

  switch (method) {
    case 'GET': return axios.get(API_URL, config);
    case 'POST': return axios.post(API_URL, body, config);
    case 'PATCH': return axios.patch(API_URL, body, config);
    default: return null;
  }
};

export default requestAPI;
