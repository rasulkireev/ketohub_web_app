'use strict';

describe('Test rootDomain filter', function() {
  var rootDomainFilter;

  beforeEach(angular.mock.module('ketoHubApp'));

  beforeEach(inject(function($filter) {
    console.log('called beforeEach');
    rootDomainFilter = function() {
      console.log('printing filter\n')
      console.log($filter);
      console.log('printing rootDomain\n')
      console.log($filter('rootDomain'));
      return $filter('rootDomain');
    };
  }));

  it('reduces full URL to just root domain', function() {
    expect(rootDomainFilter('https://www.google.com')).toEqual('google.com');
  });
});
