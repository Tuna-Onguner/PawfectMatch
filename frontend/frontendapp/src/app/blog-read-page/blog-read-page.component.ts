import { Component } from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import { Blog } from '../../../__models/functional_models';
import * as faker from 'faker';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {NgForOf} from "@angular/common";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {BlogDialogComponent} from "../blog-dialog/blog-dialog.component";
@Component({
  selector: 'app-blog-read-page',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    NgForOf,
    MatGridListModule,
    MatPaginatorModule
  ],
  templateUrl: './blog-read-page.component.html',
  styleUrl: './blog-read-page.component.css'
})
export class BlogReadPageComponent {
  blogs: Blog[] = [];

  pageIndex: number =0;
  pageSize: number = 4;

  constructor(private dialog: MatDialog) { }

// ...

  openDialog(blog: Blog): void {
  this.dialog.open(BlogDialogComponent, {
    data: { blog: blog }
  });
}
  ngOnInit() {
    this.blogs = this.generateRandomBlogs(4); // Generate 10 random blogs
  }

  pageChanged(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }
  generateRandomBlogs(count: number): Blog[] {
    const blogs: Blog[] = [];
    for (let i = 0; i < count; i++) {
      const blog: Blog = {
        blogTitle: faker.lorem.sentence(),
        blogFieldName: faker.lorem.word(),
        publishedDate: faker.date.past(),
        blogImage: "assets/images/pet" + (Math.floor(Math.random() * 3) + 1) + ".JPG",
        blogContent: faker.lorem.paragraphs(50),
        blogId: Math.floor(Math.random() * 1000),
        bloggerName: faker.name.firstName() + ' ' + faker.name.lastName(),
        isRestricted: false,
      };
      blogs.push(blog);
    }
    return blogs;
  }
}
