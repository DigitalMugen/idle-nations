/**
 * Nation module
 *
 * @module
 * @copyright Bill Robitske, Jr. 2017
 * @author    Bill Robitske, Jr. <bill.robitske.jr@gmail.com>
 * @license   MIT
 */
import Population from './Population';
import Food from './Food';

/**
 * Symbols for "private" properties
 */
const sPopulation = Symbol('population');
const sFood = Symbol('food');

/**
 * Nation encapsulation
 * @class
 */
export default class Nation {

  /**
   * Creates a new nation model
   * @constructor
   * @param   {Object}  config
   * @param   {Number}  config.population Starting population
   * @param   {Number}  config.food       Starting food
   * @return  {Nation}  Newly created nation
   */
  constructor(config = {}) {
    this[sPopulation] = new Population(config.population || 10);
    this[sFood] = new Food(config.food || 10);
  }

  /**
   * This nation's population model
   * @member  {Population}
   */
  get population() {
    return this[sPopulation];
  }

  /**
   * This nation's food model
   * @member  {Food}
   */
  get food() {
    return this[sFood];
  }

  /**
   * Updates this nation's population, food, etc. models
   * @param   {Number}  tickLength  In-game years to progress in this tick
   * @return  {Nation}  This nation
   */
  tickUpdate(tickLength = 1) {
    this.population
      .updateBirthRate(this.food.food)
      .updateDeathRate(this.food.food);
    this.population.tickUpdate(tickLength);
    return this;
  }
}
