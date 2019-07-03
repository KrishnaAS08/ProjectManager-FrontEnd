import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { AddUserComponent } from './manager/user/actions/add-user/add-user.component';
import { ViewUserComponent } from './manager/user/actions/view-user/view-user.component';
import { DeleteUserComponent } from './manager/user/actions/delete-user/delete-user.component';
import { AddProjectComponent } from './manager/project/actions/add-project/add-project.component';
import { ViewProjectComponent } from './manager/project/actions/view-project/view-project.component';
import { DeleteProjectComponent } from './manager/project/actions/delete-project/delete-project.component';
import { AddTaskComponent } from './manager/tasks/actions/add-task/add-task.component';
import { ViewParentTaskComponent } from './manager/tasks/actions/view-parent-task/view-parent-task.component';
import { ViewTaskComponent } from './manager/tasks/actions/view-task/view-task.component';
import { EditTaskComponent } from './manager/tasks/actions/edit-task/edit-task.component';
import { DeleteTaskComponent } from './manager/tasks/actions/delete-task/delete-task.component';
import { UserDialogComponent } from './manager/dialogs/user-dialog/user-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    AddUserComponent,
    ViewUserComponent,
    DeleteUserComponent,
    AddProjectComponent,
    ViewProjectComponent,
    DeleteProjectComponent,
    AddTaskComponent,
    ViewParentTaskComponent,
    ViewTaskComponent,
    EditTaskComponent,
    DeleteTaskComponent,
    UserDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  entryComponents: [
    DeleteUserComponent,
    UserDialogComponent,
    DeleteProjectComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
