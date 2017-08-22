import { Injectable, PipeTransform } from '@angular/core';
import { NgvDataSource,NgvDsModel } from '../core/datasource';

/**
 * Configuration service for the NgbTabset component.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the tabsets used in the application.
 */
@Injectable()
export class NgvDataGridConfig {
}

export interface NgvDsDataGridModel extends NgvDsModel{
	page: NgvDsDataGridPageModel;
	data: Array<any>;
}

export interface NgvDsDataGridPageModel extends NgvDsModel {
	pageSize?: number; //每页个数
	pageCount: number; //页面总数
	pageIndex: number;//当前页数

	numArray?: Array<number>;//显示页数
	firstDisable?: boolean;//第一页是否可用
	endDisable?: boolean;//最后一页是否可用
}

export type styleFunc = (data: any) => string;
export type pipeFunc = (property: string,data:any) => string;
export type textFunc = (data:any) => string;

export interface NgvDataGridOption {
	dataSource: NgvDataSource;
	table: NgvDataGridTableOption;
	toolbar?: NgvDataGridToolbarOption;
}

export interface NgvDataGridTableOption {
	columns: Array<NgvDataGridColumnOption>;
	op?: NgvDataGridOpOption;
}

export interface NgvDataGridColumnOption {
	text: string;
	property: string;
	propertyPipe?: PipeTransform | pipeFunc;
	width?: string;
	title?:boolean;
	overflow?: boolean;
	propertyClassPipe?: PipeTransform;
}

export interface NgvDataGridOpOption {
	width?: string;
	buttons: Array<NgvDataGridOpBtnOption>;
	groupButtons?: Array<NgvDataGridOpGroupBtnOption>;
}

export interface NgvDataGridOpGroupBtnOption {
	text: string;
	buttons: Array<NgvDataGridOpBtnOption>;
}

export interface NgvDataGridOpBtnOption {
	text: string | textFunc;
	style?: string | styleFunc;
	action: (data: any) => void;
}

export interface NgvDataGridToolbarOption {
	search?: NgvDataGridSearchOption;
	buttons?: Array<NgvDataGridOpBtnOption>;
	filters?: Array<NgvDataGridFilterOption>;
}

export interface NgvDataGridSearchOption {
	placeholder?: string;
	property: string;
}

export interface NgvDataGridFilterOption {
	label: string;
	property: string;
	value?: any;
	type: 'radio' | 'checkbox' | 'select';
	dataSource: NgvDataSource;
	dataArray?: Array<any>;
}



