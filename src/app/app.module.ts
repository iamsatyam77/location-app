import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationTableComponent } from './location-table/location-table.component';
import { AddLocationDialog } from './modals/add-location.component';
import { NgxIndexedDBModule, DBConfig } from 'ngx-indexed-db';
import { HttpClientModule } from '@angular/common/http';
import { LocationService } from './shared/location.service';
import { NotificationService } from './shared/notification.service';

const dbConfig: DBConfig = {
  name: 'LocationDB',
  version: 3,
  objectStoresMeta: [
    {
      store: 'locations',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'name', keypath: 'name', options: { unique: false } },
        { name: 'email', keypath: 'email', options: { unique: false } },
        {
          name: 'addresLine1',
          keypath: 'addresLine1',
          options: { unique: false },
        },
        { name: 'suiteNo', keypath: 'suiteNo', options: { unique: false } },
        {
          name: 'addressLine2',
          keypath: 'addressLine2',
          options: { unique: false },
        },
        { name: 'city', keypath: 'city', options: { unique: false } },
        { name: 'state', keypath: 'state', options: { unique: false } },
        { name: 'zipCode', keypath: 'zipCode', options: { unique: false } },
        { name: 'phoneNo', keypath: 'phoneNo', options: { unique: false } },
        { name: 'timeZone', keypath: 'timeZone', options: { unique: false } },
        {
          name: 'facilityTimes',
          keypath: 'facilityTimes',
          options: { unique: false },
        },
        {
          name: 'appointmentPool',
          keypath: 'appointmentPool',
          options: { unique: false },
        },
      ],
    },
  ],
};

@NgModule({
  declarations: [AppComponent, LocationTableComponent, AddLocationDialog],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    NgxIndexedDBModule.forRoot(dbConfig),
    ReactiveFormsModule,
  ],
  entryComponents: [AddLocationDialog],
  providers: [LocationService, NotificationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
