import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts:any
  private url = "http://jsonplaceholder.typicode.com/posts"

  constructor(private http:HttpClient) { 
    http.get(this.url)
    .subscribe(r => {
      const data = r;
      this.posts = data;
    })
  }

  ngOnInit(): void {
  }

  createPost(input:HTMLInputElement){
    let post = {title:input.value}

    this.http.post(this.url,JSON.stringify(post))
    .subscribe(r => {
      this.posts.splice(0,0,post)
      console.log(r)
    })
  }

}
