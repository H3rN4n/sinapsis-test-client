import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  createThumbs(title:string, base64Img: any){
    return this.http.post(`${environment.lambdaApiUrl}/upload`,{
      title,
      image: base64Img
    })
  }
}
