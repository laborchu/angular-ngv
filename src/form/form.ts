import {
  Component,
  AfterContentChecked,
  Input
} from '@angular/core';
import { NgvFormConfig, NgvFormOption } from './form.config';

/**
 * A component that makes it easy to create tabbed interface.
 */
@Component({
  selector: 'ngv-form',
  exportAs: 'ngvForm',
  template: `
    <form action="#">
       <div class="md-form form-group">
            <input mdbActive type="text" class="form-control" required>
            <label>Your email</label>
        </div>
        <div class="md-form form-group">
            <input type="password" class="form-control" required>
            <label>Your password</label>
        </div>
        <div class="text-center">
            <button type="submit" class="btn btn-deep-purple">Login</button>
        </div>
        <!--/Form with header-->
    </form>
  `
})
export class NgvForm implements  AfterContentChecked {
  constructor(config: NgvFormConfig) {
  }

  @Input() option: NgvFormOption;

  ngOnInit() {
   
  }

  ngAfterContentChecked() {
  }

}
