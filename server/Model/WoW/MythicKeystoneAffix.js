/**
 * MythicKeystoneAffix class.
 */
class MythicKeystoneAffix {
	/**
   * 
   * @param {Integer} id - Index of Affix on Bnet API.
   * @param {String} name - Name of the Affix.
   * @param {String} description - Additional information about the affix.
   */
	constructor(id, name, description, imageUrl) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.imageUrl = imageUrl;
	}
}

module.exports = MythicKeystoneAffix;