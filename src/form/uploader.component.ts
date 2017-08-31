import {
    Component,
    AfterContentChecked,
    ViewContainerRef,
    ViewChild,
    ComponentFactoryResolver,
    Input
} from '@angular/core';
import { Response, Http, Headers, RequestOptions } from '@angular/http';
import {UMeditorComponent} from 'ngx-umeditor';
import {NgvFormConfig, NgvFormUploaderCompOption} from './form.config';
import { WebUploaderComponent, File, FileStatus, Options } from 'ngx-webuploader';

/**
 * A component that makes it easy to create tabbed interface.
 */
@Component({
    selector: 'ngv-form-uploader',
    template: `
        <div class="mb15" [ngClass]="{'has-error':option.formGroup.controls[option.property].errors}">
            <div class="form-inline">
                <div class="form-group form-label">
                    {{option.label}}
                </div>
                <div class="form-group uploader-right">
                    <div class="upload-item" *ngFor="let item of option.value" (click)="tapItem(item)">
                        <img *ngIf="isImg(item)" src="{{item.filePath}}"/>
                        <div class="upload-item-video" *ngIf="isVideo(item)">
                            <i class="iconfont icon-play"></i>
                        </div>
                        <div class="upload-item-other" *ngIf="!isVideo(item)&&!isImg(item)">
                            <i class="iconfont icon-file-blank">
                            </i>
                            <span class="file-type">{{item.fileType}}</span>
                        </div>
                        <svg class="icon" aria-hidden="true" (click)="tapDelItem(item)">
                          <use xlink:href="#icon-shanchu"></use>
                        </svg>
                    </div>
                    <a id="{{getUploaderId()}}" [hidden]="option.limit>0&&option.limit<=option.value.length">+</a>
                </div>
                 <webuploader style="display: none;" [options]="ngxOptions" (onReady)="onReady($event)">
                </webuploader>
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
export class NgvFormUploader implements AfterContentChecked {
    constructor(protected http: Http, private formConfig:NgvFormConfig) {

    }

    option: NgvFormUploaderCompOption;
    ngxOptions: Options;

    ngOnInit() {
        if(this.option.multiple==undefined){
            this.option.multiple = true;
        }
        if(!this.option.value){
            this.option.value = [];
        }
        this.ngxOptions = {
            pick: { 
                id: "#" + this.getUploaderId(),
                multiple: this.option.multiple
            },
            accept:this.getAccept()
        }
    }

    getUploaderId():string{
        return this.option.uploaderId?this.option.uploaderId:"picker";
    }

    getAccept():any{
        if (this.option.accept == "image") {
            return {
                title: 'Images',
                extensions: 'gif,jpg,jpeg,bmp,png',
                mimeTypes: 'image/*'
            }
        } else if (this.option.accept == "video") {
            return {
                title: 'Images',
                extensions: 'mp4',
                mimeTypes: 'video/*'
            }
        }
        return null;
    }

    onReady(uploader: WebUploaderComponent) {
        uploader.Instance.options.server = this.formConfig.uploaderConfig.server;
        uploader.Instance
            .on('fileQueued', (file: any) => {
                if (this.formConfig.uploaderConfig && this.formConfig.uploaderConfig.md5Source) {
                    uploader.Instance.md5File(file).then((val:string) => {
                        file["md5"] = val;
                        this.formConfig.uploaderConfig.md5Source.getData({ md5: val }).then((data: any) => {
                            if (data.filePath) {
                                this.wrapperData(data, file);
                                this.option.value.push(data);
                            } else {
                                uploader.Instance.upload(file);
                            }
                        }, (err: any) => {
                            console.log(err);
                            this.option.errHandler && this.option.errHandler(err);
                        })
                    });
                }else{
                    uploader.Instance.upload(file);
                }
            })
            .on('uploadBeforeSend', (block: any, data: any, headers: any) => {
                this.formConfig.uploaderConfig && this.formConfig.uploaderConfig.uploadBeforeSend && this.formConfig.uploaderConfig.uploadBeforeSend(block, data, headers);
            })
            .on('uploadSuccess', (file: File, data: any) => {
                this.wrapperData(data, file);
                this.option.value.push(data);
            })
            .on('uploadError', (file: File, err: any) => {
                console.log(err);
                this.option.errHandler && this.option.errHandler(err);
            });
    }

    wrapperData(data: any, file: File){
        data.fileName = file.name;
        if (file.ext) {
            data.fileType = file.ext.toLowerCase();
        } else {
            data.fileType = "";
        }
        data.fileSize = file.size;
        this.formConfig.uploaderConfig && this.formConfig.uploaderConfig.wrapperUploadData && this.formConfig.uploaderConfig.wrapperUploadData(data);
    }

    isImg(data:any):boolean{
        let index:number = ["bmp", "jpg", "jpeg", "png", "gif"].indexOf(data.fileType);
        if(index!=-1){
            return true;
        }else{
            return false;
        }
    }

    isVideo(data:any):boolean{
        let index: number = ["mp4"].indexOf(data.fileType);
        if(index!=-1){
            return true;
        }else{
            return false;
        }
    }

    tapItem(item:any):void{
    }

    tapDelItem(item: any): void {
        var index = this.option.value.indexOf(item);
        if (index > -1) {
           this.option.value.splice(index, 1);
        }
    }

    ngAfterContentChecked() {
    }

}
