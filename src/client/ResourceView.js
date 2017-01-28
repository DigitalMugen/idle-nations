/**
 * Resource view module
 *
 * @module
 * @copyright Bill Robitske, Jr. 2017
 * @author    Bill Robitske, Jr. <bill.robitske.jr@gmail.com>
 * @license   MIT
 */
export default class ResourceView {
  static formatAsPercent(value = 0, precision = 0) {
    const percent = Math.round(value * (10 ** (2 + precision))) / (10 ** precision);
    return `${percent}%`;
  }
}
