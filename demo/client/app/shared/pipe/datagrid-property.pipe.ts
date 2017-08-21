import { Component, Inject, OnInit, Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'datagridProperty' })
export class DatagridPropertyPipe implements PipeTransform {
	public transform(value: any): string{
		if(value==1){
			return "已经认证";
		}else{
			return "未认证";
		}
	}
}