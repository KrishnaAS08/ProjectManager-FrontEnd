import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA, MatSort } from '@angular/material';
import { User } from 'src/app/models/user';
import { ProjectService } from 'src/app/services/project.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {

  displayedColumns = ['userId','userName'];
  dataSource = new MatTableDataSource<User>();

  constructor(public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public user: User,
    public projectService: ProjectService, public http: HttpClient) { }

  @ViewChild(MatSort, {static: true}) sort: MatSort; 

  ngOnInit() {
    this.getUserList();
    this.dataSource.sort = this.sort;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onRowClicked(row): any {
    this.dialogRef.close(row);    
  }

  doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();

    if (this.dataSource.paginator) {  
      this.dataSource.paginator.firstPage();  
    }
  }

  getUserList() {
    this.projectService.getUserList()
      .subscribe(
        data=>{
          this.dataSource = new MatTableDataSource<User>(data);
          this.dataSource.sort = this.sort;
        }
      )
  }

}
