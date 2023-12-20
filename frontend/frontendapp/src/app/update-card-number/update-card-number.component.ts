import {Component, Inject, NgModule} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE, MAT_NATIVE_DATE_FORMATS,
  MatNativeDateModule,
  NativeDateAdapter
} from '@angular/material/core';

@Component({
  selector: 'app-update-card-number',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatNativeDateModule,
  ],
  templateUrl: './update-card-number.component.html',
  styleUrl: './update-card-number.component.css',
  providers: [
    { provide: DateAdapter, useClass: NativeDateAdapter, deps: [MAT_DATE_LOCALE]},
    { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS}
  ],
})
export class UpdateCardNumberComponent {
  form: FormGroup;

  constructor(@Inject(DateAdapter) private dateAdapter: DateAdapter<MatNativeDateModule>) {
    this.form = new FormGroup({
      cardNumber: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{16}$/)]),
      cvv: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{3}$/)]),
      expirationDate: new FormControl('', Validators.required)
    });
  }
}
