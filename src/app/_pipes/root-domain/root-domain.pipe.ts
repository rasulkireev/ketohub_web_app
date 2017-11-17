import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rootDomain',
})
export class RootDomainPipe implements PipeTransform {

  private extractHostname(url) {
    let hostname;

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
  }

  transform(url: any, args?: any): any {
    if (!url) {
      return;
    }
    let domain = this.extractHostname(url);
    const domainParts = domain.split('.');
    const domainsPartsLength = domainParts.length;

    if (domainsPartsLength > 2) {
      domain = domainParts[domainsPartsLength - 2] + '.' +
        domainParts[domainsPartsLength - 1];
    }
    return domain;
  }

}
