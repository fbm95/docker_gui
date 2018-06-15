import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule, MatDialogModule,
  MatInputModule, MatPaginatorModule, MatProgressBarModule,
  MatProgressSpinnerModule, MatSelectModule, MatSnackBarModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {MatStepperModule} from '@angular/material/stepper';


@NgModule({
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSelectModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatStepperModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSelectModule
  ]
})
export class MaterialModule { }
