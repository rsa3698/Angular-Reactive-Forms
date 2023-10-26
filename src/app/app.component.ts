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
  formStatus: string = '';
  formdata: any = {};

  ngOnInit(){

    this.reactiveForm = new FormGroup({
      firstname : new FormControl(null,[Validators.required, CustomValidators.noSpaceAllowed]),
      lastname : new FormControl(null,[Validators.required, CustomValidators.noSpaceAllowed]),
      email : new FormControl(null,[Validators.required , Validators.email]),
      username : new FormControl(null, Validators.required, CustomValidators.checkUserName),
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

    //  this.reactiveForm.get('firstname').valueChanges.subscribe((value) => {
    //   console.log(value);
    // })

    // this.reactiveForm.valueChanges.subscribe((data)=>{
    //   console.log(data);
    // })

    //   this.reactiveForm.get('username').statusChanges.subscribe((status) => {
    //   console.log(status);
    // })

    this.reactiveForm.statusChanges.subscribe((status) => {
      console.log(status)
      this.formStatus = status;
    });
  }

  onFormSubmitted(){
    console.log(this.reactiveForm.value)
    this.formdata = this.reactiveForm.value;
    //this.reactiveForm.reset();

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
  generateUserName(){
      let username = '';
      const fName: string= this.reactiveForm.get('firstname').value;
      const lName: string= this.reactiveForm.get('lastname').value;
      const dob: string= this.reactiveForm.get('dob').value;
  
      if(fName.length >= 3){
        username += fName.slice(0, 3);
      }
      else {
        username += fName;
      }
  
      if(lName.length >= 3){
        username += lName.slice(0, 3);
      }
      else {
        username += lName;
      }
  
      let datetime = new Date(dob);
      username += datetime.getFullYear();
      console.log(username);

      // use to update multiple fields
      // this.reactiveForm.setValue({
      //   firstname: this.reactiveForm.get('firstname').value,
      //   lastname: this.reactiveForm.get('lastname').value,
      //   email: this.reactiveForm.get('email').value,
      //   username: username,
      //   dob: this.reactiveForm.get('dob').value,
      //   gender: this.reactiveForm.get('gender').value,
      //   address: {
      //     street: this.reactiveForm.get('address.street').value,
      //     country: this.reactiveForm.get('address.country').value,
      //     city: this.reactiveForm.get('address.city').value,
      //     region: this.reactiveForm.get('address.region').value,
      //     postal: this.reactiveForm.get('address.postal').value
      //   },
      //   skills: this.reactiveForm.get('skills').value,
      //   experience: this.reactiveForm.get('experience').value
      // })

      // used to update single field
      // this.reactiveForm.get('username').setValue(username);

      // best practive easy to update both single and multiple field
      this.reactiveForm.patchValue({
        username: username,
        address: {
          city: 'New Delhi'
        }
      })
    }
} 
