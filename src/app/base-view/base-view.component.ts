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
  pongCounter:number = 0;
  numbersRequest:NumbersRequest = new NumbersRequest();
  numbersResponse:number[] = [];
  toggleOrder:boolean = false;
  numbersString:string = "";

  ngOnInit(){

  }

  pingpong(){
    return this.http.get(this.testUrl, { responseType: 'text' }).subscribe( data => {
      console.log(data);
      this.pong = data;
      this.pongCounter++;
    });
  }

  parseNumbersToArray(text:string){
    let temp = text.split(",").map( e => { return parseInt(e); });
    this.numbersRequest.numbers = temp;
  }

  submitNumbers(){
    this.parseNumbersToArray(this.numbersString);
    console.log(this.numbersRequest);
    this.http.post<number[]>(this.apiUrl, this.numbersRequest).subscribe( response => {
      console.log(response);
      this.numbersResponse = response;
    });
  }

  onChangeOrder(){
    if(this.toggleOrder) this.numbersRequest.order = "ASC"
    else this.numbersRequest.order = "DESC";
  }

}
