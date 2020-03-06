import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminForFortuneGardenComponent } from './container/admin-for-fortune-garden/admin-for-fortune-garden.component';
import { ContainerComponent } from './container/container.component';


const routes: Routes = [
{
  path:'',
  component: ContainerComponent
},
{ 
  path: 'admin-for-fortune-garden',
  component: AdminForFortuneGardenComponent
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
