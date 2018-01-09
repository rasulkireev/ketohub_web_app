import { browser, protractor, element, by, $ } from 'protractor';

export class KetohubPage {
  navigateTo() {
    return browser.get('/');
  }

  getCategories() {
    return element.all(by.className('recipe-categories'));
  }

  getRecipes() {
    const recipesLoaded = protractor.ExpectedConditions.visibilityOf($('app-recipe-card'));
    browser.wait(recipesLoaded, 5000, 'Load recipes');
    return element.all(by.css('app-recipe-card'));
  }

}
