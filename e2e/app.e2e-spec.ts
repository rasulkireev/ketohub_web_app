import { browser } from 'protractor';
import { KetohubPage } from './app.po';

describe('ketohub App', () => {
  let page: KetohubPage;

  beforeEach(() => {

    /**
     * turns off synchronization, a workaround to make protractor work with angularfire
     * see https://github.com/angular/protractor/issues/4300
     */
    browser.waitForAngularEnabled(false);

    page = new KetohubPage();
  });

  it('should display categories', () => {
    page.navigateTo();
    expect(page.getCategories().count()).toBeGreaterThan(0);
  });

  it('should load recipes', () => {
    page.navigateTo();
    page.waitForRecipes().then(() => {
      expect(page.getRecipes().count()).toBeGreaterThan(0);
    });
  });
});
