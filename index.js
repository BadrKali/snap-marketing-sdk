const SnapAuth = require('./src/auth');
const Organizations = require('./src/organizations');
const AdAccounts = require('./src/adAccounts');
const AdsManager = require('./src/adsManager');

class SnapMarketingSDK {
    constructor({ clientId, clientSecret, redirectUri }) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.redirectUri = redirectUri;
    }

    Auth() {
        return new SnapAuth({
            clientId: this.clientId,
            clientSecret: this.clientSecret,
            redirectUri: this.redirectUri,
        });
    }

    Organizations(refreshToken) {
        return new Organizations(this, refreshToken);
    }

    AdAccounts(refreshToken, accessToken = null) {
        return new AdAccounts(this, refreshToken, accessToken);
    }

    AdManager(refreshToken, accessToken = null) {
        return new AdsManager(this, refreshToken, accessToken);
    }
}


module.exports = SnapMarketingSDK;