import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerComponent } from './container/container.component';
import { SuggestionsPageComponent } from './suggestions-page/suggestions-page.component';


const routes: Routes = [
{
  path:'',
  component: ContainerComponent
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
