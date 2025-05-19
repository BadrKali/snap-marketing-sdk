require("dotenv").config();
const axios = require("axios");
const apiClient = require("./apiClient");

const SNAP_AUTH_URL = "https://accounts.snapchat.com/login/oauth2/authorize";
const SNAP_TOKEN_URL =
  "https://accounts.snapchat.com/login/oauth2/access_token";

class SnapAuth {
  constructor({ clientId, clientSecret, redirectUri }) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.redirectUri = redirectUri;
  }

  getAuthUrl() {
    return `${SNAP_AUTH_URL}?client_id=${
      this.clientId
    }&redirect_uri=${encodeURIComponent(
      this.redirectUri
    )}&response_type=code&scope=snapchat-marketing-api`;
  }

  async getAccessToken(authCode) {
    try {
      const params = new URLSearchParams();
      params.append("client_id", this.clientId);
      params.append("client_secret", this.clientSecret);
      params.append("redirect_uri", this.redirectUri);
      params.append("code", authCode);
      params.append("grant_type", "authorization_code");

      const response = await axios.post(
        "https://accounts.snapchat.com/login/oauth2/access_token",
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      return response.data;
    } catch (error) {
      // console.error(
      //   "Error getting access token:",
      //   error.response?.data || error.message
      // );
      throw new Error("Error getting access token");
    }
  }

  async refreshToken(refreshToken) {
    try {
      const params = new URLSearchParams();
      params.append("client_id", this.clientId);
      params.append("client_secret", this.clientSecret);
      params.append("refresh_token", refreshToken);
      params.append("grant_type", "refresh_token");
  
      const response = await axios.post("https://accounts.snapchat.com/login/oauth2/access_token", params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
  
      return response.data;
    } catch (error) {
      // console.error("Error refreshing access token:", error.response?.data || error.message);
      throw new Error("Error refreshing access token");
    }
  }

  async getAuthenticatedUser(accessToken) {
    try {
      const response = await axios.get("https://adsapi.snapchat.com/v1/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Error getting authenticated user");
    }
  }

  async checkTokenValidity(accessToken) {
    try {
      const response = await axios.get("https://adsapi.snapchat.com/v1/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.status === 200;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        return false; // Token is invalid
      }
      throw new Error("Error checking token validity");
    }
  }
}

module.exports = SnapAuth;
