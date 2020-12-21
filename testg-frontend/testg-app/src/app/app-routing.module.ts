import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsComponent } from './projects/projects.component'
import { TestsComponent } from './tests/tests.component';
import { NewTestComponent } from './tests/new-test/new-test.component'


const routes: Routes = [
  {
    path: '', redirectTo: '/projects', pathMatch: 'full'
  },
  {
    path: 'projects', component: ProjectsComponent
  },
  {
    path: 'tests', component: TestsComponent
  },
  {
    path: 'tests/new', component: NewTestComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
