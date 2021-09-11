import { Component, OnInit } from '@angular/core';

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
    this.service.getPosts().subscribe((r) => {
      const data = r;
      this.posts = data;
    });
  }

  createPost(input: HTMLInputElement) {
    let post = { title: input.value };

    this.service.createPost(post).subscribe((r) => {
      this.posts.splice(0, 0, post);
      console.log(r);
    });
  }

  updatePost(){
    let post = {id:100, title:"LOL"};

    this.service.updatePost(post).subscribe(r => {
      console.log(r)
    })
  }

  deletePost(){
    this.service.deletePost(100)
    .subscribe(r => {
      console.log(r)
    })
  }
}
