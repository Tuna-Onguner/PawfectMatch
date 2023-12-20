import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Adopter} from "../../../__models/user_models";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE, MAT_NATIVE_DATE_FORMATS,
  MatNativeDateModule,
  NativeDateAdapter
} from '@angular/material/core';
@Component({
  selector: 'app-profile-view',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule
  ],
  providers: [
    { provide: DateAdapter, useClass: NativeDateAdapter, deps: [MAT_DATE_LOCALE]},
    { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS}
  ],
  templateUrl: './profile-view.component.html',
  styleUrl: './profile-view.component.css'
})
export class ProfileViewComponent {
  form: FormGroup;
  adopter: Adopter;

  constructor(@Inject(DateAdapter) private dateAdapter: DateAdapter<MatNativeDateModule>) {
    this.form = new FormGroup({});
    this.adopter = <Adopter>{};
  }
  ngOnInit() {
    this.adopter = this.getAdopter(); // Replace with your actual logic to fetch the adopter information

    this.form = new FormGroup({
      userName: new FormControl(this.adopter.userName),
      phoneNumber: new FormControl(this.adopter.phoneNumber),
      email: new FormControl({value: this.adopter.email, disabled: true}),
      cardNumber: new FormControl(this.adopter.cardNumber, Validators.pattern(/^[0-9]{16}$/)),
      cvv: new FormControl(this.adopter.cvv, Validators.pattern(/^[0-9]{3}$/)),
      expirationDate: new FormControl(this.adopter.expirationDate),
    });
  }

  getAdopter(): Adopter {
    // Placeholder function, replace with your actual logic to fetch the adopter information
    return {
      userId: 1,
      userName: 'John Doe',
      phoneNumber: '1234567890',
      email: 'john.doe@example.com',
      password: 'password',
      adopterId: 1,
      cardNumber: '1234567890098765',
      cvv: '123',
      expirationDate: new Date()
    };
  }
}
