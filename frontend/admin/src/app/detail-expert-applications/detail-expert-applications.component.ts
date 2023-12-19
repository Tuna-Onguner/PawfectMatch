import { Component, Inject } from '@angular/core';
import { expertApplications } from '../../../models/applications-models';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-detail-expert-applications',
  standalone: true,
  imports: [],
  templateUrl: './detail-expert-applications.component.html',
  styleUrl: './detail-expert-applications.component.css'
})
export class DetailExpertApplicationsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public application: expertApplications, private dialogRef: MatDialogRef<DetailExpertApplicationsComponent>) { }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
