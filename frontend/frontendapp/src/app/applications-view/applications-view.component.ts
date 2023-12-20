import {Component, ViewChild} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn
} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BloggerApp} from "../../../__models/application_models";
import {ExpertApp} from "../../../__models/application_models";
import * as faker from 'faker';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
@Component({
  selector: 'app-applications-view',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    NgIf,
    MatTableModule,
    MatPaginatorModule
  ],
  templateUrl: './applications-view.component.html',
  styleUrl: './applications-view.component.css'
})
export class ApplicationsViewComponent {
  bloggerForm: FormGroup;
  expertForm: FormGroup;
  roles = ['Blogger', 'Expert', 'Adopter'];
  role: string;

  bloggerDisplayedColumns: string[] = ['applicationDate', 'responseDate', 'applicationStatus', 'bloggerField'];
  expertDisplayedColumns: string[] = ['applicationDate', 'responseDate', 'applicationStatus', 'expertiseField'];
  bloggerDataSource: MatTableDataSource<BloggerApp> = new MatTableDataSource<BloggerApp>();
  expertDataSource: MatTableDataSource<ExpertApp> = new MatTableDataSource<ExpertApp>();

  @ViewChild('bloggerPaginator') bloggerPaginator!: MatPaginator;
  @ViewChild('expertPaginator') expertPaginator!: MatPaginator;
  constructor(private snackBar: MatSnackBar) {
    this.bloggerForm = new FormGroup({});
    this.expertForm = new FormGroup({});
    this.role = this.roles[Math.floor(Math.random() * this.roles.length)];
    this.role = 'Blogger';
  }
  ngOnInit() {
    this.bloggerDataSource.data = this.getBloggerApplications();
    this.expertDataSource.data = this.getExpertApplications();
    this.bloggerForm = new FormGroup({
      'bloggerField': new FormControl(null),
      'motivationScript': new FormControl(null),
      'bloggerFile': new FormControl(null),
    }, this.atLeastOneValidator(['motivationScript', 'bloggerFile']));

    this.expertForm = new FormGroup({
      'expertiseField': new FormControl(null),
      'motivationScript': new FormControl(null),
      'expertFile': new FormControl(null),
    }, this.atLeastOneValidator(['motivationScript', 'expertFile']));
  }

  ngAfterViewInit() {
    this.bloggerDataSource.paginator = this.bloggerPaginator;
    this.expertDataSource.paginator = this.expertPaginator;
  }
  atLeastOneValidator(fields: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    for (const field of fields) {
      if (control.get(field)?.value) {
        return null;
      }
    }
    return { 'requireAtLeastOne': true };
  };
}
getBloggerApplications(): BloggerApp[] {
  const bloggerApplications: BloggerApp[] = [];

  for (let i = 0; i < 6; i++) {
    bloggerApplications.push(<BloggerApp>{
      bappDate: faker.date.past(),
      bappResponseDate: faker.date.recent(),
      bappStatus: faker.random.arrayElement(['Accepted', 'Rejected', 'Pending']),
      blogFieldName: faker.lorem.words(5)
    });
  }

  return bloggerApplications;
}

getExpertApplications(): ExpertApp[] {
  const expertApplications: ExpertApp[] = [];

  for (let i = 0; i < 6; i++) {
    expertApplications.push(<ExpertApp>{
      eappDate: faker.date.past(),
      eappResponseDate: faker.date.recent(),
      eappStatus: faker.random.arrayElement(['Accepted', 'Rejected', 'Pending']),
      expertiseFieldName: faker.lorem.words(5)
    });
  }

  return expertApplications;
}

  onBloggerSubmit() {
    // Implement your logic to handle the blogger application submission here...
    if (this.bloggerForm.valid) {
      this.snackBar.open('Application Complete: Your application has been successfully submitted.', 'Close', {
        duration: 3000,
      });
    } else {
      this.snackBar.open('Application Incomplete: Please fill out all required fields.', 'Close', {
        duration: 3000,
      });
    }
  }

  onExpertSubmit() {
    // Implement your logic to handle the expert application submission here...
    if (this.expertForm.valid) {
      this.snackBar.open('Application Complete: Your application has been successfully submitted.', 'Close', {
        duration: 3000,
      });
    } else {
      this.snackBar.open('Application Incomplete: Please fill out all required fields.', 'Close', {
        duration: 3000,
      });
    }
  }
}
