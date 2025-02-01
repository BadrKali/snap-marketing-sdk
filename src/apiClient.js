const axios = require("axios");

const BASE_URL_AUTH = "https://accounts.snapchat.com"; 
const BASE_URL_API = "https://adsapi.snapchat.com"; 


const authClient = axios.create({
  baseURL: BASE_URL_AUTH,
  timeout: 5000,
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
});

const apiClient = axios.create({
  baseURL: BASE_URL_API,
  timeout: 5000,
  // headers: { "Content-Type": "application/json" },
});

class ApiClient {
    constructor({ clientId, clientSecret, redirectUri, refreshToken }) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.redirectUri = redirectUri;
        this.refreshToken = refreshToken;
        this.accessToken = null;

        this.refreshAccessToken(); 
        apiClient.interceptors.response.use(
            response => response,
            async (error) => {
                if (error.response.status === 401) {
                    await this.refreshAccessToken();
                    error.config.headers['Authorization'] = `Bearer ${this.accessToken}`;
                    return apiClient(error.config); 
                }
                return Promise.reject(error);
            }
        );
    }

    async refreshAccessToken() {
      try {
        const response = await authClient({
          method: "POST",
          url: "/login/oauth2/access_token",
          data: `client_id=${this.clientId}&client_secret=${this.clientSecret}&grant_type=refresh_token&refresh_token=${this.refreshToken}`,
        });
        this.accessToken = response.data.access_token;
      } catch (error) {
        console.error('Error refreshing access token:', error);
        throw error;
      }
    }

    async makeRequest(method, endpoint, data = null) {
        try {
            const response = await apiClient({
                method,
                url: endpoint,
                headers: {
                    Authorization: `Bearer ${this.accessToken}`,
                },
                data,
            });
            return response.data;
        } catch (error) {
            console.error('Error making request:', error);
            throw error;
        }
    }

    get(endpoint) {
        return this.makeRequest("GET", endpoint);
    }

    post(endpoint, data) {
        return this.makeRequest("POST", endpoint, data);
    }

    put(endpoint, data) {
        return this.makeRequest("PUT", endpoint, data);
    }

    del(endpoint) {
        return this.makeRequest("DELETE", endpoint);
    }
}

module.exports = ApiClient;
