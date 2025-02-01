const SnapAuth = require('./auth');
const Organizations = require('./organizations');


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
}


module.exports = SnapMarketingSDK;