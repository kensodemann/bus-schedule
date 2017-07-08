import { BusSchedulePage } from './app.po';

describe('bus-schedule App', () => {
  let page: BusSchedulePage;

  beforeEach(() => {
    page = new BusSchedulePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
