/**
 * Population module
 *
 * @module
 * @copyright Bill Robitske, Jr. 2017
 * @author    Bill Robitske, Jr. <bill.robitske.jr@gmail.com>
 * @license   MIT
 */

/**
 * Symbols for private data
 */
const sPopulation = Symbol('population');
const sBirthRate = Symbol('birthRate');
const sDeathRate = Symbol('deathRate');
const sImmigrationRate = Symbol('immigrationRate');
const sEmmigrationRate = Symbol('emmigrationRate');

function populationHunger(population = 1, food = 0) {
  return population > 0 ? Math.max(population - food, 0) / population : 0;
}

function populationDensity(population = 0, territory = 1) {
  return territory > 0 ? population / territory : Number.POSITIVE_INFINITY;
}

/**
 * Population encapsulation
 *
 * @class
 */
export default class Population {
  constructor(startingPopulation = 1) {
    this[sPopulation] = startingPopulation;
    this[sBirthRate] = 0;
    this[sDeathRate] = 0;
    this[sImmigrationRate] = 0;
    this[sEmmigrationRate] = 0;
  }

  /**
   * Retrieve the current population
   *
   * @return  {Number}      Current population
   */
  get population() {
    return Math.round(this[sPopulation]);
  }

  /**
   * Retrive the current birth rate
   *
   * @return  {Number}      Current birth rate
   */
  get birthRate() {
    return this[sBirthRate];
  }

  /**
   * Retrieve the current death rate
   *
   * @return  {Number}      Current death rate
   */
  get deathRate() {
    return this[sDeathRate];
  }

  /**
   * Retrieve current immigration rate
   *
   * @return  {Number}      Current immigration rate
   */
  get immigrationRate() {
    return this[sImmigrationRate];
  }

  /**
   * Retrieve current emmigration rate
   *
   * @return  {Number}      Current emmigration rate
   */
  get emmigrationRate() {
    return this[sEmmigrationRate];
  }

  /**
   * Updates the current population based on the current birth rate, death rate,
   * immigration rate, and emmigration rate.
   *
   * @param   {Number}      tickLength  Length of the tick (in "years")
   * @return  {Population}  This population encapsulation
   */
  tickPopulationGrowth(tickLength) {
    const growthRate = (this.birthRate + this.immigrationRate) -
      (this.deathRate + this.emmigrationRate);
    this[sPopulation] *= Math.E ** (growthRate * tickLength);
    return this;
  }

  /**
   * Updates the current birth rate based on the current population, food, and
   * territory.
   *
   * @param   {Number}      food        Current food
   * @param   {Number}      territory   Current territory
   * @return  {Population}  This population encapsulation
   */
  updateBirthRate(food = 1, territory = 1) {
    const hunger = populationHunger(this.population, food);
    const density = populationDensity(this.population, territory);
    const dFactor = density > 0 ? Math.log(1 + ((Math.E - 1) * (density / 35))) : 1;
    const baseRate = ((1 + hunger) / 20);
    this[sBirthRate] = Math.min(baseRate, 2) * dFactor;
    return this;
  }

  /**
   * Updates the current death rate based on the current population, food, and
   * territory.
   *
   * @param   {Number}      food        Current food
   * @param   {Number}      territory   Current territory
   * @return  {Population}  This population encapsulation
   */
  updateDeathRate(food = 1, territory = 1) {
    // const hunger = 1 / Math.min((this.population - food) / this.population, 1);
    // const suicide = Math.min(1 / Math.log((this.population / (1 + territory)) / 777), 1);
    const hunger = populationHunger(this.population, food);
    const density = populationDensity(this.population, territory);
    const sFactor = Math.max(density > 0 ? 1 - Math.log(1 + ((Math.E - 1) * (density / 777))) : 1,
      0) * 0.00001326;
    this[sDeathRate] = ((1 / (70 * (1 - hunger))) + sFactor);
    return this;
  }
}
