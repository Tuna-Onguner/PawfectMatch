import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatRadioModule} from "@angular/material/radio";
import {RouterLink} from "@angular/router";
@Component({
  selector: 'app-register-organization',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatRadioModule,
    RouterLink
  ],
  templateUrl: './register-organization.component.html',
  styleUrl: './register-organization.component.css'
})
export class RegisterOrganizationComponent {
  registerForm: FormGroup = new FormGroup({});
  errorMessages: string[] = [];

  ngOnInit() {
    this.registerForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required),
      'phone': new FormControl(null, Validators.required),
      'country': new FormControl(null, Validators.required),
      'state': new FormControl(null),
      'city': new FormControl(null, Validators.required),
      'street': new FormControl(null, Validators.required),

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
