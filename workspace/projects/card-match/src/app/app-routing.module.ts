import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GamePage} from "./page/game.page";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'card-match'},
  {path: 'card-match', component: GamePage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
