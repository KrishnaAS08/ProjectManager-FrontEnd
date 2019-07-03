import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { MatDialog } from '@angular/material';
import { Task } from 'src/app/models/task';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProjectDialogComponent } from 'src/app/manager/dialogs/project-dialog/project-dialog.component';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss']
})
export class ViewTaskComponent implements OnInit {

  searchTasks: Task[];
  isSearch = false;
  isUpdate = false;
  searchForm = new FormControl('');
  projectId: number;
  projectName: String;

  constructor(public projectService: ProjectService, public dialog: MatDialog) { }

  ngOnInit() {
  }



  getProjectList(): Observable<any> {
    const dialogRef = this.dialog.open(ProjectDialogComponent);
    dialogRef.afterClosed().subscribe(
      result=>{
        if(result!=null) {
          this.projectId = result.projectId;
          this.projectName = result.projectName;
        }
      }
    );
    return dialogRef.afterClosed();
  }

  doSearch (){
    this.isSearch = true;
    this.getTaskList();    
  }

  getTaskList() {
    console.log('projectName>>>',this.projectName);
    this.projectService.searchTaskById(this.projectId)
      .subscribe(
        data=>{
          this.searchTasks = data;
          console.log('Search Tasks>>>',this.searchTasks);
        }
      );
  }

}
