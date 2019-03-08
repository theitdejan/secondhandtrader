/**
 * Class class.
 */
class Class {
	/**
	 * Construct new Class object.
	 * @param {Object} param0 - Object to destructure properties from.
	 */
	constructor({ id, name, image }) {
		this.id = id;
		this.name = name;
		this.image = image;
	}
}

module.exports = Class;