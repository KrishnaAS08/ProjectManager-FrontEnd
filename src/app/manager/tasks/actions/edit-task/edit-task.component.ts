import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';
import { MatDialog } from '@angular/material';
import { UserDialogComponent } from 'src/app/manager/dialogs/user-dialog/user-dialog.component';
import { ParentDialogComponent } from 'src/app/manager/dialogs/parent-dialog/parent-dialog.component';
import { ParentTask } from 'src/app/models/parent-task';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  task: Task = new Task();
  parent: ParentTask = new ParentTask();
  id: number;
  taskForm: FormGroup;

  max = 30;
  min = 0;
  step = 1;
  thumbLabel = true;
  value = 0;
  vertical = false;

  constructor(public projectService: ProjectService, public dialog: MatDialog, public fb: FormBuilder, private route: ActivatedRoute) { }
  

  ngOnInit() {
    this.taskForm = this.fb.group({
      'taskName': ['', Validators.required],
      'startDate': [new Date()],
      'endDate': [new Date(new Date().getTime() +86400000)],
      'priority': [0, Validators.required],
      'parentName':'',
      'projectName':'',
      'userName': ''
    });

    this.route.params.subscribe(params => {
      this.id = Number.parseInt(params['id']);
   });
    
    this.projectService.getTaskById(this.id)
      .subscribe(
        data => {
          this.task = data;
          this.taskForm.setValue({
            'taskName': this.task.taskName,
            'startDate':this.task.startDate,
            'endDate': this.task.endDate,
            'priority': this.task.priority,
            'parentName': this.task.parentName,
            'projectName': this.task.projectName,
            'userName': this.task.userName
          });
        },
        (error: HttpErrorResponse) => {
          console.log(error.error);
        }
      );



  }

  getUserList() {
    const dialogRef = this.dialog.open(UserDialogComponent);
    dialogRef.afterClosed().subscribe(
      result=>{
        if(result!=null) {
          this.task.userId = result.userId;
          this.task.userName = result.userName;
        }
      }
    );
    return dialogRef.afterClosed();
  }

  getParentList() {
    const dialogRef = this.dialog.open(ParentDialogComponent);
    dialogRef.afterClosed().subscribe(
      result=>{
        if(result!=null) {
          this.task.parentId = result.parentId;
          this.task.parentName = result.parentName;
        }
      }
    );
    return dialogRef.afterClosed();
  }

  onSubmit() {
    this.task.taskName = this.taskForm.value.taskName;
    this.task.priority = this.taskForm.value.priority;
    this.task.startDate = this.taskForm.value.startDate;
    this.task.endDate = this.taskForm.value.endDate;

    this.projectService.updateTask(this.task.taskId,this.task)
      .subscribe(
        (error: HttpErrorResponse) => {
          console.log(error.error);
        }
      );   
  }


}
