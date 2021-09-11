import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { AppError } from './common/AppError';
import { BadInput } from './common/bad-input';
import { NotFoundError } from './common/not-found';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class PostService extends DataService {
  //private url = 'http://jsonplaceholder.typicode.com/posts';

  constructor(http: HttpClient) {
    super(http, 'http://jsonplaceholder.typicode.com/posts');
  }
}
