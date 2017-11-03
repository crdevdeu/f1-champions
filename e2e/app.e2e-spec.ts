import { F1ChampionsPage } from './app.po';

describe('f1-champions App', () => {
  let page: F1ChampionsPage;

  beforeEach(() => {
    page = new F1ChampionsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
