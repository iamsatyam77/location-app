export interface LocationData {
  id: number;
  name: string;
  addressLine1: string;
  suiteNo: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNo: string;
  timeZone: string;
  facilityTimes: Date;
  appointmentPool: string;
}

export class Location {
  id: number;
  name: string;
  addressLine1: string;
  suiteNo: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNo: string;
  timeZone: string;
  facilityTimes: Date;
  appointmentPool: string;
}

export interface DataSourceUpdateInterface {
  location: LocationData;
  isUpdated: boolean;
}

export class DataSourceUpdate implements DataSourceUpdateInterface {
  location: Location;
  isUpdated: boolean;
  constructor() {
    this.location = new Location();
    this.isUpdated = false;
  }
}
