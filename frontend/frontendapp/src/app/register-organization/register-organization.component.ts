import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatRadioModule} from "@angular/material/radio";
import { AuthenticationService } from '../../services/authentication-services';
import { Router } from '@angular/router';
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
  providers: [AuthenticationService],
  templateUrl: './register-organization.component.html',
  styleUrl: './register-organization.component.css'
})
export class RegisterOrganizationComponent {
  registerForm: FormGroup = new FormGroup({});
  errorMessages: string[] = [];
  constructor(private authService: AuthenticationService, private router: Router) { }

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
      'user_type': new FormControl(null, Validators.required),
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
      const countryControl = this.registerForm.get('country');
      const stateControl = this.registerForm.get('state');
      const cityControl = this.registerForm.get('city');
      const streetControl = this.registerForm.get('street');
      const userTypeControl = this.registerForm.get('user_type');
      const username = usernameControl ? usernameControl.value : null;
      const email = emailControl ? emailControl.value : null;
      const password = passwordControl ? passwordControl.value : null;
      const phone = phoneControl ? phoneControl.value : null;
      const country = countryControl ? countryControl.value : null;
      const state = stateControl ? stateControl.value : null;
      const city = cityControl ? cityControl.value : null;
      const street = streetControl ? streetControl.value : null;
      const userType = userTypeControl ? userTypeControl.value : null;
      console.log(userType);
      const is_vet = userType === 'Veterinarian';
      console.log(is_vet);

      this.authService.otherRegister(username, password, email, phone, street, city, country, state, is_vet).subscribe({
        next: response => {
          console.log(response);
          if (response.status === 201) {
            // Handle the successful response
            alert('Successfully registered!');
            //Navigate to login page
            this.router.navigate(['/login']);
          } else {
            // Handle the error response
            this.errorMessages.push('Invalid username or password');
          }
        },
        error: error => {
          // Handle the error response
          this.errorMessages.push('Invalid username or password');
        }
      });
    }
  }
}
