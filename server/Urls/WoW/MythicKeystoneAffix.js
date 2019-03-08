/**
* Retrieve URL for the specified Affix ID and Region.
*/
exports.ById = (id, region) => {
	switch (region) {
		case "EU":
			return `https://eu.api.blizzard.com/data/wow/keystone-affix/${id}?namespace=static-eu&locale=en_GB`;
		case "US":
			return `https://us.api.blizzard.com/data/wow/keystone-affix/${id}?namespace=static-us&locale=en_US`;
		default:
			throw `Region ${region} does not exist, or is not yet implemented.`;
	}
};

/**
 * Retrieve Media (Icon) URL for the specified Affix ID and Region.
 */
exports.Image = (id, region) => {
	switch (region) {
		case "EU":
			return `https://eu.api.blizzard.com/data/wow/media/keystone-affix/${id}?namespace=static-eu&locale=en_GB`;
		case "US":
			return `https://us.api.blizzard.com/data/wow/media/keystone-affix/${id}?namespace=static-us&locale=en_US`;
		default:
			throw `Region ${region} does not exist, or is not yet implemented.`;
	}
};

/**
 * Mythic keystone API urls.
 */
exports.AllAffixes = {
	EU: "https://eu.api.blizzard.com/data/wow/keystone-affix/index?namespace=static-eu&locale=en_GB",
	US: "https://us.api.blizzard.com/data/wow/keystone-affix/index?namespace=static-us&locale=en_US",
};

/**
 * Mythic Keystone Affix request mapping urls.
 */
exports.Request = {
	All: {
		EU: "/api/eu/mythic/affixes",
		US: "/api/us/mythic/affixes",
	},
	Single: {
		EU: "/api/eu/mythic/affixes/:id",
		US: "/api/us/mythic/affixes/:id",
	}
};