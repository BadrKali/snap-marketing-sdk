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

    AdAccounts(refreshToken) {
        return new AdAccounts(this, refreshToken);
    }

    AdManager(refreshToken) {
        return new AdsManager(this, refreshToken);
    }
}


module.exports = SnapMarketingSDK;