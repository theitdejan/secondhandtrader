/**
 * The request implementations.
 */
const AuthTokenUrls = require("../../Urls/Battle-Net/AuthToken");
const config = require("../../../config/config");
const fetch = require("node-fetch");
const _ = require("lodash");
const minute = 60000; // In milis

/**
 * Keep information of the last time token was requested along with the token itself, so we don't request it too often.
 */
var authTokenCache = {
  token: undefined,
  lastTimeRequested: undefined
}

/**
 * Retrieve Battle-Net authentication token.
 * 
 * @param {Boolean} recreate - Request new token regardless of the last time it was requested.
 */
async function getAuthToken(recreate = false) {
  if (_.isUndefined(authTokenCache.token) || _.isUndefined(authTokenCache.lastTimeRequested)) {
    console.log(`Requesting new Battle-Net token.`);
    const token = await retrieveTokenFromBnet();
    authTokenCache = {
      token,
      lastTimeRequested: new Date()
    }
  } else {
    if (authTokenCache.lastTimeRequested < (Date.now() - (minute * 5))) {
      console.log(`Requesting new Battle-Net token.`);
      const token = await retrieveTokenFromBnet();
      authTokenCache = {
        token,
        lastTimeRequested: new Date()
      }
    }
  }

  return authTokenCache.token;
}

/**
 * Inner method to send the request to Battle-Net API.
 */
retrieveTokenFromBnet = async () => {
  const base64token = Buffer.from(config.bnet.clientId + ":" + config.bnet.clientSecret).toString("Base64");
  const authentication = await fetch(AuthTokenUrls.Oauth.EU, {
    body: "grant_type=client_credentials",
    headers: {
      Authorization: `Basic ${base64token}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "POST"
  });

  authToken = await authentication.json();
  return authToken.access_token;
}

/**
 * Wrap all methods into one object instead of exporting individually.
 */
const AuthTokenWrapper = {
  getAuthToken
}

module.exports = AuthTokenWrapper;