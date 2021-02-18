/**
 * Call a function asynchronously, as soon as possible.
 * Makes use of HTML Promise to schedule the callback if available, otherwise falling back to `setTimeout`
 * @link https://github.com/developit/preact/blob/master/src/util.js#L30
 * @type {(callback: function) => void}
 */
export default typeof Promise === 'function'
  ? Promise.resolve().then.bind(Promise.resolve())
  : setTimeout
