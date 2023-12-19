import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Reservation } from '../../../__models/functional_models';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-detail-appointments',
  templateUrl: './detail-appointments.component.html',
  styleUrl: './detail-appointments.component.css'
})
export class DetailAppointmentsComponent {
  
   constructor(@Inject(MAT_DIALOG_DATA) public appointment: Reservation,private datePipe: DatePipe, private dialogRef: MatDialogRef<DetailAppointmentsComponent>) { }
   reservation: any;
  closeDialog(): void {
    this.dialogRef.close();
  }
}