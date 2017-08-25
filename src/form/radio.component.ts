import {
  Component,
  AfterContentChecked,
  ViewContainerRef,
  ViewChild,
  ComponentFactoryResolver,
  Input
} from '@angular/core';
import { NgvFormConfig, NgvFormRadioCompOption } from './form.config';
import { NgvDsModel } from '../core/datasource';

/**
 * A component that makes it easy to create tabbed interface.
 */
@Component({
  selector: 'ngv-form-radio',
  template: `
    <div class="mb15" [ngClass]="{'has-error':option.formGroup.controls[option.property].errors}">
        <div class="form-inline form-radio">
            <div class="form-group form-label">
                {{option.label}}
            </div>
            <div class="form-group" *ngFor="let item of data">
                <label>
                    <span class="item-label">{{item.label}}</span>
                    <input name="{{option.property}}" type="radio" [(ngModel)]="option.value"
                           [formControl]="option.formGroup.controls[option.property]"
                           [value]="item.value">
                </label>
            </div>
        </div>
        <div class="form-inline" [hidden]="!option.formGroup.controls[option.property].errors">
            <div class="form-group form-label"></div>
            <p *ngFor="let val of option.validations" class="error-msg">
            <span  *ngIf="option.formGroup.controls[option.property].errors&&
            option.formGroup.controls[option.property].errors[val.type]">{{val.msg}}</span>
            </p>
        </div>
    </div>
  `
})
export class NgvFormRadio implements AfterContentChecked {
  constructor() {

  }

  option: NgvFormRadioCompOption;
  data: Array<any>;

  ngOnInit() {
    this.option.dataSource.getData({}).then((data: Array<any>) => {
      this.data = data;
    })
  }

  ngAfterContentChecked() {
  }

}
