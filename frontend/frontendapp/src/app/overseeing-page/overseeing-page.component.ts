import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import * as faker from "faker";
import {MatButtonModule} from "@angular/material/button";
import {OverseeingReq} from "../../../__models/application_models";



@Component({
  selector: 'app-overseeing-page',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule
  ],
  templateUrl: './overseeing-page.component.html',
  styleUrl: './overseeing-page.component.css'
})
export class OverseeingPageComponent {
  displayedColumns: string[] = ['organizationName', 'motivationScript', 'status', 'actions'];
  dataSource: MatTableDataSource<OverseeingReq> = new MatTableDataSource<OverseeingReq>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.dataSource.data = this.getOversights();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  getOversights(): OverseeingReq[] {
    const oversights: OverseeingReq[] = [];

    for (let i = 0; i < 30; i++) {
        oversights.push(<OverseeingReq> {
          aoId: faker.datatype.number({ min: 1, max: 100 }),
          aoName: faker.company.companyName(),
          adopterId: faker.datatype.number({ min: 1, max: 100 }),
          oreqDate: faker.date.past(),
          oreqStatus: faker.random.word(),
          oreqResponseDate: faker.date.past(),
          omotivationText: faker.lorem.paragraph(),
          oreqResult: faker.random.word(),
        }
      );
    }

    return oversights;
  }
}
