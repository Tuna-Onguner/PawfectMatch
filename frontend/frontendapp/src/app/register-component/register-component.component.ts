import { Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from "@angular/material/toolbar";
import {RouterLink} from "@angular/router";
import { AuthenticationService } from '../../services/authentication-services';
import { Router } from '@angular/router';

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
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}},
    AuthenticationService
  ]
})

export class RegisterComponentComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  errorMessages: string[] = [];

  constructor(private authService: AuthenticationService, private router: Router) { }
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
    const usernameControl = this.registerForm.get('username');
    const emailControl = this.registerForm.get('email');
    const passwordControl = this.registerForm.get('password');
    const phoneControl = this.registerForm.get('phone');

    const username = usernameControl ? usernameControl.value : null;
    const email = emailControl ? emailControl.value : null;
    const password = passwordControl ? passwordControl.value : null;
    const phone = phoneControl ? phoneControl.value : null;

    this.authService.adopterRegister(username, password, email, phone).subscribe({
      next: response => {
        console.log(response);
        if (response.status === 201) {
          // Handle the successful response
          alert('Successfully registered!');
          this.router.navigate(['/login']);
        } else {
          // Handle the error response
          this.errorMessages.push('Invalid username or password');
        }
      },
      error: err => {
        console.log(err);
        this.errorMessages.push('Invalid username or password');
      }
    });
  }
  }
}
