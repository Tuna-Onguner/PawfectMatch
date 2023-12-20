import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import * as faker from "faker";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {NgForOf} from "@angular/common";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {Counsels} from "../../../__models/functional_models";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";

@Component({
  selector: 'app-expert-advice-page',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    NgForOf,
    MatTableModule,
    MatPaginatorModule
  ],
  templateUrl: './expert-advice-page.component.html',
  styleUrl: './expert-advice-page.component.css'
})
export class ExpertAdvicePageComponent implements OnInit{
  askExpertForm: FormGroup;
  expertNames: string[] = Array.from({length: 100}, () => faker.name.findName());
  expertiseFields: string[] = Array.from({length: 100}, () => faker.name.jobArea());
  displayedColumns: string[] = ['adopterName', 'expertName', 'expertiseField', 'responseDate', 'adviceDate', 'details'];
  dataSource: MatTableDataSource<Counsels> = new MatTableDataSource<Counsels>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private snackBar: MatSnackBar, private formBuilder: FormBuilder) {
    this.askExpertForm = this.formBuilder.group({});
  }

  getExpertAdvices(): Counsels[] {
    const expertAdvices: Counsels[] = [];

    for (let i = 0; i < 30; i++) {
      expertAdvices.push(<Counsels>{
        adopterId: faker.datatype.number(),
        adopterName: faker.name.findName(),
        expertId: faker.datatype.number(),
        expertName: faker.name.findName(),
        adviceDate: faker.date.past(),
        expertiseFieldId: faker.datatype.number(),
        expertiseFieldName: faker.name.jobArea(),
        adopterProblem: faker.lorem.paragraph(10),
        expertResponse: faker.lorem.paragraph(10),
        expertResponseDate: faker.date.past(),
        adviceStatus: faker.random.arrayElement(['Accepted', 'Rejected', 'Pending'])
      });
    }

    return expertAdvices;
  }
  ngOnInit(): void {
    this.askExpertForm = this.formBuilder.group({
      expertName: ['', Validators.required],
      expertiseField: ['', Validators.required],
      question: ['', Validators.required]
    });
    this.dataSource.data = this.getExpertAdvices();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onSubmit(): void {
    if (this.askExpertForm.valid) {
    this.snackBar.open('Consult Complete: Your application has been successfully submitted.', 'Close', {
      duration: 3000,
    });
  }
  else {
    this.snackBar.open('Consult Incomplete: Please fill out all required fields.', 'Close', {
      duration: 3000,
    });
  }
  }

  openDetailsDialog(counsel: Counsels): void {

  }
}
