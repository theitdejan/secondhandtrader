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
 * Wrap all methods into one object instead of exporting individually.
 */
const CharacterWrapper = {
  getCharacterEU,
  getCharacterUS,
}

module.exports = CharacterWrapper;