import { Component, OnInit } from '@angular/core';
import { AppError } from 'src/app/service/common/AppError';
import { NotFoundError } from 'src/app/service/common/not-found';

// service
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts: any;

  constructor(private service: PostService) {}

  ngOnInit(): void {
    this.service.getPosts().subscribe(
      (r) => {
        const data = r;
        this.posts = data;
      },
      (err: AppError) => {
        if (err instanceof NotFoundError) {
          alert('Unable to locate data');
        } else {
          alert('An unexpected error occured');
          console.log(err);
        }
      }
    );
  }

  createPost(input: HTMLInputElement) {
    let post = { title: input.value };

    this.service.createPost(post).subscribe(
      (r) => {
        this.posts.splice(0, 0, post);
        console.log(r);
      },
      (err) => {
        console.log('An unexpected error occured');
        console.log(err);
      }
    );
  }

  updatePost() {
    let post = { id: 100, title: 'LOL' };

    this.service.updatePost(post).subscribe(
      (r) => {
        console.log(r);
      },
      (err: Response) => {
        console.log('An unexpected error occured');

        if (err.status === 400) {
          // code goes here
        } else {
          console.log(err);
        }
      }
    );
  }

  deletePost() {
    this.service.deletePost(100).subscribe(
      (r) => {
        console.log(r);
      },
      (err: AppError) => {
        if (err instanceof NotFoundError) {
          alert('This post has already bean deleted');
        } else {
          alert('An unexpected error occured');
          console.log(err);
        }
      }
    );
  }
}
