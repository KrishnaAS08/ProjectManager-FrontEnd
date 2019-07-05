import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user';
import { MatDialog } from '@angular/material';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { ProjectService } from 'src/app/services/project.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {

  count = 0;
  filteredData: User[];
  @Input() users:User[];
  @Output() editUser = new EventEmitter<User>();
  constructor(public dialog: MatDialog, public projectService: ProjectService) { }

  ngOnInit() {
    this.getUserList();
  }

  getUserList() {
    this.projectService.getUserList()
      .subscribe(
        data => {
          this.users = data;
          this.filteredData = data;
        },
        (error: HttpErrorResponse) => {
          console.log(error.error);
        }
      );
  }

  onDelete(id: number, firstName: String, lastName: String, empId: number) {
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      data: {userId: id, firstName: firstName, lastName: lastName, empId: empId}
    });

    dialogRef.afterClosed().subscribe(result=> {
      this.getUserList();
    })
  }

  doSortFirstName() {
    if(this.count===0){
      this.filteredData=this.filteredData.sort((a, b) => a.firstName.localeCompare(b.firstName));
      this.count++;
    }    
    else{
      this.filteredData=this.filteredData.sort((a, b) => b.firstName.localeCompare(a.firstName));
      this.count = 0;
    }
  }

  doSortLastName() {
    if(this.count===0){
      this.filteredData=this.filteredData.sort((a, b) => a.lastName.localeCompare(b.lastName)); 
      this.count++;
    }    
    else{
      this.filteredData=this.filteredData.sort((a, b) => b.lastName.localeCompare(a.lastName)); 
      this.count = 0;
    }
  }

  doSortEmpId() {
    if(this.count===0){
      this.filteredData=this.filteredData.sort((a, b) => a.empId-b.empId); 
      this.count++;
    }    
    else{
      this.filteredData=this.filteredData.sort((a, b) => b.empId-a.empId); 
      this.count = 0;
    } 
  }

  doFilter = (value: string) => {
    const data = this.users.filter(
      user=> {
        if(value && user.firstName.toLowerCase().includes(value.toLowerCase()))
          return user;
        if(value && user.lastName.toLowerCase().includes(value.toLowerCase()))
          return user;
        if(value && user.empId.toString().includes(value))
          return user;
      } 
    );
    if(value)
      this.filteredData = data;
    else
      this.filteredData = this.users;


  }

  startEdit(selectedUser: User) {
    this.editUser.emit(selectedUser);
  }
}

