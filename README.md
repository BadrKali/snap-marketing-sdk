
# Snapchat Marketing SDK

A simple Node.js SDK to integrate with the Snapchat Marketing API, providing an easy way to interact with different API endpoints like authentication, organizations, and ad accounts.

## Installation

To install the SDK, run the following command:

```sh
npm install snap-marketing-sdk
```

## Usage

After installation, you can easily use the SDK by importing it and initializing the `SnapMarketingSDK` class with your client credentials.

### Example:

```javascript
const SnapMarketingSDK = require('snap-marketing-sdk');


const sdk = new SnapMarketingSDK({
    clientId: 'your-client-id',
    clientSecret: 'your-client-secret',
    redirectUri: 'your-redirect-uri',
});


const auth = sdk.Auth();


const organization = sdk.Organizations('your-refresh-token');
organization.getOrganizationData();


const adAccounts = sdk.AdAccounts('your-refresh-token');
adAccounts.getAdAccountsData();
```

### SnapMarketingSDK Class

The `SnapMarketingSDK` class provides methods for authentication, organizations, and ad accounts.

#### Constructor

The constructor requires three parameters:
- `clientId`: Your Snapchat API Client ID.
- `clientSecret`: Your Snapchat API Client Secret.
- `redirectUri`: Your redirect URI for OAuth.

```javascript
const sdk = new SnapMarketingSDK({
    clientId: 'your-client-id',
    clientSecret: 'your-client-secret',
    redirectUri: 'your-redirect-uri',
});
```

#### Methods

1. **`Auth()`**: 
   - Returns a new instance of the `SnapAuth` class, allowing you to authenticate and manage OAuth tokens.
   - Example:
     ```javascript
     const auth = sdk.Auth();
     ```

2. **`Organizations(refreshToken)`**: 
   - Returns a new instance of the `Organizations` class, allowing you to interact with organization-related endpoints.
   - Example:
     ```javascript
     const organization = sdk.Organizations('your-refresh-token');
     ```

3. **`AdAccounts(refreshToken)`**: 
   - Returns a new instance of the `AdAccounts` class, allowing you to interact with ad account-related endpoints.
   - Example:
     ```javascript
     const adAccounts = sdk.AdAccounts('your-refresh-token');
     ```

## API Client

The SDK uses an internal API client (`apiClient`) to handle requests to Snapchat Marketing API endpoints. The `apiClient` will automatically handle token refresh in case of an expired token.

### Token Refresh Logic

- The SDK will automatically refresh the access token if a 401 Unauthorized error is encountered during API requests.
- You only need to pass the refresh token once during initialization.

---

### Project Structure:

- **`index.js`**: The entry point for the SDK, where the `SnapMarketingSDK` class is defined.
- **`auth.js`**: Contains authentication logic, including OAuth token management.
- **`organizations.js`**: Contains logic related to organizations, such as fetching organization data.
- **`adAccounts.js`**: Contains logic related to ad accounts, such as fetching ad account data.

## Contributing

If you'd like to contribute, feel free to submit a pull request or open an issue for suggestions and improvements.


