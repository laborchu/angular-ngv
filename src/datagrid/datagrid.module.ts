import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';

import { NgvDataGrid} from './datagrid';
import { NgvDataGridConfig, NgvDataGridOption, NgvDataGridTableOption,
 NgvDataGridColumnOption, NgvDataGridOpOption, NgvDataGridOpBtnOption
} from './datagrid.config';

export { NgvDataGrid} from './datagrid';
export {
	NgvDataGridConfig, NgvDataGridOption, NgvDataGridTableOption,
	NgvDataGridColumnOption, NgvDataGridOpOption, NgvDataGridOpBtnOption
} from './datagrid.config';

const NGB_TABSET_DIRECTIVES = [NgvDataGrid];

@NgModule({ declarations: NGB_TABSET_DIRECTIVES, exports: NGB_TABSET_DIRECTIVES, imports: [CommonModule, MDBBootstrapModule, FormsModule] })
export class NgvDataGridModule {
	static forRoot(): ModuleWithProviders { return { ngModule: NgvDataGridModule, providers: [NgvDataGridConfig] }; }
}
