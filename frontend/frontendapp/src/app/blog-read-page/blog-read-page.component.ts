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
import {BlogServices} from "../../services/blog-services";
import {Router } from '@angular/router';
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
  styleUrl: './blog-read-page.component.css',
  providers: [BlogServices]
})
export class BlogReadPageComponent {
  blogs: Blog[] = [];

  pageIndex: number =0;
  pageSize: number = 4;

  constructor(private dialog: MatDialog, private blogServices: BlogServices, private router: Router) { }

  openDialog(blog: Blog): void {
    this.dialog.open(BlogDialogComponent, {
      data: { blog: blog }
    });
  }
  
  ngOnInit() {
    this.blogServices.getBlogs().subscribe(blogData => {
      this.blogs = blogData.body.map((blog: any) => ({
        blogTitle: blog.blog_title,
        blogFieldName: blog.blog_field_name,
        publishedDate: blog.published_date,
        blogImage: blog.blog_image,
        blogContent: blog.blog_content,
        blogId: blog.blog_id,
        bloggerName: blog.user_name,
        isRestricted: blog.is_restricted,
      }));
    }, error => {
      console.error('Error:', error);
    });
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
