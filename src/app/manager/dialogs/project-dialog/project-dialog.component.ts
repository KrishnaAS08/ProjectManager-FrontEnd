import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Project } from 'src/app/models/project';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatSort } from '@angular/material';
import { ProjectService } from 'src/app/services/project.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.scss']
})
export class ProjectDialogComponent implements OnInit {

  displayedColumns = ['projectId','projectName'];
  dataSource = new MatTableDataSource<Project>();

  constructor(public dialogRef: MatDialogRef<ProjectDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public project: Project,
    public projectService: ProjectService) { }

  @ViewChild(MatSort, {static: true}) sort: MatSort; 

  ngOnInit() {
    this.getProjectList();
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

  getProjectList() {
    this.projectService.getProjectList()
      .subscribe(
        data=>{
          this.dataSource = new MatTableDataSource<Project>(data);
          this.dataSource.sort = this.sort;
        },
        (error: HttpErrorResponse) => {
          console.log(error.error);
        }
      )
  }

}
