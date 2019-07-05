import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import { MatDialog } from '@angular/material';
import { Task } from 'src/app/models/task';
import { FormControl } from '@angular/forms';
import { ProjectDialogComponent } from 'src/app/manager/dialogs/project-dialog/project-dialog.component';
import { DeleteTaskComponent } from '../delete-task/delete-task.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss']
})
export class ViewTaskComponent implements OnInit {

  count = 0;
  searchTasks: Task[];
  filteredData: Task[];
  isSearch = false;
  ifResult = true;
  size: number;
  searchForm = new FormControl('');
  projectId: number;
  projectName: String;

  constructor(public projectService: ProjectService, public dialog: MatDialog) { }

  ngOnInit() {
  }



  getProjectList() {
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
    this.projectService.searchTaskById(this.projectId)
      .subscribe(
        data=>{
          this.searchTasks = data;
          this.filteredData = data;
          this.size = data.length;
          if(this.size===0) {
            this.ifResult = false;
          }
          else {
            this.ifResult = true;
          }
        },
        (error: HttpErrorResponse) => {
          console.log(error.error);
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

  doSortStartDate() {
    if(this.count===0){
      this.filteredData=this.filteredData.sort(function(a, b) {
        var dateA = new Date(a.startDate), dateB = new Date(b.startDate);
        return dateA.getTime() - dateB.getTime();
      });
      this.count++;
    }    
    else{
      this.filteredData=this.filteredData.sort(function(a, b) {
        var dateA = new Date(a.startDate), dateB = new Date(b.startDate);
        return dateB.getTime() - dateA.getTime();
      });
      this.count = 0;
    }
  }

  doSortEndDate() {
    if(this.count===0){
      this.filteredData=this.filteredData.sort(function(a, b) {
        var dateA = new Date(a.endDate), dateB = new Date(b.endDate);
        return dateA.getTime() - dateB.getTime();
      });
      this.count++;
    }    
    else{
      this.filteredData=this.filteredData.sort(function(a, b) {
        var dateA = new Date(a.endDate), dateB = new Date(b.endDate);
        return dateB.getTime() - dateA.getTime();
      });
      this.count = 0;
    }
  }

  doSortPriority() {
    if(this.count===0){
      this.filteredData=this.filteredData.sort((a, b) => a.priority-b.priority); 
      this.count++;
    }    
    else{
      this.filteredData=this.filteredData.sort((a, b) => b.priority-a.priority); 
      this.count = 0;
    } 
  }

  doSortCompleted() {
    var value ='complete'
      const data = this.searchTasks.filter(
        task=> {
          if(value && task.status.toLowerCase().includes(value.toLowerCase()))
            return task;
        } 
      );
    if(this.count===0){
      this.filteredData = data;
      this.count++;
    }    
    else{
      this.filteredData = this.searchTasks; 
      this.count = 0;
    } 
  }


}
