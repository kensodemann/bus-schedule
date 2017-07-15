import { MarkerCollection } from './marker-collection';
import { VehicleLocation } from '../../core/vehicle-locations/vehicle-location';

window['google'] = {
  maps: {
    LatLng: function() { },
    Map: function() { },
    MapTypeId: {
      ROADMAP: 1
    },
    Marker: function() { }
  }
};

declare var google: any;

describe('MarkerCollection', () => {
  let testVehicle: VehicleLocation;

  beforeEach(() => {
    initializeTestData();
  });

  it('exists', () => {
    const m = new MarkerCollection({});
    expect(m).toBeTruthy();
  });

  describe('merge', () => {
    it('adds a new marker', () => {
      const map = { name: 'I am map' };
      const m = new MarkerCollection(map);
      spyOn(google.maps, 'LatLng').and.returnValue({
        lat: testVehicle.lat,
        lng: testVehicle.lon
      });
      spyOn(google.maps, 'Marker').and.returnValue({});
      m.merge(testVehicle);
      expect(google.maps.LatLng).toHaveBeenCalledTimes(1);
      expect(google.maps.LatLng).toHaveBeenCalledWith(testVehicle.lat, testVehicle.lon);
      expect(google.maps.Marker).toHaveBeenCalledTimes(1);
      expect(google.maps.Marker).toHaveBeenCalledWith({
        position: { lat: testVehicle.lat, lng: testVehicle.lon },
        map: map,
        title: testVehicle.id
      });
    });

    it('moves an existing marker', () => {
      const map = { name: 'I am map' };
      const m = new MarkerCollection(map);
      spyOn(google.maps, 'LatLng').and.returnValue({
        lat: testVehicle.lat,
        lng: testVehicle.lon
      });
      const marker = { setPosition: function() { } };
      spyOn(google.maps, 'Marker').and.returnValue(marker);
      m.merge(testVehicle);
      spyOn(marker, 'setPosition');
      testVehicle.lat = '74';
      testVehicle.lon = '-121.98';
      m.merge(testVehicle);
      expect(marker.setPosition).toHaveBeenCalledTimes(1);
    });

    it('adds a new marker if a vehicle changes route', () => {

    });

    it('removes the old marker if a vehicle changes route', () => {

    });
  });

  function initializeTestData() {
    testVehicle = {
      id: '314',
      routeTag: 'wauk',
      dirTag: '30___O_S10',
      lat: '73.995',
      lon: '-122.005',
      secsSinceReport: '20',
      predictable: 'true',
      heading: '350',
      speedKmHr: '0'
    };
  }
});
