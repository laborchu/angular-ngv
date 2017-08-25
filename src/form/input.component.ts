import {
  Component,
  AfterContentChecked,
  ViewContainerRef,
  ViewChild,
  ComponentFactoryResolver,
  Input
} from '@angular/core';
import { NgvFormConfig, NgvFormCompOption } from './form.config';

/**
 * A component that makes it easy to create tabbed interface.
 */
@Component({
  selector: 'ngv-form-input',
  template: `
    <div class="md-form form-group" [ngClass]="{'has-error':option.formGroup.controls[option.property].errors}">
        <input name="{{option.property}}" mdbActive 
               type="{{option.type}}" 
               class="form-control"
               [formControl]="option.formGroup.controls[option.property]"
               [(ngModel)]="option.value">
        <label>{{option.label}}</label>
        
        <p *ngFor="let val of option.validations" class="error-msg">
            <span  *ngIf="option.formGroup.controls[option.property].errors&&
            option.formGroup.controls[option.property].errors[val.type]">{{val.msg}}</span>
        </p>
    </div>
  `
})
export class NgvFormInput implements AfterContentChecked {
  constructor() {

  }

  option: NgvFormCompOption;

  ngOnInit() {
  }

  ngAfterContentChecked() {
  }

}
