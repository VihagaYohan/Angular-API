import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { AppError } from './common/AppError';
import { BadInput } from './common/bad-input';
import { NotFoundError } from './common/not-found';

@Injectable()
export class DataService {



  constructor(private http: HttpClient,@Inject(String) private url: string) {}

  getAll() {
    return this.http.get(this.url).pipe(
      retry(1),
      catchError((err: Response) => {
        if (err.status === 404) {
          return Observable.throw(new NotFoundError());
        }
        return Observable.throw(new AppError(err));
      })
    );
  }

  create(resource: any) {
    return this.http
      .post(this.url, JSON.stringify(resource))
      .pipe(catchError(this.handleError));
  }

  update(resource: any) {
    return this.http.put(
      this.url + '/' + resource.id,
      JSON.stringify(resource)
    );
  }

  delete(id: number) {
    return this.http
      .delete(this.url + '/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }

  private handleError(error: Response) {
    if (error.status === 400) {
      return Observable.throw(new BadInput(error.json()));
    } else if (error.status === 404) {
      return Observable.throw(new NotFoundError());
    } else {
      return Observable.throw(new AppError());
    }
  }
}
