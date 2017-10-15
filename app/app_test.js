'use strict';

describe('ketoHub controller', function() {
  var rootDomain;
  var capitalize;
  var search;

  beforeEach(angular.mock.module('ketoHubApp'));

  beforeEach(angular.mock.inject(function($filter) {
    capitalize = $filter('capitalize');
    rootDomain = $filter('rootDomain');
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
