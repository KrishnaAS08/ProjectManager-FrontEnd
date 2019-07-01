import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  user: User = new User();
  users: Observable<User[]>;
  userForm: FormGroup;

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
          console.log('Added User: ',data);
        }
      );
    
    this.onReset();
  }

  getUserList() {
    this.projectService.getUserList()
      .subscribe(
        data => {
          this.users = data;
          console.log('UserList>>>',this.users);
        }
      );
  }

  onReset() {
    this.userForm.reset();
    this.userForm.markAsPristine();
    this.userForm.markAsUntouched();
  }

}
