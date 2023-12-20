// Import necessary Angular modules and components
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OverseeingReq } from '../../../__models/application_models';

@Component({
  selector: 'app-detail-oversee',
  templateUrl: './detail-oversee.component.html',
  styleUrls: ['./detail-oversee.component.css']
})
export class DetailOverseeComponent {
  constructor(
    public dialogRef: MatDialogRef<DetailOverseeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OverseeingReq
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
