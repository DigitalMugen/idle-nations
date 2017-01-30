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
	
	var _ResourceView = __webpack_require__(5);
	
	var _ResourceView2 = _interopRequireDefault(_ResourceView);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/**
	 * Idle Nations behavior (testing)
	 *
	 * @copyright Bill Robitske, Jr. 2017
	 * @author    Bill Robitske, Jr. <bill.robitske.jr@gmail.com>
	 * @license   MIT
	 */
	function formatGameTime(gameTime) {
	  var year = Math.floor(gameTime);
	  var day = Math.floor((gameTime - year) * 365);
	  return 'Day ' + day + ' of Year ' + year;
	}
	
	function updateCurrentFigures(gameTime, nation) {
	  // eslint-disable-line
	  document.querySelector('#currentDate').textContent = gameTime;
	  var population = document.querySelector('[data-resource="population"]');
	  _ResourceView2.default.updateResourceView(population, nation.population, 'population');
	  var food = document.querySelector('[data-resource="food"]');
	  _ResourceView2.default.updateResourceView(food, nation.food, 'food');
	  var territory = document.querySelector('[data-resource="territory"]');
	  _ResourceView2.default.updateResourceView(territory, nation.territory, 'territory');
	}
	
	function convertToGameTime() {
	  var realTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	  var multiplier = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
	
	  return realTime / (1000 / multiplier);
	}
	
	function startNation() {
	  var nation = new _Nation2.default({
	    population: 10,
	    food: 10,
	    territory: 10
	  });
	  updateCurrentFigures(formatGameTime(0), nation);
	  return nation;
	}
	
	window.addEventListener('load', function () {
	  var multiplier = 1;
	  var nation = startNation();
	  var startTime = new Date();
	  var lastTick = startTime;
	  var realStartDate = document.querySelector('#realStartDate');
	  realStartDate.textContent = startTime.toLocaleDateString('en', {
	    month: 'short',
	    day: 'numeric',
	    year: 'numeric'
	  });
	  setInterval(function () {
	    var thisTick = Date.now();
	    var tickTime = convertToGameTime(thisTick - startTime.getTime(), multiplier);
	    var tickLength = convertToGameTime(thisTick - lastTick, multiplier);
	    nation.tickUpdate(tickLength);
	    updateCurrentFigures(formatGameTime(tickTime), nation);
	    lastTick = thisTick;
	  }, 1000 / 60);
	  var restartButton = document.querySelector('.js-restart-button');
	  if (!restartButton) return;
	  restartButton.addEventListener('click', function () {
	    nation = startNation();
	    startTime = new Date();
	    lastTick = startTime;
	    realStartDate.textContent = startTime.toLocaleDateString('en', {
	      month: 'short',
	      day: 'numeric',
	      year: 'numeric'
	    });
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
	    this[sTerritory] = new _Territory2.default(config.territory || 10);
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
	      this.food.updateGatheringRate(this.population.population, this.territory.territory).updateConsumptionRate(this.population.population);
	      if (tickLength > 1) {
	        this.tickUpdate(tickLength - 1);
	      }
	      this.population.tickPopulationGrowth(Math.min(tickLength, 1));
	      this.food.tickFoodGrowth(Math.min(tickLength, 1));
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
	      var hFactor = Math.pow(hunger, 2);
	      var density = populationDensity(this.population, territory);
	      var sFactor = 0.00001326 - Math.log(1 + (Math.E - 1) * (density / 777)) * 0.00001326;
	      this[sDeathRate] = 1 / 70 + hFactor + sFactor;
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
	     * Current natural population growth rate
	     * @member  {Number}
	     */
	
	  }, {
	    key: 'naturalGrowthRate',
	    get: function get() {
	      return this.birthRate - this.deathRate;
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
	
	    /**
	     * Current net immigration rate
	     * @member  {Number}
	     */
	
	  }, {
	    key: 'netImmigrationRate',
	    get: function get() {
	      return this.immigrationRate - this.emmigrationRate;
	    }
	
	    /**
	     * Current net population growth rate
	     * @member  {Number}
	     */
	
	  }, {
	    key: 'netGrowthRate',
	    get: function get() {
	      return this.naturalGrowthRate + this.netImmigrationRate;
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
	var sGatheringRate = Symbol('gatheringRate');
	var sFarmingRate = Symbol('farmingRate');
	var sConsumptionRate = Symbol('consumptionRate');
	var sImports = Symbol('imports');
	var sExports = Symbol('exports');
	
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
	    this[sGatheringRate] = 0;
	    this[sFarmingRate] = 0;
	    this[sConsumptionRate] = 0;
	    this[sImports] = 0;
	    this[sExports] = 0;
	  }
	
	  /**
	   * Total food
	   * @member  {Number}
	   */
	
	
	  _createClass(Food, [{
	    key: 'updateGatheringRate',
	    value: function updateGatheringRate() {
	      var population = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var territory = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	
	      this[sGatheringRate] = Math.min(Math.pow(territory, 4 / 3), population * 2);
	      return this;
	    }
	  }, {
	    key: 'updateConsumptionRate',
	    value: function updateConsumptionRate() {
	      var population = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	
	      this[sConsumptionRate] = Math.max(population, 0);
	      return this;
	    }
	  }, {
	    key: 'tickFoodGrowth',
	    value: function tickFoodGrowth() {
	      var tickLength = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	
	      this[sFood] = Math.max(this[sFood] + this.netGrowth * tickLength, 0);
	      return this;
	    }
	  }, {
	    key: 'food',
	    get: function get() {
	      return Math.round(this[sFood]);
	    }
	  }, {
	    key: 'gatheringRate',
	    get: function get() {
	      return this[sGatheringRate];
	    }
	  }, {
	    key: 'farmingRate',
	    get: function get() {
	      return this[sFarmingRate];
	    }
	  }, {
	    key: 'consumptionRate',
	    get: function get() {
	      return this[sConsumptionRate];
	    }
	  }, {
	    key: 'netProduction',
	    get: function get() {
	      return this.gatheringRate + this.farmingRate - this.consumptionRate;
	    }
	  }, {
	    key: 'imports',
	    get: function get() {
	      return this[sImports];
	    }
	  }, {
	    key: 'exports',
	    get: function get() {
	      return this[sExports];
	    }
	  }, {
	    key: 'netTrade',
	    get: function get() {
	      return this.imports - this.exports;
	    }
	  }, {
	    key: 'netGrowth',
	    get: function get() {
	      return this.netProduction + this.netTrade;
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

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Resource view module
	 *
	 * @module
	 * @copyright Bill Robitske, Jr. 2017
	 * @author    Bill Robitske, Jr. <bill.robitske.jr@gmail.com>
	 * @license   MIT
	 */
	var ResourceView = function () {
	  function ResourceView() {
	    _classCallCheck(this, ResourceView);
	  }
	
	  _createClass(ResourceView, null, [{
	    key: 'formatAsPercent',
	
	
	    /**
	     * Formats a number as a percent
	     * @static
	     * @param   {Number}  value       Value to be formatted
	     * @param   {Number}  precision   Decimal places to round the percent to
	     * @return  {String}  Formatted percent
	     */
	    value: function formatAsPercent() {
	      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	
	      var percent = Math.round(value * Math.pow(10, 2 + precision)) / Math.pow(10, precision);
	      return percent + '%';
	    }
	  }, {
	    key: 'updateResourceView',
	    value: function updateResourceView() {
	      var container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	      var model = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	      var baseKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
	
	      if (!container || !model || baseKey === '' || model[baseKey] === undefined) return;
	      var resourceField = container.querySelector('[data-form="resource"]');
	      if (!resourceField) return;
	      resourceField.textContent = model[baseKey];
	      // const rateFields = Array.from(container.querySelectorAll('[data-form="rate"]'));
	      // for (let i = 0, iLen = rateFields.length; i < iLen; i += 1) {
	      //   const key = rateFields[i].getAttribute('data-value');
	      //   rateFields[i].textContent = model[key] !== undefined ?
	      //     ResourceView.formatAsPercent(model[key], 3) : '-';
	      // }
	      // const absoluteFields = Array.from(container.querySelectorAll('[data-form="absolute"]'));
	      // for (let i = 0, iLen = absoluteFields.length; i < iLen; i += 1) {
	      //   const key = absoluteFields[i].getAttribute('data-value');
	      //   absoluteFields[i].textContent = model[key] !== undefined ?
	      //     Math.round(model[baseKey] * model[key]) : '-';
	      // }
	      var fields = Array.from(container.querySelectorAll('[data-value]'));
	      for (var i = 0, iLen = fields.length; i < iLen; i += 1) {
	        var field = fields[i];
	        var key = field.getAttribute('data-value');
	        if (model[key] === undefined) {
	          field.textContent = '-';
	        } else {
	          switch (field.getAttribute('data-form')) {
	            case 'rate':
	              field.textContent = ResourceView.formatAsPercent(model[key], 3);
	              break;
	            case 'absolute':
	              field.textContent = Math.round(model[baseKey] * model[key]);
	              break;
	            case 'value':
	              field.textContent = Math.round(model[key]);
	              break;
	            case 'percentOfResource':
	              field.textContent = ResourceView.formatAsPercent(model[key] / model[baseKey], 3);
	              break;
	            default:
	              field.textContent = model[key];
	          }
	        }
	      }
	    }
	  }]);
	
	  return ResourceView;
	}();
	
	exports.default = ResourceView;

/***/ }
/******/ ]);
//# sourceMappingURL=idle-nations.bundle.js.map