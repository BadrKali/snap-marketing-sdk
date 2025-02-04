const apiClient = require('./apiClient')
require("dotenv").config();




class AdsManager {
    constructor(sdkConfig, refreshToken) {
        this.apiClient = new apiClient({
            clientId: sdkConfig.clientId,
            clientSecret: sdkConfig.clientSecret,
            redirectUri: sdkConfig.redirectUri,
            refreshToken: refreshToken
        });
    }

    async getAllCampaigns(adAccountId) {
        return this.apiClient.get(`/v1/adaccounts/${adAccountId}/campaigns`);
    }

    async getSpecificCampaign(campaignId) {
        return this.apiClient.get(`/v1/campaigns/${campaignId}`);
    }

    async deleteCampaign(campaignId) {
        return this.apiClient.delete(`/v1/campaigns/${campaignId}`);
    }
}


module.exports = AdsManager;