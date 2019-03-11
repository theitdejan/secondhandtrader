const fetch = require("node-fetch");
const AuthTokenWrapper = require("../Battle-Net/AuthTokenWrapper");
const Character = require("../../Model/WoW/Character");
const CharacterUrls = require("../../Urls/WoW/Character");

/**
 * Get US character for specified realm and name.
 * 
 * @param {String} realm - Character realm
 * @param {String} name - Character name
 */
async function getCharacterEU(realm, name) {
	const authToken = await AuthTokenWrapper.getAuthToken();
	const initialResponse = await fetch(CharacterUrls.Single("EU", realm, name), {
		headers: {
			Authorization: `Bearer ${authToken}`
		}
	});

	const response = await initialResponse.json();
	return new Character(response);
}

/**
 * Get EU character for specified realm and name.
 * 
 * @param {String} realm - Character realm
 * @param {String} name - Character name
 */
async function getCharacterUS(realm, name) {
	const authToken = await AuthTokenWrapper.getAuthToken();
	const initialResponse = await fetch(CharacterUrls.Single("US", realm, name), {
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
 * @param {String} region - Battle.Net region
 * @param {String} realm - Character realm
 * @param {String} name - Character name
 */
async function getCharacter(region, realm, name) {
	switch (region) {
		case "EU":
			return getCharacterEU(realm, name);
		case "US":
			return getCharacterUS(realm, name);
		default:
			throw `Region ${region} does not exist, or is not yet implemented.`;
	}
}

/**
 * Wrap all methods into one object instead of exporting individually.
 */
const CharacterWrapper = {
	getCharacter
};

module.exports = CharacterWrapper;