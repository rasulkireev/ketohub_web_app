import { browser, protractor, element, by, $ } from 'protractor';

export class KetohubPage {
  navigateTo() {
    return browser.get('/');
  }

  getCategories() {
    return element.all(by.className('recipe-categories'));
  }

  waitForRecipes() {
    const recipesLoaded = protractor.ExpectedConditions.visibilityOf($('app-recipe-card'));
    return browser.wait(recipesLoaded, 5000, 'Load recipes');
  }

  getRecipes() {
    return element.all(by.css('app-recipe-card'));
  }

}
