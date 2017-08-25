import {
    Component,
    AfterContentChecked,
    ViewContainerRef,
    ViewChild,
    ComponentFactoryResolver,
    ComponentRef,
    ComponentFactory,
    Input
} from '@angular/core';
import {FormGroup, FormControl, FormBuilder,Validators} from '@angular/forms';
import {NgvFormConfig, NgvFormOption} from './form.config';

/**
 * A component that makes it easy to create tabbed interface.
 */
@Component({
    selector: 'ngv-form',
    template: `
        <div class="ngv-form">
            <form [formGroup]="myForm">
                <div #formRef></div>
            </form>
        </div>
    `
})
export class NgvForm implements AfterContentChecked {
    constructor(config: NgvFormConfig,
                private cfr: ComponentFactoryResolver,
                private fb: FormBuilder) {
    }

    @ViewChild("formRef", {read: ViewContainerRef}) formRef: ViewContainerRef;
    @Input() option: NgvFormOption;
    myForm: FormGroup;

    ngOnInit() {
        this.myForm = this.fb.group({});
        for (let compOption of this.option.components) {
            let compFactory: ComponentFactory<any> = this.cfr.resolveComponentFactory(compOption.comp);
            let comp: ComponentRef<any> = this.formRef.createComponent(compFactory);
            compOption.formGroup = this.myForm;
            comp.instance.option = compOption;
            if(compOption.validations){
                let fnArray = [];
                for(let validation of compOption.validations){
                    fnArray.push(validation.fn);
                }
                this.myForm.addControl(compOption.property,new FormControl(compOption.value,Validators.compose(fnArray)));
            }else{
                this.myForm.addControl(compOption.property,new FormControl(compOption.value));
            }
        }
    }

    getValue(): any {
        let value: any = {};
        for (let compOption of this.option.components) {
            value[compOption.property] = compOption.value;
        }
        return value;
    }

    ngAfterContentChecked() {
    }

}
