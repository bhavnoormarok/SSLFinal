import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Data } from '../data';
import { GetpostService } from '../getpost.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  alert1=false;
  alert2=false;
  result: Data={
    name:"",
    email:"",
    feedback:"",
    comment:""
  };

  messageForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    feedback:['', Validators.required],
    comment: ['']
  });

  constructor(private fb: FormBuilder, private _getpostService: GetpostService) { }

  ngOnInit(){
    this._getpostService.getdata().subscribe(data => {this.result = data; this.messageForm.setValue({name:this.result.name, email:this.result.email, feedback:this.result.feedback, comment:this.result.comment})});
    this.messageForm.get('name').valueChanges.subscribe(data=>{this.result.name=data;})
    this.messageForm.get('email').valueChanges.subscribe(data=>{this.result.email=data;})
    this.messageForm.get('feedback').valueChanges.subscribe(data=>{this.result.feedback=data;})
    this.messageForm.get('comment').valueChanges.subscribe(data=>{this.result.comment=data;})
  } 

  PostData(){
    this._getpostService.postdata(this.result)
      .subscribe(
        data=>{
          console.log("success", data); 
          this.alert1=true;
          this.alert2=false;
        },
        error=>{
          console.log("Fail", error); 
          this.alert2=true;
          this.alert1=false
        }
      );
      this._getpostService.getdata().subscribe(data => {this.result = data; this.messageForm.setValue({name:this.result.name, email:this.result.email, feedback:this.result.feedback, comment:this.result.comment})});
  }

  cross(){
    this.alert1=false;
    this.alert2=false;
    }
}
