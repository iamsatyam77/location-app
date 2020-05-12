import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddLocationDialog } from '../modals/add-location.component';
import { LocationService } from '../shared/location.service';
import { LocationData } from '../shared/location.model';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-location-table',
  templateUrl: './location-table.component.html',
  styleUrls: ['./location-table.component.css'],
})
export class LocationTableComponent {
  displayedColumns = ['id', 'name', 'addressLine1', 'phoneNo', 'action'];
  dataSource: MatTableDataSource<LocationData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('tableMat') table: MatTable<any>;

  constructor(
    public dialog: MatDialog,
    public service: LocationService,
    private notificationService: NotificationService
  ) {
    this.service.getLocations().subscribe((locationList: LocationData[]) => {
      this.dataSource = new MatTableDataSource(locationList);
    });
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  openDialog() {
    this.service.initializeFormGroup();

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';

    const dialogRef = this.dialog.open(AddLocationDialog, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        if (data.isUpdated) {
          let index = this.dataSource.data.findIndex(
            (i) => i.id == data.location.id
          );
          this.dataSource.data[index] = data.location;
        } else {
          this.dataSource.data.push(data.location);
        }
        this.table.renderRows();
      }
    });
  }

  onEdit(row: LocationData) {
    this.service.populateForm(row);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';

    const dialogRef = this.dialog.open(AddLocationDialog, dialogConfig);
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        if (data.isUpdated) {
          let index = this.dataSource.data.findIndex(
            (i) => i.id == data.location.id
          );
          this.dataSource.data[index] = data.location;
        } else {
          this.dataSource.data.push(data.location);
        }
        this.table.renderRows();
      }
    });
  }

  onDelete(id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.service.deleteLocation(id).subscribe((res) => {
        let index = this.dataSource.data.findIndex((i) => i.id == id);
        this.dataSource.data.splice(index, 1);
        this.table.renderRows();
        this.notificationService.warn('! Deleted successfully');
      });
    }
  }
}
