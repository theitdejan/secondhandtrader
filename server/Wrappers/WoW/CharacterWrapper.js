/**
 * The request implementations.
 */
const fetch = require("node-fetch");
const _ = require("lodash");
const AuthTokenWrapper = require("../Battle-Net/AuthTokenWrapper");
const Character = require("../../Model/WoW/Character");
const CharacterUrls = require("../../Urls/WoW/Character");

async function getCharacterEU(realm, name, ...fields) {
  const authToken = await AuthTokenWrapper.getAuthToken();
  const initialResponse = await fetch(CharacterUrls.Single("EU", realm, name, ...fields), {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  });

  const response = await initialResponse.json();
  return new Character(response);
}

async function getCharacterUS(realm, name, ...fields) {
  const authToken = await AuthTokenWrapper.getAuthToken();
  const initialResponse = await fetch(CharacterUrls.Single("US", realm, name, ...fields), {
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  });

  const response = await initialResponse.json();
  return new Character(response);
}

/**
 * Get character depending on passed in parameters.
 * 
 * @param {String} region - Battle.net region
 * @param {String} realm - Character realm
 * @param {String} name - Character name
 * @param  {...any} fields - Rest of the fields, if any.
 */
async function getCharacter(region, realm, name, ...fields) {
  switch (region) {
    case 'EU':
      return getCharacterEU(realm, name, ...fields);
    case 'US':
      return getCharacterUS(realm, name, ...fields);
    default:
      throw `Region ${region} does not exist, or is not yet implemented.`;
  }
}

/**
 * Wrap all methods into one object instead of exporting individually.
 */
const CharacterWrapper = {
  getCharacter
}

module.exports = CharacterWrapper;