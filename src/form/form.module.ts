import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UMeditorModule } from 'ngx-umeditor';
import { CustomFormsModule } from 'ng2-validation'

import { NgvForm } from './form';
import {
	NgvFormConfig, NgvFormOption
} from './form.config';
import {
	NgvFormInput
} from './input.component';
import {
	NgvFormRadio
} from './radio.component';
import {
	NgvFormCheckbox
} from './checkbox.component';
import {
	NgvFormSelect
} from './select.component';
import {
	NgvFormDatePicker
} from './datepicker.component';
import {
	NgvFormUmeditor
} from './umeditor.component';


export { NgvForm } from './form';
export {
	NgvFormConfig, NgvFormOption, NgvFormInputCompOption, 
	NgvFormRadioCompOption, NgvFormCheckboxCompOption, NgvFormSelectCompOption, NgvFormDatePickerCompOption,
	NgvFormUmeditorCompOption
} from './form.config';
export {
	NgvFormInput
} from './input.component';
export {
	NgvFormRadio
} from './radio.component';
export {
	NgvFormCheckbox
} from './checkbox.component';
export {
	NgvFormSelect
} from './select.component';
export {
	NgvFormDatePicker
} from './datepicker.component';
export {
	NgvFormUmeditor
} from './umeditor.component';

const NGB_TABSET_DIRECTIVES = [NgvForm, NgvFormInput, NgvFormRadio, NgvFormCheckbox, NgvFormSelect, 
	NgvFormDatePicker, NgvFormUmeditor];

@NgModule({ 
	declarations: NGB_TABSET_DIRECTIVES, 
	exports: NGB_TABSET_DIRECTIVES, 
	imports: [CommonModule, MDBBootstrapModule, FormsModule,ReactiveFormsModule, NgbModule, UMeditorModule, CustomFormsModule],
	entryComponents: [NgvFormInput, NgvFormRadio, NgvFormCheckbox, NgvFormSelect, NgvFormDatePicker,
		NgvFormUmeditor]
})
export class NgvFormModule {
	static forRoot(): ModuleWithProviders { return { ngModule: NgvFormModule, providers: [NgvFormConfig] }; }
}
