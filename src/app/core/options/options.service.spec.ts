import { OptionsService } from './options.service';

describe('OptionsService', () => {
  let service: OptionsService;

  beforeEach(() => {
    service = new OptionsService();
  });

  it('exists', () => {
    expect(service).toBeTruthy();
  });

  describe('a route', () => {
    it('defaults to hidden', () => {
      expect(service.shouldDisplayRoute('sf-muni', '1AX')).toBeFalsy();
    });

    it('changes as apporpriate', () => {
      service.hideRoute('sf-muni', '1AX');
      expect(service.shouldDisplayRoute('sf-muni', '1AX')).toBeFalsy();
      service.showRoute('sf-muni', '1AX');
      expect(service.shouldDisplayRoute('sf-muni', '1AX')).toBeTruthy();
      service.showRoute('sf-muni', '1AX');
      expect(service.shouldDisplayRoute('sf-muni', '1AX')).toBeTruthy();
      service.hideRoute('sf-muni', '1AX');
      expect(service.shouldDisplayRoute('sf-muni', '1AX')).toBeFalsy();
    });
  });
});
