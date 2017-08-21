import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataGridComponent } from './ngv/index';

@NgModule({
  imports: [
    RouterModule.forRoot([
		  { path: '', component: DataGridComponent }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

