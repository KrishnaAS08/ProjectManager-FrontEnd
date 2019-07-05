import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from 'src/app/models/user';
import { ProjectService } from 'src/app/services/project.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteUserComponent>,
    @Inject (MAT_DIALOG_DATA) public user: User,
    public projectService: ProjectService) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDeleteUser(): void {
    this.projectService.deleteUser(this.user.userId).subscribe(
      (error: HttpErrorResponse) => {
        console.log(JSON.parse(JSON.stringify(error)));
      }
    );
  }

}
