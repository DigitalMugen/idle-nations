'use strict';

var _Population = require('../shared/Population');

var _Population2 = _interopRequireDefault(_Population);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var population = new _Population2.default(10); /* eslint-disable no-console */

var tickCount = 0;
while (tickCount <= 52 * 100) {
  var year = Math.floor(tickCount / 52);
  var week = tickCount % 52;
  var birthRate = Math.round(population.birthRate * 100000) / 1000;
  var deathRate = Math.round(population.deathRate * 100000) / 1000;
  // const food = Math.log(tickCount + 1) * 10;
  var territory = Math.log(tickCount + 1);
  console.log('Year ' + year + ' Week ' + week + ' Population: ' + population.population + ' (Birth rate: ' + birthRate + '%, Death rate: ' + deathRate + '%)');
  population.updateBirthRate(10, territory).updateDeathRate(10, territory).tickPopulationGrowth();
  tickCount += 1;
}