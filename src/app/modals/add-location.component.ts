import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocationService } from '../shared/location.service';
import { LocationData, DataSourceUpdate } from '../shared/location.model';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
})
export class AddLocationDialog {
  constructor(
    public service: LocationService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<AddLocationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: LocationData
  ) {}

  onSubmit() {
    if (this.service.form.valid) {
      const dataSourceUpdate: DataSourceUpdate = new DataSourceUpdate();
      const locationObject: LocationData = this.service.form.value;
      if (!this.service.form.get('id').value) {
        this.service.insertLocation(locationObject).subscribe((res: any) => {
          locationObject.id = res;
          dataSourceUpdate.isUpdated = false;
          dataSourceUpdate.location = locationObject;
          this.onUpdate(dataSourceUpdate);
        });
      } else {
        this.service.updateLocation(locationObject).subscribe((res: any) => {
          dataSourceUpdate.isUpdated = true;
          dataSourceUpdate.location = locationObject;
          this.onUpdate(dataSourceUpdate);
        });
      }
    }
  }

  onUpdate(dataSourceUpdate: DataSourceUpdate) {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.notificationService.success(':: Submitted successfully');
    this.dialogRef.close(dataSourceUpdate);
  }

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }
}
