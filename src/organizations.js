require("dotenv").config();
const apiClient = require("./apiClient");



class Organizations {
    constructor(sdkConfig, refreshToken) {
        this.apiClient = new apiClient({
            clientId: sdkConfig.clientId,
            clientSecret: sdkConfig.clientSecret,
            redirectUri: sdkConfig.redirectUri,
            refreshToken: refreshToken
        });
    }

    async getAllOrganizations() {
        return this.apiClient.get('/v1/me/organizations');
    }



}


module.exports = Organizations;