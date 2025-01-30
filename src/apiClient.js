const axios = require("axios");

const BASE_URL = "https://api.snapchat.com";

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});

const makeRequest = async (method, endpoint, data = null, token = "") => {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await apiClient({
      method,
      url: endpoint,
      data,
      headers: headers,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const get = (endpoint, token) => makeRequest("GET", endpoint, null, token);
const post = (endpoint, data, token) => makeRequest("POST", endpoint, data, token);
const put = (endpoint, data, token) => makeRequest("PUT", endpoint, data, token);
const del = (endpoint, token) => makeRequest("DELETE", endpoint, null, token);


module.exports = { get, post, put, del };
