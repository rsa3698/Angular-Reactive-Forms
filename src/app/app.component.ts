import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from './Validators/noSpaceAllowed.Validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Reactive-form';
  reactiveForm :FormGroup; //step2

  ngOnInit(){

    this.reactiveForm = new FormGroup({
      firstname : new FormControl(null,[Validators.required, CustomValidators.noSpaceAllowed]),
      lastname : new FormControl(null,[Validators.required, CustomValidators.noSpaceAllowed]),
      email : new FormControl(null,[Validators.required , Validators.email]),
      username : new FormControl(null),
      dob : new FormControl(null),
      gender : new FormControl('male'),
      address: new FormGroup({
        street : new FormControl(null),
        country : new FormControl('India'),
        city: new FormControl(null),
        region : new FormControl(null),
        postal : new FormControl(null),
      }),
      skills: new FormArray([
        new FormControl(null , Validators.required),
      ]),
      experience: new FormArray([
        new FormGroup({
          company: new FormControl(null),
          position: new FormControl(null),
          totalExp: new FormControl(null),
          start: new FormControl(null),
          end: new FormControl(null),
        })
      ])
      
    })
  }

  onFormSubmitted(){
    console.log(this.reactiveForm)
  }

  AddSkills(){
   (<FormArray> this.reactiveForm.get('skills')).push(new FormControl(null, Validators.required))
  }

  DeleteSkills(index : number){
    (<FormArray> this.reactiveForm.get('skills')).removeAt(index);
  }

  AddExperience(){
    const frmgroup = new FormGroup({
      company: new FormControl(null),
      position: new FormControl(null),
      totalExp: new FormControl(null),
      start: new FormControl(null),
      end: new FormControl(null),
    });

    (<FormArray>this.reactiveForm.get('experience')).push(frmgroup);
  }

  DeleteExperience(index : number){
    (<FormArray>this.reactiveForm.get('experience')).removeAt(index);
  }
} 
