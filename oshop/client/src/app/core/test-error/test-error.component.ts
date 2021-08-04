import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.css']
})
export class TestErrorComponent implements OnInit {
  apiUrl = environment.apiUrl;
  validationErrors:any;
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  get404Error() {
    this.http.get(this.apiUrl+ 'products/42').subscribe(response =>{
     console.log(response);
    },error => {
      console.log(error)
    })
  }

  get500Error() {
    this.http.get(this.apiUrl+ 'Buggy/servererror').subscribe(response =>{
     console.log(response);
    },error => {
      console.log(error)
    })
  }

  get400Error() {
    this.http.get(this.apiUrl+ 'Buggy/badrequest').subscribe(response =>{
     console.log(response);
    },error => {
      console.log(error)
    })
  }


  get400ValidationError() {
    this.http.get(this.apiUrl+ 'products/fourtytwo').subscribe(response =>{
     console.log(response);
    },error => {
      console.log(error)
      this.validationErrors=  error.errors
    })
  }

}
