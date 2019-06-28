import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AddUserComponent } from './manager/user/actions/add-user/add-user.component';
import { AddProjectComponent } from './manager/project/actions/add-project/add-project.component';
import { AddTaskComponent } from './manager/tasks/actions/add-task/add-task.component';
import { ViewTaskComponent } from './manager/tasks/actions/view-task/view-task.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  },
  {
    path: 'users',
    component: AddUserComponent
  },
  {
    path: 'projects',
    component: AddProjectComponent
  },
  {
    path: 'tasks',
    component: AddTaskComponent
  },
  {
    path: 'viewTask',
    component: ViewTaskComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
