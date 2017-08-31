import {
    Component,
    AfterContentChecked,
    ViewContainerRef,
    ViewChild,
    ComponentFactoryResolver,
    Input
} from '@angular/core';
import {UMeditorComponent} from 'ngx-umeditor';
import {NgvFormConfig, NgvFormUmeditorCompOption} from './form.config';

/**
 * A component that makes it easy to create tabbed interface.
 */
@Component({
    selector: 'ngv-form-umeditor',
    template: `
        <div class="mb15" [ngClass]="{'has-error':option.formGroup.controls[option.property].errors}">
            <div class="form-inline">
                <div class="form-group form-label">
                    {{option.label}}
                </div>
                <div class="form-group umeditor-right">
                    <umeditor #editor [(ngModel)]="option.value"
                              [config]="setting"
                              [path]="option.path"
                              [loadingTip]="option.loadingTip?option.loadingTip:'加载中...'"
                              (onReady)="editorReady()"
                              (onDestroy)="editorDestroy()"
                              (onContentChange)="editorContentChange()"></umeditor>
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
export class NgvFormUmeditor implements AfterContentChecked {
    constructor() {

    }

    @ViewChild('editor') editor: UMeditorComponent;

    setting = {
        //默认的编辑区域宽度
        initialFrameWidth: '100%',
        //默认的编辑区域高度
        initialFrameHeight: 300,
        imageUrl: '/umeditor/img'
    };

    option: NgvFormUmeditorCompOption;

    ngOnInit() {
        if (!this.option.path) {
            this.option.path = "/node_modules/um-editor/";
        }
        if (this.option.config) {
            Object.assign(this.setting, this.option.config);
        }
    }

    editorReady() {
    }

    editorDestroy() {
    }

    editorContentChange() {
        if(this.option.validations){
            for(let val of this.option.validations){
                if(val.type=="required"){
                    let formControl = this.option.formGroup.controls[this.option.property];
                    if(!this.option.value){
                        formControl.setErrors({"required":true})
                    }else{
                        if(formControl.errors){
                            delete formControl.errors["required"];
                        }
                    }
                    if(formControl.errors&&Object.keys(formControl.errors).length==0){
                        formControl.setErrors(null);
                    }
                }
            }
        }
    }

    ngAfterContentChecked() {
    }

}
