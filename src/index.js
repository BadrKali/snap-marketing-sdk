const SnapAuth = require('./auth');
const Organizations = require('./organizations');
const AdAccounts = require('./adAccounts');

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
}


module.exports = SnapMarketingSDK;