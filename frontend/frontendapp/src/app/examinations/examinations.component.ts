import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {Examination} from "../../../__models/functional_models";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import * as faker from 'faker';

@Component({
  selector: 'app-examinations',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule
  ],
  templateUrl: './examinations.component.html',
  styleUrl: './examinations.component.css'
})
export class ExaminationsComponent {
  displayedColumns: string[] = ['petName', 'examinationDescription', 'examinationFile'];
  dataSource: MatTableDataSource<Examination> = new MatTableDataSource<Examination>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.dataSource.data = this.getExaminations();

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  getExaminations(): Examination[] {
    const examinations: Examination[] = [];

    for (let i = 0; i < 30; i++) {
      examinations.push(<Examination>{
        exFile: "assets/files/xxx.pdf",
        exDescription: faker.lorem.paragraph(10),
        petName: faker.name.firstName()
      });
    }

    return examinations;
  }
}
