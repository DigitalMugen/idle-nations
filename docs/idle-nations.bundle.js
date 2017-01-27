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
	
	var _Nation = __webpack_require__(1);
	
	var _Nation2 = _interopRequireDefault(_Nation);
	
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
	  document.querySelector('#currentGrowthRate').textContent = '' + formatPercent(population.birthRate - population.deathRate);
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
	
	function startNation() {
	  var nation = new _Nation2.default({
	    population: getValue('#startingPopulation'),
	    food: getValue('#food'),
	    territory: getValue('#territory')
	  });
	  updateCurrentFigures(formatGameTime(0), nation.population.population, nation.food.food, nation.territory.territory);
	  return nation;
	}
	
	window.addEventListener('load', function () {
	  var multiplier = 1;
	  var nation = startNation();
	
	  var startTime = Date.now();
	  var lastTick = startTime;
	  setInterval(function () {
	    var thisTick = Date.now();
	    var tickTime = convertToGameTime(thisTick - startTime, multiplier);
	    var tickLength = convertToGameTime(thisTick - lastTick, multiplier);
	    nation.tickUpdate(tickLength);
	    updateCurrentFigures(formatGameTime(tickTime), nation.population.population, nation.food.food, nation.territory.territory);
	    lastTick = thisTick;
	  }, 1000 / 60);
	  document.querySelector('#restartButton').addEventListener('click', function () {
	    nation = startNation();
	    startTime = Date.now();
	    lastTick = startTime;
	  });
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Nation module
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @module
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @copyright Bill Robitske, Jr. 2017
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author    Bill Robitske, Jr. <bill.robitske.jr@gmail.com>
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @license   MIT
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	
	var _Population = __webpack_require__(2);
	
	var _Population2 = _interopRequireDefault(_Population);
	
	var _Food = __webpack_require__(3);
	
	var _Food2 = _interopRequireDefault(_Food);
	
	var _Territory = __webpack_require__(4);
	
	var _Territory2 = _interopRequireDefault(_Territory);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Symbols for "private" properties
	 */
	var sPopulation = Symbol('population');
	var sFood = Symbol('food');
	var sTerritory = Symbol('territory');
	
	/**
	 * Nation encapsulation
	 * @class
	 */
	
	var Nation = function () {
	
	  /**
	   * Creates a new nation model
	   * @constructor
	   * @param   {Object}  config
	   * @param   {Number}  config.population Starting population
	   * @param   {Number}  config.food       Starting food
	   * @return  {Nation}  Newly created nation
	   */
	  function Nation() {
	    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	    _classCallCheck(this, Nation);
	
	    this[sPopulation] = new _Population2.default(config.population || 10);
	    this[sFood] = new _Food2.default(config.food || 10);
	    this[sTerritory] = new _Territory2.default(config.territory || 1);
	  }
	
	  /**
	   * This nation's population model
	   * @member  {Population}
	   */
	
	
	  _createClass(Nation, [{
	    key: 'tickUpdate',
	
	
	    /**
	     * Updates this nation's population, food, etc. models
	     * @param   {Number}  tickLength  In-game years to progress in this tick
	     * @return  {Nation}  This nation
	     */
	    value: function tickUpdate() {
	      var tickLength = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
	
	      this.population.updateBirthRate(this.food.food, this.territory.territory).updateDeathRate(this.food.food, this.territory.territory);
	      this.population.tickUpdate(tickLength);
	      return this;
	    }
	  }, {
	    key: 'population',
	    get: function get() {
	      return this[sPopulation];
	    }
	
	    /**
	     * This nation's food model
	     * @member  {Food}
	     */
	
	  }, {
	    key: 'food',
	    get: function get() {
	      return this[sFood];
	    }
	
	    /**
	     * This nation's territory model
	     * @member  {Territory}
	     */
	
	  }, {
	    key: 'territory',
	    get: function get() {
	      return this[sTerritory];
	    }
	  }]);
	
	  return Nation;
	}();
	
	exports.default = Nation;

/***/ },
/* 2 */
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
	
	/**
	 * Calculates the percentage of a population that is going hungry
	 *
	 * @private
	 * @param   {Number}  population  Total population
	 * @param   {Number}  food        Total food
	 * @return  {Number}  Percentage of the population going hungry
	 */
	function populationHunger() {
	  var population = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
	  var food = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	
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
	      var hFactor = Math.log(1 + (Math.E - 1) * hunger) * 2 + 1;
	      var density = populationDensity(this.population, territory);
	      var dFactor = 1 - Math.abs(Math.log(Math.pow(Math.E, -3) + (Math.E - Math.pow(Math.E, -3)) * (density / 35)));
	      // const dFactor = density > 0 ? Math.log(1 + ((Math.E - 1) * (density / 35))) : 1;
	      var fertility = 2 * hFactor + dFactor;
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
	
	  }, {
	    key: 'updateDeathRate',
	    value: function updateDeathRate() {
	      var food = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
	      var territory = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
	
	      var hunger = populationHunger(this.population, food);
	      var hFactor = Math.log(1 + (Math.E - 1) * hunger) * 5 + 1;
	      var density = populationDensity(this.population, territory);
	      var sFactor = 0.00001326 - Math.log(1 + (Math.E - 1) * (density / 777)) * 0.00001326;
	      this[sDeathRate] = 1 / 70 * hFactor + sFactor;
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

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
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
	var sFood = Symbol('food');
	
	/**
	 * Food encapsulation
	 * @class
	 */
	
	var Food = function () {
	
	  /**
	   * Creates a new food model
	   * @constructor
	   * @param   {Number}  startingFood  Starting food
	   * @return  {Food}    Newly created food model
	   */
	  function Food() {
	    var startingFood = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
	
	    _classCallCheck(this, Food);
	
	    this[sFood] = startingFood;
	  }
	
	  /**
	   * Total food
	   * @member  {Number}
	   */
	
	
	  _createClass(Food, [{
	    key: 'food',
	    get: function get() {
	      return Math.round(this[sFood]);
	    }
	  }]);
	
	  return Food;
	}();
	
	exports.default = Food;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
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
	var sTerritory = Symbol('territory');
	
	/**
	 * Territory encapsulation
	 * @class
	 */
	
	var Territory = function () {
	
	  /**
	   * Creates a new territory model
	   * @constructor
	   * @param   {Number}    startingTerritory Starting territory
	   * @return  {Territory} Newly created territory
	   */
	  function Territory() {
	    var startingTerritory = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
	
	    _classCallCheck(this, Territory);
	
	    this[sTerritory] = startingTerritory;
	  }
	
	  /**
	   * Current ammount of territory
	   * @member  {Number}
	   */
	
	
	  _createClass(Territory, [{
	    key: 'territory',
	    get: function get() {
	      return Math.round(this[sTerritory]);
	    }
	  }]);
	
	  return Territory;
	}();
	
	exports.default = Territory;

/***/ }
/******/ ]);
//# sourceMappingURL=idle-nations.bundle.js.map