/**
 * Character class.
 */
class Character {
  /**
   * 
   * @param {String} name - Character name
   * @param {Integer} level - Character level
   * @param {String} gender - Character gender
   * @param {String} race - Character race
   * @param {String} klass - Character class
   * @param {Array} params - Array of the (currently unimportant) parameters
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