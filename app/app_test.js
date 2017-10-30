'use strict';

describe('ketoHub controller', function() {
  var timeSince;
  var rootDomain;
  var capitalize;
  var search;

  beforeEach(angular.mock.module('ketoHubApp'));

  beforeEach(angular.mock.inject(function($filter) {
    timeSince = $filter('timeSince');
    rootDomain = $filter('rootDomain');
    capitalize = $filter('capitalize');
    search = $filter('search');
  }));

  it('should capitalize lowercase strings', function() {
    expect(capitalize('cats')).toBe('Cats');
  });

  it('should leave uppercase strings uppercase', function() {
    expect(capitalize('HELLO DOLLY')).toBe('HELLO DOLLY');
  });

  it('should leave capitalized strings capitalized', function() {
    expect(capitalize('Welcome to KetoHub')).toBe('Welcome to KetoHub');
  });

  it('should use a floor of 1m', function() {
    jasmine.clock().mockDate(new Date('2010-01-01T00:00:00+00:00'));
    expect(timeSince('2009-12-31T23:59:59+00:00')).toBe('1 minute');
  });
  it('should round to the nearest value', function() {
    jasmine.clock().mockDate(new Date('2010-01-01T00:00:00+00:00'));
    expect(timeSince('2009-12-31T23:25:31+00:00')).toBe('34 minutes');
    expect(timeSince('2009-12-31T23:25:30+00:00')).toBe('35 minutes');

  });
  it('should use minutes for values less than 60 minutes', function() {
    jasmine.clock().mockDate(new Date('2010-01-01T00:00:00+00:00'));
    expect(timeSince('2009-12-31T23:00:31+00:00')).toBe('59 minutes');
    expect(timeSince('2009-12-31T23:00:30+00:00')).toBe('1 hour');
  });
  it('should use hours for values less than 24 hours', function() {
    jasmine.clock().mockDate(new Date('2010-01-01T00:00:00+00:00'));
    expect(timeSince('2009-12-31T00:30:01+00:00')).toBe('23 hours');
    expect(timeSince('2009-12-31T00:30:00+00:00')).toBe('1 day');
  });
  it('should use days for values less than 90 days', function() {
    jasmine.clock().mockDate(new Date('2010-01-01T00:00:00+00:00'));
    expect(timeSince('2009-10-04T00:00:00+00:00')).toBe('89 days');
    expect(timeSince('2009-10-03T11:59:59+00:00')).toBe('3 months');
  });
  it('should use months for values less than 12 months', function() {
    jasmine.clock().mockDate(new Date('2010-01-01T00:00:00+00:00'));
    expect(timeSince('2009-01-25T00:00:00+00:00')).toBe('11 months');
    expect(timeSince('2009-01-04T00:00:00+00:00')).toBe('1 year');
  });

  it('should remove protocol prefix from URL', function() {
    expect(rootDomain('http://foo.com')).toBe('foo.com');
    expect(rootDomain('https://foo.com')).toBe('foo.com');
  });

  it('should remove subdomains from URL', function() {
    expect(rootDomain('blog.foo.com')).toBe('foo.com');
    expect(rootDomain('www.bar.com')).toBe('bar.com');
    expect(rootDomain('members.newsletter.bar.com')).toBe('bar.com');
  });

  it('should remove path/query/fragment from URL', function() {
    expect(rootDomain('foo.com/u/active?name=joe#page1')).toBe('foo.com');
  });

  it('should remove port number from URL', function() {
    expect(rootDomain('foo.com:443')).toBe('foo.com');
  });

  it('should remove everything from URL', function() {
    expect(rootDomain('https://www.foo.com:443/bar?baz=1#z')).toBe('foo.com');
  });

  it('should match recipes with keyword in title', function() {
    expect(
        search([{'title': 'the foo recipe', 'ingredients': []}], 'foo').length)
      .toBe(1);
  });

  it('should match recipes with keyword in ingredients', function() {
    expect(
        search([
          {
            'title': 'the bar recipe',
            'ingredients': ['baz', 'the foo ingredient']
          }
        ], 'foo').length)
      .toBe(1);
  });

  it('should not match recipes that do not contain keyword', function() {
    expect(
        search([
          {
            'title': 'the bar recipe',
            'ingredients': ['baz', 'bam']
          }
        ], 'foo').length)
      .toBe(0);
  });
});
