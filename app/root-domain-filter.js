'use strict';

angular.module('ketoHubApp.root-domain-filter', [])
.filter('rootDomain', function() {
  var extractHostname = function(url) {
    var hostname;

    // Remove protocol, and get hostname.
    if (url.indexOf('://') > -1) {
      hostname = url.split('/')[2];
    } else {
      hostname = url.split('/')[0];
    }

    // Strip port number.
    hostname = hostname.split(':')[0];

    // Strip query string.
    hostname = hostname.split('?')[0];

    return hostname;
  };

  return function(url) {
    var domain = extractHostname(url);
    var domainParts = domain.split('.');
    var domainsPartsLength = domainParts.length;

    if (domainsPartsLength > 2) {
      domain = domainParts[domainsPartsLength - 2] + '.' +
               domainParts[domainsPartsLength - 1];
    }
    return domain;
  };
});
