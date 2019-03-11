const fetch = require("node-fetch");
const _ = require("lodash");
const AuthTokenWrapper = require("../Battle-Net/AuthTokenWrapper");
const Realm = require("../../Model/WoW/Realm");
const RealmUrls = require("../../Urls/WoW/Realm");

/**
 * Get specific realm.
 * 
 * @param {String} region - Region of the realm.
 * @param {Integer} id - Id of the realm.
 */
async function getById(region, id) {
	const authToken = await AuthTokenWrapper.getAuthToken();
	const initialResponse = await fetch(RealmUrls.SingleById(region, id), {
		headers: {
			Authorization: `Bearer ${authToken}`
		}
	});

	const response = await initialResponse.json();
	if (response.code == 404) {
		throw `Realm in region ${region} with the id '${id}' does not exist.`;
	}

	return new Realm(response, region);
}

/**
 * Get specific realm.
 * 
 * @param {String} region - Region of the realm.
 * @param {String} slug - Slug of the realm.
 */
async function getBySlug(region, slug) {
	const authToken = await AuthTokenWrapper.getAuthToken();
	const initialResponse = await fetch(RealmUrls.SingleById(region, slug), {
		headers: {
			Authorization: `Bearer ${authToken}`
		}
	});

	const response = await initialResponse.json();
	if (response.code == 404) {
		throw `Realm in region ${region} with the slug '${slug}' does not exist.`;
	}

	return new Realm(response, region);
}

/**
 * Get all realms for region specified.
 * 
 * @param {String} region - Region of the realms.
 */
async function all(region) {
	const authToken = await AuthTokenWrapper.getAuthToken();
	const initialResponse = await fetch(RealmUrls.All(region), {
		headers: {
			Authorization: `Bearer ${authToken}`
		}
	});

	const response = await initialResponse.json();
	if (response.code == 404) {
		throw `Could not request realms for region ${region}. Either URL is wrong or there's some other issue.`;
	}

	var returnArray = new Array();
	_.forEach(response.realms, realm => {
		returnArray.push(new Realm(realm, region));
	});

	return returnArray;
}

/**
 * Get all realms for all regions.
 */
async function global() {
	throw "Not implemented.";
}

/**
 * Wrap all methods into one object instead of exporting individually.
 */
const RealmWrapper = {
	getById,
	getBySlug,
	all,
	global
};

module.exports = RealmWrapper;