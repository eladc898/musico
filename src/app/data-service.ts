import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class DataService {
  public apiHost = './assets/trackList.json';
  constructor(private http: Http) { }

  // get data from json:
  public getAll(): Promise<Object> {
      return this.http.get(this.apiHost)
        .toPromise()
        .then((response) => {
          return response.json();
        }).catch((err) => {
        console.log(err);
      });
  }
}
