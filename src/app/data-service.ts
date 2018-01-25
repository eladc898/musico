import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class DataService {
  
  constructor(private http: Http) { }

  // get data from json:
  public getAll(url: string): Promise<Object> {
      return this.http.get(url)
        .toPromise()
        .then((response) => {
          return response.json();
        }).catch((err) => {
        console.log(err);
      });
  }
}
