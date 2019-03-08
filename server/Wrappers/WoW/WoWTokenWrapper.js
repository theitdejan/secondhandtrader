const AuthTokenWrapper = require("../Battle-Net/AuthTokenWrapper");
const fetch = require("node-fetch");

// Model
const WoWToken = require("../../Model/WoW/WoWToken");

// URL Mappings
const WowTokenUrls = require("../../Urls/WoW/WoWToken");

/**
 * Get the price of the WoW Token in regards to EU region.
 */
async function getPriceEU() {
  const authToken = await AuthTokenWrapper.getAuthToken();
  return new Promise((resolve, reject) => {
    fetch(WowTokenUrls.Price.EU, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }).then(auth => auth.json())
      .then(wt => {
        return resolve(new WoWToken("EU", wt.price, wt.last_updated_timestamp));
      })
      .catch(error => {
        return reject(JSON.stringify(error));
      });
  });
}

/**
 * Get the price of the WoW Token in regards to US region.
 */
async function getPriceUS() {
  const authToken = await AuthTokenWrapper.getAuthToken();
  return new Promise((resolve, reject) => {
    fetch(WowTokenUrls.Price.US, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }).then(auth => auth.json())
      .then(wt => {
        return resolve(new WoWToken("US", wt.price, wt.last_updated_timestamp));
      })
      .catch(error => {
        return reject(JSON.stringify(error));
      });
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