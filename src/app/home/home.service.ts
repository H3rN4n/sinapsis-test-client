import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  callApi(base64Img: any){
    return this.http.post('http://localhost:3000/upload?username=leito',{
      avatar_image: base64Img
    })
  }
}
