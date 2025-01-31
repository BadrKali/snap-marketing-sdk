require("dotenv").config();
const nock = require("nock");
const SnapAuth = require("../src/auth");

describe("SnapAuth", () => {
  let snapAuth;

  
  beforeEach(() => {
    snapAuth = new SnapAuth({
      clientId: process.env.SNAP_CLIENT_ID,
      clientSecret: process.env.SNAP_CLIENT_SECRET,
      redirectUri: process.env.SNAP_REDIRECT_URI,
    });
  });


  afterEach(() => {
    nock.cleanAll();
  });

  describe("getAuthUrl", () => {

    it("should generate the correct auth URL", () => {
      const expectedUrl = `${process.env.SNAP_AUTH_URL}?client_id=${
        process.env.SNAP_CLIENT_ID
      }&redirect_uri=${encodeURIComponent(
        process.env.SNAP_REDIRECT_URI
      )}&response_type=code&scope=snapchat-marketing-api`;

      const authUrl = snapAuth.getAuthUrl();
      expect(authUrl).toBe(expectedUrl);
    });
  });

  describe("getAccessToken", () => {
    it("should return an access token on successful request", async () => {
      const mockAccessTokenResponse = {
        access_token: "mock-access-token",
        expires_in: 3600,
        refresh_token: "mock-refresh-token",
      };

      nock("https://accounts.snapchat.com")
        .post("/login/oauth2/access_token")
        .reply(200, mockAccessTokenResponse);

      const authCode = "mock-auth-code";
      const token = await snapAuth.getAccessToken(authCode);

      expect(token).toEqual(mockAccessTokenResponse);
    });
    
    it("should throw an error if the token request fails", async () => {
      nock("https://accounts.snapchat.com")
        .post("/login/oauth2/access_token")
        .reply(400, { error: "invalid_request" });

      const authCode = "mock-auth-code";

      await expect(snapAuth.getAccessToken(authCode)).rejects.toThrow(
        "Error getting access token"
      );
    });
  });

});
