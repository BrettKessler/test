import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminForFortuneGardenComponent } from './container/admin-for-fortune-garden/admin-for-fortune-garden.component';
import { ContainerComponent } from './container/container.component';
import { SuggestionsPageComponent } from './suggestions-page/suggestions-page.component';


const routes: Routes = [
{
  path:'',
  component: ContainerComponent
},
{ 
  path: 'admin-for-fortune-garden',
  component: AdminForFortuneGardenComponent
 },
 {
   path:'suggestions',
   component: SuggestionsPageComponent
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
