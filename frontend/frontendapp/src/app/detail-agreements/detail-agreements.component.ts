// detail-agreements.component.ts

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AgreementReq } from '../../../__models/application_models';

@Component({
  selector: 'app-detail-agreements',
  templateUrl: './detail-agreements.component.html',
  styleUrls: ['./detail-agreements.component.css']
})
export class DetailAgreementsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public agreement: AgreementReq,private dialogRef: MatDialogRef<DetailAgreementsComponent>) { }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
