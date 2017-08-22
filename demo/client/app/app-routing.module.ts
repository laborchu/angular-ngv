import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataGridComponent, PanelComponent, FormComponent } from './ngv/index';

@NgModule({
  imports: [
    RouterModule.forRoot([
		  { path: '', component: DataGridComponent },
		  { path: 'panel', component: PanelComponent },
		  { path: 'form', component: FormComponent },
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

