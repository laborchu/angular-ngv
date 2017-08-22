import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';

import { NgvForm } from './form';
import {
	NgvFormConfig, NgvFormOption
} from './form.config';

export { NgvForm } from './form';
export {
	NgvFormConfig, NgvFormOption
} from './form.config';

const NGB_TABSET_DIRECTIVES = [NgvForm];

@NgModule({ declarations: NGB_TABSET_DIRECTIVES, exports: NGB_TABSET_DIRECTIVES, imports: [CommonModule, MDBBootstrapModule, FormsModule] })
export class NgvFormModule {
	static forRoot(): ModuleWithProviders { return { ngModule: NgvFormModule, providers: [NgvFormConfig] }; }
}
