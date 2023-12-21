import {Component, Inject} from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {AuthenticationService} from "../../services/authentication-services";

@Component({
  selector: 'app-login-view',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  providers: [AuthenticationService],
  templateUrl: './login-view.component.html',
  styleUrl: './login-view.component.css'
})
export class LoginViewComponent {
    loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthenticationService) {
    this.loginForm = this.formBuilder.group({
      username: '',
      password: ''
    });
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
    const usernameControl = this.loginForm.get('username');
    const passwordControl = this.loginForm.get('password');

    const username = usernameControl ? usernameControl.value : null;
    const password = passwordControl ? passwordControl.value : null;
    this.authService.login(username, password).subscribe({
    next: response => {
      console.log(response);
      if (response.status === 200) {
      // Handle the successful response
      const data = response.body;
      //Decode the JWT token and store the user ID and role in local storage
      const token = data.access_token;
      //Also store the token in local storage
      localStorage.setItem('token', token)
      console.log(token);
      const tokenParts = token.split(/\./);
      const tokenDecoded = JSON.parse(window.atob(tokenParts[1]));
      const role = tokenDecoded.role;
      const userId = tokenDecoded.user_id;

      //Store the user ID and role in local storage
      localStorage.setItem('userId', userId);
      localStorage.setItem('role', role);

      

      if (role === 'admin') {
        this.router.navigate(['/user-administration']).then(r => console.log(r));
      } else if (role === 'adopter' || role === 'blogger' || role === 'expert') {
        this.router.navigate(['/main-adopter-page']).then(r => console.log(r));
      } else if (role === 'adoptionorganization') {
        this.router.navigate(['/home-organization']);
      } else if (role === 'veterinarian') {
        this.router.navigate(['/make-agreements']);
      }
    } else {
      // Handle other status codes
        this.router.navigate(['/register']);
    }
    },
    error: error => {
      // Handle the error
    }
});
  }
  }
}
