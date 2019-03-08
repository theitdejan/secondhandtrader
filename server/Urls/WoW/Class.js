/**
 * Retrieve an API url for the Class with the specified params.
 */
exports.Single = (region, id) => {
	switch (region) {
		case "EU":
			return `https://eu.api.blizzard.com/data/wow/playable-class/${id}?namespace=static-eu&locale=en_GB`;
		case "US":
			return `https://us.api.blizzard.com/data/wow/playable-class/${id}?namespace=static-us&locale=en_US`;
		default:
			throw `Region ${region} does not exist, or is not yet implemented.`;
	}
};

/**
 * Retrieve an API url for all classes.
 */
exports.All = (region) => {
	switch (region) {
		case "EU":
			return "https://eu.api.blizzard.com/data/wow/playable-class/index?namespace=static-eu&locale=en_GB";
		case "US":
			return "https://us.api.blizzard.com/data/wow/playable-class/index?namespace=static-us&locale=en_US";
		default:
			throw `Region ${region} does not exist, or is not yet implemented.`;
	}
};

/**
 * Retrieve Media (Icon) URL for the specified Class ID and Region.
 */
exports.Image = (region, id) => {
	switch (region) {
		case "EU":
			return `https://eu.api.blizzard.com/data/wow/media/playable-class/${id}?namespace=static-eu&locale=en_GB`;
		case "US":
			return `https://us.api.blizzard.com/data/wow/media/playable-class/${id}?namespace=static-us&locale=en_US`;
		default:
			throw `Region ${region} does not exist, or is not yet implemented.`;
	}
};

/**
 * Class request mapping urls.
 */
exports.Request = {
	Single: {
		EU: "/api/eu/classes/:id",
		US: "/api/us/classes/:id",
	},
	All: {
		EU: "/api/eu/classes",
		US: "/api/us/classes"
	}
};