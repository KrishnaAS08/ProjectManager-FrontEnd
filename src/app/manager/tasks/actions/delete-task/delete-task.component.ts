import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Task } from 'src/app/models/task';
import { ProjectService } from 'src/app/services/project.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.scss']
})
export class DeleteTaskComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteTaskComponent>,
    @Inject (MAT_DIALOG_DATA) public task: Task,
    public projectService: ProjectService) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmEndTask(): void {
    this.projectService.endTask(this.task.taskId).subscribe(
      (error: HttpErrorResponse) => {
        console.log(error.error);
      }
    );
  }

}
