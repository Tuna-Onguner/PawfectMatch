import { Component, Inject, LOCALE_ID } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GrantApplication } from '../../../models/applications-models';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-detail-grantee-applications',
  standalone: true,
  imports: [],
  templateUrl: './detail-grantee-applications.component.html',
  styleUrls: ['./detail-grantee-applications.component.css'] // Change styleUrl to styleUrls
})
export class DetailGranteeApplicationsComponent {
  constructor(
    public dialogRef: MatDialogRef<DetailGranteeApplicationsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GrantApplication,
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
