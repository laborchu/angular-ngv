import {Component, OnInit,ViewChild} from '@angular/core';
import {Validators, FormControl} from '@angular/forms';

import {
    NgvFormOption, NgvFormInput, NgvFormRadio, NgvFormCheckbox, NgvFormSelect,
    NgvFormDatePicker, NgvFormUmeditor,
    NgvPanelOption, NgvDataSource, NgvDsModel,NgvForm
} from '../../../../../src/index';
import {CustomValidators} from 'ng2-validation';

class SexDataSource implements NgvDataSource {
    getData(params: any): Promise<NgvDsModel> {
        return new Promise<NgvDsModel>((resolve, reject) => {
            resolve([
                {label: "男", value: 1},
                {label: "女", value: 2}
            ]);
        });
    }
}
class LikeDataSource implements NgvDataSource {
    getData(params: any): Promise<NgvDsModel> {
        return new Promise<NgvDsModel>((resolve, reject) => {
            resolve([
                {label: "游泳", value: 1},
                {label: "下棋", value: 2},
                {label: "编程", value: 3},
                {label: "跑步", value: 4}
            ]);
        });
    }
}
class SelectDataSource implements NgvDataSource {
    getData(params: any): Promise<NgvDsModel> {
        return new Promise<NgvDsModel>((resolve, reject) => {
            resolve([
                {label: "全部", value: ""},
                {label: "杭州", value: 1},
                {label: "宁波", value: 2},
                {label: "温州", value: 3},
                {label: "上海", value: 4}
            ]);
        });
    }
}

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
    moduleId: module.id,
    templateUrl: 'form.component.html',
    styleUrls: ['form.component.css'],
})
export class FormComponent implements OnInit {

    constructor() {
    }
    @ViewChild('myForm') myForm:NgvForm;

    option: NgvFormOption = {
        components: [
            {
                label: '用户名', property: "username", comp: NgvFormInput, type: "text", validations: [
                {msg: "用户名不能为空", type: "required", fn: Validators.required},
                {msg: "长度在5-9", type: "rangeLength", fn: CustomValidators.rangeLength([5, 9])},
                {msg: "必须为数字", type: "digits", fn: CustomValidators.digits},

            ]
            },
            {label: '密码', property: "password", comp: NgvFormInput, type: "password"},
            {
                label: '性别', property: "sex", comp: NgvFormRadio, dataSource: new SexDataSource(), validations: [
                {msg: "性别必选", type: "required", fn: Validators.required}

            ]
            },
            {
                label: '爱好',
                property: "like",
                comp: NgvFormCheckbox,
                dataSource: new LikeDataSource(),
                value: [1],
                validations: [
                    {msg: "爱好必选", type: "required", fn: Validators.required}

                ]
            },
            {
                label: '地区',
                property: "location",
                comp: NgvFormSelect,
                dataSource: new SelectDataSource(),
                value: 1,
                validations: [
                    {msg: "地区必选", type: "required", fn: Validators.required}
                ]
            },
            {
                label: '出生日期', property: "date", comp: NgvFormDatePicker, validations: [
                {msg: "出生日期必填", type: "required", fn: Validators.required},
            ]
            },
            {
                label: '介绍', property: "desc", comp: NgvFormUmeditor, validations: [
                {msg: "介绍必填", type: "required", fn: Validators.required},
            ]
            },
        ]
    }

    panelOption: NgvPanelOption = {
        crumbs: [
            {
                text: "专题资讯"
            },
            {
                text: "新增资讯"
            }
        ],
        buttons:[
            {
                text: '保存',
                action: (item) => {
                    if(this.myForm.checkVal()){
                        alert(item);
                    }
                }
            }
        ]

    }

    /**
     * Get the names OnInit
     */
    ngOnInit() {
    }


}
