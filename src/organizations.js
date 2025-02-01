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

    async getOrganzationsWithAdAccounts() {
        return this.apiClient.get('/v1/me/organizations?with_ad_accounts=true');
    }

    async getOrganizationById(organizationId) {
        return this.apiClient.get(`/v1/organizations/${organizationId}`);
    }

}


module.exports = Organizations;