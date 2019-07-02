import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { MatDialog } from '@angular/material';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { Observable } from 'rxjs';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {

  @Input() users:Observable<User[]>;
  constructor(public dialog: MatDialog, public projectService: ProjectService) { }

  ngOnInit() {
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

  onDelete(id: number, firstName: String, lastName: String, empId: number) {
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      data: {userId: id, firstName: firstName, lastName: lastName, empId: empId}
    });

    dialogRef.afterClosed().subscribe(result=> {
      this.getUserList();
      console.log('Result>>>',result);
    })
  }

}
