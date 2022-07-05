import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuditTypeComponent } from './audit-type/audit-type.component';
import { ChecklistComponent } from './checklist/checklist.component';
import { SeverityComponent } from './severity/severity.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';

const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'audit-type', component: AuditTypeComponent },
  {path: 'checklist',component:ChecklistComponent},
  {path:'severity',component:SeverityComponent},
  {path:'project-details',component:ProjectDetailsComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
