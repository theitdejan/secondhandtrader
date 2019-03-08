/**
 * Retrieve an API url for the Character with the specified params.
 */
exports.Single = (region, realm, name, ...fields) => {
  // TODO: Will have to parse the "fields" parameter and add them to the url request
  switch (region) {
    case 'EU':
      return `https://eu.api.blizzard.com/wow/character/${realm}/${name}?locale=en_GB`;
    case 'US':
      return `https://us.api.blizzard.com/wow/character/${realm}/${name}?locale=en_US`;
    default:
      throw `Region ${region} does not exist, or is not yet implemented.`;
  }
}

/**
 * Character request mapping urls.
 */
exports.Request = {
  Single: {
    EU: "/api/eu/character",
    US: "/api/us/character",
  }
}