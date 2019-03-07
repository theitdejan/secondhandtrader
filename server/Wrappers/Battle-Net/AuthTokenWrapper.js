/**
 * The request implementations.
 */
const AuthTokenUrls = require("../../Urls/Battle-Net/AuthToken");
const config = require("../../../config/config");
const fetch = require("node-fetch");
const _ = require("lodash");

/**
 * Retrieve Battle-Net authentication token.
 */
getAuthToken = async () => {
  const base64token = Buffer.from(config.bnet.clientId + ":" + config.bnet.clientSecret).toString("Base64");
  const authentication = await fetch(AuthTokenUrls.Oauth.EU, {
    body: "grant_type=client_credentials",
    headers: {
      Authorization: `Basic ${base64token}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "POST"
  });

  const authToken = await authentication.json();
  return authToken.access_token;
}

/**
 * Wrap all methods into one object instead of exporting individually.
 */
const AuthTokenWrapper = {
  getAuthToken
}

module.exports = AuthTokenWrapper;