import { Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from "@angular/material/toolbar";
import {RouterLink} from "@angular/router";
@Component({
  selector: 'app-register-component',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    RouterLink
  ],
  templateUrl: './register-component.component.html',
  styleUrl: './register-component.component.css',
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}}
  ]
})

export class RegisterComponentComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  errorMessages: string[] = [];
  ngOnInit() {
    this.registerForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required),
      'phone': new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    this.errorMessages = []; // clear previous error messages
  if (this.registerForm.valid) {
    alert('Form Submitted!');
    console.log(this.registerForm.value);
    // proceed with form submission
  }
  }
}
