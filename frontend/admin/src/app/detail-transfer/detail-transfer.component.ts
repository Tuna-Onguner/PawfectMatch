import { Component, Inject, LOCALE_ID } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TransferringDonation } from '../../../models/applications-models';
@Component({
  selector: 'app-detail-transfer',
  standalone: true,
  imports: [],
  templateUrl: './detail-transfer.component.html',
  styleUrl: './detail-transfer.component.css'
})
export class DetailTransferComponent {
  constructor(
    public dialogRef: MatDialogRef<DetailTransferComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TransferringDonation,
    @Inject(LOCALE_ID) private locale: string
  ) {}
  onClose(): void {
    this.dialogRef.close();
  }
  formatAmount(amount: number | null): string {
    if (amount === null || amount === undefined) {
      return 'N/A'; // or any default value you prefer
    }

    return new Intl.NumberFormat(this.locale, {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }
}