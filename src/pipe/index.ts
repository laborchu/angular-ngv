import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import { DatagridDeepPropertyPipe } from './datagrid-deep-property.pipe';
export { DatagridDeepPropertyPipe } from './datagrid-deep-property.pipe';


@NgModule({ declarations: [DatagridDeepPropertyPipe], exports: [] })
export class NgvPipeModule {
	static forRoot(): ModuleWithProviders { return { ngModule: NgvPipeModule, providers: [DatagridDeepPropertyPipe] }; }
}
