const fetch = require("node-fetch");
const AuthTokenWrapper = require("../Battle-Net/AuthTokenWrapper");
const _ = require("lodash");
const ClassUrls = require("../../Urls/WoW/Class");
const Class = require("../../Model/WoW/Class");

/**
 * Retrieve all classes for the specified region.
 * 
 * @param {String} region - Battle-net Region
 */
async function all(region) {
	const authToken = await AuthTokenWrapper.getAuthToken();
	const initialResponse = await fetch(ClassUrls.All(region), {
		headers: {
			Authorization: `Bearer ${authToken}`
		}
	});
	const response = await initialResponse.json();
	if (response.code == 404) {
		throw `Could not request classes for ${region} region. Either URL is wrong, or there are no classes.`;
	}

	if (!_.isUndefined(response.classes) && response.classes.length > 0) {
		const classArray = response.classes.map(async klass => {
			const initialMediaResponse = await fetch(ClassUrls.Image(region, klass.id), {
				headers: {
					Authorization: `Bearer ${authToken}`
				}
			});
			const mediaResponse = await initialMediaResponse.json();
			var icon = _.find(mediaResponse.assets, asset => asset.key === "icon");
			klass.image = icon.value;
			return new Class(klass);
		});

		const retClasses = await Promise.all(classArray).catch(error => error);
		return retClasses;
	} else {
		return new Array();
	}
}

/**
 * Retrieve class for the specified region/id.
 * 
 * @param {String} region - Battle-net Region
 * @param {Integer} id - Class ID
 */
async function getById(region, id) {
	const authToken = await AuthTokenWrapper.getAuthToken();
	const initialResponse = await fetch(ClassUrls.Single(region, id), {
		headers: {
			Authorization: `Bearer ${authToken}`
		}
	});

	const response = await initialResponse.json();
	if (response.code == 404) {
		throw `Could not find class in ${region} region with ID ${id}.`;
	}

	const initialMediaResponse = await fetch(ClassUrls.Image(region, id), {
		headers: {
			Authorization: `Bearer ${authToken}`
		}
	});
	const mediaResponse = await initialMediaResponse.json();

	var icon = _.find(mediaResponse.assets, asset => asset.key === "icon");
	response.image = icon.value;
	return new Class(response);
}

/**
 * Wrap all methods into one object instead of exporting individually.
 */
const ClassWrapper = {
	all,
	getById
};

module.exports = ClassWrapper;