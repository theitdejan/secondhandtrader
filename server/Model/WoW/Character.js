/**
 * Character class.
 */
class Character {
	/**
   * Create new character.
   * 
   * @param {Object} param - Object containing individual properties, to be destructured.
   */
	constructor({ name, level, gender, race, class: klass, realm, thumbnail, ...rest }) {
		this.name = name;
		this.level = level;
		this.gender = gender;
		this.race = race;
		this.class = klass;
		this.realm = realm;
		this.thumbnail = thumbnail;
		this.params = rest;
	}

	getParams() {
		return this.params;
	}
}

module.exports = Character;