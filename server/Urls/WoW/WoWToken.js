/**
 * WoW Token API urls.
 */
exports.Price = {
	EU: "https://eu.api.blizzard.com/data/wow/token/index?namespace=dynamic-eu&locale=en_GB",
	US: "https://us.api.blizzard.com/data/wow/token/index?namespace=dynamic-us&locale=en_US",
};

/**
 * WoW Token request mapping urls.
 */
exports.Request = {
	Price: {
		EU: "/api/eu/token/price",
		US: "/api/us/token/price"
	}
};