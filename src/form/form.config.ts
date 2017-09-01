import { Injectable} from '@angular/core';
import { ValidatorFn,FormGroup} from '@angular/forms';
import { NgvDataSource, NgvDsModel } from '../core/datasource';


export type wrapperUploadDataFunc = (data: any) => void;
export type uploadSuccessFunc = (data: any) => void;
export type uploadBeforeSendFunc = (block: any, data: any, headers: any) => void;

/**
 * Configuration service for the NgbTabset component.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the tabsets used in the application.
 */
@Injectable()
export class NgvFormConfig {
	uploaderConfig: NgvFormUploaderConfig;
}

export class NgvFormUploaderConfig {
	server: string;//服务器地址
	md5Source?: NgvDataSource;
	wrapperUploadData ?: wrapperUploadDataFunc;
	uploadBeforeSend?: uploadBeforeSendFunc;//错误处理
	uploadSuccess?: uploadSuccessFunc;//上传完成
}

export class NgvFormOption {
	components: Array<NgvFormCompOption | NgvFormInputCompOption | NgvFormRadioCompOption | NgvFormUploaderCompOption | NgvFormUmeditorCompOption>;
	value?: any;
}


export type onChangeFunc = (option:NgvFormCompOption) => void;

export class NgvFormCompOption {
	comp: any;
	label: string;
	property: string;
	value?: any;
    validations?:Array<NgvFormValidationOption>;
    formGroup?: FormGroup;
    onChange?: onChangeFunc;
}

export class NgvFormValidationOption {
    msg: string;
    type: string;
    fn:ValidatorFn;
}


export class NgvFormInputCompOption extends NgvFormCompOption {
	type: 'text' | 'password';
}

export interface NgvLvDataSource extends NgvDataSource {
	label?:string;
	value?:string;
}

export class NgvFormRadioCompOption extends NgvFormCompOption {
	dataSource: NgvDataSource;
	dsLabel?:string;
	dsValue?:string;
}

export class NgvFormCheckboxCompOption extends NgvFormCompOption {
	dataSource: NgvDataSource;
	dsLabel?:string;
	dsValue?:string;
}

export class NgvFormSelectCompOption extends NgvFormCompOption {
	dataSource: NgvDataSource;
	dsLabel?:string;
	dsValue?:string;
}

export class NgvFormDatePickerCompOption extends NgvFormCompOption {
}

export class NgvFormUmeditorCompOption extends NgvFormCompOption {
	config?: any; //umeditor配置项
	path?: string;//umeditor代码根目录路径，以 / 结尾
	loadingTip?: string;//初始化提示文本
}

export type errHandlerFunc = (err: any) => void;

export class NgvFormUploaderCompOption extends NgvFormCompOption {
	accept?:'image'|'video';
	multiple?:boolean;
	limit?:number;
	uploaderId?: string;//默认picker
	errHandler?: errHandlerFunc;//错误处理
}



