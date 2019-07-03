import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from 'src/app/models/project';
import { MatDialog } from '@angular/material';
import { ProjectService } from 'src/app/services/project.service';
import { DeleteProjectComponent } from '../delete-project/delete-project.component';

@Component({
  selector: 'view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.scss']
})
export class ViewProjectComponent implements OnInit {

  @Input() projects:Observable<Project[]>;
  constructor(public dialog: MatDialog, public projectService: ProjectService) { }

  ngOnInit() {
  }

  getProjectList() {
    this.projectService.getAllProjectsRecord()
      .subscribe(
        data => {
          this.projects = data;
          console.log('UserList>>>',this.projects);
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
      console.log('Result>>>',result);
    })
  }

}
