import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { MatDialog } from '@angular/material';
import { Task } from 'src/app/models/task';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProjectDialogComponent } from 'src/app/manager/dialogs/project-dialog/project-dialog.component';
import { DeleteTaskComponent } from '../delete-task/delete-task.component';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss']
})
export class ViewTaskComponent implements OnInit {

  searchTasks: Task[];
  isSearch = false;
  ifResult = true;
  size: number;
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
          this.isSearch = true;
          this.getTaskList();
        }
      }
    );
    return dialogRef.afterClosed();
  }

  getTaskList() {
    console.log('projectName>>>',this.projectName);
    this.projectService.searchTaskById(this.projectId)
      .subscribe(
        data=>{
          this.searchTasks = data;
          this.size = data.length;
          if(this.size===0) {
            this.ifResult = false;
          }
          else {
            this.ifResult = true;
          }
          console.log('Search Tasks>>>',this.searchTasks);
        }
      );
  }

  endTask(taskId: number, taskName: string, projectName: String, parentName: String, priority: number,
    startDate: Date, endDate: Date, userName: String ) {
    const dialogRef = this.dialog.open(DeleteTaskComponent, {
      data: {taskId: taskId, taskName: taskName, projectName:projectName,
        parentName: parentName, priority: priority, startDate: startDate,
         endDate: endDate, userName: userName}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getTaskList();
    });
  }


}
