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
      if (response.status === 200) {
      // Handle the successful response
      const data = response.body;
      if (data.role === 'admin') {
        this.router.navigate(['/admin-page']).then(r => console.log(r));
      } else if (data.role === 'user') {
        this.router.navigate(['/user-page']).then(r => console.log(r));
      } else {
        this.router.navigate(['/default-page']);
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
