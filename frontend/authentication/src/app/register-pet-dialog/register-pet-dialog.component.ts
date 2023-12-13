import {Component, OnInit} from '@angular/core';
import {MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import {
  AbstractControl, FormBuilder,
  FormControl,
  FormGroup,
  FormsModule, NgForm,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {MatSliderModule} from "@angular/material/slider";

@Component({
  selector: 'app-register-pet-dialog',
  templateUrl: './register-pet-dialog.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSliderModule,
    MatDialogContent
  ],
  styleUrls: ['./register-pet-dialog.component.css']
})
export class RegisterPetDialogComponent implements OnInit{

  petForm: FormGroup;
  petSizes = ['Large', 'Medium', 'Small'];
  petTypes = ['Dog', 'Cat', 'Other'];
  petBreeds = ['Breed1', 'Breed2', 'Breed3']; // Replace with actual breeds
  breedForm: FormGroup;
  private formBuilder: FormBuilder
  constructor() {
    this.petForm = new FormGroup({});
    this.breedForm = new FormGroup({});
    this.formBuilder = new FormBuilder();
  }

  // other properties...
  showBreedForm = false;

  toggleBreedForm(): void {
    this.showBreedForm = !this.showBreedForm;
  }
  // other methods...
  breedValidator(showBreedForm: boolean): Validators {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const isInvalid = !showBreedForm && control.value === '';
    return isInvalid ? {'breedRequired': {value: control.value}} : null;
  };
  }
  ngOnInit(): void {
    this.petForm = this.formBuilder.group({
      petName: new FormControl('', Validators.required),
      petSize: new FormControl('', Validators.required),
      petImage: new FormControl(''),
      petColor: new FormControl('', Validators.required),
      petAge: new FormControl('', Validators.required),
      petType: new FormControl('', Validators.required),
      petBreed: new FormControl('', this.breedValidator(this.showBreedForm)),
  });


  }
  onSubmit(): void {
    if (this.petForm.valid) {
      alert('Form Submitted!');
      console.log(this.petForm.value);
      // proceed with form submission
    }
}

}
