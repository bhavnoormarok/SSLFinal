import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data } from './data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetpostService {

  readonly GET_URL = 'https://cs251-outlab-6.herokuapp.com/initial_values/'
  readonly POST_URL = 'https://cs251-outlab-6.herokuapp.com/add_new_feedback/'
  constructor(private http: HttpClient) { }

  getdata():Observable<Data> {
    return this.http.get<Data>(this.GET_URL);
  }
  postdata(data: Data):Observable<Data> {
    return this.http.post<Data>(this.POST_URL, data);
  }
}
