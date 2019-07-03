import { Component, OnInit, Inject } from '@angular/core';
import { Project } from 'src/app/models/project';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-delete-project',
  templateUrl: './delete-project.component.html',
  styleUrls: ['./delete-project.component.scss']
})
export class DeleteProjectComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteProjectComponent>,
    @Inject (MAT_DIALOG_DATA) public project: Project,
    public projectService: ProjectService) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmSuspend(): void {
    this.projectService.suspendProject(this.project.projectId).subscribe(
      data=>{
        console.log('Suspended Project>>>',data);
      }
    );
  }

}
