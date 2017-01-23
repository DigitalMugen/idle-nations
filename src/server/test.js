/* eslint-disable no-console */

import Population from '../shared/Population';

const population = new Population(10);
let tickCount = 0;
while (tickCount <= (52 * 100)) {
  const year = Math.floor(tickCount / 52);
  const week = tickCount % 52;
  const birthRate = Math.round(population.birthRate * 100000) / 1000;
  const deathRate = Math.round(population.deathRate * 100000) / 1000;
  // const food = Math.log(tickCount + 1) * 10;
  const territory = Math.log(tickCount + 1);
  console.log(`Year ${year} Week ${week} Population: ${population.population} (Birth rate: ${birthRate}%, Death rate: ${deathRate}%)`);
  population
    .updateBirthRate(10, territory)
    .updateDeathRate(10, territory)
    .tickPopulationGrowth();
  tickCount += 1;
}
