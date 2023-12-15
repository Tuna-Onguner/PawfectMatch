import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-blog-dialog',
  standalone: true,
  imports: [
    MatButtonModule
  ],
  templateUrl: './blog-dialog.component.html',
  styleUrl: './blog-dialog.component.css'
})
export class BlogDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<BlogDialogComponent>) { }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
