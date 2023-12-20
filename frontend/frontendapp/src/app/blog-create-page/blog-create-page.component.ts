import { Component } from '@angular/core';
import * as faker from 'faker';
import {Blog} from "../../../__models/functional_models";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {NgForOf, NgIf} from "@angular/common";
import {BlogDialogComponent} from "../blog-dialog/blog-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BlogCreateDialogComponent} from "../blog-create-dialog/blog-create-dialog.component";
@Component({
  selector: 'app-blog-create-page',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatPaginatorModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './blog-create-page.component.html',
  styleUrl: './blog-create-page.component.css'
})
export class BlogCreatePageComponent {
  role: string;
  blogs: Blog[] = [];
  pageIndex: number =0;
  pageSize: number = 4;
  blog: Blog
  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {
    this.role = 'expert';
    this.blog = {
      blogTitle: '',
      blogFieldName: '',
      publishedDate: new Date(),
      blogImage: '',
      blogContent: '',
      blogId: 0,
      bloggerName: '',
      isRestricted: false,
    };
  }

  ngOnInit(): void {
    for (let i = 0; i < 10; i++) {
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
      this.blogs.push(blog);
    }
  }

  toggleRestriction(blog: Blog): void {
    blog.isRestricted = !blog.isRestricted;
  }
  pageChanged(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  createNewBlog(mode: number, blog: Blog): void {
  const dialogRef = this.dialog.open(BlogCreateDialogComponent, {
    data: { mode, blog },
    width: '900px',
    height: '600px'
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result && mode === 1) {
      this.snackBar.open('Blog creation successful', 'Close', {
        duration: 2000,
      });
    }
  });
}
}
