/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Population = __webpack_require__(1);
	
	var _Population2 = _interopRequireDefault(_Population);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function formatPercent() {
	  var number = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	  var decimals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
	
	  return Math.round(number * 100 * Math.pow(10, decimals)) / Math.pow(10, decimals) + '%';
	} /**
	   * Idle Nations behavior (testing)
	   *
	   * @copyright Bill Robitske, Jr. 2017
	   * @author    Bill Robitske, Jr. <bill.robitske.jr@gmail.com>
	   * @license   MIT
	   */
	
	
	function updateCurrentFigures(gameTime, population, food, territory) {
	  document.querySelector('#gameTime').textContent = '' + gameTime;
	  document.querySelector('#currentPopulation').textContent = '' + population.population;
	  document.querySelector('#currentFood').textContent = '' + food;
	  document.querySelector('#currentTerritory').textContent = '' + territory;
	  document.querySelector('#currentBirthRate').textContent = '' + formatPercent(population.birthRate);
	  document.querySelector('#currentDeathRate').textContent = '' + formatPercent(population.deathRate);
	}
	
	function getValue(id) {
	  var value = Number.parseInt(document.querySelector(id).value, 10);
	  return Number.isNaN(value) ? 0 : value;
	}
	
	function convertToGameTime() {
	  var realTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	  var multiplier = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
	
	  return realTime / (1000 / multiplier);
	}
	
	function formatGameTime(gameTime) {
	  var years = Math.floor(gameTime);
	  var weeks = Math.floor((gameTime - years) * 52);
	  return 'Year ' + years + ', Week ' + weeks;
	}
	
	window.addEventListener('load', function () {
	  var multiplier = 1;
	
	  var population = new _Population2.default(getValue('#startingPopulation'));
	  var food = getValue('#food');
	  var territory = getValue('#territory');
	  var startTime = Date.now();
	  var lastTick = startTime;
	  updateCurrentFigures(formatGameTime(0), population, food, territory);
	  setInterval(function () {
	    food = getValue('#food');
	    territory = getValue('#territory');
	    var thisTick = Date.now();
	    var tickTime = convertToGameTime(thisTick - startTime, multiplier);
	    var tickLength = convertToGameTime(thisTick - lastTick, multiplier);
	    population.updateBirthRate(food, territory).updateDeathRate(food, territory).tickPopulationGrowth(tickLength);
	    updateCurrentFigures(formatGameTime(tickTime), population, food, territory);
	    lastTick = thisTick;
	  }, 1000 / 60);
	  document.querySelector('#restartButton').addEventListener('click', function () {
	    population = new _Population2.default(getValue('#startingPopulation'));
	    startTime = Date.now();
	    lastTick = startTime;
	    updateCurrentFigures(formatGameTime(0), population, food, territory);
	  });
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

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
	var sPopulation = Symbol('population');
	var sBirthRate = Symbol('birthRate');
	var sDeathRate = Symbol('deathRate');
	var sImmigrationRate = Symbol('immigrationRate');
	var sEmmigrationRate = Symbol('emmigrationRate');
	
	function populationHunger() {
	  var population = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
	  var food = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	
	  return population > 0 ? Math.max(population - food, 0) / population : 0;
	}
	
	function populationDensity() {
	  var population = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	  var territory = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
	
	  return territory > 0 ? population / territory : Number.POSITIVE_INFINITY;
	}
	
	/**
	 * Population encapsulation
	 *
	 * @class
	 */
	
	var Population = function () {
	  function Population() {
	    var startingPopulation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
	
	    _classCallCheck(this, Population);
	
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
	
	
	  _createClass(Population, [{
	    key: 'tickPopulationGrowth',
	
	
	    /**
	     * Updates the current population based on the current birth rate, death rate,
	     * immigration rate, and emmigration rate.
	     *
	     * @param   {Number}      tickLength  Length of the tick (in "years")
	     * @return  {Population}  This population encapsulation
	     */
	    value: function tickPopulationGrowth(tickLength) {
	      var growthRate = this.birthRate + this.immigrationRate - (this.deathRate + this.emmigrationRate);
	      this[sPopulation] *= Math.pow(Math.E, growthRate * tickLength);
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
	      var food = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
	      var territory = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
	
	      var hunger = populationHunger(this.population, food);
	      var density = populationDensity(this.population, territory);
	      var dFactor = density > 0 ? Math.log(1 + (Math.E - 1) * (density / 35)) : 1;
	      var baseRate = (1 + hunger) / 20;
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
	
	  }, {
	    key: 'updateDeathRate',
	    value: function updateDeathRate() {
	      var food = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
	      var territory = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
	
	      // const hunger = 1 / Math.min((this.population - food) / this.population, 1);
	      // const suicide = Math.min(1 / Math.log((this.population / (1 + territory)) / 777), 1);
	      var hunger = populationHunger(this.population, food);
	      var density = populationDensity(this.population, territory);
	      var sFactor = Math.max(density > 0 ? 1 - Math.log(1 + (Math.E - 1) * (density / 777)) : 1, 0) * 0.00001326;
	      this[sDeathRate] = 1 / (70 * (1 - hunger)) + sFactor;
	      return this;
	    }
	  }, {
	    key: 'population',
	    get: function get() {
	      return Math.round(this[sPopulation]);
	    }
	
	    /**
	     * Retrive the current birth rate
	     *
	     * @return  {Number}      Current birth rate
	     */
	
	  }, {
	    key: 'birthRate',
	    get: function get() {
	      return this[sBirthRate];
	    }
	
	    /**
	     * Retrieve the current death rate
	     *
	     * @return  {Number}      Current death rate
	     */
	
	  }, {
	    key: 'deathRate',
	    get: function get() {
	      return this[sDeathRate];
	    }
	
	    /**
	     * Retrieve current immigration rate
	     *
	     * @return  {Number}      Current immigration rate
	     */
	
	  }, {
	    key: 'immigrationRate',
	    get: function get() {
	      return this[sImmigrationRate];
	    }
	
	    /**
	     * Retrieve current emmigration rate
	     *
	     * @return  {Number}      Current emmigration rate
	     */
	
	  }, {
	    key: 'emmigrationRate',
	    get: function get() {
	      return this[sEmmigrationRate];
	    }
	  }]);
	
	  return Population;
	}();
	
	exports.default = Population;

/***/ }
/******/ ]);
//# sourceMappingURL=idle-nations.bundle.js.map