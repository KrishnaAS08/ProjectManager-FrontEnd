import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';
import { MatDialog } from '@angular/material';
import { UserDialogComponent } from 'src/app/manager/dialogs/user-dialog/user-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {

  project: Project = new Project();
  projects: Project[];
  projectForm: FormGroup;
  isUpdate = false;
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

  getUserList() {
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
        },
        (error: HttpErrorResponse) => {
          console.log(error.error);
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
          this.getProjectList();
        },
        (error: HttpErrorResponse) => {
          console.log(error.error);
        }
      );
      this.ifSetDate = false;
      this.onReset();
  }

  startEditProject(selectedProject: Project) {
    if(selectedProject) {
      this.project = selectedProject;
      if(selectedProject.startDate != null){
        this.projectForm.setValue({
          'projectName': selectedProject.projectName,
          'startDate': selectedProject.startDate,
          'endDate': selectedProject.endDate,
          'priority': selectedProject.priority,
          'userName': selectedProject.userName,
          'ifSetDate': true
        })
        this.ifSetDate = true;
      }
      else{
        this.projectForm.setValue({
          'projectName': selectedProject.projectName,
          'priority': selectedProject.priority,
          'startDate': selectedProject.startDate,
          'endDate': selectedProject.endDate,
          'userName': selectedProject.userName,
          'ifSetDate': false
        })
        this.ifSetDate = false;
      }
      
      this.isUpdate = true;
    }
  }

  onUpdate() {
    this.project.projectName = this.projectForm.value.projectName;
    this.project.priority = this.projectForm.value.priority;
    if(this.ifSetDate) {
      this.project.startDate = this.projectForm.value.startDate;
      this.project.endDate = this.projectForm.value.endDate;
    }
    this.projectService.updateProject(this.project.projectId,this.project)
      .subscribe(
        (error: HttpErrorResponse) => {
          console.log(error.error);
        }
      );
    this.onCancel();
  }

  onReset() {
    this.projectForm.reset();
    this.projectForm.markAsPristine();
    this.projectForm.markAsUntouched();
  }

  onCancel() {
    this.onReset();
    this.isUpdate = false;
  }

}
