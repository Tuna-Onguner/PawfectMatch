import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../__models/user_models' // Add this line
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-detail-user',
  standalone: true,
  imports: [],
  templateUrl: './detail-user.component.html',
  styleUrl: './detail-user.component.css'
})
export class DetailUserComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public user: User, private dialogRef: MatDialogRef<DetailUserComponent>,    private datePipe: DatePipe) { }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
