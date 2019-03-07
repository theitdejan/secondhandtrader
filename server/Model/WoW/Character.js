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
   * @param {Array} rest - Rest of the (currently unimportant) parameters
   */
  constructor(name, level, gender, race, klass, ...rest) {
    this.name = name;
    this.level = level;
    this.gender = gender;
    this.race = race;
    this.klass = klass;
    this.params = rest;
  }

  getParams() {
    return this.params;
  }
}

module.exports = Character;