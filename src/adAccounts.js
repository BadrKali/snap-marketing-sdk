const apiClient = require("./apiClient");
require("dotenv").config();



class AdAccounts {
    constructor(sdkConfig, refreshToken) {
        this.apiClient = new apiClient({
            clientId: sdkConfig.clientId,
            clientSecret: sdkConfig.clientSecret,
            redirectUri: sdkConfig.redirectUri,
            refreshToken: refreshToken
        });
    }

    async getAllAdAccounts(organization_id) {
        return this.apiClient.get(`/v1/organizations/${organization_id}/adaccounts`);
    }

    async createAdAccount(organization_id, data) {
        const payload = {
            adaccounts: [data]
        };
        
        return this.apiClient.post(`/v1/organizations/${organization_id}/adaccounts`, payload);
    }

    async getAdAccountById(adAccountId) {
        return this.apiClient.get(`/v1/adaccounts/${adAccountId}`);
    }


}


module.exports = AdAccounts;