import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NumbersRequest, NumbersResponse } from '../numbers-request';
import { filter } from 'rxjs';

@Component({
  selector: 'app-base-view',
  templateUrl: './base-view.component.html',
  styleUrls: ['./base-view.component.css']
})
export class BaseViewComponent {
  constructor(private http: HttpClient) { }

  apiUrl: string = "http://localhost:8080/numbers/sort-command"
  testUrl: string = "http://localhost:8080/status/ping"

  pong: string = "";
  pongCounter: number = 0;

  numbersRequest: NumbersRequest = new NumbersRequest();
  numbersResponse: NumbersResponse = new NumbersResponse();
  orderByAscending: boolean = true;
  numbersString: string = "";
  responseString: string = "";

  ngOnInit() {

  }

  pingpong() {
    return this.http.get(this.testUrl, { responseType: 'text' }).subscribe(data => {
      console.log(data);
      this.pong = data;
      this.pongCounter++;
    });
  }

  parseNumbersToArray(text: string) {
    let temp = text.split(",").map(e => { return parseInt(e); });
    let filtered = temp.filter(el => Number.isInteger(el));

    this.numbersRequest.numbers = filtered;
  }

  submitNumbers() {
    this.parseNumbersToArray(this.numbersString);
    console.warn(this.numbersRequest);

    this.http.post<NumbersResponse>(this.apiUrl, this.numbersRequest).subscribe(
      response => {
        this.responseString = "";
        response.numbers.forEach(e => {
          this.responseString += e.toString() + ",";
        });
      })
  }

  onChangeOrder() {
    if (this.orderByAscending) this.numbersRequest.order = "ASC"
    else this.numbersRequest.order = "DESC";
    this.submitNumbers();
  }

}
