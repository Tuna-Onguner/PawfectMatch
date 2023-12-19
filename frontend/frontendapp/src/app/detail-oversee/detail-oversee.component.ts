// Import necessary Angular modules and components
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OverseeingReq } from '../../../__models/application_models';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-detail-oversee',
  templateUrl: './detail-oversee.component.html',
  styleUrls: ['./detail-oversee.component.css']
})
export class DetailOverseeComponent {
  constructor(
    public dialogRef: MatDialogRef<DetailOverseeComponent>,
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: OverseeingReq
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
