import Logger from '@/lib';

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
});
