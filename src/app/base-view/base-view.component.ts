import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NumbersRequest, NumbersResponse } from '../numbers-request';

@Component({
  selector: 'app-base-view',
  templateUrl: './base-view.component.html',
  styleUrls: ['./base-view.component.css']
})
export class BaseViewComponent {
  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  apiUrl: string = "http://localhost:8080/numbers/sort-command"
  testUrl: string = "http://localhost:8080/status/ping"
  exchangeUrl: string = "http://localhost:8080/currencies/get-current-currency-value-command";

  pong: string = "";
  pongCounter: number = 0;

  numbersRequest: NumbersRequest = new NumbersRequest();
  numbersResponse: NumbersResponse = new NumbersResponse();
  orderByAscending: boolean = true;
  numbersString: string = "";
  responseString: string = "";
  currencyRequest: string = "";
  exchangeResponse: string = "";

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

  // 3 czesc out of the record
  postExchangeRequest(inputCurrency: string) {
    let currencyReq = { currency: inputCurrency }

    this.http.post<{ value: string }>(this.exchangeUrl, currencyReq).subscribe(
      {
        next: (response) => this.exchangeResponse = response.value,
        error: (e: HttpErrorResponse) => this.openSnackBar(e.error)
      }
    )
  }

  openSnackBar(error: string) {
    this.snackBar.open(error, 'Zamknij', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 2500,
      panelClass: 'snack-error'

    });
  }

  clearExchange(){
    this.exchangeResponse = "";
  }

}
