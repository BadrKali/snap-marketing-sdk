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

    async getAllCampaigns(adAccountId, limit = 5, cursor=null) {
        let url = `/v1/adaccounts/${adAccountId}/campaigns?limit=${limit}`;
        if(cursor){
            url = url + `&cursor=${cursor}`;
        }
        return this.apiClient.get(url);
    }

    async getSpecificCampaign(campaignId) {
        return this.apiClient.get(`/v1/campaigns/${campaignId}`);
    }

    async deleteCampaign(campaignId) {
        return this.apiClient.delete(`/v1/campaigns/${campaignId}`);
    }

    async getAllAdSquads(adAccountId, limit = 5, cursor=null) {
        let url = `/v1/adaccounts/${adAccountId}/adsquads?limit=${limit}`;
        if(cursor){
            url = url + `&cursor=${cursor}`;
        }
        return this.apiClient.get(url);
    }
}


module.exports = AdsManager;

