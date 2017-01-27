/**
 * Idle Nations behavior (testing)
 *
 * @copyright Bill Robitske, Jr. 2017
 * @author    Bill Robitske, Jr. <bill.robitske.jr@gmail.com>
 * @license   MIT
 */
import Nation from '../shared/Nation';

function formatPercent(number = 0, decimals = 2) {
  return `${Math.round(number * 100 * (10 ** decimals)) / (10 ** decimals)}%`;
}

function updateCurrentFigures(gameTime, population, food, territory) {
  document.querySelector('#gameTime').textContent = `${gameTime}`;
  document.querySelector('#currentPopulation').textContent = `${population.population}`;
  document.querySelector('#currentFood').textContent = `${food}`;
  document.querySelector('#currentTerritory').textContent = `${territory}`;
  document.querySelector('#currentBirthRate').textContent = `${formatPercent(population.birthRate)}`;
  document.querySelector('#currentDeathRate').textContent = `${formatPercent(population.deathRate)}`;
  document.querySelector('#currentGrowthRate').textContent =
    `${formatPercent(population.birthRate - population.deathRate)}`;
}

function getValue(id) {
  const value = Number.parseInt(document.querySelector(id).value, 10);
  return Number.isNaN(value) ? 0 : value;
}

function convertToGameTime(realTime = 0, multiplier = 1) {
  return realTime / (1000 / multiplier);
}

function formatGameTime(gameTime) {
  const years = Math.floor(gameTime);
  const weeks = Math.floor((gameTime - years) * 52);
  return `Year ${years}, Week ${weeks}`;
}

function startNation() {
  const nation = new Nation({
    population: getValue('#startingPopulation'),
    food: getValue('#food'),
    territory: getValue('#territory'),
  });
  updateCurrentFigures(formatGameTime(0), nation.population.population,
    nation.food.food, nation.territory.territory);
  return nation;
}

window.addEventListener('load', () => {
  const multiplier = 1;
  let nation = startNation();

  let startTime = Date.now();
  let lastTick = startTime;
  setInterval(() => {
    const thisTick = Date.now();
    const tickTime = convertToGameTime(thisTick - startTime, multiplier);
    const tickLength = convertToGameTime(thisTick - lastTick, multiplier);
    nation.tickUpdate(tickLength);
    updateCurrentFigures(formatGameTime(tickTime), nation.population.population,
      nation.food.food, nation.territory.territory);
    lastTick = thisTick;
  }, 1000 / 60);
  document.querySelector('#restartButton').addEventListener('click', () => {
    nation = startNation();
    startTime = Date.now();
    lastTick = startTime;
  });
});
