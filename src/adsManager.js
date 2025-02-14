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

    _buildQueryParams(options) {
        const params = new URLSearchParams();

        Object.entries(options).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                if (Array.isArray(value)) {
                    params.append(key, value.join(",")); 
                } else {
                    params.append(key, value);
                }
            }
        });

        return params.toString();
    }

    async getAllCampaigns(adAccountId, limit = 5, cursor=null) {
        let url = `/v1/adaccounts/${adAccountId}/campaigns`;
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

    async getCampaignReports(campaignId, options = {}) {
        const queryParams = this._buildQueryParams({
            fields: options.fields ? options.fields.join(",") : "spend",
            ...options
        });
    
        return this.apiClient.get(`/v1/campaigns/${campaignId}/stats?${queryParams}`);
    }
    
    async getAllCampaignsReports(adAccountId, options = {}) {
        const { limit = 5, cursor = null, ...otherParams } = options;
        const campaigns = await this.getAllCampaigns(adAccountId, limit, cursor);
        const paging = campaigns.paging;
        const campaignIds = campaigns.campaigns.map(campaign => campaign.campaign.id);
        let campaignReports = await Promise.all(
            campaignIds.map(campaignId => this.getCampaignReports(campaignId, otherParams))
        );
        campaignReports.forEach((campaignReport, index) => {
            campaignReport.total_stats[0].total_stat.name = campaigns.campaigns[index].campaign.name;
            campaignReport.total_stats[0].total_stat.status = campaigns.campaigns[index].campaign.status;
            campaignReport.total_stats[0].total_stat.objective = campaigns.campaigns[index].campaign.objective;
        });
        return {
            reports: campaignReports,
            paging: paging
        };
    }

    async getAdSquadReports(adSquadId, options = {}) {
        const queryParams = this._buildQueryParams({
            fields: options.fields ? options.fields.join(",") : "spend",
            ...options
        });
    
        return this.apiClient.get(`/v1/adsquads/${adSquadId}/stats?${queryParams}`);
    }
    
    async getAllAdSquadsReports(adAccountId, options = {}) {
        const { limit = 5, cursor = null, ...otherParams } = options;
        
        const adSquads = await this.getAllAdSquads(adAccountId, limit, cursor);
        const paging = adSquads.paging;
        const adSquadIds = adSquads.adsquads.map(adSquad => adSquad.adsquad.id);
        
        let adSquadReports = await Promise.all(
            adSquadIds.map(adSquadId => this.getAdSquadReports(adSquadId, otherParams))
        );
        adSquadReports.forEach((adSquadReport, index) => {
            adSquadReport.total_stats[0].total_stat.objective = adSquads.adsquads[index].adsquad.objective;
            adSquadReport.total_stats[0].total_stat.status = adSquads.adsquads[index].adsquad.status;
            adSquadReport.total_stats[0].total_stat.name = adSquads.adsquads[index].adsquad.name;
        });
        return {
            reports: adSquadReports,
            paging: paging
        };
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
    
    async getAllAds(adAccountId, limit = 5, cursor=null) {
        let url = `/v1/adaccounts/${adAccountId}/ads?limit=${limit}`;
        if(cursor){
            url = url + `&cursor=${cursor}`;
        }
        return this.apiClient.get(url);
    }

    async getAdsReports(adId, options = {}) {
        const queryParams = this._buildQueryParams({
            fields: options.fields ? options.fields.join(",") : "spend",
            ...options
        });
    
        return this.apiClient.get(`/v1/ads/${adId}/stats?${queryParams}`);
    }

    async getAllAdsReports(adAccountId, options = {}) {
        const { limit = 5, cursor = null, ...otherParams } = options;
        const ads = await this.getAllAds(adAccountId, limit, cursor);
        const paging = ads.paging;
        const adIds = ads.ads.map(ad => ad.ad.id);
        let adReports = await Promise.all(
            adIds.map(adId => this.getAdsReports(adId, otherParams))
        );
        adReports.forEach((adReport, index) => {
            adReport.total_stats[0].total_stat.name = ads.ads[index].ad.name;
            adReport.total_stats[0].total_stat.status = ads.ads[index].ad.status;
            adReport.total_stats[0].total_stat.objective = ads.ads[index].ad.objective;
        });
        return {
            reports: adReports,
            paging: paging
        };
    }
    
    async deleteAd(adId) {
        return this.apiClient.delete(`/v1/ads/${adId}`);
    }

    async getSpecificCreative(creativeId) {
        return this.apiClient.get(`/v1/creatives/${creativeId}`);
    }

    async getAllCreatives(adAccountId, limit = 5, cursor=null) {
        let url = `/v1/adaccounts/${adAccountId}/creatives?limit=${limit}`;
        if(cursor){
            url = url + `&cursor=${cursor}`;
        }
        return this.apiClient.get(url);
    }
}


module.exports = AdsManager;

