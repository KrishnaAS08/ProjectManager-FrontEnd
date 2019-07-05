import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Project } from 'src/app/models/project';
import { MatDialog } from '@angular/material';
import { ProjectService } from 'src/app/services/project.service';
import { DeleteProjectComponent } from '../delete-project/delete-project.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.scss']
})
export class ViewProjectComponent implements OnInit {

  count = 0;
  filteredData: Project[];
  @Input() projects:Project[];
  @Output() editProject = new EventEmitter<Project>();
  constructor(public dialog: MatDialog, public projectService: ProjectService) { }

  ngOnInit() {
    this.getProjectList();
  }

  getProjectList() {
    this.projectService.getAllProjectsRecord()
      .subscribe(
        data => {
          this.projects = data;
          this.filteredData = data;
        },
        (error: HttpErrorResponse) => {
          console.log(error.error);
        }
      );
  }
  
  onSuspend(id: number, projectName: String, userName: String, priority: number,
            startDate: Date, endDate: Date, noOfTasks: number, completedTasks: number) {
    const dialogRef = this.dialog.open(DeleteProjectComponent, {
      data: {projectId: id, projectName: projectName, userName: userName,
            priority: priority, startDate: startDate, endDate: endDate,
            noOfTasks: noOfTasks, completedTasks: completedTasks}
    });

    dialogRef.afterClosed().subscribe(result=> {
      this.getProjectList();
    })
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
    if(this.count===0){
      this.filteredData=this.filteredData.sort((a, b) => a.completedTasks-b.completedTasks); 
      this.count++;
    }    
    else{
      this.filteredData=this.filteredData.sort((a, b) => b.completedTasks-a.completedTasks); 
      this.count = 0;
    } 
  }

  doFilter = (value: string) => {
    const data = this.projects.filter(
      project=> {
        if(value && project.projectName.toLowerCase().includes(value.toLowerCase()))
          return project;
      } 
    );
    if(value)
      this.filteredData = data;
    else
      this.filteredData = this.projects;
  }
  
  startEdit(selectedUser: Project) {
    this.editProject.emit(selectedUser);
  }

}
