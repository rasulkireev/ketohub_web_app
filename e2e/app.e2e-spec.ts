import { KetoHubPage } from './app.po';

describe('ketohub App', () => {
  let page: KetoHubPage;

  beforeEach(() => {
    page = new KetoHubPage();
    page.navigateTo();
  });

  it('should have right title', () => {
    page.getTitle()
      .then((title: string) => {
        expect(title).toEqual('KetoHub');
      });
  });

});
