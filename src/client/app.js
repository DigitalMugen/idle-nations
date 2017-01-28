/**
 * Idle Nations behavior (testing)
 *
 * @copyright Bill Robitske, Jr. 2017
 * @author    Bill Robitske, Jr. <bill.robitske.jr@gmail.com>
 * @license   MIT
 */
import Nation from '../shared/Nation';
// import ResourceView from './ResourceView';

function formatGameTime(gameTime) {
  const year = Math.floor(gameTime);
  const day = Math.floor((gameTime - year) * 365);
  return `Day ${day} of Year ${year}`;
}

function updateCurrentFigures(gameTime, nation) { // eslint-disable-line
  document.querySelector('#currentDate').textContent = gameTime;
  document.querySelector('#currentPopulation').textContent = nation.population.population;
}

function convertToGameTime(realTime = 0, multiplier = 1) {
  return realTime / (1000 / multiplier);
}

function startNation() {
  const nation = new Nation({
    population: 10,
    food: 10,
    territory: 1,
  });
  updateCurrentFigures(formatGameTime(0), nation);
  return nation;
}

window.addEventListener('load', () => {
  const multiplier = 1;
  let nation = startNation(); // eslint-disable-line

  let startTime = Date.now(); // eslint-disable-line
  let lastTick = startTime;
  setInterval(() => {
    const thisTick = Date.now();
    const tickTime = convertToGameTime(thisTick - startTime, multiplier);
    const tickLength = convertToGameTime(thisTick - lastTick, multiplier);
    nation.tickUpdate(tickLength);
    updateCurrentFigures(formatGameTime(tickTime), nation);
    lastTick = thisTick;
  }, 1000 / 60);
});
