/**
 * Resource view module
 *
 * @module
 * @copyright Bill Robitske, Jr. 2017
 * @author    Bill Robitske, Jr. <bill.robitske.jr@gmail.com>
 * @license   MIT
 */
export default class ResourceView {

  /**
   * Formats a number as a percent
   * @static
   * @param   {Number}  value       Value to be formatted
   * @param   {Number}  precision   Decimal places to round the percent to
   * @return  {String}  Formatted percent
   */
  static formatAsPercent(value = 0, precision = 0) {
    const percent = Math.round(value * (10 ** (2 + precision))) / (10 ** precision);
    return `${percent}%`;
  }

  static updateResourceView(container = null, model = null, baseKey = '') {
    if (!container || !model || baseKey === '' || model[baseKey] === undefined) return;
    const resourceField = container.querySelector('[data-form="resource"]');
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
    const fields = Array.from(container.querySelectorAll('[data-value]'));
    for (let i = 0, iLen = fields.length; i < iLen; i += 1) {
      const field = fields[i];
      const key = field.getAttribute('data-value');
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
          case 'percentOfResource':
            field.textContent = ResourceView.formatAsPercent(model[key] / model[baseKey], 3);
            break;
          default:
            field.textContent = model[key];
        }
      }
    }
  }
}
