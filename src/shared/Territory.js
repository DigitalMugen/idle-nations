/**
 * Territory module
 *
 * @module
 * @copyright Bill Robitske, Jr. 2017
 * @author    Bill Robitske, Jr. <bill.robitske.jr@gmail.com>
 * @license   MIT
 */

/**
 * Symbols for "private" properties
 */
const sTerritory = Symbol('territory');

/**
 * Territory encapsulation
 * @class
 */
export default class Territory {

  /**
   * Creates a new territory model
   * @constructor
   * @param   {Number}    startingTerritory Starting territory
   * @return  {Territory} Newly created territory
   */
  constructor(startingTerritory = 1) {
    this[sTerritory] = startingTerritory;
  }

  /**
   * Current ammount of territory
   * @member  {Number}
   */
  get territory() {
    return Math.round(this[sTerritory]);
  }
}
