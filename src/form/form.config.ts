import { Injectable} from '@angular/core';
import { ValidatorFn,FormGroup} from '@angular/forms';
import { NgvDataSource, NgvDsModel } from '../core/datasource';

/**
 * Configuration service for the NgbTabset component.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the tabsets used in the application.
 */
@Injectable()
export class NgvFormConfig {

}

export class NgvFormOption {
	components: Array<NgvFormCompOption | NgvFormInputCompOption | NgvFormRadioCompOption>;
}


export class NgvFormCompOption {
	comp: any;
	label: string;
	property: string;
	value?: any;
    validations?:Array<NgvFormValidationOption>;
    formGroup?: FormGroup;
}

export class NgvFormValidationOption {
    msg: string;
    type: string;
    fn:ValidatorFn;
}


export class NgvFormInputCompOption extends NgvFormCompOption {
	type: 'text' | 'password';
}


export class NgvFormRadioCompOption extends NgvFormCompOption {
	dataSource: NgvDataSource;
}

export class NgvFormCheckboxCompOption extends NgvFormCompOption {
	dataSource: NgvDataSource;
}

export class NgvFormSelectCompOption extends NgvFormCompOption {
	dataSource: NgvDataSource;
}

export class NgvFormDatePickerCompOption extends NgvFormCompOption {
}

export class NgvFormUmeditorCompOption extends NgvFormCompOption {
	config?: any; //umeditor配置项
	path?: string;//umeditor代码根目录路径，以 / 结尾
	loadingTip?: string;//初始化提示文本
}



