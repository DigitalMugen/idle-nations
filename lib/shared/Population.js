'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
var population = Symbol('population');
var birthRate = Symbol('birthRate');
var deathRate = Symbol('deathRate');
var immigrationRate = Symbol('immigrationRate');
var emmigrationRate = Symbol('emmigrationRate');

/**
 * Population encapsulation
 *
 * @class
 */

var Population = function () {
  function Population() {
    var startingPopulation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    _classCallCheck(this, Population);

    this[population] = startingPopulation;
    this[birthRate] = 0;
    this[deathRate] = 0;
    this[immigrationRate] = 0;
    this[emmigrationRate] = 0;
  }

  /**
   * Retrieve the current population
   *
   * @return  {Number}      Current population
   */


  _createClass(Population, [{
    key: 'tickPopulationGrowth',


    /**
     * Updates the current population based on the current birth rate, death rate,
     * immigration rate, and emmigration rate.
     *
     * @return  {Population}  This population encapsulation
     */
    value: function tickPopulationGrowth() {
      var increase = this.population * (this.birthRate + this.immigrationRate);
      var decrease = this.population * (this.deathRate + this.emmigrationRate);
      this[population] = this[population] + (increase - decrease);
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

  }, {
    key: 'updateBirthRate',
    value: function updateBirthRate() {
      var food = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var territory = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      // const undercrowding = Math.log((1 + (this.population / (1 + territory))) / 50);
      var hunger = Math.max(this.population - food, 0) / this.population;
      var undercrowding = Math.pow(territory, 0);
      var baseRate = (1 + hunger) / 1040 * undercrowding;
      this[birthRate] = Math.min(baseRate, 2);
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

  }, {
    key: 'updateDeathRate',
    value: function updateDeathRate() {
      var food = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var territory = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      // const hunger = 1 / Math.min((this.population - food) / this.population, 1);
      // const suicide = Math.min(1 / Math.log((this.population / (1 + territory)) / 777), 1);
      var hunger = Math.max(this.population - food, 0) / this.population;
      var suicide = Math.pow(territory, 0);
      this[deathRate] = 1 / (70 * (1 - hunger)) / 52 * suicide;
      return this;
    }
  }, {
    key: 'population',
    get: function get() {
      return Math.round(this[population]);
    }

    /**
     * Retrive the current birth rate
     *
     * @return  {Number}      Current birth rate
     */

  }, {
    key: 'birthRate',
    get: function get() {
      return this[birthRate];
    }

    /**
     * Retrieve the current death rate
     *
     * @return  {Number}      Current death rate
     */

  }, {
    key: 'deathRate',
    get: function get() {
      return this[deathRate];
    }

    /**
     * Retrieve current immigration rate
     *
     * @return  {Number}      Current immigration rate
     */

  }, {
    key: 'immigrationRate',
    get: function get() {
      return this[immigrationRate];
    }

    /**
     * Retrieve current emmigration rate
     *
     * @return  {Number}      Current emmigration rate
     */

  }, {
    key: 'emmigrationRate',
    get: function get() {
      return this[emmigrationRate];
    }
  }]);

  return Population;
}();

exports.default = Population;