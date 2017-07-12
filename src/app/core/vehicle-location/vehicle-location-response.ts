import { VehicleLocation } from './vehicle-location';

export interface VehicleLoctationResponse {
  lastTime: number,
  locations: Array<VehicleLocation>
}
