import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';


@Component({
  selector: 'app-container-create-dialog',
  templateUrl: './container-create-dialog.component.html',
  styleUrls: ['./container-create-dialog.component.css']
})
export class ContainerCreateDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ContainerCreateDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
      // dialogRef.disableClose = true;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}

