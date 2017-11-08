import { KetohubPage } from './app.po';

describe('ketohub App', () => {
  let page: KetohubPage;

  beforeEach(() => {
    page = new KetohubPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
