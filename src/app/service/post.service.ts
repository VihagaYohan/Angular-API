import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { AppError } from './common/AppError';
import { NotFoundError } from './common/not-found';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url = "http://jsonplaceholder.typicode.com/posts"

  constructor(private http:HttpClient) { }

  getPosts(){
    return this.http.get(this.url)
    .pipe(
      retry(1),
      catchError((err:Response) => {
        if(err.status === 404){
          return Observable.throw(new NotFoundError())
        }
        return Observable.throw(new AppError(err))
      })
    );
  }

  createPost(post:any){
    return this.http.post(this.url, JSON.stringify(post))
  }

  updatePost(post:any){
    return this.http.put(this.url + "/"+post.id, JSON.stringify(post))
  }

  deletePost(id:number){
    return this.http.delete(this.url + "/" + id)
     .pipe(
       retry(1),
       catchError((err:Response) => {
         if(err.status === 404){
           return Observable.throw(new NotFoundError())
         }
         return Observable.throw(new AppError(err))
       })
     )

  }
}
