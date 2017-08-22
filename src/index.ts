import { NgModule, ModuleWithProviders } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { NgvDataGridModule } from './datagrid/datagrid.module';
export {
	NgvDataGridModule,
	NgvDataGrid,
	
	NgvDataGridConfig, NgvDataGridOption, NgvDataGridTableOption,
	NgvDataGridColumnOption, NgvDataGridOpOption, NgvDataGridOpBtnOption,
	NgvDsDataGridModel, NgvDsDataGridPageModel
} from './datagrid/datagrid.module';

import { NgvPanelModule } from './panel/panel.module';
export {
	NgvPanelModule,
	NgvPanel,

	NgvPanelConfig, NgvPanelOption, NgvPanelCrumbsOption
} from './panel/panel.module';

import { NgvFormModule } from './form/form.module';
export {
	NgvFormModule,
	NgvForm,

	NgvFormConfig, NgvFormOption
} from './form/form.module';


export {
	NgvDataSource, NgvDsModel
} from './core/datasource';


import {
	NgvPipeModule
} from './pipe/index';

export {
	NgvPipeModule, DatagridDeepPropertyPipe
} from './pipe/index';


const NGB_MODULES = [
	NgvDataGridModule,
	NgvPanelModule,
	NgvFormModule
];

@NgModule({
  imports: [
	  MDBBootstrapModule.forRoot(),
	  NgvDataGridModule.forRoot(),
	  NgvPanelModule.forRoot(),
	  NgvFormModule.forRoot(),
	  NgvPipeModule.forRoot()
  ],
  exports: NGB_MODULES
})
export class NgvRootModule {
}

@NgModule({ imports: NGB_MODULES, exports: NGB_MODULES })
export class NgvModule {
  static forRoot(): ModuleWithProviders { return { ngModule: NgvRootModule }; }
}
