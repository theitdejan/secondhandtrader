/**
 * WoWToken class.
 */
class WoWToken {
	/**
  * 
  * @param {String} region - Region of the Token.
  * @param {Integer} price - Price of the Token.
  * @param {Date} lastUpdated - Last time Token was updated in the Blizzard API.
  */
	constructor(region, price, lastUpdated, goldIcon) {
		this.region = region;
		this.price = price;
		this.lastUpdated = lastUpdated;
		this.goldIcon = goldIcon;
	}
}

module.exports = WoWToken;