import { defaultLogger } from '../../../src/install';

describe('Default options are correct', () => {
  it('should contain default options defined in documentation', () => {
    expect(defaultLogger).toBeTruthy();
    expect(defaultLogger.shortname).toBeTruthy();
    expect(defaultLogger.severity).toBe(0);
    expect(defaultLogger.levels).toContain('log');
    expect(defaultLogger.levels).toContain('debug');
    expect(defaultLogger.levels).toContain('warn');
    expect(defaultLogger.levels).toContain('error');
    expect(defaultLogger.prefix).toBe('2009-06-18T22:00:00.000Z');
  });
});
