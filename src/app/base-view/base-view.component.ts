import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NumbersRequest } from '../numbers-request';

@Component({
  selector: 'app-base-view',
  templateUrl: './base-view.component.html',
  styleUrls: ['./base-view.component.css']
})
export class BaseViewComponent {
  constructor(private http:HttpClient){}

  apiUrl:string = "http://localhost:8080/numbers/sort-command"
  testUrl:string = "http://localhost:8080/status/ping"

  pong:string = "";
  numbersRequest:NumbersRequest = new NumbersRequest();

  ngOnInit(){

  }

  pingpong(){
    return this.http.get(this.testUrl, { responseType: 'text' }).subscribe( data => {
      console.log(data);
      this.pong = data;
    });
  }

  submitNumbers(){
    this.http.post<NumbersRequest>(this.apiUrl, this.numbersRequest).subscribe(); 
  }

  onChangeOrder(){
    
  }

}
