import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';

import { NgvPanel } from './panel';
import {
	NgvPanelConfig, NgvPanelOption, NgvPanelCrumbsOption
} from './panel.config';

export { NgvPanel } from './panel';
export {
	NgvPanelConfig, NgvPanelOption,NgvPanelCrumbsOption
} from './panel.config';

const NGB_TABSET_DIRECTIVES = [NgvPanel];

@NgModule({ declarations: NGB_TABSET_DIRECTIVES, exports: NGB_TABSET_DIRECTIVES, imports: [CommonModule] })
export class NgvPanelModule {
	static forRoot(): ModuleWithProviders { return { ngModule: NgvPanelModule, providers: [NgvPanelConfig] }; }
}
