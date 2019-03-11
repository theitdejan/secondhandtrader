/**
 * Realm class.
 */
class Realm {
	/**
   * Create new realm.
   * 
   * @param {Object} param - Object containing individual properties, to be destructured.
   */
	constructor({ id, name, slug, timezone, category, type, is_tournament: isTournament, ...rest }, region) {
		this.id = id;
		this.name = name;
		this.slug = slug;
		this.timezone = timezone;
		this.category = category;
		this.type = type;
		this.isTournament = isTournament;
		this.rest = rest;
		this.region = region;
	}
}

module.exports = Realm;