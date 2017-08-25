import {
  Component,
  AfterContentChecked,
  ViewContainerRef,
  ViewChild,
  ComponentFactoryResolver,
  Input
} from '@angular/core';
import { NgvFormConfig, NgvFormSelectCompOption } from './form.config';
import { NgvDsModel } from '../core/datasource';

/**
 * A component that makes it easy to create tabbed interface.
 */
@Component({
  selector: 'ngv-form-select',
  template: `
  <div class="mb15" [ngClass]="{'has-error':option.formGroup.controls[option.property].errors}">
      <div class="form-inline">
          <div class="form-group form-label">
              {{option.label}}
          </div>
          <div class="form-group">
              <select class="form-control"
                      [formControl]="option.formGroup.controls[option.property]"
                      [(ngModel)]="option.value">
                  <option *ngFor="let item of data" [value]="item.value">{{item.label}}</option>
              </select>
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
export class NgvFormSelect implements AfterContentChecked {
  constructor() {

  }

  option: NgvFormSelectCompOption;
  data: Array<any>;

  ngOnInit() {
    this.option.dataSource.getData({}).then((data: Array<any>) => {
      this.data = data;
    })
  }

  ngAfterContentChecked() {
  }

}
