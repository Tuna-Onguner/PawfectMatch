import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AgreementReq } from '../../../__models/application_models';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-detail-vet-agreement',
  standalone: true,
  templateUrl: './detail-vet-agreement.component.html',
  styleUrls: ['./detail-vet-agreement.component.css'],
})
export class DetailVetAgreementComponent {
  constructor(
    public dialogRef: MatDialogRef<DetailVetAgreementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AgreementReq,
    private datePipe: DatePipe  // Inject DatePipe directly
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
  }
}
