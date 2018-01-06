import { browser, element, by } from 'protractor';

export class KetoHubPage {
  navigateTo() {
    return browser.get('/');
  }

  getTitle() {
    return browser.getTitle();
  }
}
