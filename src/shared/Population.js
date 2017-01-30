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

/**
 * Calculates the percentage of a population that is going hungry
 *
 * @private
 * @param   {Number}  population  Total population
 * @param   {Number}  food        Total food
 * @return  {Number}  Percentage of the population going hungry
 */
function populationHunger(population = 1, food = 0) {
  return population > 0 ? Math.max(population - food, 0) / population : 0;
}

/**
 * Calculates the population density
 *
 * @private
 * @param   {Number}  population  Total population
 * @param   {Number}  territory   Total territory
 * @return  {Number}  Population density
 */
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
   * Current natural population growth rate
   * @member  {Number}
   */
  get naturalGrowthRate() {
    return this.birthRate - this.deathRate;
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
   * Current net immigration rate
   * @member  {Number}
   */
  get netImmigrationRate() {
    return this.immigrationRate - this.emmigrationRate;
  }

  /**
   * Current net population growth rate
   * @member  {Number}
   */
  get netGrowthRate() {
    return this.naturalGrowthRate + this.netImmigrationRate;
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
    const hFactor = (Math.log(1 + ((Math.E - 1) * hunger)) * 2) + 1;
    const density = populationDensity(this.population, territory);
    const dFactor = 1 - Math.abs(Math.log((Math.E ** -3) +
      ((Math.E - (Math.E ** -3)) * (density / 35))));
    // const dFactor = density > 0 ? Math.log(1 + ((Math.E - 1) * (density / 35))) : 1;
    const fertility = (2 * hFactor) + dFactor;
    this[sBirthRate] = fertility / 45;
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
    const hunger = populationHunger(this.population, food);
    const hFactor = hunger ** 2;
    const density = populationDensity(this.population, territory);
    const sFactor = 0.00001326 - (Math.log(1 + ((Math.E - 1) * (density / 777))) * 0.00001326);
    this[sDeathRate] = (1 / 70) + hFactor + sFactor;
    return this;
  }
}
