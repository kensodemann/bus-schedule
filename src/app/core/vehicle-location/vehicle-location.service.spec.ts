import { Http, Response, ResponseOptions, RequestMethod, BaseRequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { VehicleLocationService } from './vehicle-location.service';

describe('VehicleLocationService', () => {
  let mockBackend: MockBackend;
  let service: VehicleLocationService;

  beforeEach(() => {
    const opt = new BaseRequestOptions();
    mockBackend = new MockBackend();
    const http = new Http(mockBackend, opt);

    service = new VehicleLocationService(http);
  });

  it('exists', () => {
    expect(service).toBeTruthy();
  });

  describe('load', () => {
    it('loads the data', () => {
      let connection: MockConnection;
      mockBackend.connections.subscribe(c => connection = c);
      service.load('umn-twin');
      expect(connection.request.url)
        .toEqual('http://webservices.nextbus.com/service/publicXMLFeed?command=vehicleLocations&a=umn-twin&t=0');
      expect(connection.request.method).toEqual(RequestMethod.Get);
    });

    it('emits the locations', () => {
      let body = '<body lastTime="119395003">';
      body += location('42', 'wauk', 13.9950, -122.0050);
      body += location('314', 'wauk', 73.9950, -122.0050);
      body += location('73', 'mad', 75.223, -132.0050);
      body += location('1138', 'wauk', 77.9950, -127.753);
      body += '</body>';
      let connection: MockConnection;
      mockBackend.connections.subscribe(c => connection = c);
      let result: Array<any>;
      service.updates.subscribe(r => result = r);
      service.load('umn-twin');
      connection.mockRespond(new Response(new ResponseOptions({
        status: 200,
        body: body
      })));
      expect(result).toEqual([{
        id: '42',
        routeTag: 'wauk',
        dirTag: '30___O_S10',
        lat: '13.995',
        lon: '-122.005',
        secsSinceReport: '20',
        predictable: 'true',
        heading: '350',
        speedKmHr: '0'
      }, {
        id: '73',
        routeTag: 'mad',
        dirTag: '30___O_S10',
        lat: '75.223',
        lon: '-132.005',
        secsSinceReport: '20',
        predictable: 'true',
        heading: '350',
        speedKmHr: '0'
      }, {
        id: '314',
        routeTag: 'wauk',
        dirTag: '30___O_S10',
        lat: '73.995',
        lon: '-122.005',
        secsSinceReport: '20',
        predictable: 'true',
        heading: '350',
        speedKmHr: '0'
      }, {
        id: '1138',
        routeTag: 'wauk',
        dirTag: '30___O_S10',
        lat: '77.995',
        lon: '-127.753',
        secsSinceReport: '20',
        predictable: 'true',
        heading: '350',
        speedKmHr: '0'
      }]);
    });

    it('handles a single vehicle location', () => {
      let body = '<body><lastTime time="1499622348293" />';
      body += location('314', 'wauk', 73.9950, -122.0050);
      body += '</body>';
      let connection: MockConnection;
      mockBackend.connections.subscribe(c => connection = c);
      let result: Array<any>;
      service.updates.subscribe(r => result = r);
      service.load('umn-twin');
      connection.mockRespond(new Response(new ResponseOptions({
        status: 200,
        body: body
      })));
      expect(result).toEqual([{
        id: '314',
        routeTag: 'wauk',
        dirTag: '30___O_S10',
        lat: '73.995',
        lon: '-122.005',
        secsSinceReport: '20',
        predictable: 'true',
        heading: '350',
        speedKmHr: '0'
      }]);
    });

    it('handles an empty list', () => {
      const body = '<body><lastTime time="1499622348293" /></body>';
      let connection: MockConnection;
      mockBackend.connections.subscribe(c => connection = c);
      let result: Array<any>;
      service.updates.subscribe(r => result = r);
      service.load('umn-twin');
      connection.mockRespond(new Response(new ResponseOptions({
        status: 200,
        body: body
      })));
      expect(result).toEqual([])
    });
  });

  describe('refresh', () => {
    beforeEach(() => {
      let body = '<body><lastTime time="1499622348293" />';
      body += location('42', 'wauk', 13.9950, -122.0050);
      body += location('314', 'wauk', 73.9950, -122.0050);
      body += location('73', 'mad', 75.223, -132.0050);
      body += location('1138', 'wauk', 77.9950, -127.753);
      body += '</body>';
      let connection: MockConnection;
      mockBackend.connections.subscribe(c => connection = c);
      service.load('umn-twin');
      connection.mockRespond(new Response(new ResponseOptions({
        status: 200,
        body: body
      })));
    });

    it('gets the locations changes since the last time fetched', () => {
      let connection: MockConnection;
      mockBackend.connections.subscribe(c => connection = c);
      service.refresh();
      expect(connection.request.url)
        .toEqual('http://webservices.nextbus.com/service/publicXMLFeed?command=vehicleLocations&a=umn-twin&t=1499622348293');
      expect(connection.request.method).toEqual(RequestMethod.Get);
    });

    it('emits the updated vehicle locations, including currntly non-moving vehicles it knows about', () => {
       let body = '<body><lastTime time="1499622548293" />';
       body += location('73', 'mad', 75.593, -133.1132);
      body += location('320', 'mad', 85.593, -142.7783);
      body += '</body>';
      let connection: MockConnection;
      mockBackend.connections.subscribe(c => connection = c);
      let result: Array<any>;
      service.updates.subscribe(r => result = r);
      service.refresh();
      connection.mockRespond(new Response(new ResponseOptions({
        status: 200,
        body: body
      })));
      expect(result).toEqual([{
        id: '42',
        routeTag: 'wauk',
        dirTag: '30___O_S10',
        lat: '13.995',
        lon: '-122.005',
        secsSinceReport: '20',
        predictable: 'true',
        heading: '350',
        speedKmHr: '0'
      }, {
        id: '73',
        routeTag: 'mad',
        dirTag: '30___O_S10',
        lat: '75.593',
        lon: '-133.1132',
        secsSinceReport: '20',
        predictable: 'true',
        heading: '350',
        speedKmHr: '0'
      }, {
        id: '314',
        routeTag: 'wauk',
        dirTag: '30___O_S10',
        lat: '73.995',
        lon: '-122.005',
        secsSinceReport: '20',
        predictable: 'true',
        heading: '350',
        speedKmHr: '0'
      }, {
        id: '320',
        routeTag: 'mad',
        dirTag: '30___O_S10',
        lat: '85.593',
        lon: '-142.7783',
        secsSinceReport: '20',
        predictable: 'true',
        heading: '350',
        speedKmHr: '0'
      }, {
        id: '1138',
        routeTag: 'wauk',
        dirTag: '30___O_S10',
        lat: '77.995',
        lon: '-127.753',
        secsSinceReport: '20',
        predictable: 'true',
        heading: '350',
        speedKmHr: '0'
      }]);
    });
  });

  function location(id: string, route: string, lat: number, lon: number) {
    return `<vehicle id="${id}" routeTag="${route}" dirTag="30___O_S10" lat="${lat}" lon="${lon}" ` +
      `secsSinceReport="20" predictable="true" heading="350" speedKmHr="0"/>`;
  }


});
