import { TimeSincePipe } from './time-since.pipe';

describe('TimeSincePipe', () => {

  const pipe = new TimeSincePipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should use a floor of 1m', function() {
    jasmine.clock().mockDate(new Date('2010-01-01T00:00:00+00:00'));
    expect(pipe.transform('2009-12-31T23:59:59+00:00')).toBe('1 minute');
  });

  it('should round to the nearest value', function() {
    jasmine.clock().mockDate(new Date('2010-01-01T00:00:00+00:00'));
    expect(pipe.transform('2009-12-31T23:25:31+00:00')).toBe('34 minutes');
    expect(pipe.transform('2009-12-31T23:25:30+00:00')).toBe('35 minutes');

  });

  it('should use minutes for values less than 60 minutes', function() {
    jasmine.clock().mockDate(new Date('2010-01-01T00:00:00+00:00'));
    expect(pipe.transform('2009-12-31T23:00:31+00:00')).toBe('59 minutes');
    expect(pipe.transform('2009-12-31T23:00:30+00:00')).toBe('1 hour');
  });

  it('should use hours for values less than 24 hours', function() {
    jasmine.clock().mockDate(new Date('2010-01-01T00:00:00+00:00'));
    expect(pipe.transform('2009-12-31T00:30:01+00:00')).toBe('23 hours');
    expect(pipe.transform('2009-12-31T00:30:00+00:00')).toBe('1 day');
  });

  it('should use days for values less than 90 days', function() {
    jasmine.clock().mockDate(new Date('2010-01-01T00:00:00+00:00'));
    expect(pipe.transform('2009-10-04T00:00:00+00:00')).toBe('89 days');
    expect(pipe.transform('2009-10-03T11:59:59+00:00')).toBe('3 months');
  });

  it('should use months for values less than 12 months', function() {
    jasmine.clock().mockDate(new Date('2010-01-01T00:00:00+00:00'));
    expect(pipe.transform('2009-01-25T00:00:00+00:00')).toBe('11 months');
    expect(pipe.transform('2009-01-04T00:00:00+00:00')).toBe('1 year');
  });
});
