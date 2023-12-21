import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {Examination} from "../../../__models/functional_models";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {ExaminationServices} from "../../services/examination-services";
import { Router } from '@angular/router';

@Component({
  selector: 'app-examinations',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule
  ],
  templateUrl: './examinations.component.html',
  styleUrl: './examinations.component.css',
  providers: [ExaminationServices]
})
export class ExaminationsComponent {
  displayedColumns: string[] = ['petName', 'examinationDescription', 'examinationFile'];
  dataSource: MatTableDataSource<Examination> = new MatTableDataSource<Examination>();

  constructor(private examinationServices: ExaminationServices, private router: Router) { }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.examinationServices.getExaminations().subscribe(examinationsData => {
      this.dataSource.data = examinationsData.body.map((examination: any) => ({
        examinationId: examination.ex_id,
        examinationDescription: examination.ex_description,
        examinationFile: examination.ex_file,
        petId: examination.pet_id,
        petName: examination.pet_name
      }));
    }
    , error => {
      console.error('Error:', error);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
