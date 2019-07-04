import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProjectService } from 'src/app/services/project.service';
import { MatDialog } from '@angular/material';
import { UserDialogComponent } from 'src/app/manager/dialogs/user-dialog/user-dialog.component';
import { ProjectDialogComponent } from 'src/app/manager/dialogs/project-dialog/project-dialog.component';
import { ParentDialogComponent } from 'src/app/manager/dialogs/parent-dialog/parent-dialog.component';
import { ParentTask } from 'src/app/models/parent-task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  task: Task = new Task();
  parent: ParentTask = new ParentTask();
  taskForm: FormGroup;
  isParent: boolean = false;
  max = 30;
  min = 0;
  step = 1;
  thumbLabel = true;
  value = 0;
  vertical = false;

  constructor(public projectService: ProjectService, public dialog: MatDialog, public fb: FormBuilder) { }

  ngOnInit() {
    this.taskForm = this.fb.group({
      'taskName': ['', Validators.required],
      'startDate': [new Date()],
      'endDate': [new Date(new Date().getTime() +86400000)],
      'priority': [0, Validators.required],
      'parentName':'',
      'projectName':'',
      'userName': '',
      'isParent': false
    });
  }

  onClick() {
    this.isParent = !this.isParent;
  }

  getUserList(): Observable<any> {
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

  getProjectList(): Observable<any> {
    const dialogRef = this.dialog.open(ProjectDialogComponent);
    dialogRef.afterClosed().subscribe(
      result=>{
        if(result!=null) {
          this.task.projectId = result.projectId;
          this.task.projectName = result.projectName;
        }
      }
    );
    return dialogRef.afterClosed();
  }

  getParentList(): Observable<any> {
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
    if(!this.isParent) {
      this.task.taskName = this.taskForm.value.taskName;
      this.task.priority = this.taskForm.value.priority;
      this.task.startDate = this.taskForm.value.startDate;
      this.task.endDate = this.taskForm.value.endDate;

      this.projectService.addTask(this.task)
        .subscribe(
          data=>{
            console.log('Added Task>>>',data);
          }
        );
    }
    else {
      this.parent.parentName = this.taskForm.value.taskName;

      this.projectService.addParentTask(this.parent)
        .subscribe(
          data=>{
            console.log('Added ParentTask>>>',data);
          }
        );
      
    }
    this.isParent = false;
    this.onReset();
  }

  onReset() {
    this.taskForm.reset();
    this.taskForm.markAsPristine();
    this.taskForm.markAsUntouched();
  }

}
