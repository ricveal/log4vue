// Default options
export const defaultLogger = {
  prefix: new Date().toISOString(),
  shortname: true,
  levels: ['log', 'debug', 'warn', 'error'],
  severity: 0,
  // 0 -> 'log', 'debug', 'warn', 'error'
  // 1 -> 'debug', 'warn', 'error'
  // 2 -> 'warn', 'error'
  // 3 -> 'error'
};

export default function install(Vue, options = {}) {
  // If is installed, everything is done.
  if (this.installed) return;
  // Logger object with the default properties merged with the own properties of options.
  // If a key exists in both objects, the value from options will be used.
  const logger = {};
  Object.keys(defaultLogger).forEach(key => {
    logger[key] = key in options ? options[key] : defaultLogger[key];
  });
  logger.levels.forEach((level, index) => {
    logger[level] = (...data) => {
      // If severity is greater than current level, we return nothing.
      if (logger.severity > index) return;
      // If not, we configure the trace.
      const prefix = typeof logger.prefix === 'function' ? logger.prefix() : logger.prefix;
      // Format: PREFIX :: LEVEL :: data
      console[level](`[${prefix} :: ${level}] ::`.toUpperCase(), ...data); // eslint-disable-line no-console
    };
    // If shortname is active, we can access the logger directly through this.$error()
    if (logger.shortname) {
      Vue.prototype[`$${level}`] = logger[level]; // eslint-disable-line no-param-reassign
    }
  });
  // The logger will be accesible in this.$console
  Vue.prototype.$console = logger; // eslint-disable-line no-param-reassign
  Vue.console = logger; // eslint-disable-line no-param-reassign
  window.logger = logger;
  this.installed = true;
}
