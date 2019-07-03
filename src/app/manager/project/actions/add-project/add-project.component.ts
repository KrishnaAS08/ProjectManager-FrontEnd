import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';
import { MatDialog } from '@angular/material';
import { UserDialogComponent } from 'src/app/manager/dialogs/user-dialog/user-dialog.component';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {

  project: Project = new Project();
  projects: Observable<Project[]>;
  projectForm: FormGroup;
  ifSetDate: boolean = false;
  max = 30;
  min = 0;
  step = 1;
  thumbLabel = true;
  value = 0;
  vertical = false;

  constructor(public projectService: ProjectService, public dialog: MatDialog, public fb: FormBuilder) { }

  ngOnInit() {
    this.projectForm = this.fb.group({
      'projectName': ['', Validators.required],
      'startDate': [new Date()],
      'endDate': [new Date(new Date().getTime() +86400000)],
      'priority': [0, Validators.required],
      'userName': '',
      'ifSetDate': false
    });
    this.getProjectList();
  }

  onClick() {
    this.ifSetDate = !this.ifSetDate;
  }

  getUserList(): Observable<any> {
    const dialogRef = this.dialog.open(UserDialogComponent);
    dialogRef.afterClosed().subscribe(
      result=>{
        if(result!=null) {
          this.project.userId = result.userId;
          this.project.userName = result.userName;
        }
      }
    );
    return dialogRef.afterClosed();
  }

  getProjectList() {
    this.projectService.getAllProjectsRecord()
      .subscribe(
        data=>{
          this.projects = data;
          console.log('ProjectList>>>',this.projects);
        }
      )
  }

  onSubmit() {
    this.project.projectName = this.projectForm.value.projectName;
    this.project.priority = this.projectForm.value.priority;
    if(this.ifSetDate) {
      this.project.startDate = this.projectForm.value.startDate;
      this.project.endDate = this.projectForm.value.endDate;
    }
    this.projectService.addProject(this.project)
      .subscribe(
        data=>{
          console.log('Added Project>>>',data);
        }
      );
      this.ifSetDate = false;
      this.onReset();
  }

  onReset() {
    this.projectForm.reset();
    this.projectForm.markAsPristine();
    this.projectForm.markAsUntouched();
  }

}
