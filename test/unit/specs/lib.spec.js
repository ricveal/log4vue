import Logger from 'log4vue'; // eslint-disable-line

/* eslint-disable global-require */

describe('this.$console', () => {
  const Vue = require('vue');
  Vue.use(Logger, { shortname: false });
  const vm = new Vue();
  const str = 'hello world';

  it('level log out hello world', () => {
    expect(vm.$console.log).toBeDefined();
    vm.$console.log = jest.fn();
    vm.$console.log(str);
    expect(vm.$console.log).toHaveBeenCalledWith(str);
  });

  it('level debug out hello world', () => {
    expect(vm.$console.debug).toBeDefined();
    vm.$console.debug = jest.fn();
    vm.$console.debug(str);
    expect(vm.$console.debug).toHaveBeenCalledWith(str);
  });

  describe('Vue log', () => {
    it('level debug out hello world', () => {
      expect(Vue.console.debug).toBeDefined();
      Vue.console.debug = jest.fn();
      Vue.console.debug(str);
      expect(Vue.console.debug).toHaveBeenCalledWith(str);
    });
  });
});

describe('If installed, return', () => {
  const Vue = require('vue');

  it("with prefix 'prefix'", () => {
    expect(Logger.installed).toEqual(true);
  });

  it("with prefix 'prefix'", () => {
    Vue.use(Logger, { prefix: 'prefix' });
    expect(Vue.console.prefix).not.toEqual('prefix');
  });
});

describe('severity works and shortname', () => {
  // reinstall plugin
  Logger.installed = false;
  jest.resetModules();
  const Vue = require('vue');

  Vue.use(Logger, { severity: 2, shortname: false });

  it('severity is properly defined', () => {
    expect(Vue.console.severity).toBe(2);
    expect(Vue.console.shortname).toBeFalsy();
    expect(Vue.$log).toBeUndefined();
    expect(Vue.$error).toBeUndefined();
  });

  it('add level info', () => {
    spyOn(console, 'log');
    expect(Vue.console.log).toBeDefined();
    Vue.console.log('nothing');
    expect(console.log).not.toBeCalled();
  });

  it('add level info', () => {
    spyOn(console, 'debug');
    expect(Vue.console.debug).toBeDefined();
    Vue.console.debug('nothing');
    expect(console.debug).not.toBeCalled();
  });

  it('add level info', () => {
    spyOn(console, 'warn');
    expect(Vue.console.warn).toBeDefined();
    Vue.console.warn('nothing');
    expect(console.warn).toBeCalled();
  });

  it('add level info', () => {
    spyOn(console, 'error');
    expect(Vue.console.error).toBeDefined();
    Vue.console.error('nothing');
    expect(console.error).toBeCalled();
  });
});

describe('Vue log option', () => {
  // reinstall plugin
  Logger.installed = false;
  jest.resetModules();
  const Vue = require('vue');

  Vue.use(Logger, { prefix: 'prefix', shortname: true, levels: ['info'] });
  const vm = new Vue();
  const str = 'hello world';

  it("with prefix 'prefix'", () => {
    expect(Vue.console.prefix).toEqual('prefix');
  });

  it('add level info', () => {
    expect(Vue.console.info).toBeDefined();
  });

  it('with shortname true', () => {
    expect(vm.$warn).toBeUndefined();
    expect(vm.$log).toBeUndefined();
    expect(vm.$error).toBeUndefined();
    expect(vm.$info).toBeDefined();
    vm.$info = jest.fn();
    vm.$info(str);
    expect(vm.$info).toHaveBeenCalledWith(str);
  });

  describe('prefix as function', () => {
  // reinstall plugin
  Logger.installed = false;
  jest.resetModules();
  const Vue = require('vue');
  const prefixFn = () => 'hello';

  Vue.use(Logger, { prefix: prefixFn });
  it('should behave...', () => {
    spyOn(console, 'log');
    Vue.console.log('world')
    expect(console.log).toBeCalledWith('[HELLO :: LOG] ::', 'world')
  });
  })
});
