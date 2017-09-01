import {
  Component,
  AfterContentChecked,
  ViewContainerRef,
  ViewChild,
  ComponentFactoryResolver,
  Input
} from '@angular/core';
import { NgvFormConfig, NgvFormCompOption } from './form.config';
import { NgvFormComp } from './form.component';

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
               (change)="onChange()"
               [(ngModel)]="option.value">
        <label>{{option.label}}</label>
        
        <p *ngFor="let val of option.validations" class="error-msg">
            <span  *ngIf="option.formGroup.controls[option.property].errors&&
            option.formGroup.controls[option.property].errors[val.type]">{{val.msg}}</span>
        </p>
    </div>
  `
})
export class NgvFormInput extends NgvFormComp implements AfterContentChecked {
  constructor() {
    super();
  }

  option: NgvFormCompOption;

  onChange(){
    this.option.onChange && this.option.onChange(this.option);
  }

  ngOnInit() {
  }

  ngAfterContentChecked() {
  }

}
