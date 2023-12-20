import { Component, Inject } from '@angular/core';
import { BloggerApp } from '../../../__models/application_models'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-detail-blog-applications',
  standalone: true,
  imports: [],
  templateUrl: './detail-blog-applications.component.html',
  styleUrl: './detail-blog-applications.component.css'
})
export class DetailBlogApplicationsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public application: BloggerApp, private dialogRef: MatDialogRef<DetailBlogApplicationsComponent>) { }
  closeDialog(): void {
    this.dialogRef.close();
  }
}
