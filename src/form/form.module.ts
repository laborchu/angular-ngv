import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UMeditorModule } from 'ngx-umeditor';
import { CustomFormsModule } from 'ng2-validation'
import { WebUploaderModule, WebUploaderConfig, Options, OptionsPick, OptionsThumb } from 'ngx-webuploader';

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
import {
	NgvFormUploader
} from './uploader.component';


export { NgvForm } from './form';
export {
	NgvFormConfig, NgvFormOption, NgvFormInputCompOption, 
	NgvFormRadioCompOption, NgvFormCheckboxCompOption, NgvFormSelectCompOption, NgvFormDatePickerCompOption,
	NgvFormUmeditorCompOption,NgvFormUploaderCompOption
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
export {
	NgvFormUploader
} from './uploader.component';

const NGB_TABSET_DIRECTIVES = [NgvForm, NgvFormInput, NgvFormRadio, NgvFormCheckbox, NgvFormSelect, 
	NgvFormDatePicker, NgvFormUmeditor,NgvFormUploader];

@NgModule({ 
	declarations: NGB_TABSET_DIRECTIVES, 
	exports: NGB_TABSET_DIRECTIVES, 
	imports: [CommonModule, MDBBootstrapModule, FormsModule,ReactiveFormsModule, NgbModule, 
	UMeditorModule, CustomFormsModule,
        WebUploaderModule.forRoot(<WebUploaderConfig>{
            options: <Options>{
                swf: '/assets/webuploader-0.1.5/Uploader.swf',
                resize: false,
                duplicate: true,
                chunked:true,
                threads:1,
                chunkSize:4194304
            },
            path: '/assets/webuploader-0.1.5/',
            dependentLib: '/assets/webuploader-0.1.5/zepto.min.js'
        })],
	entryComponents: NGB_TABSET_DIRECTIVES
})
export class NgvFormModule {
	static forRoot(): ModuleWithProviders { return { ngModule: NgvFormModule, providers: [NgvFormConfig] }; }
}
