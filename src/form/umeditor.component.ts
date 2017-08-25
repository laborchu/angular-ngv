import {
  Component,
  AfterContentChecked,
  ViewContainerRef,
  ViewChild,
  ComponentFactoryResolver,
  Input
} from '@angular/core';
import { UMeditorComponent } from 'ngx-umeditor';
import { NgvFormConfig, NgvFormUmeditorCompOption } from './form.config';

/**
 * A component that makes it easy to create tabbed interface.
 */
@Component({
  selector: 'ngv-form-umeditor',
  template: `
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
  data: Array<any>;

  ngOnInit() {
    if(!this.option.path){
      this.option.path = "/node_modules/um-editor/";
    }
    if(this.option.config){
      Object.assign(this.setting, this.option.config);
    }
  }

  editorReady(){
  }

  editorDestroy() {
  }

  editorContentChange() {
  }

  ngAfterContentChecked() {
  }

}
