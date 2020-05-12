import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocationData } from './location.model';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  locationList: LocationData[];
  stateList: String[];
  acessToken = '';
  httpOptions1 = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'api-token':
        'ItCZY4b4d4DclC6DQ6Si0wEQ-YZ3kj7hK2V1vka1td2MMy897Tn9s54AteBQ0aYZGaI',
      'user-email': 'iamsatyam77@gmail.com',
    }),
  };
  constructor(
    private dbService: NgxIndexedDBService,
    private http: HttpClient
  ) {
    this.http
      .get(
        'https://www.universal-tutorial.com/api/getaccesstoken',
        this.httpOptions1
      )
      .subscribe((res) => {
        this.acessToken = res['auth_token'];
        let httpOptions2 = {
          headers: new HttpHeaders({
            Accept: 'application/json',
            Authorization: `Bearer ${this.acessToken}`,
          }),
        };
        this.http
          .get(
            'https://www.universal-tutorial.com/api/states/United States',
            httpOptions2
          )
          .subscribe((res: any) => {
            this.stateList = res.map((state) => state.state_name);
          });
      });
  }

  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    addressLine1: new FormControl('', Validators.required),
    suiteNo: new FormControl('', [Validators.required]),
    addressLine2: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    state: new FormControl('Alabama', Validators.required),
    zipCode: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern(/^[0-9]{5}(?:-[0-9]{4})?$/),
    ]),
    phoneNo: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}$/),
    ]),
    timeZone: new FormControl(''),
    facilityTimes: new FormControl(''),
    appointmentPool: new FormControl(''),
  });

  initializeFormGroup() {
    this.form.setValue({
      id: '',
      name: '',
      addressLine1: '',
      suiteNo: '',
      addressLine2: '',
      phoneNo: '',
      city: '',
      state: 'Alabama',
      zipCode: '',
      timeZone: '',
      facilityTimes: '',
      appointmentPool: '',
    });
  }

  getLocations(): Observable<any> {
    const subscription = from(this.dbService.getAll('locations'));
    return subscription;
  }

  insertLocation(location): Observable<any> {
    const locationObject = {
      name: location.name,
      addressLine1: location.addressLine1,
      suiteNo: location.suiteNo,
      addressLine2: location.addressLine2,
      phoneNo: location.phoneNo,
      city: location.city,
      state: location.state,
      zipCode: location.zipCode,
      timeZone: location.timeZone,
      facilityTimes: location.facilityTimes,
      appointmentPool: location.appointmentPool,
    };
    const subscription = from(this.dbService.add('locations', locationObject));
    return subscription;
  }

  updateLocation(location: LocationData): Observable<any> {
    const locationObject = {
      id: location.id,
      name: location.name,
      addressLine1: location.addressLine1,
      suiteNo: location.suiteNo,
      addressLine2: location.addressLine2,
      phoneNo: location.phoneNo,
      city: location.city,
      state: location.state,
      zipCode: location.zipCode,
      timeZone: location.timeZone,
      facilityTimes: location.facilityTimes,
      appointmentPool: location.appointmentPool,
    };

    const subscription = from(
      this.dbService.update('locations', locationObject)
    );
    return subscription;
  }

  deleteLocation(id): Observable<any> {
    const subscription = from(this.dbService.deleteRecord('locations', id));
    return subscription;
  }

  populateForm(location) {
    this.form.setValue(location);
  }
}
