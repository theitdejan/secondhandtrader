/**
* Retrieve URL for all realms in the specified Region.
*/
exports.All = (region) => {
	switch (region) {
		case "EU":
			return "https://eu.api.blizzard.com/data/wow/realm/index?namespace=dynamic-eu&locale=en_GB";
		case "US":
			return "https://us.api.blizzard.com/data/wow/realm/index?namespace=dynamic-us&locale=en_US";
		default:
			throw `Region ${region} does not exist, or is not yet implemented.`;
	}
};

/**
 * Retrieve URL for a single realm with the specified Region and Id.
 */
exports.SingleById = (region, id) => {
	switch (region) {
		case "EU":
			return `https://eu.api.blizzard.com/data/wow/realm/${id}?namespace=dynamic-eu&locale=en_GB`;
		case "US":
			return `https://us.api.blizzard.com/data/wow/realm/${id}?namespace=dynamic-us&locale=en_US`;
		default:
			throw `Region ${region} does not exist, or is not yet implemented.`;
	}
};

/**
 * Retrieve URL for a single realm with the specified Region and Slug.
 */
exports.SingleBySlug = (region, slug) => {
	switch (region) {
		case "EU":
			return `https://eu.api.blizzard.com/data/wow/realm/${slug}?namespace=dynamic-eu&locale=en_GB`;
		case "US":
			return `https://us.api.blizzard.com/data/wow/realm/${slug}?namespace=dynamic-us&locale=en_US`;
		default:
			throw `Region ${region} does not exist, or is not yet implemented.`;
	}
};

/**
 * Realm request mapping urls.
 */
exports.Request = {
	Single: {
		EU: "/api/eu/realms/:id",
		US: "/api/us/realms/:id"
	},
	All: {
		EU: "/api/eu/realms",
		US: "/api/us/realms",
		Global: "/api/all/realms"
	}
};