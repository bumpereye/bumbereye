import { Device } from 'src/devices/devices.shema';
import { Owner } from '../../owners/owners.shema';

declare module 'express' {
  export interface Request {
    owner?: Owner;
    device?: Device;
  }
}
