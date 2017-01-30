/**
 * Idle Nations behavior (testing)
 *
 * @copyright Bill Robitske, Jr. 2017
 * @author    Bill Robitske, Jr. <bill.robitske.jr@gmail.com>
 * @license   MIT
 */
import Nation from '../shared/Nation';
import ResourceView from './ResourceView';

function formatGameTime(gameTime) {
  const year = Math.floor(gameTime);
  const day = Math.floor((gameTime - year) * 365);
  return `Day ${day} of Year ${year}`;
}

function updateCurrentFigures(gameTime, nation) { // eslint-disable-line
  document.querySelector('#currentDate').textContent = gameTime;
  const population = document.querySelector('[data-resource="population"]');
  ResourceView.updateResourceView(population, nation.population, 'population');
  const food = document.querySelector('[data-resource="food"]');
  ResourceView.updateResourceView(food, nation.food, 'food');
  const territory = document.querySelector('[data-resource="territory"]');
  ResourceView.updateResourceView(territory, nation.territory, 'territory');
}

function convertToGameTime(realTime = 0, multiplier = 1) {
  return realTime / (1000 / multiplier);
}

function startNation() {
  const nation = new Nation({
    population: 10,
    food: 10,
    territory: 10,
  });
  updateCurrentFigures(formatGameTime(0), nation);
  return nation;
}

window.addEventListener('load', () => {
  const multiplier = 1;
  let nation = startNation();
  let startTime = new Date();
  let lastTick = startTime;
  const realStartDate = document.querySelector('#realStartDate');
  realStartDate.textContent = startTime.toLocaleDateString('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  setInterval(() => {
    const thisTick = Date.now();
    const tickTime = convertToGameTime(thisTick - startTime.getTime(), multiplier);
    const tickLength = convertToGameTime(thisTick - lastTick, multiplier);
    nation.tickUpdate(tickLength);
    updateCurrentFigures(formatGameTime(tickTime), nation);
    lastTick = thisTick;
  }, 1000 / 60);
  const restartButton = document.querySelector('.js-restart-button');
  if (!restartButton) return;
  restartButton.addEventListener('click', () => {
    nation = startNation();
    startTime = new Date();
    lastTick = startTime;
    realStartDate.textContent = startTime.toLocaleDateString('en', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  });
});
