import {
    HostBinding
} from '@angular/core';

export class NgvFormComp{
  constructor() {

  }

  @HostBinding('hidden')
  isHidden:boolean = false;

}