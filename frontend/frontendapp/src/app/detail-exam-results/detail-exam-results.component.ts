// upload-file-dialog.component.ts
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-detail-exam-results',
  templateUrl: './detail-exam-results.component.html',
  styleUrl: './detail-exam-results.component.css'
})
export class DetailExamResultsComponent {
  selectedFile: File | null = null;
  constructor(public dialogRef: MatDialogRef<DetailExamResultsComponent>) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    // Add logic to handle file upload here
    console.log('File uploaded:', this.selectedFile);
    // You can add further logic like uploading to a server, etc.
    this.dialogRef.close();
  }
}
