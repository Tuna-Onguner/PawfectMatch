import {Component, Inject} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors, ValidatorFn, Validators
} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-adopt-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './adopt-dialog.component.html',
  styleUrl: './adopt-dialog.component.css'
})
export class AdoptDialogComponent {
  form: FormGroup;
  constructor(private snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<AdoptDialogComponent>) {
    this.form = new FormGroup({});
  }

  ngOnInit() {
    this.form = new FormGroup({
      'motivationScript': new FormControl(null),
      'motivationFile': new FormControl(null),
    }, this.atLeastOneValidator());
  }

  atLeastOneValidator(): ValidatorFn {
    console.log('atLeastOneValidator');
  return (control: AbstractControl): ValidationErrors | null => {
    const motivationScriptControl = control.get('motivationScript');
    const motivationFileControl = control.get('motivationFile');

    if ((motivationScriptControl && motivationScriptControl.value && motivationScriptControl.value.trim() !== '') ||
        (motivationFileControl && motivationFileControl.value && motivationFileControl.value.length > 0)) {
      return null;
    } else {
      return {'requireAtLeastOne': true};
    }
  };
}

  onSubmit() {
  if (this.form.valid) {
    this.snackBar.open('Application Complete: Your application has been successfully submitted.', 'Close', {
      duration: 3000,
    });
  }
  else {
    this.snackBar.open('Application Incomplete: Please fill out all required fields.', 'Close', {
      duration: 3000,
    });
  }
}
  closeDialog(): void {
    this.dialogRef.close();
  }
}
