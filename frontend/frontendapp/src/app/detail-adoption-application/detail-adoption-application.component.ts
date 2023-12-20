import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdoptionApplication } from '../../../models/applications'; // Replace with the correct path
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-detail-adoption-application',
  templateUrl: './detail-adoption-application.component.html',
  styleUrls: ['./detail-adoption-application.component.css'],
  standalone: true,
  imports: [
    // Other modules
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
  ],
})
export class DetailAdoptionApplicationComponent {
  constructor(
    public dialogRef: MatDialogRef<DetailAdoptionApplicationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AdoptionApplication
  ) {}
  closeDialog(): void {
    this.dialogRef.close();
  }
}
