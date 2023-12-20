import {Component, Inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Blog} from "../../../__models/functional_models";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-blog-create-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule
  ],
  templateUrl: './blog-create-dialog.component.html',
  styleUrl: './blog-create-dialog.component.css'
})
export class BlogCreateDialogComponent {
  blogForm : FormGroup;

  constructor(
    public dialogRef: MatDialogRef<BlogCreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mode: number, blog: Blog },
  ) {
    this.blogForm = new FormGroup({});
  }
  ngOnInit(): void {
    this.blogForm= new FormGroup({
    "blogTitle": new FormControl('', Validators.required),
    "blogImage": new FormControl(),
    "blogFieldName": new FormControl('', Validators.required),
    "blogContent": new FormControl('', Validators.required),
  });
    if (this.data.mode === 2) {
      this.blogForm.controls['blogTitle'].setValue(this.data.blog.blogTitle);
      this.blogForm.controls['blogImage'].setValue(this.data.blog.blogImage);
      this.blogForm.controls['blogFieldName'].setValue(this.data.blog.blogFieldName);
      this.blogForm.controls['blogContent'].setValue(this.data.blog.blogContent);
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.blogForm.valid) {
      if (this.data.mode === 2) {
        this.data.blog.blogTitle = this.blogForm.controls['blogTitle'].value;
        if (this.blogForm.controls['blogImage'].value !== '') {
          this.data.blog.blogImage = this.blogForm.controls['blogImage'].value;
        }
        this.data.blog.blogFieldName = this.blogForm.controls['blogFieldName'].value;
        this.data.blog.blogContent = this.blogForm.controls['blogContent'].value;
      }
      this.dialogRef.close(true);
    }
  }
}
