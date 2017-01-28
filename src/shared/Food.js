/**
 * Food module
 *
 * @module
 * @copyright Bill Robitske, Jr. 2017
 * @author    Bill Robitske, Jr. <bill.robitske.jr@gmail.com>
 * @license   MIT
 */

/**
 * Symbols for "private" properties
 */
const sFood = Symbol('food');

/**
 * Food encapsulation
 * @class
 */
export default class Food {

  /**
   * Creates a new food model
   * @constructor
   * @param   {Number}  startingFood  Starting food
   * @return  {Food}    Newly created food model
   */
  constructor(startingFood = 1) {
    this[sFood] = startingFood;
  }

  /**
   * Total food
   * @member  {Number}
   */
  get food() {
    return Math.round(this[sFood]);
  }
}
