'use strict';

describe('ketoHub controller', function() {
  var capitalize;

  beforeEach(angular.mock.module('ketoHubApp'));

  beforeEach(angular.mock.inject(function($filter) {
    capitalize = $filter('capitalize');
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
});
