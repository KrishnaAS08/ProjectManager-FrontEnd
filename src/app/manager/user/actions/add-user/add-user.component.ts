import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  user: User = new User();
  users: User[];
  userForm: FormGroup;
  isUpdate = false;

  constructor(private projectService: ProjectService,private fb: FormBuilder) {

    this.userForm = fb.group({
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'empId': [null, Validators.required]
    })
  }

  ngOnInit() {
    this.getUserList();
  }

  onSubmit() {
    this.user.firstName = this.userForm.value.firstName;
    this.user.lastName = this.userForm.value.lastName;
    this.user.empId = this.userForm.value.empId;
    this.projectService.addUser(this.user)
      .subscribe(
        data => {
          this.getUserList();
        },
        (error: HttpErrorResponse) => {
          console.log(error.error);
        }
      );
      this.onReset();
  }

  getUserList() {
    this.projectService.getUserList()
      .subscribe(
        data => {
          this.users = data;
        },
        (error: HttpErrorResponse) => {
          console.log(error.error);
        }
      );
  }

  startEditUser(selectedUser: User) {
    if(selectedUser) {
      this.user = selectedUser;
      this.userForm.setValue({
        'firstName': this.user.firstName,
        'lastName': this.user.lastName,
        'empId': this.user.empId
      })
      this.isUpdate = true;
    }
  }

  onReset() {
    this.userForm.reset();
    this.userForm.markAsPristine();
    this.userForm.markAsUntouched();
  }

  onCancel() {
    this.onReset();
    this.isUpdate = false;
  }
  onUpdate() {
    this.user.firstName = this.userForm.value.firstName;
    this.user.lastName = this.userForm.value.lastName;
    this.user.empId = this.userForm.value.empId;
    this.projectService.updateUser(this.user.userId,this.user)
      .subscribe(
        data=>{
        },
        (error: HttpErrorResponse) => {
          console.log(error.error);
        }
      );
    this.onCancel();
  }

}
