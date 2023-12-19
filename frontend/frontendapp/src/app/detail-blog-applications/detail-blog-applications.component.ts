import { Component, Inject } from '@angular/core';
import { blogApplications } from '../../../models/applications-models';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-detail-blog-applications',
  standalone: true,
  imports: [],
  templateUrl: './detail-blog-applications.component.html',
  styleUrl: './detail-blog-applications.component.css'
})
export class DetailBlogApplicationsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public application: blogApplications, private dialogRef: MatDialogRef<DetailBlogApplicationsComponent>) { }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
