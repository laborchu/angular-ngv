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
    compMap: any = {};
    ngOnInit() {
        this.myForm = this.fb.group({});
        for (let compOption of this.option.components) {
            let compFactory: ComponentFactory<any> = this.cfr.resolveComponentFactory(compOption.comp);
            let comp: ComponentRef<any> = this.formRef.createComponent(compFactory);
            compOption.formGroup = this.myForm;
            comp.instance.option = compOption;
            this.compMap[compOption.property] = comp;
            if(compOption.validations){
                let fnArray = [];
                for(let validation of compOption.validations){
                    fnArray.push(validation.fn);
                }
                this.myForm.addControl(compOption.property,new FormControl(compOption.value,Validators.compose(fnArray)));
            }else{
                this.myForm.addControl(compOption.property,new FormControl(compOption.value));
            }
            if(this.option.value){
                compOption.value = this.option.value[compOption.property];
            }
        }

    }

    checkVal():boolean{
        return this.myForm.valid;
    }

    getValue(): any {
        if(!this.option.value){
            this.option.value = {};
        }
        for (let compOption of this.option.components) {
            this.option.value[compOption.property] = compOption.value;
        }
        return this.option.value;
    }

    setValue(data:any){
        this.option.value = data;
        for (let compOption of this.option.components) {
            compOption.value = this.option.value[compOption.property];
            let txComp: any = this.compMap[compOption.property].instance;
            if (txComp.onChange){
                txComp.onChange();
            }
        }
    }

    getComp(property:string){
        return this.compMap[property];
    }

    ngAfterContentChecked() {
    }

}
