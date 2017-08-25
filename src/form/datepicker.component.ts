import {
    Component,
    AfterContentChecked,
    ViewContainerRef,
    ViewChild,
    ComponentFactoryResolver,
    Injectable,
    Input
} from '@angular/core';
import {NgvFormConfig, NgvFormDatePickerCompOption} from './form.config';
import {NgvDsModel} from '../core/datasource';
import {NgbDatepickerI18n} from '@ng-bootstrap/ng-bootstrap';

const I18N_VALUES = {
    weekdays: ['一', '二', '三', '四', '五', '六', '日'],
    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
};


@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {

    constructor() {
        super();
    }

    getWeekdayShortName(weekday: number): string {
        return I18N_VALUES.weekdays[weekday - 1];
    }

    getMonthShortName(month: number): string {
        return I18N_VALUES.months[month - 1];
    }

    getMonthFullName(month: number): string {
        return this.getMonthShortName(month);
    }
}


/**
 * A component that makes it easy to create tabbed interface.
 */
@Component({
    selector: 'ngv-form-date',
    template: `
        <div class="mb15" [ngClass]="{'has-error':option.formGroup.controls[option.property].errors}">
            <div class="form-inline form-datapicker">
                <div class="form-group form-label">
                    {{option.label}}
                </div>
                <div class="form-group">
                    <input class="form-control form-datapicker-input" placeholder="yyyy-mm-dd"
                           [formControl]="option.formGroup.controls[option.property]"
                           name="{{option.property}}" [(ngModel)]="option.value" ngbDatepicker #d="ngbDatepicker">
                    <button class="form-datapicker-btn" (click)="d.toggle()" type="button">
                        <i class="iconfont icon-datepick"></i>
                    </button>
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
    `,
    providers: [{provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n}] // define custom NgbDatepickerI18n provider

})
export class NgvFormDatePicker implements AfterContentChecked {
    constructor() {

    }

    option: NgvFormDatePickerCompOption;
    data: Array<any>;

    ngOnInit() {
    }

    ngAfterContentChecked() {
    }

}
