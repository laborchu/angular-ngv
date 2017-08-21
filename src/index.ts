import { NgModule, ModuleWithProviders } from '@angular/core';

import { NgvDataGridModule } from './datagrid/datagrid.module';
export {
	NgvDataGridModule,
	NgvDataGrid,
	
	NgvDataGridConfig, NgvDataGridOption, NgvDataGridTableOption,
	NgvDataGridColumnOption, NgvDataGridOpOption, NgvDataGridOpBtnOption
} from './datagrid/datagrid.module';

export {
	NgvDataSource
} from './core/datasource';


const NGB_MODULES = [
	NgvDataGridModule
];

@NgModule({
  imports: [
	  NgvDataGridModule.forRoot()
  ],
  exports: NGB_MODULES
})
export class NgvRootModule {
}

@NgModule({ imports: NGB_MODULES, exports: NGB_MODULES })
export class NgvModule {
  static forRoot(): ModuleWithProviders { return { ngModule: NgvRootModule }; }
}
