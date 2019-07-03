import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatTableDataSource, MAT_DIALOG_DATA, MatDialogRef, MatSort } from '@angular/material';
import { ParentTask } from 'src/app/models/parent-task';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-parent-dialog',
  templateUrl: './parent-dialog.component.html',
  styleUrls: ['./parent-dialog.component.scss']
})
export class ParentDialogComponent implements OnInit {

  displayedColumns = ['parentId','parentName'];
  dataSource = new MatTableDataSource<ParentTask>();

  constructor(public dialogRef: MatDialogRef<ParentDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public parent: ParentTask,
    public projectService: ProjectService) { }
  
  @ViewChild(MatSort, {static: true}) sort: MatSort; 

  ngOnInit() {
    this.getParentList();
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

  getParentList() {
    this.projectService.getParentList()
      .subscribe(
        data=>{
          this.dataSource = new MatTableDataSource<ParentTask>(data);
          this.dataSource.sort = this.sort;
        }
      )
  }

}
