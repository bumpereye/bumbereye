import { Device } from 'src/devices/devices.shema';
import { Owner } from 'src/owners/owners.shema';

declare module 'express' {
  export interface Request {
    owner?: Owner;
    device?: Device;
  }
}
