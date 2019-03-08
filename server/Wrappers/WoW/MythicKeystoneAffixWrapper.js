const AuthTokenWrapper = require("../Battle-Net/AuthTokenWrapper");
const fetch = require("node-fetch");
const _ = require("lodash");

// Model
const MythicKeystoneAffix = require("../../Model/WoW/MythicKeystoneAffix");

// URL Mappings
const MythicKeystoneAffixUrls = require("../../Urls/WoW/MythicKeystoneAffix");

/**
 * Retrieve all affixes in EU realms. Usually they are the same as US, but sometimes Blizzard does unexpected things.
 */
async function getAllAffixesEU() {
	const authToken = await AuthTokenWrapper.getAuthToken();
	const initialResponse = await fetch(MythicKeystoneAffixUrls.AllAffixes.EU, {
		headers: {
			Authorization: `Bearer ${authToken}`
		}
	});

	const response = await initialResponse.json();
	if (response.code == 404) {
		throw "Could not request affixes. Either URL is wrong, or there are no affixes.";
	}

	var { affixes } = response;
	if (affixes.length > 0) {
		const affixArray = affixes.map(async affix => {
			const singleAffixUnparsed = await fetch(MythicKeystoneAffixUrls.ById(affix.id, "EU"), {
				headers: {
					Authorization: `Bearer ${authToken}`
				}
			});
			const singleAffix = await singleAffixUnparsed.json();

			const mediaUnparsed = await fetch(MythicKeystoneAffixUrls.Image(singleAffix.media.id, "EU"), {
				headers: {
					Authorization: `Bearer ${authToken}`
				}
			});
			const media = await mediaUnparsed.json();

			var icon = _.find(media.assets, asset => asset.key === "icon");
			affix.image = icon.value;
			affix.description = singleAffix.description;

			return new MythicKeystoneAffix(affix.id, affix.name, affix.description, affix.image);
		});

		const retAffixes = await Promise.all(affixArray).catch(error => error);

		return retAffixes;
	} else {
		return new Array();
	}
}

/**
 * Retrieve all affixes in US realms. Usually they are the same as EU, but sometimes Blizzard does unexpected things.
 */
async function getAllAffixesUS() {
	const authToken = AuthTokenWrapper.getAuthToken();
	const initialResponse = await fetch(MythicKeystoneAffixUrls.AllAffixes.US, {
		headers: {
			Authorization: `Bearer ${authToken}`
		}
	});

	const response = await initialResponse.json();
	if (response.code == 404) {
		throw "Could not request affixes. Either URL is wrong, or there are no affixes.";
	}

	var { affixes } = response;
	if (affixes.length > 0) {
		const affixArray = affixes.map(async affix => {
			const singleAffixUnparsed = await fetch(MythicKeystoneAffixUrls.ById(affix.id, "US"), {
				headers: {
					Authorization: `Bearer ${authToken}`
				}
			});
			const singleAffix = await singleAffixUnparsed.json();

			const mediaUnparsed = await fetch(MythicKeystoneAffixUrls.Image(singleAffix.media.id, "US"), {
				headers: {
					Authorization: `Bearer ${authToken}`
				}
			});
			const media = await mediaUnparsed.json();

			var icon = _.find(media.assets, asset => asset.key === "icon");
			affix.image = icon.value;
			affix.description = singleAffix.description;

			return new MythicKeystoneAffix(affix.id, affix.name, affix.description, affix.image);
		});

		const retAffixes = await Promise.all(affixArray).catch(error => error);

		return retAffixes;
	} else {
		return new Array();
	}
}

/**
 * Retrieve single affix with the ID specified from the EU realms.
 * 
 * @param {Id} id - Id of the affix.
 */
async function getSingleAffixEU(id) {
	const authToken = await AuthTokenWrapper.getAuthToken();
	const initialResponse = await fetch(MythicKeystoneAffixUrls.ById(id, "EU"), {
		headers: {
			Authorization: `Bearer ${authToken}`
		}
	});

	const response = await initialResponse.json();
	if (response.code == 404) {
		throw `Could not find affix with id ${id}.`;
	}

	const mediaUnparsed = await fetch(MythicKeystoneAffixUrls.Image(response.media.id, "EU"), {
		headers: {
			Authorization: `Bearer ${authToken}`
		}
	});

	const media = await mediaUnparsed.json();
	var icon = _.find(media.assets, asset => asset.key === "icon");

	return new MythicKeystoneAffix(id, response.name, response.description, icon.value);
}

/**
 * Retrieve single affix with the ID specified from the US realms.
 * 
 * @param {Id} id - Id of the affix.
 */
async function getSingleAffixUS(id) {
	const authToken = await AuthTokenWrapper.getAuthToken();
	const initialResponse = await fetch(MythicKeystoneAffixUrls.ById(id, "US"), {
		headers: {
			Authorization: `Bearer ${authToken}`
		}
	});

	const response = await initialResponse.json();
	if (response.code == 404) {
		throw `Could not find affix with id ${id}.`;
	}

	const mediaUnparsed = await fetch(MythicKeystoneAffixUrls.Image(response.media.id, "US"), {
		headers: {
			Authorization: `Bearer ${authToken}`
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
};

module.exports = MythicKeystoneAffixWrapper;