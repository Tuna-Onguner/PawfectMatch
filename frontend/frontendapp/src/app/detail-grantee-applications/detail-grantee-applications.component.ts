import { Component, Inject, LOCALE_ID } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GranteeApp } from '../../../__models/application_models';
import { CurrencyPipe } from '@angular/common';
import { DatePipe } from '@angular/common';


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
    @Inject(MAT_DIALOG_DATA) public data: GranteeApp,
    private datePipe: DatePipe,
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
