/*!
  * log4vue v0.0.2
  * (c) 2018 Ricardo Vega
  * @license MIT
*/
function install(Vue, options) {
  if ( options === void 0 ) options = {};

  // If is installed, everything is done.
  if (this.installed) { return; }
  // Default options
  var defaultLogger = {
    prefix: new Date().toISOString(),
    shortname: true,
    levels: ['log', 'debug', 'warn', 'error'],
    severity: 0,
    // 0 -> 'log', 'debug', 'warn', 'error'
    // 1 -> 'debug', 'warn', 'error'
    // 2 -> 'warn', 'error'
    // 3 -> 'error'
  };
  // Logger object with the default properties merged with the own properties of options.
  // If a key exists in both objects, the value from options will be used.
  var logger = {};
  Object.keys(defaultLogger).forEach(function (key) {
    logger[key] = options[key] || defaultLogger[key];
  });
  logger.levels.forEach(function (level, index) {
    logger[level] = function () {
      var data = [], len = arguments.length;
      while ( len-- ) data[ len ] = arguments[ len ];

      // If severity is greater than current level, we return nothing.
      if (logger.severity > index) { return; }
      // If not, we configure the trace.
      var prefix = typeof logger.prefix === 'function' ? logger.prefix() : logger.prefix;
      // Format: PREFIX :: LEVEL :: data
      console[level].apply(console, [ ("[" + prefix + " :: " + level + "] ::").toUpperCase() ].concat( data )); // eslint-disable-line no-console
    };
    // If shortname is active, we can access the logger directly through this.$error()
    if (logger.shortname) {
      Vue.prototype[("$" + level)] = logger[level]; // eslint-disable-line no-param-reassign
    }
  });
  // The logger will be accesible in this.$console
  Vue.prototype.$console = logger; // eslint-disable-line no-param-reassign
  Vue.console = logger; // eslint-disable-line no-param-reassign
  window.logger = logger;
  this.installed = true;
}

var Log4Vue = { installed: false };

Log4Vue.install = install;

export default Log4Vue;
