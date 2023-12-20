import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Appointments } from '../../../models/veterinarian_models';

@Component({
  selector: 'app-detail-appointments',
  templateUrl: './detail-appointments.component.html',
  styleUrl: './detail-appointments.component.css'
})
export class DetailAppointmentsComponent {
   constructor(@Inject(MAT_DIALOG_DATA) public appointment: Appointments, private dialogRef: MatDialogRef<DetailAppointmentsComponent>) { }

  closeDialog(): void {
    this.dialogRef.close();
  }
}