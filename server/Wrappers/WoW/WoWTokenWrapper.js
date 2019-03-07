/**
 * The request implementations.
 */
const AuthTokenUrls = require("../../Urls/Battle-Net/AuthToken");
const config = require("../../../config/config");
const fetch = require("node-fetch");

// Model
const WoWToken = require("../../Model/WoW/WoWToken");

// URL Mappings
const WowTokenUrls = require("../../Urls/WoW/WoWToken");

/**
 * Get the price of the WoW Token in regards to EU region.
 */
getPriceEU = () => {
  return new Promise((resolve, reject) => {
    const base64token = Buffer.from(config.bnet.clientId + ":" + config.bnet.clientSecret).toString("Base64");
    fetch(AuthTokenUrls.Oauth.EU, {
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${base64token}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST"
    }).then(response => response.json())
      .then(token => {
        fetch(WowTokenUrls.Price.EU, {
          headers: {
            Authorization: `Bearer ${token.access_token}`
          }
        }).then(auth => auth.json())
          .then(wt => {
            return resolve(new WoWToken("EU", wt.price, wt.last_updated_timestamp));
          })
          .catch(error => {
            return reject(JSON.stringify(error));
          })
      })
      .catch(error => {
        return reject(JSON.stringify(error));
      })
  });
}

/**
 * Get the price of the WoW Token in regards to US region.
 */
getPriceUS = () => {
  return new Promise((resolve, reject) => {
    const base64token = Buffer.from(config.bnet.clientId + ":" + config.bnet.clientSecret).toString("Base64");
    fetch(AuthTokenUrls.Oauth.EU, {
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${base64token}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST"
    }).then(response => response.json())
      .then(token => {
        fetch(WowTokenUrls.Price.US, {
          headers: {
            Authorization: `Bearer ${token.access_token}`
          }
        }).then(auth => auth.json())
          .then(wt => {
            return resolve(new WoWToken("US", wt.price, wt.last_updated_timestamp));
          })
          .catch(error => {
            return reject(JSON.stringify(error));
          })
      })
      .catch(error => {
        return reject(JSON.stringify(error));
      })
  });
}

/**
 * Wrap all methods into one object instead of exporting individually.
 */
const WoWTokenWrapper = {
  getPriceEU,
  getPriceUS,
}

module.exports = WoWTokenWrapper;