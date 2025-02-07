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

    async getSpecificAdSquad(adSquadId) {
        return this.apiClient.get(`/v1/adsquads/${adSquadId}`);
    }

    async getAdSquadUnderCampaign(campaignId) {
        return this.apiClient.get(`/v1/campaigns/${campaignId}/adsquads`);
    }

    async deleteAdSquad(adSquadId) {
        return this.apiClient.delete(`/v1/adsquads/${adSquadId}`);
    }

    async getAllAds(adAccountId, limit = 5, cursor=null) {
        let url = `/v1/adaccounts/${adAccountId}/ads?limit=${limit}`;
        if(cursor){
            url = url + `&cursor=${cursor}`;
        }
        return this.apiClient.get(url);
    }

    async getSpecificAd(adId) {
        return this.apiClient.get(`/v1/ads/${adId}`);
    }

    async getAdUnderAdSquad(adSquadId) {
        return this.apiClient.get(`/v1/adsquads/${adSquadId}/ads`);
    }

    async getAdUnderCampaign(campaignId) {
        return this.apiClient.get(`/v1/campaigns/${campaignId}/ads`);
    }

    async deleteAd(adId) {
        return this.apiClient.delete(`/v1/ads/${adId}`);
    }

    async getAllCampaignsReports(adAccountId, options = {}) {
        const {
            fields = ["spend"],
            limit = 5,
            cursor = null,
            granularity = "TOTAL",
            breakdown = "campaign", 
            ...otherParams
        } = options;
    
        const fieldsParam = fields.join(",");
        const params = new URLSearchParams({
            limit,
            breakdown,
            fields: fieldsParam,
        });
        if (cursor) params.append("cursor", cursor);
        if (granularity) params.append("granularity", granularity);
        Object.entries(otherParams).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                params.append(key, value);
            }
        });
        const url = `/v1/adaccounts/${adAccountId}/stats?${params.toString()}`;
        return this.apiClient.get(url);
    }
    

    async getCampaignReports(campaignId, fields = ["spend"]) {
        const fieldsParam = fields.join(","); 
        return this.apiClient.get(`/v1/campaigns/${campaignId}/stats?fields=${fieldsParam}`);
    }

    async getAdSquadReports(adSquadId, fields = ["spend"]) {
        const fieldsParam = fields.join(","); 
        return this.apiClient.get(`/v1/adsquads/${adSquadId}/stats?fields=${fieldsParam}`);
    }

    async getAllAdSquadsReports(adAccountId, fields = ["spend"], limit = 5, cursor = null) {
        const adSquads = await this.getAllAdSquads(adAccountId, limit, cursor);
        const paging = adSquads.paging;
        const adSquadIds = adSquads.adsquads.map(adSquad => adSquad.adsquad.id);
        const adSquadReports = await Promise.all(adSquadIds.map(adSquadId => this.getAdSquadReports(adSquadId, fields)));
        return {
            reports: adSquadReports,
            paging: paging
        };
    }
}


module.exports = AdsManager;

