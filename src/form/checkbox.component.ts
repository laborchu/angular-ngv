import {
    Component,
    AfterContentChecked,
    ViewContainerRef,
    ViewChild,
    ComponentFactoryResolver,
    Input
} from '@angular/core';
import {NgvFormConfig, NgvFormCheckboxCompOption} from './form.config';
import {NgvDsModel} from '../core/datasource';


/**
 * A component that makes it easy to create tabbed interface.
 */
@Component({
    selector: 'ngv-form-checkbox',
    template: `
        <div class="mb15" [ngClass]="{'has-error':option.formGroup.controls[option.property].errors}">
            <div class="form-inline form-radio">
                <div class="form-group form-label">
                    {{option.label}}
                </div>
                <div class="form-group" *ngFor="let item of data">
                    <label>
                        <span class="item-label">{{item.label}}</span>
                        <input name="{{option.property}}" type="checkbox"
                               [formControl]="option.formGroup.controls[option.property]"
                               [checked]="checked(item.value)"
                               (change)="change($event)" [value]="item.value">
                    </label>
                </div>
            </div>
            <div class="form-inline" [hidden]="!option.formGroup.controls[option.property].errors">
                <div class="form-group form-label"></div>
                <p *ngFor="let val of option.validations" class="error-msg">
            <span *ngIf="option.formGroup.controls[option.property].errors&&
            option.formGroup.controls[option.property].errors[val.type]">{{val.msg}}</span>
                </p>
            </div>
        </div>
    `
})
export class NgvFormCheckbox implements AfterContentChecked {
    constructor() {

    }

    option: NgvFormCheckboxCompOption;
    data: Array<any>;

    ngOnInit() {
        this.option.dataSource.getData({}).then((data: Array<any>) => {
            this.data = data;
        })
    }

    change(event: any) {
        if (!this.option.value) {
            this.option.value = [];
        }
        let data = this.option.value;
        if (event.currentTarget.checked) {
            data.push(event.currentTarget.value);
        } else {
            data.splice(data.indexOf(event.currentTarget.value), 1);
        }
        if(this.option.validations){
            for(let val of this.option.validations){
                if(val.type=="required"){
                    if(data.length==0){
                        let formControl = this.option.formGroup.controls[this.option.property];
                        formControl.setErrors({"required":true})
                    }
                }
            }
        }
    }

    checked(value: any): boolean {
        if (!this.option.value) {
            return false;
        }
        return this.option.value.indexOf(value) != -1;
    }

    ngAfterContentChecked() {
    }

}