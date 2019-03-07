/**
 * The request implementations.
 */
const AuthTokenUrls = require("../../Urls/Battle-Net/AuthToken");
const config = require("../../../config/config");
const fetch = require("node-fetch");
const _ = require("lodash");

// Model
const MythicKeystoneAffix = require("../../Model/WoW/MythicKeystoneAffix");

// URL Mappings
const MythicKeystoneAffixUrls = require("../../Urls/WoW/MythicKeystoneAffix");

/**
 * Retrieve all affixes in EU realms. Usually they are the same as US, but sometimes Blizzard does unexpected things.
 */
getAllAffixesEU = async () => {
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
  const initialResponse = await fetch(MythicKeystoneAffixUrls.AllAffixes.EU, {
    headers: {
      Authorization: `Bearer ${authToken.access_token}`
    }
  });

  const response = await initialResponse.json();
  var { affixes } = response;
  if (affixes.length > 0) {
    const affixArray = affixes.map(async affix => {
      const singleAffixUnparsed = await fetch(MythicKeystoneAffixUrls.ById(affix.id, "EU"), {
        headers: {
          Authorization: `Bearer ${authToken.access_token}`
        }
      })
      const singleAffix = await singleAffixUnparsed.json();

      const mediaUnparsed = await fetch(MythicKeystoneAffixUrls.Image(singleAffix.media.id, "EU"), {
        headers: {
          Authorization: `Bearer ${authToken.access_token}`
        }
      });
      const media = await mediaUnparsed.json();

      var icon = _.find(media.assets, asset => asset.key === "icon");
      affix.image = icon.value;
      affix.description = singleAffix.description;

      return new MythicKeystoneAffix(affix.id, affix.name, affix.description, affix.image);
    });

    const retAffixes = await Promise.all(affixArray).catch(error => {
      console.error(error);
    });

    return retAffixes;
  } else {
    return new Array();
  }
}

/**
 * Retrieve all affixes in US realms. Usually they are the same as EU, but sometimes Blizzard does unexpected things.
 */
getAllAffixesUS = async () => {
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
  const initialResponse = await fetch(MythicKeystoneAffixUrls.AllAffixes.US, {
    headers: {
      Authorization: `Bearer ${authToken.access_token}`
    }
  });

  const response = await initialResponse.json();
  var { affixes } = response;
  if (affixes.length > 0) {
    const affixArray = affixes.map(async affix => {
      const singleAffixUnparsed = await fetch(MythicKeystoneAffixUrls.ById(affix.id, "US"), {
        headers: {
          Authorization: `Bearer ${authToken.access_token}`
        }
      })
      const singleAffix = await singleAffixUnparsed.json();

      const mediaUnparsed = await fetch(MythicKeystoneAffixUrls.Image(singleAffix.media.id, "US"), {
        headers: {
          Authorization: `Bearer ${authToken.access_token}`
        }
      });
      const media = await mediaUnparsed.json();

      var icon = _.find(media.assets, asset => asset.key === "icon");
      affix.image = icon.value;
      affix.description = singleAffix.description;

      return new MythicKeystoneAffix(affix.id, affix.name, affix.description, affix.image);
    });

    const retAffixes = await Promise.all(affixArray).catch(error => {
      console.error(error);
    });

    return retAffixes;
  } else {
    return new Array();
  }
}

/**
 * Retrieve single affix with the ID specified from the EU realms.
 */
getSingleAffixEU = async (id) => {
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
  const initialResponse = await fetch(MythicKeystoneAffixUrls.ById(id, "EU"), {
    headers: {
      Authorization: `Bearer ${authToken.access_token}`
    }
  });

  const response = await initialResponse.json();
  const mediaUnparsed = await fetch(MythicKeystoneAffixUrls.Image(response.media.id, "EU"), {
    headers: {
      Authorization: `Bearer ${authToken.access_token}`
    }
  });

  const media = await mediaUnparsed.json();
  var icon = _.find(media.assets, asset => asset.key === "icon");

  return new MythicKeystoneAffix(id, response.name, response.description, icon.value);
}

/**
 * Retrieve single affix with the ID specified from the US realms.
 */
getSingleAffixUS = async (id) => {
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
  const initialResponse = await fetch(MythicKeystoneAffixUrls.ById(id, "US"), {
    headers: {
      Authorization: `Bearer ${authToken.access_token}`
    }
  });

  const response = await initialResponse.json();
  const mediaUnparsed = await fetch(MythicKeystoneAffixUrls.Image(response.media.id, "US"), {
    headers: {
      Authorization: `Bearer ${authToken.access_token}`
    }
  });

  const media = await mediaUnparsed.json();
  var icon = _.find(media.assets, asset => asset.key === "icon");

  return new MythicKeystoneAffix(id, response.name, response.description, icon.value);
}

/**
 * Wrap all methods into one object instead of exporting individually.
 */
const MythicKeystoneAffixWrapper = {
  getAllAffixesEU,
  getAllAffixesUS,
  getSingleAffixEU,
  getSingleAffixUS
}

module.exports = MythicKeystoneAffixWrapper;