import {Component, forwardRef, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import {
  AbstractControl, ControlValueAccessor, FormBuilder,
  FormControl,
  FormGroup,
  FormsModule, NG_VALUE_ACCESSOR, NgForm,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {MatSliderModule} from "@angular/material/slider";
import {PageEvent} from "@angular/material/paginator";
import {BreedServices} from "../../services/breed-services";
import { PetServices } from '../../services/pet-services';

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
    MatDialogContent,
    CommonModule
  ],
  styleUrls: ['./register-pet-dialog.component.css'],
  providers: [
    {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RegisterPetDialogComponent),
    multi: true,
  },
    BreedServices, PetServices
  ]
})
export class RegisterPetDialogComponent implements ControlValueAccessor{

  petForm: FormGroup;
  petSizes = ['Large', 'Medium', 'Small'];
  petTypes = ['Dog', 'Cat', 'Other'];
  petBreeds: any;
  breedForm: FormGroup;
  selectedFile: File | undefined;
  breedId: number = 0;
  constructor(private breedServices: BreedServices, private petServices: PetServices) {
    this.petForm = new FormGroup({});
    this.breedForm = new FormGroup({});
    this.petBreeds = [];
    this.getPetBreeds();
  }

  getPetBreeds(): void {
    this.breedServices.getBreeds().subscribe(
      (data) => {
        console.log(data.body)
        this.petBreeds = data.body.map((breed : any) => ({
            breedName: breed.breed_name,
            breedId: breed.breed_id,
          }));
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // other properties...
  showBreedForm = false;

  toggleBreedForm(): void {
    this.showBreedForm = !this.showBreedForm;
  }
  // other methods...

  ngOnInit(): void {
    this.petForm = new FormGroup({
      "petName": new FormControl('', Validators.required),
      "petSize": new FormControl('', Validators.required),
      "petImage": new FormControl(''),
      "petColor": new FormControl('', Validators.required),
      "petAge": new FormControl(0, Validators.required),
      "petType": new FormControl('', Validators.required),
      "petBreed": new FormControl(''),
      "newBreed": new FormControl(''),
      "playfulness": new FormControl(5, Validators.required),
      "intelligence": new FormControl(5, Validators.required),
  });


  }
  onSubmit(): void {
    if (this.petForm.valid) {
      alert('Form Submitted!');
      //Check if there is a data on newBreedName
      if(this.petForm.value.newBreed !== ''){
        //Create new breed
        this.breedServices.createBreed(this.petForm.value.newBreed, this.petForm.value.intelligence, this.petForm.value.playfulness).subscribe(
          (data) => {
            this.breedId = data.body[0].breed_id;
            return this.createPet();
          },
          (error) => {
            console.log(error);
          }
        );
      }
      else{
        //Get the breed id from the form
        this.breedId = this.petForm.value.petBreed;
        this.createPet().catch((error) => {
          console.log(error);
        });
      }

      
    }
}
createPet(): Promise<any> {
  //Create pet
  return this.petServices.createPet(this.petForm.value.petName, this.petForm.value.petType, this.petForm.value.petSize, this.petForm.value.petColor, this.breedId, this.selectedFile).toPromise()
  .then((data) => {
    if(data.status == 201){
      alert('Pet created successfully!');
      //clear form
      this.petForm.reset();
    }
  }
  );
}


getAges(): number[] {
  return Array.from({length: 20}, (_, i) => i + 1);
}

onFileSelect(event: Event): void {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    this.selectedFile = target.files[0];
  }
}
  // other methods...

  // ControlValueAccessor methods
  writeValue(obj: any): void {
    this.petForm.setValue(obj);
  }

  registerOnChange(fn: any): void {
    this.petForm.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.petForm.disable() : this.petForm.enable();
  }

  private onTouched: any = () => {};

}
