/**
 * The request implementations.
 */
const fetch = require("node-fetch");
const _ = require("lodash");
const AuthTokenWrapper = require("../Battle-Net/AuthTokenWrapper");

// Model
const Character = require("../../Model/WoW/Character");

// URL Mappings
const CharacterUrls = require("../../Urls/WoW/Character");

/**
 * Get character depending on passed in parameters.
 * 
 * @param {String} region - Battle.net region
 * @param {String} realm - Character realm
 * @param {String} name - Character name
 * @param  {...any} fields - Rest of the fields, if any.
 */
async function getCharacter(region, realm, name, ...fields) {
  switch (region.toLowerCase()) {
    case 'eu':
      return getCharacterEU(realm, name, ...fields);
    case 'us':
      return getCharacterUS(realm, name, ...fields);
    default:
      throw `Region ${region} does not exist, or is not yet implemented.`;
  }
}

async function getCharacterEU(realm, name, ...fields) {
  return new Character("Dejan", 120, "Male", "Undead", "Death Knight", 1, 2, 34);
}

async function getCharacterUS(realm, name, ...fields) {
  return new Character("Dejan", 120, "Male", "Undead", "Death Knight", 1, 2, 34);
}

/**
 * Wrap all methods into one object instead of exporting individually.
 */
const CharacterWrapper = {
  getCharacter
}

module.exports = CharacterWrapper;