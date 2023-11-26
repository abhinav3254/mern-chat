import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }


  public addQuestion(data: any): Observable<any> {
    const url = 'http://localhost:8080/question/add';

    return this.http.post(url, data);

  }

}
